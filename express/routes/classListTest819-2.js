import express from 'express'
import dbPromise from '##/configs/mysql-promise.js'
import multer from 'multer'
import moment from 'moment'
import cors from 'cors'
import mysql from 'mysql2/promise.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
import app from '##/app.js'

const router = express.Router()
const upload = multer()

// 創建 MySQL 連接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

router.use(cors())

router.get('/', async (req, res) => {
  try {
    const { category, price, page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit

    let query = 'SELECT * FROM courses WHERE valid = 1'
    const queryParams = []

    if (category) {
      query += ' AND category = ?'
      queryParams.push(category)
    }

    if (price) {
      query += ' AND price <= ?'
      queryParams.push(parseInt(price))
    }

    query += ' LIMIT ? OFFSET ?'
    queryParams.push(parseInt(limit), offset)

    const [rows] = await pool.execute(query, queryParams)

    // 獲取總記錄數
    const [countRows] = await pool.execute(
      'SELECT COUNT(*) as total FROM courses WHERE valid = 1'
    )
    const totalCount = countRows[0].total

    const results = {
      courses: rows,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    }

    res.json(results)
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 新增課程
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      category,
      instructor,
      content,
      price,
      on_datetime,
      off_datetime,
    } = req.body
    const image = req.file ? req.file.filename : null

    const query = `
      INSERT INTO courses 
      (title, category, instructor, content, price, image, on_datetime, off_datetime, created_at, updated_at, valid) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 1)
    `
    const [result] = await pool.execute(query, [
      title,
      category,
      instructor,
      content,
      price,
      image,
      on_datetime,
      off_datetime,
    ])

    res.status(201).json({ message: '課程新增成功', id: result.insertId })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 更新課程
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      category,
      instructor,
      content,
      price,
      on_datetime,
      off_datetime,
    } = req.body
    const image = req.file ? req.file.filename : null

    let query = `
      UPDATE courses 
      SET title = ?, category = ?, instructor = ?, content = ?, price = ?, 
          on_datetime = ?, off_datetime = ?, updated_at = NOW()
    `
    const queryParams = [
      title,
      category,
      instructor,
      content,
      price,
      on_datetime,
      off_datetime,
    ]

    if (image) {
      query += ', image = ?'
      queryParams.push(image)
    }

    query += ' WHERE id = ?'
    queryParams.push(id)

    await pool.execute(query, queryParams)

    res.json({ message: '課程更新成功' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 刪除課程（軟刪除）
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.execute(
      'UPDATE courses SET valid = 0, updated_at = NOW() WHERE id = ?',
      [id]
    )
    res.json({ message: '課程刪除成功' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

export default router
