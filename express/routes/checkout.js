import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
import dbPromise from '##/configs/mysql-promise.js'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { createLinePayClient } from 'line-pay-merchant'
import * as crypto from 'crypto'

const upload = multer()

const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})

//綠界全方位金流技術文件：
// https://developers.ecpay.com.tw/?p=2856
// 信用卡測試卡號：4311-9522-2222-2222 安全碼 222

//一、選擇帳號，是否為測試環境
// const MerchantID = '3002607' //必填
// const HashKey = 'pwFHCqoQZGmho4w6' //3002607
// const HashIV = 'EkRm7iFT261dpevs' //3002607
// let isStage = true // 測試環境： true；正式環境：false
const MerchantID = process.env.ECPAY_MERCHANT_ID //必填
const HashKey = process.env.ECPAY_HASH_KEY //3002607
const HashIV = process.env.ECPAY_HASH_IV //3002607
let isStage = process.env.ECPAY_TEST // 測試環境： true；正式環境：false
const ReturnURL = process.env.ECPAY_RETURN_URL
const OrderResultURL = process.env.ECPAY_ORDER_RESULT_URL
const ReactClientBackURL = process.env.ECPAY_ORDER_CALLBACK_URL

// linepay
router.get('/LinepayReserve', async (req, res) => {
  if (!req.query.orderId) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const { orderId } = req.query
  const packageId = uuidv4()

  let order
  try {
    const [orderInfo] = await dbPromise.execute(
      'SELECT `id`, `total`,`numerical_order` FROM `user_order` WHERE `id` = ?',
      [orderId]
    )

    order = {
      orderId: orderInfo[0].numerical_order,
      currency: 'TWD',
      amount: orderInfo[0].total,
      packages: [
        {
          id: packageId,
          amount: orderInfo[0].total,
          products: [
            {
              id: orderInfo[0].total,
              name: orderInfo[0].numerical_order,
              quantity: 1,
              price: orderInfo[0].total,
            },
          ],
        },
      ],
    }
    console.log(order)
  } catch (err) {
    console.log(err.message)
  }

  // 設定重新導向與失敗導向的網址
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  try {
    // 向line pay傳送的訂單資料
    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    })

    // 深拷貝一份order資料
    const reservation = JSON.parse(JSON.stringify(order))

    reservation.returnCode = linePayResponse.body.returnCode
    reservation.returnMessage = linePayResponse.body.returnMessage
    reservation.transactionId = linePayResponse.body.info.transactionId
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken

    console.log(`預計付款資料(Reservation)已建立。資料如下:`)
    console.log(reservation)

    // 在db儲存reservation資料
    const [result] = await dbPromise.execute(
      'UPDATE `user_order` SET `transaction_id` = ?, `reservation` = ? WHERE `user_order`.`id` = ?',
      [reservation.transactionId, JSON.stringify(reservation), orderId]
    )
    // const result = await Purchase_Order.update(
    //   {
    //     reservation: JSON.stringify(reservation),
    //     transaction_id: reservation.transactionId,
    //   },
    //   {
    //     where: {
    //       id: orderId,
    //     },
    //   }
    // )

    // console.log(result)
    if (result.changedRows >= 1) {
      // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
      res.redirect(linePayResponse.body.info.paymentUrl.web)
    }
  } catch (e) {
    console.log('error', e)
  }
})

