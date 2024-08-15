import express from 'express'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import connection from '##/configs/mysql-promise.js'
import 'dotenv/config.js'

const router = express.Router()
const secretKey = 'boyuboyuboyuIamBoyu'
const upload = multer()

// 設定CORS白名單和選項
// 允許特定來源的請求，並配置CORS選項以允許攜帶憑證（如Cookie）
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

const app = express() // 創建Express應用實例

app.use(cors(corsOptions)) // 使用CORS中間件，應用CORS設置
app.use(express.json()) // 使用JSON中間件來解析請求體中的JSON資料

// 資料庫查詢放入一個自執行的異步函數中
let users = []

// 初始化資料庫資料
// 在應用啟動時查詢用戶資料並存入全局變數
;(async () => {
  try {
    const [result] = await connection.query(
      'SELECT * FROM `user` WHERE valid = 1'
    )

    users = result // 確保 users 變數得到資料
  } catch (err) {
    console.error('資料庫查詢失敗:', err)
  }
})()

// 首頁路由
router.get('/', (req, res) => {
  res.send('這是首頁') // 返回首頁信息
})

// 撈取所有會員資料
// 查詢資料庫中所有有效的用戶，並返回給前端
router.get('/users', (req, res) => {
  if (users.length > 0) {
    res.status(200).json(users) // 回傳會員資料給前端
  } else {
    res.status(500).json({ error: '無法撈取會員資料' })
  }
})

// 撈取個別會員資料
// 根據用戶ID查詢特定用戶資料
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id // 獲取路徑參數中的用戶ID

  try {
    const [user] = await connection.query(
      'SELECT * FROM `user` WHERE `id` = ? AND `valid` = 1 LIMIT 1',
      [userId]
    )

    if (user.length === 0) {
      // 如果找不到該用戶
      return res.status(404).json({ status: 'fail', message: '用戶不存在' })
    }

    // 返回找到的用戶資料
    res.status(200).json({
      status: 'success',
      data: {
        id: user[0].id,
        username: user[0].username,
        account: user[0].account,
        password: user[0].password,
        city: user[0].city,
        address: user[0].address,
        phone: user[0].phone,
        email: user[0].email,
        birth: user[0].birth,
        gender: user[0].gender,
        user_img: user[0].user_img,
        created_at: user[0].created_at,
        updated_at: user[0].updated_at,
      },
    })
  } catch (error) {
    console.error('資料庫查詢失敗:', error)
    res.status(500).json({ status: 'fail', message: '伺服器內部錯誤' })
  }
})

// 使用者登入
// 根據帳號和密碼進行登入，生成並返回JWT token
router.post('/login', upload.none(), async (req, res) => {
  const { account, password } = req.body

  // 檢查是否填寫帳號
  if (!account) {
    return res.status(401).json({ status: 'fail', message: '請填寫帳號' })
  }

  // 檢查是否填寫密碼
  if (!password) {
    return res.status(401).json({ status: 'fail', message: '請填寫密碼' })
  }

  try {
    const [user] = await connection.query(
      'SELECT * FROM `user` WHERE `account` = ? AND `valid` = 1 LIMIT 1',
      [account]
    )

    if (user.length === 0) {
      return res
        .status(401)
        .json({ status: 'fail', message: '請確認帳號是否正確' })
    } else if (user[0].password !== password) {
      return res
        .status(401)
        .json({ status: 'fail', message: '請確認密碼是否正確' })
    }

    // 登入成功，發送token
    const accessToken = jwt.sign(
      {
        id: user[0].id,
        account: user[0].account,
      },
      secretKey,
      {
        expiresIn: '10s', // 設置 accessToken 的過期時間
      }
    )

    const refreshToken = jwt.sign(
      { id: user[0].id, account: user[0].account },
      secretKey,
      { expiresIn: '7d' } // 設置 refreshToken 的過期時間
    )

    res.status(200).json({
      status: 'success',
      message: '使用者登入',
      accessToken,
      refreshToken,
      name: user[0].username,
    })
  } catch (error) {
    console.error('資料庫查詢失敗:', error)
    res.status(500).json({ status: 'fail', message: '伺服器內部錯誤' })
  }
})

// 使用者登出
// 當使用者登出時，生成一個立即過期的token並返回
router.get('/logout', checkToken, (req, res) => {
  const { account } = req.decoded // 從解碼的令牌中獲取用戶信息
  if (account) {
    const token = jwt.sign(
      {
        id: undefined,
        account: undefined,
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
// 驗證用戶是否已登入，並根據狀態返回新生成的token
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

// 刷新 token
// 驗證並刷新 accessToken，返回一個新的 accessToken
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res
      .status(403)
      .json({ status: 'fail', message: 'Refresh Token 未提供' })
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey)
    // 檢查 refreshToken 是否有效
    if (!decoded) {
      return res
        .status(403)
        .json({ status: 'fail', message: '無效的 Refresh Token' })
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, account: decoded.account },
      secretKey,
      { expiresIn: '10s' } // 根據需要調整過期時間
    )

    res.status(200).json({
      status: 'success',
      accessToken: newAccessToken,
    })
  } catch (error) {
    console.error('Refresh Token verification failed:', error)
    res.status(403).json({ status: 'fail', message: '無效的 Refresh Token' })
  }
})

// 確認 JWT token是否有效
// 驗證請求頭中的JWT token，若無效則返回錯誤，否則繼續後續請求
function checkToken(req, res, next) {
  let token = req.get('Authorization') // 獲取請求頭部的Authorization字段

  if (token) {
    token = token.slice(7) // 去掉 Bearer 前置字串
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
