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
app.use(express.json()) // 使用JSON中間件來解析請求體中的JSON資料

// 註冊 API
router.post('/register', async (req, res) => {
  const { email, account, password } = req.body

  let errors = {}

  if (!email) {
    errors.email = '請填入電子信箱'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.email = '請提供有效的電子信箱'
    }
  }

  if (!account) {
    errors.account = '請填入帳號'
  } else {
    const accountRegex = /^(?=.*[a-zA-Z]).{6,}$/
    if (!accountRegex.test(account)) {
      errors.account = '帳號應至少6碼，需包含英文字'
    }
  }

  if (!password) {
    errors.password = '請填入密碼'
  } else {
    const passwordRegex = /^(?=.*[a-zA-Z]).{6,}$/
    if (!passwordRegex.test(password)) {
      errors.password = '帳號應至少6碼，需包含英文字'
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ status: 'fail', errors })
  }

  try {
    const [existingUserByEmail] = await connection.execute(
      'SELECT * FROM user WHERE email = ?',
      [email]
    )

    if (existingUserByEmail.length > 0) {
      return res.status(400).json({
        status: 'fail',
        errors: { email: '電子信箱已被註冊' },
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
    return res.redirect('http://localhost:3000/user/register') // 無效 token 的情況
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const email = decoded.email

    // 將驗證成功的 email 和狀態作為 query 參數重定向到前端
    return res.redirect(
      `http://localhost:3000/user/register?email=${encodeURIComponent(email)}&status=success`
    )
  } catch (err) {
    console.error('Error during email verification:', err)
    return res.redirect('http://localhost:3000/user/register?error=驗證失敗') // 驗證失敗也重定向到註冊頁面
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
