import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
import dbPromise from '##/configs/mysql-promise.js'
import multer from 'multer'
const upload = multer()

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
  const oid = getIdParam(req)
  const { uid, type } = req.body
  try {
    const [existingItem] = await dbPromise.execute(
      'SELECT * FROM `favorite` WHERE `user_id` = ? AND `object_id` = ? AND `object_type` = ?',
      [uid, oid, type]
    )

    if (existingItem.length > 0) {
      return res
        .status(400)
        .json({ status: 'error', data: { message: '該產品已在收藏內' } })
    }
    const [result] = await dbPromise.execute(
      'INSERT INTO `favorite` (`id`, `user_id`, `object_id`, `object_type`) VALUES (NULL, ?, ?, ?)',
      [uid, oid, type]
    )
    if (result.insertId) {
      const [fav] = await dbPromise.execute(
        'SELECT * FROM `favorite` WHERE `user_id` = ? AND `object_type` = ?',
        [uid, type]
      )
      res
        .status(201)
        .json({ status: 'success', data: { message: '新增成功', fav } })
    } else {
      res.status(400).json({ status: 'error', data: { message: '新增失敗' } })
    }
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }
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