router.get('/confirm', async (req, res) => {
  // 網址上需要有transactionId
  const transactionId = req.query.transactionId
  console.log(transactionId)
  // 從資料庫取得交易資料
  const [orderInfo] = await dbPromise.execute(
    'SELECT * FROM `user_order` WHERE `transaction_Id` = ?',
    [transactionId]
  )

  // 交易資料
  const transaction = JSON.parse(orderInfo[0].reservation)

  // 交易金額
  const amount = transaction.amount

  try {
    // 最後確認交易
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: 'TWD',
        amount: amount,
      },
    })

    // linePayResponse.body回傳的資料
    console.log('linePayResponse:', linePayResponse)

    //transaction.confirmBody = linePayResponse.body

    // status: 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    let status = '付款完成'
    const time = moment().format('YYYY-MM-DD HH:mm:ss')

    if (linePayResponse.body.returnCode !== '0000') {
      status = '付款失敗'
    }

    // 更新資料庫的訂單狀態
    const [result] = await dbPromise.execute(
      'UPDATE `user_order` SET `status_now` = ?, `confirm` = ?, `return_code` = ? WHERE `user_order`.`id` = ?',
      [
        status,
        JSON.stringify(linePayResponse.body),
        linePayResponse.body.returnCode,
        orderInfo[0].id,
      ]
    )
    console.log(result)
    if (result.changedRows >= 1) {
      const [resultStatus] = await dbPromise.execute(
        'INSERT INTO `order_status` (`id`, `order_id`, `status`, `update_at`) VALUES (NULL, ?, ?, ?);',
        [orderInfo[0].id, status, time]
      )

      if (resultStatus.insertId) {
        return res.status(200).json({
          status: 'success',
          data: {
            data: linePayResponse.body,
            message: '訂單付款成功',
            orderId: orderInfo[0].id,
            numerical_order: orderInfo[0].numerical_order,
          },
        })
      } else {
        res.status(400).json({ status: 'error', data: { message: '付款失敗' } })
      }
    } else {
      res.status(400).json({ status: 'error', data: { message: '付款失敗' } })
    }
  } catch (error) {
    return res.status(404).json({ status: 'fail', data: error.data })
  }
})

router.get('/check-transaction', async (req, res) => {
  const transactionId = req.query.transactionId

  try {
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId: transactionId,
      params: {},
    })

    // 範例:
    // {
    //   "body": {
    //     "returnCode": "0000",
    //     "returnMessage": "reserved transaction."
    //   },
    //   "comments": {}
    // }

    res.json(linePayResponse.body)
  } catch (e) {
    res.json({ error: e })
  }
})

