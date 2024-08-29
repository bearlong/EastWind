import express from 'express'
import dbPromise from '##/configs/mysql-promise.js'
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config.js'

const router = express.Router()
const secretKey = 'boyuboyuboyuIamBoyu'

// 使用者 Google 登入
router.post('/', async (req, res) => {
  console.log('Received body:', JSON.stringify(req.body))

  try {
    const { google_uid, email, displayName, photoURL } = req.body
    console.log(req.body, google_uid)
    // 查詢資料庫中是否存在該 Google UID 的使用者
    const [rows] = await dbPromise.execute(
      'SELECT COUNT(*) as total FROM user WHERE google_uid = ?',
      [google_uid]
    )
    const total = rows[0].total

    let returnUser = {
      id: null,
      username: '',
      google_uid: '',
    }

    let isNewUser = false

    if (total > 0) {
      const [userRows] = await dbPromise.execute(
        'SELECT id, username, google_uid FROM user WHERE google_uid = ? LIMIT 1',
        [google_uid]
      )
      console.log('User from database:', userRows)
      const dbUser = userRows[0]

      returnUser = {
        id: dbUser.id,
        username: dbUser.username,
        google_uid: dbUser.google_uid,
      }
    } else {
      const [result] = await dbPromise.execute(
        'INSERT INTO user (username, email, google_uid, photo_url) VALUES (?, ?, ?, ?)',
        [displayName, email, google_uid, photoURL]
      )
      console.log('Newly inserted user ID:', result.insertId)

      returnUser = {
        id: result.insertId,
        username: displayName,
        google_uid: google_uid,
      }
      isNewUser = true
    }

    // 生成 accessToken 和 refreshToken
    const accessToken = jsonwebtoken.sign(
      { id: returnUser.id, username: returnUser.username },
      secretKey,
      {
        expiresIn: '30m',
      }
    )

    const refreshToken = jsonwebtoken.sign(
      { id: returnUser.id, username: returnUser.username },
      secretKey,
      { expiresIn: '7d' }
    )

    console.log('Generated accessToken:', accessToken)
    console.log('Generated refreshToken:', refreshToken)

    return res.json({
      status: 'success',
      message: 'Google 登入成功',
      id: returnUser.id, // 確保這裡返回的是正確的 id
      accessToken,
      refreshToken,
      name: returnUser.username,
      isNewUser, // 返回是否為新會員的標記
    })
  } catch (error) {
    console.error('Google 登入失敗:', error)
    return res
      .status(500)
      .json({ status: 'fail', message: '伺服器錯誤，請稍後再試' })
  }
})

export default router
