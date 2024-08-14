import express from 'express'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import connection from '##/configs/mysql-promise.js'

const router = express.Router()
const secretKey = 'boyuboyuboyuIamBoyu'
const upload = multer()

// 設定CORS白名單和選項
const whitelist = ['http://localhost:5500', 'http://localhost:3000'] // 設置允許的CORS來源
const corsOptions = {
  credentials: true, // 允許攜帶憑證（例如Cookie）
  origin(origin, callback) {
    // 設置origin的檢查函數
    if (!origin || whitelist.includes(origin)) {
      // 如果請求來源在白名單中或無來源
      callback(null, true) // 允許請求
    } else {
      callback(new Error('不允許傳遞資料')) // 否則拒絕請求
    }
  },
}

const app = express() // 創建Express應用實例

app.use(cors(corsOptions)) // 使用CORS中間件，應用CORS設置

// 資料庫查詢放入一個自執行的異步函數中
let users = []

;(async () => {
  try {
    const [result] = await connection.query(
      'SELECT * FROM `users` WHERE valid = 1'
    )

    users = result // 確保 users 變數得到資料
  } catch (err) {
    console.error('資料庫查詢失敗:', err)
  }
})()

router.get('/', (req, res) => {
  res.send('這是首頁') // 返回首頁信息
})

// 撈取所有會員資料
router.get('/users', (req, res) => {
  if (users.length > 0) {
    res.status(200).json(users) // 回傳會員資料給前端
  } else {
    res.status(500).json({ error: '無法撈取會員資料' })
  }
})

// 使用者登入
router.post('/login', upload.none(), (req, res) => {
  const { account, password } = req.body

  const user = users.find(
    (u) => u.account === account && u.password === password
  )
  if (user) {
    const token = jwt.sign(
      {
        account: user.account,
        password: user.password,
        city: user.city,
        address: user.address,
        phone: user.phone,
        email: user.email,
        birth: user.birth,
        gender: user.gender,
        created_at: user.created_at,
      },
      secretKey,
      {
        expiresIn: '1h',
      }
    )
    console.log(token)
    res.status(200).json({ status: 'success', message: '使用者登入', token })
  } else {
    res.status(401).json({ status: 'fail', message: '使用者帳號密碼錯誤' })
  }
})

// 使用者登出
router.get('/logout', checkToken, (req, res) => {
  const { account, password } = req.decoded // 從解碼的令牌中獲取用戶信息
  if (account) {
    const token = jwt.sign(
      {
        account: undefined,
        password: undefined,
        city: undefined,
        address: undefined,
        phone: undefined,
        email: undefined,
        birth: undefined,
        gender: undefined,
        created_at: undefined,
      },
      secretKey, // 使用秘鑰加密
      { expiresIn: '-1s' } // 立即使令牌過期
    )
    console.log('Received Token:', token)
    res.status(200).json({ status: 'success', token, message: '使用者已登出' }) // 返回成功信息和過期令牌
  } else {
    res.status(401).json({ status: 'fail', message: '登出失敗, 請稍後再試' })
  }
})

// 檢查使用者登入狀態
router.get('/status', checkToken, (req, res) => {
  const { account, password } = req.decoded // 從解碼的令牌中獲取用戶信息

  if (account) {
    const token = jwt.sign(
      {
        account,
        password,
      },
      secretKey, // 使用秘鑰加密
      {
        expiresIn: '30m', // 設置令牌過期時間為30分鐘
      }
    )
    res.status(200).json({ status: 'success', token, message: '使用者登入中' }) // 返回成功信息和新令牌
  } else {
    res.status(400).json({ status: 'error', message: '驗證錯誤, 請重新登入' }) // 返回錯誤信息
  }
})

router.post('/register', (req, res) => {
  res.status(200).json({ message: '註冊一個使用者' })
})

// 確認 JWT token是否有效
function checkToken(req, res, next) {
  let token = req.get('Authorization') // 獲取請求頭部的Authorization字段

  if (token) {
    token = token.slice(7)
    // 去掉 Bearer 前置字串
    // 使用秘鑰驗證令牌
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        console.error('Token verification failed:', error)
        res
          .status(401)
          .json({ status: 'fail', message: `登入驗證失效: ${error.message}` })
      } else {
        req.decoded = decoded // 將解密後的 payload 加到 req.decoded 中
        console.log('Token successfully decoded:', decoded) // 確認解碼結果
        next() // 調用下一個中間件
      }
    })
  } else {
    // 如果沒有令牌或令牌格式不正確
    console.error('Token not provided or invalid format')
    res.status(401).json({ status: 'fail', message: '無驗證資料, 請重新登入' })
  }
}

export default router
