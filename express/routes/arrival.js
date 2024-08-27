import express from 'express'
const router = express.Router()
import { getIdParam } from '#db-helpers/db-tool.js'
import dbPromise from '##/configs/mysql-promise.js'
import moment from 'moment'

// 檢查空物件, 轉換req.params為數字
import multer from 'multer'
const upload = multer()

//此oid為流水編號

router.get('/', async (req, res) => {
  let regiArr = []

  try {
    const [arrival] = await dbPromise.execute(
      'SELECT `id`,`numerical_order`, `delivery_method`, `order_date`, `recipient`  FROM `user_order` WHERE status_now = "付款完成" '
    )

    res.status(200).json({
      status: 'success',
      data: {
        message: '已取得資訊',
        arrival,
      },
    })
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }
})

router.put('/', upload.none(), async (req, res) => {
  const { order_ids } = req.body
  console.log(order_ids)

  //   try {
  //     const [arrival] = await dbPromise.execute(
  //       'SELECT `id`,`numerical_order`, `delivery_method`, `order_date`, `recipient`  FROM `user_order` WHERE status_now = "付款完成" '
  //     )

  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         message: '已取得資訊',
  //         arrival,
  //       },
  //     })
  //   } catch (err) {
  //     res.status(400).json({ status: 'error', data: { message: err.message } })
  //   }
  res.status(200).json({ status: 'success', data: { message: order_ids } })
})

export default router
