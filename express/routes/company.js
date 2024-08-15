import express from 'express'
import 'dotenv/config.js'
import connection from '##/configs/mysql-promise.js'
const router = express.Router()

router.get('/',async(req,res)=>{
  try{
const query = `SELECT * , ROUND(rating, 1) AS rating
FROM company `
    const [companies] = await connection.execute(query);

    if (companies.length === 0) {
      return res.status(404).json({ message: '沒有找到可用的店家' });
    }

    res.json(companies);
  }catch(err){
    console.error('Database query error:', err);

    res.status(500).json({error:"獲取店面資料出錯"})
  }
})

export default router;
