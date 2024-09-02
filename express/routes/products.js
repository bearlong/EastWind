import express from 'express'
const router = express.Router()
import dbPromise from '##/configs/mysql-promise.js'

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Product } = sequelize.models

/* 
測試連結:
/products?page=3&perpage=10&brand_ids=1,2,4&cat_ids=4,5,6,10,11,12&color_ids=1,2&size_ids=2,3&tag_ids=1,2,4&name_like=e&price_gte=1500&price_lte=10000&sort=price&order=asc
*/
// GET 獲得所有資料，加入分頁與搜尋字串功能，單一資料表處理
router.get('/', async (req, res) => {
  let page = 1
  let {
    brand_id,
    category_id,
    size,
    style,
    search,
    max,
    min,
    orderBy,
    isFilter,
  } = req.query
  let filter, topFilter, orderCondition

  if (req.query.page) {
    page = req.query.page
  }
  const prepage = 12 * page
  const sqlPage = ` LIMIT  0, ${prepage}`
  const filterArr = {
    brand_id,
    category_id,
    size,
    style,
  }

  for (const key in filterArr) {
    if (filterArr[key]) {
      if (filterArr[key].includes(',')) {
        const values = filterArr[key].split(',').map((value) => value.trim())
        const condition = values
          .map((value) => `\`${key}\` = '${value}'`)
          .join(' OR ')
        const fieldPrefix =
          key === 'size' || key === 'style' ? '`product_specifications`.' : ''
        if (!filter) {
          filter = ` WHERE ${fieldPrefix}${condition}`
        } else {
          filter += ` ${isFilter ? 'OR' : 'AND'} ${fieldPrefix}${condition}`
        }
      } else {
        if (!filter) {
          filter = ` Where ${key === 'size' || key === 'style' ? '`product_specifications`.' : ''}\`${key}\` = '${filterArr[key]}'`
        } else {
          filter += ` ${isFilter ? 'OR' : 'AND'} ${key === 'size' || key === 'style' ? '`product_specifications`.' : ''}\`${key}\` = '${filterArr[key]}'`
        }
      }
    }
  }

  if (search) {
    if (!filter) {
      filter = ` WHERE (\`product\`.\`name\` LIKE '%${search}%' OR \`brand\`.\`name\` LIKE '%${search}%' OR \`product_category\`.\`name\` LIKE '%${search}%')`
    } else {
      filter += ` ${isFilter ? 'OR' : 'AND'} (\`product\`.\`name\` LIKE '%${search}%' OR \`brand\`.\`name\` LIKE '%${search}%' OR \`product_category\`.\`name\` LIKE '%${search}%')`
    }
  }

  if (filterArr['category_id']) {
    if (filterArr['category_id'].includes(',')) {
      const values = filterArr['category_id']
        .split(',')
        .map((value) => value.trim())
      const condition = values
        .map((value) => `\`category_id\` = '${value}'`)
        .join(' OR ')
      topFilter = ` WHERE ${condition}`
    } else {
      topFilter = ` WHERE \`category_id\` = ${filterArr['category_id']}`
    }
  }

  if (max && min) {
    if (!filter) {
      filter = ` WHERE \`product\`.\`price\` BETWEEN ${min} AND ${max}`
    } else {
      filter += ` AND \`product\`.\`price\` BETWEEN ${min} AND ${max}`
    }
  }

  if (orderBy) {
    switch (Number(orderBy)) {
      case 0:
        orderCondition = ''
        break
      case 1:
        orderCondition = ' ORDER BY `product`.`create_at` DESC'
        break
      case 2:
        orderCondition = ' ORDER BY `average_star` DESC'
        break
      case 3:
        orderCondition = ' ORDER BY `product`.`price` DESC'
        break
      case 4:
        orderCondition = ' ORDER BY `product`.`price` ASC'
        break
    }
  }

  const product = {}
  const [top] = await dbPromise
    .execute(
      'SELECT `product`.`id`, `product`.`name`, `product`.`price`, `product`.`img`, `product_category`.`name` AS `category_name`, `brand`.`name` AS `brand_name`,  MAX(`product_images`.`img`) AS `img2`, ROUND(AVG(`comment`.`star`), 1) AS `average_star` FROM `product` JOIN `product_category` ON `product_category`.`id` = `product`.`category_id` AND `product_category`.`valid` = 1 JOIN `brand` ON `brand`.`id` = `product`.`brand_id` AND `brand`.`valid` = 1 LEFT JOIN `product_images` ON `product_images`.`product_id` = `product`.`id` LEFT JOIN `comment` ON `comment`.`object_id` = `product`.`id` AND `comment`.`object_type` = "product"' +
        `${topFilter ? topFilter : ''}` +
        ' GROUP BY `product`.`id`, `product`.`name`, `product`.`price`, `product`.`img`, `product_category`.`name`, `brand`.`name` ORDER BY `average_star` DESC LIMIT 4'
    )
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })
  const [brandAll] = await dbPromise
    .execute('SELECT * FROM`brand`')
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })

  const [categoryAll] = await dbPromise
    .execute('SELECT * FROM `product_category`')
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })

  const [styleAll] = await dbPromise
    .execute('SELECT DISTINCT `style` FROM `product_specifications`')
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })

  const [list] = await dbPromise
    .execute(
      'SELECT `product`.`id`, `product`.`name`, `product`.`price`, `product`.`stock`, `product`.`create_at`, `product`.`img`, `product_category`.`name` AS `category_name`, `brand`.`name` AS `brand_name`, `product_specifications`.*,  MAX(`product_images`.`img`) AS `img2`, ROUND(AVG(`comment`.`star`), 1) AS `average_star` FROM `product` JOIN `product_specifications` ON `product_specifications`.`product_id` = `product`.`id` JOIN `product_category` ON `product_category`.`id` = `product`.`category_id` AND `product_category`.`valid` = 1 JOIN `brand` ON `brand`.`id` = `product`.`brand_id` AND `brand`.`valid` = 1 LEFT JOIN `product_images` ON `product_images`.`product_id` = `product`.`id` LEFT JOIN `comment` ON `comment`.`object_id` = `product`.`id` AND `comment`.`object_type` = "product"' +
        `${filter ? filter : ''}` +
        ' GROUP BY `product`.`id`, `product`.`name`, `product`.`price`, `product`.`img`, `product`.`stock`, `product_category`.`name`, `brand`.`name`' +
        `${orderCondition ? orderCondition : ''}` +
        sqlPage
    )
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })

  const [total] = await dbPromise
    .execute(
      'SELECT `product`.`id`, `product`.`name`, `product`.`price`, `product`.`img`, `product_category`.`name` AS `category_name`, `brand`.`name` AS `brand_name`, `product_specifications`.*,  MIN(`product_images`.`img`) AS `img2`, ROUND(AVG(`comment`.`star`), 1) AS `average_star` FROM `product` JOIN `product_specifications` ON `product_specifications`.`product_id` = `product`.`id` JOIN `product_category` ON `product_category`.`id` = `product`.`category_id` AND `product_category`.`valid` = 1 JOIN `brand` ON `brand`.`id` = `product`.`brand_id` AND `brand`.`valid` = 1 LEFT JOIN `product_images` ON `product_images`.`product_id` = `product`.`id` LEFT JOIN `comment` ON `comment`.`object_id` = `product`.`id` AND `comment`.`object_type` = "product"' +
        `${filter ? filter : ''}` +
        ' GROUP BY `product`.`id`, `product`.`name`, `product`.`price`, `product`.`img`, `product_category`.`name`, `brand`.`name`'
    )
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })
  product['total'] = total.length
  product['top'] = top
  product['list'] = list
  product['style'] = styleAll
  product['brand'] = brandAll
  product['category'] = categoryAll

  console.log(filter)
  res.json(product)

  // 獲取query參數值
  // const {
  //   page = 1, // number,  用於 OFFSET =  (Number(page) - 1) * Number(perpage),
  //   perpage = 10, // number, 用於 LIMIT
  //   name_like = '', // string, 對應 name 欄位, `name LIKE '%name_like%'`
  //   brand_ids = '', // string, 對應 brand_id 欄位,  `brand_id IN (brand_ids)`
  //   cat_ids = '', // string, 對應 cat_id 欄位,  `cat_id IN (cat_ids)`
  //   color_ids = '', // string, 對應 color 欄位,  `CONCAT(",", color, ",") REGEXP ",(1|2),"`
  //   tag_ids = '', // string, 對應 tag 欄位,
  //   size_ids = '', // string, 對應 size 欄位,
  //   sort='price' // string, 排序欄位 用於 ORDER BY
  //   order='asc' // string, 排序順序 用於 ORDER BY 'asc' | 'desc', 預設為'asc'
  //   price_gte = 1500 // number, 對應 price 欄位, `price >= 1500`
  //   price_lte = 100000 // number, 對應 price 欄位, `price <= 10000`
  //   raw=true, //boolean, 代表只回傳products陣列
  // } = req.query
  // !!注意: 以下都要檢查各query參數值的正確性，或給定預設值，要不然可能會產生資料庫查詢錯誤
  // 建立例如: `CONCAT(",", color, ",") REGEXP ",(1|2),"`
  // const genConcatRegexp = (param, column) => {
  //   return sequelize.where(
  //     sequelize.fn('CONCAT', ',', sequelize.col(column), ','),
  //     {
  //       [Op.regexp]: `,(${param.split(',').join('|')}),`,
  //     }
  //   )
  // }
  // 建立各where條件從句用
  // const genClause = (key, value) => {
  //   switch (key) {
  //     case 'name_like':
  //       return {
  //         name: {
  //           [Op.like]: `%${value}%`,
  //         },
  //       }
  //     case 'brand_ids':
  //       return {
  //         brand_id: value.split(',').map((v) => Number(v)),
  //       }
  //     case 'cat_ids':
  //       return {
  //         cat_id: value.split(',').map((v) => Number(v)),
  //       }
  //     case 'color_ids':
  //       return genConcatRegexp(value, 'color')
  //     case 'size_ids':
  //       return genConcatRegexp(value, 'size')
  //     case 'tag_ids':
  //       return genConcatRegexp(value, 'tag')
  //     case 'price_gte':
  //       // 會有'0'字串的情況，注意要跳過此條件
  //       if (!Number(value)) return ''
  //       return {
  //         price: {
  //           [Op.gte]: Number(value),
  //         },
  //       }
  //     case 'price_lte':
  //       // 會有'0'字串的情況，注意要跳過此條件
  //       if (!Number(value)) return ''
  //       return {
  //         price: {
  //           [Op.lte]: Number(value),
  //         },
  //       }
  //     default:
  //       return ''
  //   }
  // }
  // where各條件(以AND相連)
  // const conditions = []
  // for (const [key, value] of Object.entries(req.query)) {
  //   if (value) {
  //     conditions.push(genClause(key, value))
  //   }
  // }
  // console.log(conditions)
  // 分頁用
  // const page = Number(req.query.page) || 1
  // const perpage = Number(req.query.perpage) || 10
  // const offset = (page - 1) * perpage
  // const limit = perpage
  // // 排序用
  // const orderDirection = req.query.order || 'ASC'
  // const order = req.query.sort
  //   ? [[req.query.sort, orderDirection]]
  //   : [['id', 'ASC']]
  // 避免sql查詢錯誤導致後端當掉，使用try/catch語句
  // try {
  //   const { count, rows } = await Product.findAndCountAll({
  //     where: { [Op.and]: conditions },
  //     raw: true, // 只需要資料表中資料,
  //     // logging: (msg) => console.log(msg.bgWhite),
  //     offset,
  //     limit,
  //     order,
  //   })
  //   if (req.query.raw === 'true') {
  //     return res.json(rows)
  //   }
  //   // 計算總頁數
  //   const pageCount = Math.ceil(count / Number(perpage)) || 0
  //   return res.json({
  //     status: 'success',
  //     data: {
  //       total: count,
  //       pageCount,
  //       page,
  //       perpage,
  //       products: rows,
  //     },
  //   })
  // } catch (e) {
  //   console.log(e)
  //   return res.json({
  //     status: 'error',
  //     message: '無法查詢到資料，查詢字串可能有誤',
  //   })
  // }
})

