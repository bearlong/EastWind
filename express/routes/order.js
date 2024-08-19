import express from 'express'
const router = express.Router()
import { getIdParam } from '#db-helpers/db-tool.js'
import dbPromise from '##/configs/mysql-promise.js'

// 檢查空物件, 轉換req.params為數字
import multer from 'multer'

router.get('/:oid', async (req, res) => {
  const oid = req.params.oid

  try {
    const [orderInfo] = await dbPromise.execute(
      'SELECT `uo`.`id`,`uo`.`numerical_order`,`uo`.`user_id`, `uo`.`delivery_method`, `uo`.`delivery_address`,  `uo`.`recipient`,   `uo`.`pay_method`,   `uo`.`pay_info`,  `uo`.`total`,  `uo`.`coupons_id`,   `uo`.`discount_info`,   `uo`.`remark`,   `uo`.`status_now`,  `uo`.`order_date`, `u`.`phone`, COUNT(`od`.`id`) AS `order_detail_count`, `od`.`object_type`, GROUP_CONCAT(`od`.`object_id`) AS `object_ids`, GROUP_CONCAT(`od`.`object_type`) AS `object_types`,GROUP_CONCAT(`od`.`name`) AS `names`, GROUP_CONCAT(`od`.`quantity`) AS `quantitys`, GROUP_CONCAT(`od`.`price`) AS `prices`,GROUP_CONCAT( CASE WHEN `od`.`object_type` = "product" THEN `p`.`img` WHEN `od`.`object_type` = "course" THEN `c`.`images` END ) AS all_item_images FROM `user_order` `uo` JOIN `order_detail` `od` ON `uo`.`id` = `od`.`order_id`LEFT JOIN `user` `u` ON `uo`.`user_id` = `u`.`id` LEFT JOIN `product` `p` ON `od`.`object_id` = `p`.`id` AND  `od`.`object_type` = "product" LEFT JOIN `course` `c` ON `od`.`object_id` = `c`.`id` AND `od`.`object_type` = "course" WHERE `uo`.`numerical_order` = ?  GROUP BY `uo`.`id` ORDER BY `od`.`id` ASC',
      [oid]
    )

    if (orderInfo.length > 0) {
      const newObjectIds = orderInfo[0].object_ids
        ? orderInfo[0].object_ids.split(',')
        : []
      const newObjectTypes = orderInfo[0].object_types
        ? orderInfo[0].object_types.split(',')
        : []

      const newNames = orderInfo[0].names ? orderInfo[0].names.split(',') : []
      const newImages = orderInfo[0].all_item_images
        ? orderInfo[0].all_item_images.split(',')
        : []
      const newQuantitys = orderInfo[0].quantitys
        ? orderInfo[0].quantitys.split(',')
        : []
      const newPrices = orderInfo[0].prices
        ? orderInfo[0].prices.split(',')
        : []

      const orderDetails = newObjectIds.map((id, index) => ({
        id: Number(id),
        object_type: newObjectTypes[index],
        name: newNames[index],
        img: newImages[index],
        quantity: Number(newQuantitys[index]),
        price: Number(newPrices[index]),
      }))
      const {
        object_ids,
        object_types,
        names,
        all_item_images,
        order_detail_count,
        object_type,
        prices,
        quantitys,
        ...newOrderInfo
      } = orderInfo[0]

      const [status] = await dbPromise.execute(
        'SELECT * FROM `order_status` WHERE `order_id` = ?',
        [orderInfo[0].id]
      )
      res.status(200).json({
        status: 'success',
        data: {
          message: '已取得資訊',
          orderInfo: newOrderInfo,
          status,
          orderDetails,
        },
      })
    } else {
      res.status(400).json({ status: 'error', data: { message: '查無訂單' } })
    }
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }
})

router.get('/', async (req, res) => {
  if (!req.query.id) {
    return res.json({ status: 'error', message: '用戶不存在' })
  }
  const { id, status_now } = req.query

  try {
    const [orderInfo] = await dbPromise.execute(
      'SELECT `uo`.`pay_method`, `uo`.`status_now`, `uo`.`order_date`, `uo`.`total`, `uo`.`delivery_method`, `uo`.`delivery_address`, `uo`.`numerical_order`, COUNT(`od`.`id`) AS `order_detail_count`, `od`.`object_type`, GROUP_CONCAT(`od`.`object_id`) AS `object_ids`, GROUP_CONCAT(`od`.`object_type`) AS `object_types`, GROUP_CONCAT(`od`.`quantity`) AS `quantitys`, GROUP_CONCAT(`od`.`price`) AS `prices`,  CASE WHEN `od`.`object_type` = "product" THEN `p`.`img` WHEN `od`.`object_type` = "course" THEN `c`.`images` END AS first_item_image FROM `user_order` `uo` JOIN `order_detail` `od` ON `uo`.`id` = `od`.`order_id` LEFT JOIN `product` `p` ON `od`.`object_id` = `p`.`id` AND  `od`.`object_type` = "product" LEFT JOIN `course` `c` ON `od`.`object_id` = `c`.`id` AND `od`.`object_type` = "course" WHERE `uo`.`user_id` = ? AND status_now = ? GROUP BY `uo`.`id` ORDER BY `od`.`id` DESC',
      [id, status_now]
    )

    res.status(200).json({
      status: 'success',
      data: { message: '已取得資訊', orderInfo },
    })
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }
})

export default router