router.get('/ecpaypayment', async (req, res, next) => {
  if (!req.query.orderId) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  // 從資料庫得到order資料
  const { orderId } = req.query
  // 從資料庫取得訂單資料
  let order
  try {
    const [orderInfo] = await dbPromise.execute(
      'SELECT `id`, `total`, `numerical_order` FROM `user_order` WHERE `id` = ?',
      [orderId]
    )
    if (orderInfo.length !== 0) {
      order = orderInfo[0]
    }
  } catch (err) {
    console.log(err.message)
  }

  console.log('獲得訂單資料，內容如下：')
  console.log(order)
  //二、輸入參數
  const TotalAmount = order.total
  const TradeDesc = '商店線上付款'
  const ItemName = '訂單編號' + order.numerical_order + '商品一批'
  const ChoosePayment = 'ALL'

  // 以下參數不用改
  const stage = isStage ? '-stage' : ''
  const algorithm = 'sha256'
  const digest = 'hex'
  const APIURL = `https://payment${stage}.ecpay.com.tw/Cashier/AioCheckOut/V5`
  // 交易編號
  const MerchantTradeNo =
    new Date().toISOString().split('T')[0].replaceAll('-', '') +
    crypto
      .randomBytes(32)
      .toString('base64')
      .replace(/[+/=]/g, '')
      .substring(0, 12)
  // 交易日期時間
  const MerchantTradeDate = moment().format('YYYY/MM/DD HH:mm:ss')
  //三、計算 CheckMacValue 之前
  let ParamsBeforeCMV = {
    MerchantID: MerchantID,
    MerchantTradeNo: MerchantTradeNo,
    MerchantTradeDate: MerchantTradeDate.toString(),
    PaymentType: 'aio',
    EncryptType: 1,
    TotalAmount: TotalAmount,
    TradeDesc: TradeDesc,
    ItemName: ItemName,
    ChoosePayment: ChoosePayment,
    ReturnURL,
    OrderResultURL,
    CustomField1: order.numerical_order,
    CustomField2: order.id,
  }

  //四、計算 CheckMacValue
  function CheckMacValueGen(parameters, algorithm, digest) {
    // const crypto = require('crypto')
    let Step0

    Step0 = Object.entries(parameters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    function DotNETURLEncode(string) {
      const list = {
        '%2D': '-',
        '%5F': '_',
        '%2E': '.',
        '%21': '!',
        '%2A': '*',
        '%28': '(',
        '%29': ')',
        '%20': '+',
      }

      Object.entries(list).forEach(([encoded, decoded]) => {
        const regex = new RegExp(encoded, 'g')
        string = string.replace(regex, decoded)
      })

      return string
    }

    const Step1 = Step0.split('&')
      .sort((a, b) => {
        const keyA = a.split('=')[0]
        const keyB = b.split('=')[0]
        return keyA.localeCompare(keyB)
      })
      .join('&')
    const Step2 = `HashKey=${HashKey}&${Step1}&HashIV=${HashIV}`
    const Step3 = DotNETURLEncode(encodeURIComponent(Step2))
    const Step4 = Step3.toLowerCase()
    const Step5 = crypto.createHash(algorithm).update(Step4).digest(digest)
    const Step6 = Step5.toUpperCase()
    return Step6
  }

  const CheckMacValue = CheckMacValueGen(ParamsBeforeCMV, algorithm, digest)

  //五、將所有的參數製作成 payload
  const AllParams = { ...ParamsBeforeCMV, CheckMacValue }
  console.log('AllParams:', AllParams)

  const displayInfo = `
    <p>交易編號: ${MerchantTradeNo}</p>
    <p>訂單號碼: ${order.numerical_order}</p>
    <p>交易內容: ${ItemName}</p>
    <p>價錢: ${TotalAmount}</p>
  `

  const inputs = Object.entries(AllParams)
    .map(
      ([name, value]) => `<input type="hidden" name="${name}" value="${value}">`
    )
    .join('')

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>全方位金流-測試</title>
        <style>
        .submit-btn {
            border: none;
            background: url('https://support.ecpay.com.tw/wp-content/uploads/2023/08/logo_pay200x55.png') no-repeat center center;
            background-size: cover;
            width: 200px; /* 調整為圖片的寬度 */
            height: 55px; /* 調整為圖片的高度 */
            cursor: pointer;
        }
    </style>
</head>
</head>
<body>
    ${displayInfo}
    <form method="post" action="${APIURL}">
      ${inputs}
            <button type="submit" class="submit-btn"></button>

    </form>
</body>
</html>
`

  //res.json({ htmlContent })
  res.send(htmlContent)

  // const htmlContent = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  //     <title>全方位金流測試</title>
  // </head>
  // <body>
  //     <form method="post" action="${APIURL}">
  // ${inputs}
  // <input type ="submit" value = "送出參數">
  //     </form>
  // <script>
  //   document.forms[0].submit();
  // </script>
  // </body>
  // </html>
  // `
})

// 獲得某會員id的有加入到我的最愛清單中的商品id們
// 此路由只有登入會員能使用
router.get('/:id', async (req, res) => {
  const id = getIdParam(req)
  try {
    const [userInfo] = await dbPromise.execute(
      'SELECT `username`, `city`, `address` FROM `user` WHERE `id` = ?',
      [id]
    )
    const [coupons] = await dbPromise.execute(
      'SELECT `coupons_for_user`.`coupon_id`,`coupons`.`name`, `coupons`.`discount_value`, `coupons`.`limit_value`  FROM `coupons_for_user` JOIN `coupons` ON `coupons`.`id` = `coupons_for_user`.`coupon_id` WHERE `coupons_for_user`.`user_id` = ? AND `coupons_for_user`.status = "unused"',
      [id]
    )

    const [card] = await dbPromise.execute(
      'SELECT `card_number`,`card_name`, `exp_date`  FROM `credit_card`  WHERE `user_id` = ? AND status = "Active"',
      [id]
    )

    res.status(200).json({
      status: 'success',
      data: { message: '已取得資訊', userInfo, coupons, card },
    })
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }
})

router.post('/result', async (req, res, next) => {
  const { CustomField1, CustomField2, RtnCode } = req.body
  console.log('綠界回傳的資料如下：')
  console.log(req.body)
  // res.send('綠界回傳的資料如下：' + JSON.stringify(req.body))

  // 寫入資料表 RtnCode === '1' 代表交易成功
  if (RtnCode === '1') {
    const status = '付款完成'
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    try {
      // 更新資料庫的訂單狀態
      const [result] = await dbPromise.execute(
        'UPDATE `user_order` SET `status_now` = ?, `return_code` = ? WHERE `user_order`.`numerical_order` = ?',
        [status, `RtnCode: ${RtnCode}`, CustomField1]
      )
      console.log(result)
      if (result.changedRows >= 1) {
        const [resultStatus] = await dbPromise.execute(
          'INSERT INTO `order_status` (`id`, `order_id`, `status`, `update_at`) VALUES (NULL, ?, ?, ?);',
          [CustomField2, status, time]
        )

        if (resultStatus.insertId) {
          res.redirect(
            ReactClientBackURL + '?' + new URLSearchParams(req.body).toString()
          )
        } else {
          res
            .status(400)
            .json({ status: 'error', data: { message: '付款失敗' } })
        }
      } else {
        res.status(400).json({ status: 'error', data: { message: '付款失敗' } })
      }
    } catch (error) {
      return res.status(404).json({ status: 'fail', data: error.data })
    }
  }
})

router.post('/:id', upload.none(), async (req, res, next) => {
  const user_id = getIdParam(req)
  const uuid = uuidv4()
  const today = moment().format('YYYY-MM-DD')
  const {
    delivery,
    delivery_address,
    recipient,
    payMethod,
    payInfo,
    total,
    coupon_id,
    discount_info,
    remark,
    cart,
  } = req.body

  console.log(req.body)
  const cartArray = JSON.parse(cart)
  const delivery_addressJson = JSON.parse(delivery_address)
  const payInfoJson = JSON.parse(payInfo)

  const errors = []
  if (!delivery) {
    errors.push('請選擇配送方式')
  }

  if (delivery === '宅配') {
    const { country, postCode, city, address } = delivery_addressJson || {}
    if (!country || !postCode || !city || !address || !recipient) {
      errors.push('宅配信息填寫不完整')
    }
  } else if (delivery === '7-11店到店') {
    const { city, address } = delivery_addressJson || {}
    if (!city || !address || !recipient) {
      errors.push('未選擇門市')
    }
  }

  if (!payMethod) {
    errors.push('請選擇付款方式')
  }

  if (payMethod === 'credit') {
    const {
      creditNum1,
      creditNum2,
      creditNum3,
      creditNum4,
      expDate,
      csc,
      cardholder,
    } = payInfoJson || {}
    if (
      !Number(creditNum1) ||
      !Number(creditNum2) ||
      !Number(creditNum3) ||
      !Number(creditNum4)
    ) {
      errors.push('請輸入信用卡號碼')
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate)) {
      errors.push('請輸入正確的有效期格式 (mm/yy)')
    }
    if (!/^\d{3}$/.test(Number(csc))) {
      errors.push('請輸入正確的安全碼格式 (數字三碼)')
    }
    if (!cardholder) {
      errors.push('請輸入持卡人姓名')
    }
  }

  if (!coupon_id) {
    errors.push('請選擇有效的優惠券')
  }

  if (!Array.isArray(cartArray)) {
    errors.push('購物車內容必須為陣列')
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', data: { message: errors } })
  }

  try {
    const [result] = await dbPromise.execute(
      'INSERT INTO `user_order` (`id`, `numerical_order`, `user_id`, `delivery_method`, `delivery_address`, `recipient`, `pay_method`, `pay_info`, `total`, `coupons_id`, `discount_info`, `remark`, `status_now`, `order_date`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        uuid,
        user_id,
        delivery,
        delivery_address,
        recipient,
        payMethod,
        payInfo,
        total,
        coupon_id,
        discount_info,
        remark,
        '未付款',
        today,
      ]
    )
    if (result.insertId) {
      const time = moment().format('YYYY-MM-DD HH:mm:ss')
      cartArray.forEach((cartItem) => {
        const { object_id, object_type, quantity, price, item_name } = cartItem
        dbPromise.execute(
          'INSERT INTO `order_detail` (`id`, `name`, `order_id`, `object_id`, `object_type`, `quantity`,`price`) VALUES (NULL,?,?,?,?,?,?)',
          [item_name, result.insertId, object_id, object_type, quantity, price]
        )
      })
      dbPromise.execute(
        'INSERT INTO `order_status` (`id`, `order_id`, `status`, `update_at`) VALUES (NULL, ?, ?, ?);',
        [result.insertId, '未付款', time]
      )

      dbPromise.execute(
        'UPDATE `coupons_for_user` SET `status` = ? WHERE `coupons_for_user`.`user_id` = ? AND coupon_id = ?;',
        ['used', user_id, coupon_id]
      )

      res.status(201).json({
        status: 'success',
        data: {
          message: '訂單建立成功',
          orderId: result.insertId,
          numerical_order: uuid,
        },
      })
    } else {
      res
        .status(400)
        .json({ status: 'error', data: { message: '訂單建立失敗' } })
    }
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }

  // INSERT INTO `user_order` (`id`, `numerical_order`, `user_id`, `delivery_method`, `delivery_address`, `recipient`, `pay_method`, `pay_info`, `total`, `coupons_id`, `discount_info`, `remark`, `status_now`, `order_date`) VALUES (NULL, 'sss', '1', '', '11', '11', '111', '111', '111', '111', '111', '11', '111', '2024-08-01');
  // try {
  //
  //
  //   const [result] = await dbPromise.execute(
  //     'INSERT INTO `user_order` (`id`, `numerical_order`, `user_id`, `delivery_method`, `delivery_address`, `recipient`, `pay_method`, `pay_info`, `total`, `coupons_id`, `discount_info`, `remark`, `status_now`, `order_date`) VALUES (NULL, '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?')',
  //     [uid, oid, type]
  //   )
  //   if (result.insertId) {
  //     const [fav] = await dbPromise.execute(
  //       'SELECT * FROM `favorite` WHERE `user_id` = ? AND `object_type` = ?',
  //       [uid, type]
  //     )
  //     res
  //       .status(201)
  //       .json({ status: 'success', data: { message: '新增成功', fav } })
  //   } else {
  //     res.status(400).json({ status: 'error', data: { message: '新增失敗' } })
  //   }
  // } catch (err) {
  //   res.status(400).json({ status: 'error', data: { message: err.message } })
  // }
})

router.put('/:id', upload.none(), async (req, res, next) => {
  const user_id = getIdParam(req)
  const { id, numerical_order } = req.body
  const time = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log(id, numerical_order)

  try {
    const [result] = await dbPromise.execute(
      'UPDATE `user_order` SET `status_now` = ? WHERE `user_order`.`id` = ?',
      ['付款完成', id]
    )
    console.log(result)
    if (result.changedRows >= 1) {
      const [resultStatus] = await dbPromise.execute(
        'INSERT INTO `order_status` (`id`, `order_id`, `status`, `update_at`) VALUES (NULL, ?, ?, ?);',
        [id, '付款完成', time]
      )

      if (resultStatus.insertId) {
        return res.status(200).json({
          status: 'success',
          data: {
            message: '訂單付款成功',
            orderId: id,
            numerical_order: numerical_order,
          },
        })
      } else {
        res.status(400).json({ status: 'error', data: { message: '付款失敗' } })
      }
    } else {
      res.status(400).json({ status: 'error', data: { message: '付款失敗' } })
    }
  } catch (error) {
    return res.status(404).json({ status: 'fail', data: error.data })
  }
})

export default router
