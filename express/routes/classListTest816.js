import express from 'express'
import dbPromise from '##/configs/mysql-promise.js'
import multer from 'multer'
import moment from 'moment'
// import cors from 'cors'
import mysql from 'mysql2/promise.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
import app from '##/app.js'

const router = express.Router()
const upload = multer()
router.use(cors())

// // 設置檔案儲存方式
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   },
// })

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
    const {
      course_category_id,
      course_name,
      price,
      content,
      on_datetime,
      off_datetime,
      valid,
      page = 1,
      limit = 10,
    } = req.query

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

// router.post('/upload', upload.array('files', 10), (req, res) => {
//   try {
//     const files = req.files
//     if (!files) {
//       res.status(400).send('沒有檔案被上傳')
//     } else {
//       res.send('檔案上傳成功')
//     }
//   } catch (err) {
//     res.status(500).send(err.message)
//   }
// })

// router.put('/:id', upload.array('files', 10), async (req, res) => {
//   // 將 'single' 改為 'array' 並設定最大上傳數量
//   try {
//     const courseId = parseInt(req.params.id)
//     const courseIndex = courseData.findIndex((c) => c.id === courseId)

//     if (courseIndex === -1) {
//       return res.status(404).json({ message: '找不到課程' })
//     }

//     courseData[courseIndex] = {
//       ...courseData[courseIndex],
//       ...req.body,
//       updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
//     }

//     res.json(courseData[courseIndex])
//   } catch (error) {
//     res.status(500).json({ message: '伺服器錯誤' })
//   }
// })

// router.delete('/:id', async (req, res) => {
//   try {
//     const courseId = parseInt(req.params.id)
//     const courseIndex = courseData.findIndex((c) => c.id === courseId)

//     if (courseIndex === -1) {
//       return res.status(404).json({ message: '找不到課程' })
//     }

//     courseData.splice(courseIndex, 1)
//     res.status(204).send()
//   } catch (error) {
//     res.status(500).json({ message: '伺服器錯誤' })
//   }
// })

export default router
