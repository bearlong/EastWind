import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql-promise.js'

const router = express.Router()
//判定區域
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
//抓取派對總數
router.get('/', async (req, res) => {
  try {
    //頁面規則
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9
    const offset = (page - 1) * limit
    //字串搜尋規則
    const search = req.query.search || '' // 從請求中獲取搜尋字串
    const searchTerm = `%${search}%` // 使用 `%` 進行部分匹配
    //區域搜尋規則
    const area = req.query.area || ''
    //抓取規則
    let query = `
    SELECT SQL_CALC_FOUND_ROWS 
    p.*,
    DATE_FORMAT(CONCAT(p.date, ' ', p.start_at), '%Y-%m-%dT%H:%i:%s') as start_time,
    DATE_FORMAT(CONCAT(p.date, ' ', p.end_at), '%Y-%m-%dT%H:%i:%s') as end_time,
    (
      (p.userID_main != 0) +
      (p.userID_join1 != 0) +
      (p.userID_join2 != 0) +
      (p.userID_join3 != 0)
    ) as player_count,
    c.name as company_name,
    c.city,
    c.district
  FROM 
    party p
    JOIN company c ON p.company_id = c.id
  WHERE 
  c.name LIKE ?
  AND
    p.date >= CURDATE()
    AND (
      (p.userID_main != 0) +
      (p.userID_join1 != 0) +
      (p.userID_join2 != 0) +
      (p.userID_join3 != 0)
    ) < 4

    `

    let queryParams = [searchTerm]

    if (area && areaToCity[area]) {
      const cities = areaToCity[area]
      query += ` AND c.city IN (${cities.map(() => '?').join(',')})`
      queryParams = [...queryParams, ...cities]
    }

    query += ` ORDER BY p.date ASC, p.start_at ASC LIMIT ? OFFSET ?`
    queryParams.push(limit, offset)

    const [parties] = await connection.execute(query, queryParams)
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

// 在 parties.js 中

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const query = `
    SELECT 
      p.*,
      DATE_FORMAT(CONCAT(p.date, ' ', p.start_at), '%Y-%m-%dT%H:%i:%s') as start_time,
      DATE_FORMAT(CONCAT(p.date, ' ', p.end_at), '%Y-%m-%dT%H:%i:%s') as end_time,
      (
        (p.userID_main != 0) +
        (p.userID_join1 != 0) +
        (p.userID_join2 != 0) +
        (p.userID_join3 != 0)
      ) as player_count,
      c.name as company_name,
      c.address,
      c.rating,
      c.tele,
      c.open_time,
      c.close_time,
      c.vip,
      c.lobby,
      GROUP_CONCAT(DISTINCT CONCAT(st.name, ':', st.icon)) AS services,
      GROUP_CONCAT(DISTINCT cp.img) AS company_photos,

      u1.username AS main_user_name,
      u2.username AS join1_user_name,
      u3.username AS join2_user_name,
      u4.username AS join3_user_name,

      u1.user_img AS main_user_img,
      u2.user_img  AS join1_user_img,
      u3.user_img  AS join2_user_img,
      u4.user_img AS join3_user_img 
      
      FROM
      party p
    JOIN 
      company c ON p.company_id = c.id
    JOIN 
      company_photo cp ON c.id = cp.room_id
    LEFT JOIN 
      services_for_company sfc ON c.id = sfc.company_id
    LEFT JOIN 
      services_tags st ON sfc.services_id = st.id
      LEFT JOIN 
      user u1 ON p.userID_main = u1.id
    LEFT JOIN 
      user u2 ON p.userID_join1 = u2.id
    LEFT JOIN 
      user u3 ON p.userID_join2 = u3.id
    LEFT JOIN 
      user u4 ON p.userID_join3 = u4.id
    WHERE  
      p.id = ? 
      AND p.date >= CURDATE()
      AND (
        (p.userID_main != 0) +
        (p.userID_join1 != 0) +
        (p.userID_join2 != 0) +
        (p.userID_join3 != 0)
      ) < 4
    GROUP BY 
      p.id
    ORDER BY 
      p.date ASC, p.start_at ASC;
    `
    const [party] = await connection.execute(query, [id])

    if (party.length === 0) {
      return res.status(404).json({ message: '沒有找到可加入的派對' })
    }

    // 将 services 字符串转换为统一的数组格式
    const servicesArray = party[0].services
      ? party[0].services.split(',').map((service) => {
          const [name, icon] = service.split(':')
          return { name, icon: `<${icon} />` }
        })
      : []

    // 构建响应格式
    const response = {
      ...party[0],
      services: servicesArray,
    }

    res.json(response)
  } catch (err) {
    console.error('Database query error:', err)
    res.status(500).json({ error: '獲取派對資料時出錯' })
  }
})
export default router
