import express from 'express'
import dbPromise from '##/configs/mysql-promise.js' // 引入資料庫連接池
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config.js'

const router = express.Router()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

router.post('/', async function (req, res, next) {
  console.log(JSON.stringify(req.body))

  // 檢查從 react 來的資料
  if (!req.body.providerId || !req.body.uid) {
    return res.json({ status: 'error', message: '缺少 google 登入資料' })
  }

  const { displayName, email, uid, photoURL } = req.body
  const google_uid = uid

  try {
    // 1. 先查詢資料庫是否有同 google_uid 的資料
    const [rows] = await dbPromise.execute(
      'SELECT COUNT(*) as total FROM user WHERE google_uid = ?',
      [google_uid]
    )
    const total = rows[0].total

    let returnUser = {
      id: 0,
      username: '',
      google_uid: '',
      line_uid: '',
    }

    if (total > 0) {
      // 2-1. 有存在 -> 從資料庫查詢會員資料
      const [userRows] = await dbPromise.execute(
        'SELECT id, username, google_uid, line_uid FROM user WHERE google_uid = ? LIMIT 1',
        [google_uid]
      )
      const dbUser = userRows[0]

      returnUser = {
        id: dbUser.id,
        username: dbUser.username,
        google_uid: dbUser.google_uid,
        line_uid: dbUser.line_uid,
      }
    } else {
      // 2-2. 不存在 -> 建立一個新會員資料 (無帳號與密碼)，只有 google 來的資料 -> 執行登入工作
      const [result] = await dbPromise.execute(
        'INSERT INTO user (username, email, google_uid, photo_url) VALUES (?, ?, ?, ?)',
        [displayName, email, google_uid, photoURL]
      )

      returnUser = {
        id: result.insertId,
        username: displayName,
        google_uid: google_uid,
        line_uid: '',
      }
    }

    // 產生存取令牌 (access token)，其中包含會員資料
    const accessToken = jsonwebtoken.sign(returnUser, accessTokenSecret, {
      expiresIn: '3d',
    })

    // 使用 httpOnly cookie 來讓瀏覽器端儲存 access token
    res.cookie('accessToken', accessToken, { httpOnly: true })

    // 傳送 access token 回應 (react 可以儲存在 state 中使用)
    return res.json({
      status: 'success',
      data: {
        accessToken,
      },
    })
  } catch (error) {
    console.error('Database query error:', error)
    return res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

export default router
