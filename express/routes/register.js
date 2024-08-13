import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import transporter from '##/configs/mail.js'
import connection from '##/configs/mysql-promise.js'
import 'dotenv/config.js'

const router = express.Router()

// 設定CORS白名單和選項
const whitelist = ['http://localhost:5500', 'http://localhost:3000'] // 設置允許的CORS來源
const corsOptions = {
  credentials: true, // 允許攜帶憑證（例如Cookie）
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true) // 允許請求
    } else {
      callback(new Error('不允許傳遞資料')) // 否則拒絕請求
    }
  },
}

const app = express()
app.use(cors(corsOptions)) // 使用CORS中間件，應用CORS設置
app.use(express.json())

// 註冊 API
router.post('/register', async (req, res) => {
  const { email, account, password } = req.body

  if (!email || !account || !password) {
    return res.status(400).json({ status: 'fail', message: '請填入完整的資料' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 'fail',
      message: '請提供有效的電子信箱',
    })
  }

  const accountRegex = /^(?=.*[a-zA-Z]).{6,}$/
  if (!accountRegex.test(account)) {
    return res.status(400).json({
      status: 'fail',
      message: '帳號必須至少包含6個字符且包含至少一個英文字符',
    })
  }

  const passwordRegex = /^(?=.*[a-zA-Z]).{6,}$/
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      status: 'fail',
      message: '密碼必須至少包含6個字符且包含至少一個英文字符',
    })
  }

  try {
    const [existingUserByEmail] = await connection.execute(
      'SELECT * FROM user WHERE email = ?',
      [email]
    )

    if (existingUserByEmail.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: '電子信箱已被註冊',
      })
    }

    const [result] = await connection.execute(
      'INSERT INTO user (email, account, password) VALUES (?, ?, ?)',
      [email, account, password]
    )

    console.log('User registered:', result)
    return res.status(200).json({
      status: 'success',
      message: '註冊成功',
    })
  } catch (err) {
    console.error('Error during registration:', err)
    return res.status(500).json({
      status: 'fail',
      message: '伺服器錯誤，請稍後再試',
    })
  }
})

// 驗證電子信箱 API
router.get('/verify-email', async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.redirect(
      `http://localhost:3000/user/register?status=error&error=${encodeURIComponent('無效的驗證連結')}`
    )
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const email = decoded.email

    // 驗證成功後，重定向到註冊頁面並附帶成功訊息和 email
    return res.redirect(
      `http://localhost:3000/user/register?status=success&email=${encodeURIComponent(email)}`
    )
  } catch (err) {
    console.error('Error during email verification:', err)
    return res.redirect(
      `http://localhost:3000/user/register?status=error&error=${encodeURIComponent('驗證連結已失效或無效')}`
    )
  }
})

// 發送驗證信 API
router.post('/send-verification', async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res
      .status(400)
      .json({ status: 'fail', message: '請提供有效的電子信箱' })
  }

  try {
    const [existingUser] = await connection.execute(
      'SELECT * FROM user WHERE email = ?',
      [email]
    )

    if (existingUser.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: '電子信箱已被註冊',
      })
    }

    const verifyToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    })

    const verifyUrl = `http://localhost:3005/api/register/verify-email?token=${verifyToken}`

    const mailOptions = {
      from: `"support"<${process.env.SMTP_TO_EMAIL}>`,
      to: email,
      subject: '請驗證您的電子信箱',
      text: `你好，請點擊下方連結以驗證您的電子信箱：\r\n\r\n${verifyUrl}\r\n\r\n如果您沒有註冊過此帳號，請忽略此郵件。\r\n\r\n敬上\r\n東風開發團隊`,
    }

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Error sending verification email:', err)
        return res.status(500).json({
          status: 'error',
          message: '無法發送驗證郵件',
        })
      } else {
        return res.status(200).json({
          status: 'success',
          message: '驗證信件已發送，請檢查您的電子信箱',
        })
      }
    })
  } catch (error) {
    console.error('Error in /send-verification route:', error)
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤，請稍後再試',
    })
  }
})

export default router
