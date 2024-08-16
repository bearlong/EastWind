import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql-promise.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9
    const offset = (page - 1) * limit

    // 優化後的查詢，包含過濾條件
    let query = ` SELECT SQL_CALC_FOUND_ROWS *, ROUND(rating, 1) AS rating 
      FROM company 
      WHERE valid = '1'  
      LIMIT ? OFFSET ?`

    // 執行查詢
    const [companies] = await connection.execute(query, [limit, offset])

    // 獲取總數
    const [countResult] = await connection.execute(
      'SELECT FOUND_ROWS() as total'
    )

    const total = countResult[0].total
    const totalPages = Math.ceil(total / limit)

    if (companies.length === 0) {
      return res.status(404).json({ message: '沒有找到可用的店家' })
    }

    res.json({
      data: companies,
      currentPage: page,
      totalPages: totalPages,
      totalItems: total,
    })
  } catch (err) {
    console.error('Database query error:', err)
    res.status(500).json({ error: '獲取店面資料出錯' })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const query = `
      SELECT *, ROUND(rating, 1) AS rating 
      FROM company 
      WHERE id = ? AND valid = '1'
    `
    const [company] = await connection.execute(query, [id])

    if (company.length === 0) {
      return res.status(404).json({ message: '找不到該公司' })
    }

    res.json(company[0])
  } catch (err) {
    console.error('Database query error:', err)
    res.status(500).json({ error: '獲取公司資料出錯' })
  }
})
export default router
