import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql-promise.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // 獲取當前日期 YYYY-MM-DD

    const query = `
      SELECT *, 
             CONCAT(date, 'T', start_at) as start_time,
             CONCAT(date, 'T', end_at) as end_time,
             (CASE WHEN userID_main IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN userID_join1 IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN userID_join2 IS NOT NULL THEN 1 ELSE 0 END +
              CASE WHEN userID_join3 IS NOT NULL THEN 1 ELSE 0 END) as player_count
      FROM party 
      WHERE date >= ? 
      AND ((CASE WHEN userID_main IS NOT NULL THEN 1 ELSE 0 END +
            CASE WHEN userID_join1 IS NOT NULL THEN 1 ELSE 0 END +
            CASE WHEN userID_join2 IS NOT NULL THEN 1 ELSE 0 END +
            CASE WHEN userID_join3 IS NOT NULL THEN 1 ELSE 0 END) < 4 OR status = 'pending')
      ORDER BY date ASC, start_at ASC
    `;
    
    const [parties] = await connection.execute(query, [today]);
    
    if (parties.length === 0) {
      return res.status(404).json({ message: '沒有找到等待中的派對' })
    }

    // 處理數據
    const formattedParties = parties.map(party => ({
      ...party,
      status: party.player_count === 4 ? 'confirmed' : 'pending'
    }));

    res.json(formattedParties)
  } catch (err) {
    console.error('Database query error:', err)
    res.status(500).json({ error: '獲取派對資料時出錯' })
  }
})

export default router