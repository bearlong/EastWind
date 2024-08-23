import express from 'express'
import cors from 'cors'
import multer from 'multer'
import 'dotenv/config.js'
import connection from '##/configs/mysql-promise.js'

const upload = multer()
const router = express.Router()

// 設定CORS白名單和選項
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
app.use(express.json())

router.get('/:userId', async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ status: 'error', message: '缺少用戶 ID' })
  }

  try {
    const query = `
      SELECT * FROM booking_record WHERE user_id = ?
    `
    const [bookings] = await connection.execute(query, [userId])
    res.status(200).json({ status: 'success', data: { bookings } })
  } catch (err) {
    console.error('Database query failed:', err.stack || err.message)
    res.status(500).json({ status: 'error', message: err.message })
  }
})

router.get('/:userId/:status', async (req, res) => {
  const { userId, status } = req.params

  if (!userId || !status) {
    return res
      .status(400)
      .json({ status: 'error', message: '缺少用戶 ID 或狀態' })
  }

  try {
    const query = `
       SELECT 
          booking_record.id,
          booking_record.numerical_order as order_number,
          booking_record.table_id,
          booking_record.user_id,
          booking_record.date,
          booking_record.start_time,
          booking_record.end_time,
          booking_record.status,
          booking_record.created_at,
          booking_record.playroom_type,
          booking_record.notes,
          booking_record.total_price,
          mahjong_table.id AS table_id,
          mahjong_table.company_id AS company_id,
          company.name AS company_name,
          company.tele AS company_tele,  -- 公司電話
          company.address AS company_address,
          user.username AS username,
          (SELECT COUNT(*) FROM mahjong_table WHERE company_id = company.id AND id <= mahjong_table.id) AS table_number
      FROM 
          booking_record
      JOIN 
          mahjong_table ON booking_record.table_id = mahjong_table.id
      JOIN 
          company ON mahjong_table.company_id = company.id
      JOIN 
          user ON booking_record.user_id = user.id
      WHERE 
          booking_record.user_id = ? AND booking_record.status = ?
      ORDER BY 
          booking_record.date DESC,
          booking_record.start_time DESC;
    `
    const [bookings] = await connection.execute(query, [userId, status])
    res.status(200).json({ status: 'success', data: { bookings } })
  } catch (err) {
    console.error('Database query failed:', err.stack || err.message)
    res.status(500).json({ status: 'error', message: err.message })
  }
})

router.put('/cancel/:bookingId', async (req, res) => {
  const { bookingId } = req.params

  if (!bookingId) {
    return res.status(400).json({ status: 'error', message: '缺少預訂 ID' })
  }

  try {
    // 更新預訂狀態為已取消
    const query = `
      UPDATE booking_record
      SET status = 'cancelled'
      WHERE id = ?
    `
    const [result] = await connection.execute(query, [bookingId])

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: '找不到該預訂' })
    }

    res.status(200).json({ status: 'success', message: '預訂已取消' })
  } catch (err) {
    console.error('Database query failed:', err.stack || err.message)
    res.status(500).json({ status: 'error', message: err.message })
  }
})

export default router
