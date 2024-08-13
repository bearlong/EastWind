import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql-promise.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*,
        DATE_FORMAT(CONCAT(p.date, ' ', p.start_at), '%Y-%m-%dT%H:%i:%s') as start_time,
        DATE_FORMAT(CONCAT(p.date, ' ', p.end_at), '%Y-%m-%dT%H:%i:%s') as end_time,
        (
          (p.userID_main IS NOT NULL) +
          (p.userID_join1 IS NOT NULL) +
          (p.userID_join2 IS NOT NULL) +
          (p.userID_join3 IS NOT NULL)
        ) as player_count
      FROM 
        party p
      WHERE 
        p.date >= CURDATE()
        AND (
          (p.userID_main IS NOT NULL) +
          (p.userID_join1 IS NOT NULL) +
          (p.userID_join2 IS NOT NULL) +
          (p.userID_join3 IS NOT NULL)
        ) < 4
      ORDER BY 
        p.date ASC, p.start_at ASC;
    `

    const [parties] = await connection.execute(query)

    if (parties.length === 0) {
      return res.status(404).json({ message: '沒有找到可加入的派對' })
    }

    res.json(parties)
  } catch (err) {
    console.error('Database query error:', err)
    res.status(500).json({ error: '獲取派對資料時出錯' })
  }
})

export default router
