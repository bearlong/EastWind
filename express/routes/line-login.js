import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import cors from 'cors'
import dbPromise from '##/configs/mysql-promise.js'
import line_login from '#services/line-login.js'
import 'dotenv/config.js'

const router = express.Router()

const whitelist = ['http://localhost:5500', 'http://localhost:3000']
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('不允許傳遞資料'))
    }
  },
}
const app = express()
app.use(cors(corsOptions))

const secretKey = 'boyuboyuboyuIamBoyu'
const channel_id = process.env.LINE_CHANNEL_ID
const channel_secret = process.env.LINE_CHANNEL_SECRET
const callback_url = process.env.LINE_LOGIN_CALLBACK_URL

const LineLogin = new line_login({
  channel_id,
  channel_secret,
  callback_url,
  scope: 'openid profile',
  prompt: 'consent',
  bot_prompt: 'normal',
})

// ------------ 產生登入網址路由 ------------
router.get('/login', LineLogin.authJson())

// ------------ Line 登出路由 ------------
router.get('/logout', async (req, res) => {
  if (!req.query.line_uid) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }

  const [rows] = await dbPromise.execute(
    'SELECT line_access_token FROM user WHERE line_uid = ?',
    [req.query.line_uid]
  )

  if (rows.length === 0) {
    return res.json({ status: 'error', message: '未找到該使用者' })
  }

  const line_access_token = rows[0].line_access_token
  await LineLogin.revoke_access_token(line_access_token)
  return res.json({ status: 'success', data: null })
})

// ------------ Line 登入回調路由 ------------
router.get(
  '/callback',
  LineLogin.callback(
    async (req, res, next, token_response) => {
      try {
        // // 檢查是否已處理回調
        // if (req.session.isCallbackProcessed) {
        //   console.log('回調已處理，跳過重複執行')
        //   return res.json({
        //     status: 'error',
        //     message: 'Callback already processed.',
        //   })
        // }

        // // 標記回調已處理
        // req.session.isCallbackProcessed = true

        const line_uid = token_response.id_token.sub

        let returnUser = {
          id: 0,
          username: '',
          google_uid: '',
          line_uid: '',
        }

        let [rows] = await dbPromise.execute(
          'SELECT id, username, google_uid, line_uid FROM user WHERE line_uid = ?',
          [line_uid]
        )

        if (rows.length > 0) {
          const dbUser = rows[0]
          returnUser = {
            id: dbUser.id,
            username: dbUser.username,
            google_uid: dbUser.google_uid,
            line_uid: dbUser.line_uid,
          }
        } else {
          const [result] = await dbPromise.execute(
            'INSERT INTO user (username, email, line_uid, line_access_token, photo_url) VALUES (?, ?, ?, ?, ?)',
            [
              token_response.id_token.name,
              '',
              line_uid,
              token_response.access_token,
              token_response.id_token.picture,
            ]
          )

          returnUser = {
            id: result.insertId,
            username: token_response.id_token.name,
            google_uid: '',
            line_uid,
          }
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

        // 確保返回的 JSON 結構正確
        return res.json({
          status: 'success',
          data: {
            returnUser,
            accessToken,
            refreshToken,
          },
        })
      } catch (error) {
        console.error('Line login callback error:', error)
        return res.json({ status: 'error', message: error.message })
      }
    },
    (req, res, next, error) => {
      console.error('Line login fail:', error)
      return res.json({ status: 'error', message: error.message })
    }
  )
)

export default router
