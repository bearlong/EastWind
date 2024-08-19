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

// 設置檔案儲存方式
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const router = express.Router()
const upload = multer()

// 模擬數據
// let courseData = [
//   {
//     id: 1,
//     course_name: '西洋棋基礎課程',
//     course_category_id: 1,
//     content: '學習西洋棋的基本規則和策略',
//     price: 4500,
//     images: '1chess.jpg',
//     file: '1chess.mp4',
//     created_at: '2024-08-01 10:00:00',
//     updated_at: '2024-08-01 10:00:00',
//     on_datetime: '2024-09-01',
//     off_datetime: '2024-12-31',
//     valid: 1,
//   },
//   {
//     id: 2,
//     course_name: '麻將入門',
//     course_category_id: 2,
//     content: '學習麻將的基本玩法和技巧',
//     price: 3800,
//     images: '1mahjong.jpg',
//     file: '1mj.mp4',
//     created_at: '2024-08-02 14:30:00',
//     updated_at: '2024-08-02 14:30:00',
//     on_datetime: '2024-09-15',
//     off_datetime: '2025-01-15',
//     valid: 1,
//   },
//   {
//     id: 3,
//     course_name: '圍棋進階技巧',
//     course_category_id: 3,
//     content: '深入學習圍棋的進階戰略和戰術',
//     price: 5200,
//     images: '1go.mp4',
//     file: 'go1.mp4',
//     created_at: '2024-08-03 09:15:00',
//     updated_at: '2024-08-03 09:15:00',
//     on_datetime: '2024-10-01',
//     off_datetime: '2025-02-28',
//     valid: 1,
//   },
// ]

// 創建 MySQL 連接池
const courseData = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '12345',
  database: 'mahjong',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

router.use(cors())

// 設置 API 端點
router.get('/', async (req, res) => {
  try {
    const { course_category_id, price, page = 1, limit = 10 } = req.query

    // 這裡應該是從數據庫獲取數據的邏輯
    // 目前使用模擬數據
    let filteredCourses = courseData

    if (course_category_id) {
      filteredCourses = filteredCourses.filter(
        (course) => course.course_category_id === parseInt(course_category_id)
      )
    }

    if (price) {
      filteredCourses = filteredCourses.filter(
        (course) => course.price <= parseInt(price)
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {
      courses: filteredCourses.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredCourses.length / limit),
      currentPage: page,
    }

    res.json(results)
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const courseId = parseInt(req.params.id)
    const course = courseData.find((c) => c.id === courseId)

    if (!course) {
      return res.status(404).json({ message: '找不到課程' })
    }

    res.json(course)
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.post('/upload', upload.array('files', 10), (req, res) => {
  try {
    const files = req.files
    if (!files) {
      res.status(400).send('沒有檔案被上傳')
    } else {
      res.send('檔案上傳成功')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.put('/:id', upload.array('files', 10), async (req, res) => {
  // 將 'single' 改為 'array' 並設定最大上傳數量
  try {
    const courseId = parseInt(req.params.id)
    const courseIndex = courseData.findIndex((c) => c.id === courseId)

    if (courseIndex === -1) {
      return res.status(404).json({ message: '找不到課程' })
    }

    courseData[courseIndex] = {
      ...courseData[courseIndex],
      ...req.body,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    res.json(courseData[courseIndex])
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const courseId = parseInt(req.params.id)
    const courseIndex = courseData.findIndex((c) => c.id === courseId)

    if (courseIndex === -1) {
      return res.status(404).json({ message: '找不到課程' })
    }

    courseData.splice(courseIndex, 1)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

export default router
