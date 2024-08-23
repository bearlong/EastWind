import express from 'express'
import multer from 'multer'
import cors from 'cors'
import connection from '##/configs/mysql-promise.js'
import transporter from '##/configs/mail.js'
import fs from 'fs/promises' // 改用 fs.promises
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config.js'

// 初始化路由和中間件
const router = express.Router()

// 獲取當前文件的目錄名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    // 檢查用戶是否已經完成了第一次修改
    const [user] = await connection.execute(
      'SELECT first_edit_completed FROM user WHERE id = ?',
      [userId]
    )

    const firstEditCompleted = user[0].first_edit_completed

    // 更新用戶資料
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
          phone = ?, 
          first_edit_completed = ? 
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
        true, // 將 first_edit_completed 設為 true
        userId,
      ]
    )

    // 如果更新成功
    if (result.affectedRows > 0) {
      let isFirstEdit = false // 預設不是第一次修改
      let message = '用戶資料已成功更新。'

      // 如果這是第一次修改，發送優惠券
      if (!firstEditCompleted) {
        isFirstEdit = true // 標記為第一次修改
        try {
          const couponResponse = await fetch(
            `http://localhost:3005/api/coupons/send-welcome-coupon/${userId}`,
            { method: 'POST' }
          )

          const couponData = await couponResponse.json()

          if (couponData.status === 'success') {
            message = '用戶資料填寫成功。'
          } else {
            message = '用戶資料已更新，但優惠券發送失敗。'
          }
        } catch (error) {
          console.error('Error sending coupon:', error)
          message = '用戶資料已更新，但優惠券發送失敗。'
        }
      }

      res.status(200).json({
        status: 'success',
        message,
        isFirstEdit, // 將是否為第一次修改的狀態返回前端
      })
    } else {
      res.status(404).json({
        status: 'fail',
        message: '找不到此用戶',
      })
    }
  } catch (error) {
    console.error('Error updating user information:', error)
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤',
    })
  }
})

// 檢查帳號與email唯一性
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

// 路由區塊：發送驗證郵件
router.post('/send-verification-email', async (req, res) => {
  const { email } = req.body

  try {
    // 生成驗證連結，指向新的 verify-email 路由
    const verifyUrl = `http://localhost:3005/api/user-edit/verify-email`

    // 設置郵件內容
    const mailOptions = {
      from: `"support"<${process.env.SMTP_TO_EMAIL}>`,
      to: email,
      subject: '請驗證您的電子信箱',
      text: `你好，請點擊下方連結以驗證您的電子信箱：\r\n\r\n${verifyUrl}\r\n\r\n如果您沒有修改此帳號資訊，請忽略此郵件。\r\n\r\n敬上\r\n東風開發團隊`,
    }

    // 發送郵件
    await transporter.sendMail(mailOptions)

    res.status(200).json({ status: 'success', message: '驗證郵件已發送' })
  } catch (error) {
    console.error('Error sending verification email:', error)
    res
      .status(500)
      .json({ status: 'error', message: '發送驗證郵件失敗，請稍後再試' })
  }
})

// 在現有的 Express 路由設置中添加 verify-email 路由
router.get('/verify-email', async (req, res) => {
  try {
    const verificationSuccess = true // 根據你的邏輯確定

    if (verificationSuccess) {
      // 驗證成功，重定向到前端頁面並帶上 success 參數
      res.redirect(
        'http://localhost:3000/user/user-center/info-edit?success=true'
      )
    } else {
      res.status(400).json({ status: 'fail', message: '驗證失敗' })
    }
  } catch (error) {
    console.error('Error during email verification:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// 設置文件上傳的存儲配置
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // 修改這裡的路徑，指向 Next.js 專案中的目標資料夾
      const uploadPath = path.join(
        __dirname,
        '../../next/public/images/boyu/users'
      )

      await fs.mkdir(uploadPath, { recursive: true })

      cb(null, uploadPath)
    } catch (err) {
      cb(err)
    }
  },

  filename: async (req, file, cb) => {
    try {
      const filename = `user${req.params.userId}` // 只儲存檔名，不包含副檔名

      // 刪除舊文件（如果存在）
      const oldFilePath = path.join(
        __dirname,
        '../../next/public/images/boyu/users',
        `${filename}.jpg` // 添加副檔名進行檢查和刪除
      )

      try {
        await fs.unlink(oldFilePath)
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw error
        }
      }

      cb(null, `${filename}.jpg`) // 儲存帶有副檔名的實際檔案
    } catch (error) {
      cb(error)
    }
  },
})

// 初始化 multer 中間件
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 文件大小限制2MB
  fileFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    )

    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error('只能上傳 jpeg, jpg, png 格式的圖片文件'))
  },
})

// 會員更換圖片 API
router.post(
  '/update-avatar/:userId',
  upload.single('avatar'),
  async (req, res) => {
    const { userId } = req.params
    const file = req.file

    if (!file) {
      return res.status(400).json({ status: 'fail', message: '沒有上傳文件' })
    }

    const avatarFilename = `user${userId}` // 只儲存檔名

    try {
      const [result] = await connection.execute(
        'UPDATE user SET user_img = ? WHERE id = ?',
        [avatarFilename, userId]
      )

      if (result.affectedRows > 0) {
        res.status(200).json({
          status: 'success',
          message: '頭像已更新',
          filename: avatarFilename,
        })
      } else {
        await fs.unlink(
          path.join(
            __dirname,
            '../../next/public/images/boyu/users',
            `${avatarFilename}.jpg`
          )
        )
        res.status(404).json({ status: 'fail', message: '找不到此用戶' })
      }
    } catch (error) {
      console.error('Error updating avatar:', error.message) // 更詳細的錯誤資訊
      res.status(500).json({ status: 'error', message: '伺服器錯誤' })
    }
  }
)

// 將路由綁定到應用
export default router
