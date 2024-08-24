import express from 'express'
import multer from 'multer'
import cors from 'cors'
import connection from '##/configs/mysql-promise.js'
import 'dotenv/config.js'

const router = express.Router()
const upload = multer()

// 設定CORS白名單和選項
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

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

// 撈取商品資料的API
router.get('/products', async (req, res) => {
  try {
    // 隨機選取 category_id 為 1 的 20 筆商品
    const queryCategory1 = `
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
        product.category_id = 1
      ORDER BY RAND() 
      LIMIT 20
    `

    // 隨機選取 category_id 為 5 的 20 筆商品
    const queryCategory5 = `
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
        product.category_id = 5
      ORDER BY RAND() 
      LIMIT 20
    `

    // 執行兩個查詢
    const [rowsCategory1] = await connection.execute(queryCategory1)
    const [rowsCategory5] = await connection.execute(queryCategory5)

    // 合併結果
    const products = [...rowsCategory1, ...rowsCategory5]

    res.json({
      status: 'success',
      products: products,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

export default router
