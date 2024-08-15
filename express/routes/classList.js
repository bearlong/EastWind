import express from 'express'
const router = express.Router()
import dbPromise from '##/configs/mysql-promise.js'
import multer from 'multer'
import moment from 'moment'

const upload = multer()

// 模擬數據
let classData = [
    {
        id: 1,
        course_name: '西洋棋基礎課程',
        course_category_id: 1,
        content: '學習西洋棋的基本規則和策略',
        price: 4500,
        images: '1chess.jpg',
        file: 'chess_basic_materials.pdf',
        created_at: '2024-08-01 10:00:00',
        updated_at: '2024-08-01 10:00:00',
        on_datetime: '2024-09-01',
        off_datetime: '2024-12-31',
        valid: 1
    },
    {
        id: 2,
        course_name: '麻將入門',
        course_category_id: 2,
        content: '學習麻將的基本玩法和技巧',
        price: 3800,
        images: '1mahjong.jpg',
        file: 'mahjong_intro_guide.pdf',
        created_at: '2024-08-02 14:30:00',
        updated_at: '2024-08-02 14:30:00',
        on_datetime: '2024-09-15',
        off_datetime: '2025-01-15',
        valid: 1
    },
    {
        id: 3,
        course_name: '圍棋進階技巧',
        course_category_id: 3,
        content: '深入學習圍棋的進階戰略和戰術',
        price: 5200,
        images: '1go.jpg',
        file: 'go1.mp4',
        created_at: '2024-08-03 09:15:00',
        updated_at: '2024-08-03 09:15:00',
        on_datetime: '2024-10-01',
        off_datetime: '2025-02-28',
        valid: 1
    }
];

// 設置 API 端點
router.get('/api/classes', (req, res) => {
    res.json(classData);
});

app.listen(3005, ()=>{
    console.log("服務以啟動於 http://localhost:3005");
  });