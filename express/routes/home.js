import express from 'express'
import multer from 'multer'
import cors from 'cors'
import connection from '##/configs/mysql-promise.js'
import 'dotenv/config.js'

const router = express.Router()
const upload = multer()

// 設定CORS白名單和選項
// 允許特定來源的請求，並配置CORS選項以允許攜帶憑證（如Cookie）
const whitelist = ['http://localhost:5500', 'http://localhost:3000']
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true) // 允許請求
    } else {
      callback(new Error('不允許傳遞資料')) // 否則拒絕請求
    }
  },
}

const app = express() // 創建Express應用實例

app.use(cors(corsOptions)) // 使用CORS中間件，應用CORS設置
app.use(express.json()) // 使用JSON中間件來解析請求體中的JSON資料

// 撈取商品資料的API
router.get('/products', async (req, res) => {
  try {
    const query = `
      SELECT 
        product.id, 
        product.name AS product_name, 
        product.price, 
        product.img,
        product_category.name AS category_name, 
        brand.name AS brand_name
      FROM 
        product 
      INNER JOIN 
        product_category ON product.category_id = product_category.id 
      INNER JOIN 
        brand ON product.brand_id = brand.id
      WHERE 
        product.category_id IN (1, 5)
    `

    const [rows] = await connection.execute(query) // 查詢指定 category_id 的商品資料
    res.json({
      status: 'success',
      products: rows,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

export default router
