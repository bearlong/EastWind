import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql-promise.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9
    const offset = (page - 1) * limit
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
    ) as player_count,
    c.name as company_name
  FROM 
    party p
    JOIN mahjong_table mt ON p.table_id = mt.id
    JOIN company c ON mt.company_id = c.id
  WHERE 
    p.date >= CURDATE()
    AND (
      (p.userID_main IS NOT NULL) +
      (p.userID_join1 IS NOT NULL) +
      (p.userID_join2 IS NOT NULL) +
      (p.userID_join3 IS NOT NULL)
    ) < 4
    AND mt.is_deleted = 0
  ORDER BY 
    p.date ASC, p.start_at ASC;
    `
    const [parties] = await connection.execute(query, [limit, offset])
    // const [parties] = await connection.execute(query)

    // 獲取總數
    const [countResult] = await connection.execute(
      'SELECT FOUND_ROWS() as total'
    )

    const total = countResult[0].total
    const totalPages = Math.ceil(total / limit)
    if (parties.length === 0) {
      return res.status(404).json({ message: '沒有找到可加入的派對' })
    }

    res.json({
      data: parties,
      currentPage: page,
      totalPages: totalPages,
      totalItems: total,
    })
  } catch (err) {
    console.error('Database query error:', err)
    res.status(500).json({ error: '獲取派對資料時出錯' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
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
    ) as player_count,
    c.name as company_name,
    c.address,
    c.rating,
    c.tele,
c.open_time,
c.close_time
  FROM 
    party p
    JOIN mahjong_table mt ON p.table_id = mt.id
    JOIN company c ON mt.company_id = c.id
  WHERE 
    p.date >= CURDATE()
    AND (
      (p.userID_main IS NOT NULL) +
      (p.userID_join1 IS NOT NULL) +
      (p.userID_join2 IS NOT NULL) +
      (p.userID_join3 IS NOT NULL)
    ) < 4
    AND mt.is_deleted = 0
  ORDER BY 
    p.date ASC, p.start_at ASC;
    `
    const [party] = await connection.execute(query, [id])

    if (party.length === 0) {
      return res.status(404).json({ message: '沒有找到可加入的派對' })
    }

    res.json(party[0])
  } catch (err) {
    console.error('Database query error:', err)
    res.status(500).json({ error: '獲取派對資料時出錯' })
  }
})

export default router
