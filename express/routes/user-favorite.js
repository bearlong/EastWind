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
      SELECT course.*, favorite.id AS favorite_id, 'course' AS type
      FROM favorite
      JOIN course ON favorite.object_id = course.id
      WHERE favorite.user_id = ?
      UNION ALL
      SELECT product.*, favorite.id AS favorite_id, 'product' AS type
      FROM favorite
      JOIN product ON favorite.object_id = product.id
      WHERE favorite.user_id = ?
      UNION ALL
      SELECT company.*, favorite.id AS favorite_id, 'company' AS type
      FROM favorite
      JOIN company ON favorite.object_id = company.id
      WHERE favorite.user_id = ?
    `

    const [favorites] = await connection.execute(query, [
      userId,
      userId,
      userId,
    ])

    res.status(200).json({ status: 'success', data: { favorites } })
  } catch (err) {
    console.error('Database query failed:', err.stack || err.message)
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// 特定會員的最愛
router.get('/:userId/:type', async (req, res) => {
  const { userId, type } = req.params

  if (!userId || !type) {
    return res
      .status(400)
      .json({ status: 'error', message: '缺少用戶 ID 或類型' })
  }

  try {
    let query = ''
    let params = [userId] // 用戶ID

    switch (type) {
      case 'course':
        query = `
          SELECT 
              course.id , 
              course.images, 
              course.course_name AS course_name, 
              course.price, 
              course_category.ch_name AS category_name, 
              favorite.id AS favorite_id
            FROM favorite
            JOIN course ON favorite.object_id = course.id
            JOIN course_category ON course.course_category_id = course_category.id
            WHERE favorite.user_id = ? AND favorite.object_type = 'course'
      `

        break

      case 'product':
        query = `
      SELECT 
          product.id , 
          brand.name AS brand_name,   
          product.img AS image, 
          product.name AS name, 
          product.price, 
          favorite.id AS favorite_id
      FROM 
          favorite
      JOIN 
          product ON favorite.object_id = product.id
      JOIN 
          brand ON  product.brand_id = brand.id
      WHERE 
          favorite.user_id = ?
          AND favorite.object_type = 'product';
        `

        break

      case 'company':
        query = `
      SELECT 
          company.id , 
          company.name AS name,
          company.rating,
          company.user_ratings_total AS user_rating_total,
          company.address,
          company.tele AS phone,
          company.close_time,
          MIN(company_photo.img) AS image, -- 只選擇第一張圖片
          favorite.id AS favorite_id
      FROM 
          favorite
      JOIN 
          company ON favorite.object_id = company.id
      LEFT JOIN 
          company_photo ON company_photo.room_id = company.id
      WHERE 
          favorite.user_id = ?
          AND favorite.object_type = 'company'
      GROUP BY 
          company.id; -- 按照公司 ID 分組，只返回每組的第一張圖片


        `
        break

      default:
        return res
          .status(400)
          .json({ status: 'error', data: { message: '無效的類型' } })
    }

    const [favorites] = await connection.execute(query, params)
    res
      .status(200)
      .json({ status: 'success', data: { message: '已取得最愛', favorites } })
  } catch (err) {
    console.error('Error:', err.message) // 更詳細的錯誤輸出
    res.status(500).json({ status: 'error', message: err.message })
  }
})

// 刪除最愛
router.delete('/:userId/:favoriteId', upload.none(), async (req, res) => {
  const { userId, favoriteId } = req.params

  try {
    const [existingItem] = await connection.execute(
      'SELECT * FROM favorite WHERE id = ? AND user_id = ?',
      [favoriteId, userId]
    )

    if (existingItem.length <= 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '收藏內無該項目，刪除失敗' })
    }

    const [result] = await connection.execute(
      'DELETE FROM favorite WHERE id = ? AND user_id = ?',
      [favoriteId, userId]
    )

    if (result.affectedRows > 0) {
      res.status(200).json({ status: 'success', message: '刪除成功' })
    } else {
      res.status(400).json({ status: 'error', message: '刪除失敗' })
    }
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message })
  }
})

export default router
