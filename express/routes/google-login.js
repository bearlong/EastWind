import express from 'express'
import dbPromise from '##/configs/mysql-promise.js'
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config.js'

const router = express.Router()
const secretKey = 'boyuboyuboyuIamBoyu' // 使用環境變數或預設值

// 使用者 Google 登入
router.post('/', async (req, res) => {
  console.log('Received body:', JSON.stringify(req.body))

  try {
    // 假設 req.body 已經包含所有需要的使用者資訊
    const { google_uid, email, displayName, photoURL } = req.body

    // 查詢資料庫中是否存在該Google UID的使用者
    const [rows] = await dbPromise.execute(
      'SELECT COUNT(*) as total FROM user WHERE google_uid = ?',
      [google_uid]
    )
    const total = rows[0].total

    let returnUser = {
      id: 0,
      google_name: '',
      google_uid: '',
      line_uid: '',
    }

    if (total > 0) {
      // 使用者已存在
      const [userRows] = await dbPromise.execute(
        'SELECT id, google_name, google_uid FROM user WHERE google_uid = ? LIMIT 1',
        [google_uid]
      )
      const dbUser = userRows[0]

      returnUser = {
        id: dbUser.id,
        google_name: dbUser.google_name,
        google_uid: dbUser.google_uid,
        line_uid: dbUser.line_uid,
      }
    } else {
      // 新建使用者
      const [result] = await dbPromise.execute(
        'INSERT INTO user (google_name, email, google_uid, photo_url) VALUES (?, ?, ?, ?)',
        [displayName, email, google_uid, photoURL]
      )

      returnUser = {
        id: result.insertId,
        google_name: displayName,
        google_uid: google_uid,
        line_uid: '',
      }
    }

    // 生成accessToken和refreshToken
    const accessToken = jsonwebtoken.sign(returnUser, secretKey, {
      expiresIn: '30m',
    })

    const refreshToken = jsonwebtoken.sign(
      { id: returnUser.id, google_name: returnUser.google_name },
      secretKey,
      { expiresIn: '7d' }
    )

    console.log('Generated accessToken:', accessToken)
    console.log('Generated refreshToken:', refreshToken)

    return res.json({
      status: 'success',
      message: 'Google 登入成功',
      accessToken,
      refreshToken,
      name: returnUser.google_name,
    })
  } catch (error) {
    console.error('Google 登入失敗:', error)
    return res
      .status(500)
      .json({ status: 'fail', message: '伺服器錯誤，請稍後再試' })
  }
})

export default router