// 獲得單筆資料
router.get('/:id/comment/:star', async (req, res, next) => {
  // 轉為數字
  const id = req.params.id
  const { star } = req.params

  const [comment] = await dbPromise
    .execute(
      "SELECT * from comment WHERE `object_type` = 'product' AND `object_id` = " +
        id +
        ' AND `star` = ' +
        star +
        ' ORDER BY date DESC'
    )
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })
  if (!comment) {
    return res.json({
      status: 'error',
      message: '資料不存在',
    })
  }
  return res.json({
    status: 'success',
    data: {
      star,
      content: comment,
    },
  })
})

router.get('/:id', async (req, res, next) => {
  // 轉為數字
  const id = req.params.id

  const { uid } = req.query
  let cateId = 0
  const [product] = await dbPromise
    .execute(
      'SELECT `product`.* , `product_category`.`name` AS `category_name`, `brand`.`name` AS `brand_name`, ROUND(AVG(`comment`.`star`), 1) AS `average_star` , COUNT(`comment`.`id`) AS `comment_count` ' +
        `${uid ? ',CASE WHEN `favorite`.`object_id` IS NOT NULL THEN TRUE ELSE FALSE END AS `fav`' : ''}` +
        'FROM `product` JOIN `product_category` ON `product_category`.`id` = `product`.`category_id` AND `product_category`.`valid` = 1 JOIN `brand` ON `brand`.`id` = `product`.`brand_id` AND `brand`.`valid` = 1 LEFT JOIN `comment` ON `comment`.`object_id` = `product`.`id` AND `comment`.`object_type` = "product" ' +
        `${uid ? 'LEFT JOIN `favorite` ON `favorite`.`object_id` = `product`.`id` AND `favorite`.`object_type` = "product" AND `favorite`.`user_id` = ' + uid : ''}` +
        ' WHERE `product`.`id` = ' +
        id
    )
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })
  console.log(uid)
  cateId = product[0].category_id

  const [specifications] = await dbPromise
    .execute('SELECT * from product_specifications WHERE `product_id` = ' + id)
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })

  const [img2] = await dbPromise
    .execute('SELECT * from product_images WHERE `product_id` = ' + id)
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })

  const [comment] = await dbPromise
    .execute(
      "SELECT `comment`.*, `user`.`username`, `user`.`user_img` from comment JOIN user ON `comment`.`user_id` = `user`.`id` WHERE `comment`.`object_type` = 'product' AND `comment`.`object_id` = " +
        id +
        '  ORDER BY date DESC'
    )
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })

  const [starCount] = await dbPromise
    .execute(
      'SELECT `star` , COUNT(*) AS `count` FROM `comment` WHERE `object_type` = "product" AND `object_id` = ' +
        id +
        ' GROUP BY `star` ORDER BY  `star` DESC'
    )
    .catch((err) => {
      if (err) {
        console.error(err)
        return []
      }
    })

  const [like] = await dbPromise.execute(
    'SELECT `product`.`id`, `product`.`name`, `product`.`price`, `product`.`img`, `product_category`.`name` AS `category_name`, `brand`.`name` AS `brand_name`,  MAX(`product_images`.`img`) AS `img2`, ROUND(AVG(`comment`.`star`), 1) AS `average_star` FROM `product` JOIN `product_category` ON `product_category`.`id` = `product`.`category_id` AND `product_category`.`valid` = 1 JOIN `brand` ON `brand`.`id` = `product`.`brand_id` AND `brand`.`valid` = 1 LEFT JOIN `product_images` ON `product_images`.`product_id` = `product`.`id` LEFT JOIN `comment` ON `comment`.`object_id` = `product`.`id` AND `comment`.`object_type` = "product" WHERE `category_id` = ' +
      cateId +
      ' GROUP BY `product`.`id`, `product`.`name`, `product`.`price`, `product`.`img`, `product_category`.`name`, `brand`.`name` ORDER BY `average_star` DESC LIMIT 4'
  )

  // 只會回傳單筆資料
  // const product = await Product.findByPk(id, {
  //   raw: true, // 只需要資料表中資料
  // })
  const specificationsNotNull = specifications.map((v) => {
    return Object.fromEntries(
      Object.entries(v).filter(
        ([key, value]) => value !== null && key !== 'id' && key !== 'product_id'
      )
    )
  })
  console.log(starCount)

  return res.json({
    status: 'success',
    data: {
      product,
      specifications: specificationsNotNull,
      img2,
      like,
      comment: { star: 0, content: comment },
      starCount,
    },
  })
})

// 獲得所有資料(測試用，不適合資料太多使用)
// router.get('/', async (req, res, next) => {
//   const products = await Product.findAll({ raw: true })
//   res.json({ status: 'success', data: { products } })
// })

export default router
