import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
import dbPromise from '##/configs/mysql-promise.js'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { createLinePayClient } from 'line-pay-merchant'

const upload = multer()

const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})

// linepay
router.get('/LinepayReserve', async (req, res) => {
  if (!req.query.orderId) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const { orderId } = req.query
  const packageId = uuidv4()

  let order = {
    orderId: orderId,
    currency: 'TWD',
    amount: 0,
    packages: [
      {
        id: packageId,
        amount: 0,
        products: req.body.products,
      },
    ],
    options: { display: { locale: 'zh_TW' } },
  }
  try {
    const [total] = await dbPromise.execute(
      'SELECT `total` FROM `user_order` WHERE `id` = ?',
      [orderId]
    )
    const [orderDetail] = await dbPromise.execute(
      'SELECT `id`, `name`, `quantity`, `price` FROM `order_detail` WHERE `order_id` = ?',
      [orderId]
    )

    order = {
      ...order,
      amount: total[0].total,
      packages: [
        {
          id: packageId,
          amount: total[0].total,
          products: orderDetail,
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

    // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
    res.redirect(linePayResponse.body.info.paymentUrl.web)
  } catch (e) {
    console.log('error', e)
  }
  // // 從資料庫取得訂單資料
  // const orderRecord = await Purchase_Order.findByPk(orderId, {
  //   raw: true, // 只需要資料表中資料
  // })

  // // const orderRecord = await findOne('orders', { order_id: orderId })

  // // order_info記錄要向line pay要求的訂單json
  // const order = JSON.parse(orderRecord.order_info)

  // //const order = cache.get(orderId)
  // console.log(`獲得訂單資料，內容如下：`)
  // console.log(order)

  // try {
  //   // 向line pay傳送的訂單資料
  //   const linePayResponse = await linePayClient.request.send({
  //     body: { ...order, redirectUrls },
  //   })

  //   // 深拷貝一份order資料
  //   const reservation = JSON.parse(JSON.stringify(order))

  //   reservation.returnCode = linePayResponse.body.returnCode
  //   reservation.returnMessage = linePayResponse.body.returnMessage
  //   reservation.transactionId = linePayResponse.body.info.transactionId
  //   reservation.paymentAccessToken =
  //     linePayResponse.body.info.paymentAccessToken

  //   console.log(`預計付款資料(Reservation)已建立。資料如下:`)
  //   console.log(reservation)

  //   // 在db儲存reservation資料
  //   const result = await Purchase_Order.update(
  //     {
  //       reservation: JSON.stringify(reservation),
  //       transaction_id: reservation.transactionId,
  //     },
  //     {
  //       where: {
  //         id: orderId,
  //       },
  //     }
  //   )

  //   // console.log(result)

  //   // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
  //   res.redirect(linePayResponse.body.info.paymentUrl.web)
  // } catch (e) {
  //   console.log('error', e)
  // }
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
      'SELECT `coupons_for_user`.`coupon_id`,`coupons`.`name`, `coupons`.`discount_value`  FROM `coupons_for_user` JOIN `coupons` ON `coupons`.`id` = `coupons_for_user`.`coupon_id` WHERE `coupons_for_user`.`user_id` = ? AND `coupons_for_user`.status = "unused"',
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

  const cartArray = JSON.parse(cart)

  const errors = []
  if (!delivery) {
    errors.push('請選擇配送方式')
  }

  if (delivery === '宅配') {
    const { country, firstname, lastname, postCode, city, address } =
      delivery_address || {}
    if (!country || !firstname || !lastname || !postCode || !city || !address) {
      errors.push('宅配信息填寫不完整')
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
    } = payInfo || {}
    if (!creditNum1 || !creditNum2 || !creditNum3 || !creditNum4) {
      errors.push('請輸入信用卡號碼')
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate)) {
      errors.push('請輸入正確的有效期格式 (mm/yy)')
    }
    if (!/^\d{3}$/.test(csc)) {
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

      res.status(201).json({
        status: 'success',
        data: { message: '訂單建立成功', orderId: result.insertId },
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

router.delete('/:id', upload.none(), async (req, res, next) => {
  const oid = getIdParam(req)
  const { uid, type } = req.body
  try {
    const [existingItem] = await dbPromise.execute(
      'SELECT * FROM `favorite` WHERE `user_id` = ? AND `object_id` = ? AND `object_type` = ?',
      [uid, oid, type]
    )

    if (existingItem.length <= 0) {
      return res.status(400).json({
        status: 'error',
        data: { message: '收藏內無該商品，刪除失敗' },
      })
    }
    const [result] = await dbPromise.execute(
      'DELETE FROM `favorite` WHERE `user_id` = ? AND `object_id` = ? AND `object_type` = ?',
      [uid, oid, type]
    )
    if (result.affectedRows >= 1) {
      const [fav] = await dbPromise.execute(
        'SELECT * FROM `favorite` WHERE `user_id` = ? AND `object_type` = ?',
        [uid, type]
      )
      res
        .status(200)
        .json({ status: 'success', data: { message: '刪除成功', fav } })
    } else {
      res.status(400).json({ status: 'error', data: { message: '刪除失敗' } })
    }
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }
})

export default router
