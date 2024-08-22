import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql-promise.js'

const router = express.Router()
const areaToCity = {
  北區: ['台北市', '新北市', '桃園市', '基隆市'],
  中區: [
    '台中市',
    '新竹縣',
    '苗栗縣',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義縣',
    '新竹市',
  ],
  南區: ['臺南市', '高雄市', '屏東縣', '嘉義市'],
}
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9
    const offset = (page - 1) * limit
    const search = req.query.search || '' // 從請求中獲取搜尋字串
    const searchTerm = `%${search}%` // 使用 `%` 進行部分匹配

    const area = req.query.area || ''

    let query = ` SELECT SQL_CALC_FOUND_ROWS *, ROUND(rating, 1) AS rating 
    FROM company 
    WHERE valid = '1'  
    AND name LIKE ?`

    const queryParams = [searchTerm]

    if (area && areaToCity[area]) {
      const cities = areaToCity[area];
      query += ` AND city IN (${cities.map(() => '?').join(',')})`;
      queryParams.push(...cities);
    }

    query += ` LIMIT ? OFFSET ?`
    queryParams.push(limit, offset)

    const [companies] = await connection.execute(query, queryParams)

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
  SELECT 
    c.*, 
    ROUND(c.rating, 1) AS rating,
    GROUP_CONCAT(DISTINCT cp.img) AS company_photos,
    GROUP_CONCAT(DISTINCT CONCAT(st.name, ':', st.icon)) AS services
  FROM 
    company c
  LEFT JOIN 
    company_photo cp ON c.id = cp.room_id
  LEFT JOIN
    services_for_company sfc ON c.id = sfc.company_id
  LEFT JOIN
    services_tags st ON sfc.services_id = st.id
  WHERE 
    c.id = ? AND c.valid = '1'
  GROUP BY 
    c.id
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
