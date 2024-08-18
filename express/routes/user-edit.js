import express from 'express'
import multer from 'multer'
import cors from 'cors'
import connection from '##/configs/mysql-promise.js'
import 'dotenv/config.js'

// 初始化路由和中間件
const router = express.Router()
const upload = multer()

// 設定CORS白名單和選項
const whitelist = ['http://localhost:5500', 'http://localhost:3000']
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true) // 允許請求
    } else {
      callback(new Error('不允許傳遞資料')) // 否則拒絕請求
    }
  },
}

// 初始化Express應用
const app = express()
app.use(cors(corsOptions)) // 使用CORS中間件，應用CORS設置
app.use(express.json()) // 使用JSON中間件來解析請求體中的JSON資料

// 路由區塊：將信用卡狀態設為Invalid
router.put('/invalidate-card/:userId/:cardId', async (req, res) => {
  const { userId, cardId } = req.params

  try {
    // 執行SQL更新操作，將信用卡狀態設為Invalid
    const [result] = await connection.execute(
      'UPDATE credit_card SET status = ? WHERE id = ? AND user_id = ?',
      ['Invalid', cardId, userId]
    )

    // 檢查是否成功更新
    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ status: 'success', message: '信用卡狀態已更新為Invalid' })
    } else {
      res.status(404).json({ status: 'fail', message: '找不到此信用卡' })
    }
  } catch (error) {
    console.error('Error updating card status:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// 路由區塊：新增信用卡
router.post('/add-card/:userId', async (req, res) => {
  const { userId } = req.params
  const { card_name, card_number, card_type, exp_date } = req.body

  try {
    // 執行SQL新增操作
    const [result] = await connection.execute(
      'INSERT INTO credit_card (user_id, card_name, card_number, card_type, exp_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, card_name, card_number, card_type, exp_date, 'Active']
    )

    // 檢查是否成功新增
    if (result.affectedRows > 0) {
      const [newCard] = await connection.execute(
        'SELECT * FROM credit_card WHERE id = ?',
        [result.insertId]
      )

      res.status(201).json({ status: 'success', data: newCard[0] })
    } else {
      res.status(400).json({ status: 'fail', message: '新增信用卡失敗' })
    }
  } catch (error) {
    console.error('Error adding card:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// 路由區塊：更新用戶資訊
router.put('/update-user/:userId', async (req, res) => {
  const { userId } = req.params
  const {
    email,
    account,
    password,
    username,
    gender,
    birthDate,
    address,
    city,
    phone,
  } = req.body

  try {
    // 執行SQL更新操作，更新用戶資訊
    const [result] = await connection.execute(
      `UPDATE user SET 
        email = ?, 
        account = ?, 
        password = ?, 
        username = ?, 
        gender = ?, 
        birth = ?, 
        city= ?, 
        address = ?, 
        phone = ? 
      WHERE id = ?`,
      [
        email,
        account,
        password,
        username,
        gender,
        birthDate,
        city,
        address,
        phone,
        userId,
      ]
    )

    // 檢查是否成功更新
    if (result.affectedRows > 0) {
      res.status(200).json({ status: 'success', message: '用戶資料已更新' })
    } else {
      res.status(404).json({ status: 'fail', message: '找不到此用戶' })
    }
  } catch (error) {
    console.error('Error updating user information:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// 檢查帳號唯一性
router.post('/check-unique', async (req, res) => {
  const { email, account, userId } = req.body // 添加 userId

  try {
    const [emailResult] = await connection.execute(
      'SELECT id FROM user WHERE email = ? AND id != ?',
      [email, userId]
    )

    const [accountResult] = await connection.execute(
      'SELECT id FROM user WHERE account = ? AND id != ?',
      [account, userId]
    )

    const emailExists = emailResult.length > 0
    const accountExists = accountResult.length > 0

    res.status(200).json({ emailExists, accountExists })
  } catch (error) {
    console.error('Error checking uniqueness:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// 將路由綁定到應用
export default router
