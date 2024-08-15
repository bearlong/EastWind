const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;
const router = express.Router()

app.use(bodyParser.json());

// 模擬數據
let classData = [
    { id: 1, name: '西洋棋', price: 450 },
    { id: 2, name: '麻將', price: 500 },
    // 其他課程數據...
];

// 設置 API 端點
app.get('/api/classes', (req, res) => {
    res.json(classData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
