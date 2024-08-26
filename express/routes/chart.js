import express from 'express'
const router = express.Router()
import { getIdParam } from '#db-helpers/db-tool.js'
import dbPromise from '##/configs/mysql-promise.js'
import moment from 'moment'

// 檢查空物件, 轉換req.params為數字
import multer from 'multer'
const upload = multer()

//此oid為流水編號
router.get('/:oid', async (req, res) => {
  const oid = req.params.oid
  console.log(oid)
  try {
    const [orderInfo] = await dbPromise.execute(
      'SELECT `uo`.`id`,`uo`.`numerical_order`,`uo`.`user_id`, `uo`.`delivery_method`, `uo`.`delivery_address`,  `uo`.`recipient`,   `uo`.`pay_method`,   `uo`.`pay_info`,  `uo`.`total`,  `uo`.`coupons_id`,   `uo`.`discount_info`,   `uo`.`remark`,   `uo`.`status_now`,  `uo`.`order_date`, `u`.`phone`, COUNT(`od`.`id`) AS `order_detail_count`, `od`.`object_type`, GROUP_CONCAT(`od`.`object_id`) AS `object_ids`, GROUP_CONCAT(`od`.`object_type`) AS `object_types`,GROUP_CONCAT(`od`.`name`) AS `names`, GROUP_CONCAT(`od`.`quantity`) AS `quantitys`, GROUP_CONCAT(`od`.`price`) AS `prices`,GROUP_CONCAT( CASE WHEN `od`.`object_type` = "product" THEN `p`.`img` WHEN `od`.`object_type` = "course" THEN `c`.`images` END ) AS all_item_images, GROUP_CONCAT(`od`.`comment_status`) AS `comment_status` FROM `user_order` `uo` JOIN `order_detail` `od` ON `uo`.`id` = `od`.`order_id`LEFT JOIN `user` `u` ON `uo`.`user_id` = `u`.`id` LEFT JOIN `product` `p` ON `od`.`object_id` = `p`.`id` AND  `od`.`object_type` = "product" LEFT JOIN `course` `c` ON `od`.`object_id` = `c`.`id` AND `od`.`object_type` = "course" WHERE `uo`.`numerical_order` = ?  GROUP BY `uo`.`id` ORDER BY `od`.`id` ASC',
      [oid]
    )

    if (orderInfo.length > 0) {
      const newObjectIds = orderInfo[0].object_ids
        ? orderInfo[0].object_ids.split(',')
        : []
      const newObjectTypes = orderInfo[0].object_types
        ? orderInfo[0].object_types.split(',')
        : []

      const newNames = orderInfo[0].names ? orderInfo[0].names.split(',') : []
      const newImages = orderInfo[0].all_item_images
        ? orderInfo[0].all_item_images.split(',')
        : []
      const newQuantitys = orderInfo[0].quantitys
        ? orderInfo[0].quantitys.split(',')
        : []
      const newPrices = orderInfo[0].prices
        ? orderInfo[0].prices.split(',')
        : []
      const newComment_status = orderInfo[0].comment_status
        ? orderInfo[0].comment_status.split(',')
        : []

      const orderDetails = newObjectIds.map((id, index) => ({
        id: Number(id),
        object_type: newObjectTypes[index],
        name: newNames[index],
        img: newImages[index],
        quantity: Number(newQuantitys[index]),
        price: Number(newPrices[index]),
        comment_status: Number(newComment_status[index]),
      }))
      const {
        object_ids,
        object_types,
        names,
        all_item_images,
        order_detail_count,
        object_type,
        prices,
        quantitys,
        comment_status,
        ...newOrderInfo
      } = orderInfo[0]

      const [status] = await dbPromise.execute(
        'SELECT * FROM `order_status` WHERE `order_id` = ?',
        [orderInfo[0].id]
      )

      const [comment] = await dbPromise.execute(
        'SELECT * FROM `comment` WHERE `order_id` = ?',
        [orderInfo[0].id]
      )
      res.status(200).json({
        status: 'success',
        data: {
          message: '已取得資訊',
          orderInfo: newOrderInfo,
          status,
          orderDetails,
          comment,
        },
      })
    } else {
      res.status(400).json({ status: 'error', data: { message: '查無訂單' } })
    }
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }
})

router.get('/', async (req, res) => {
  let regiArr = [],
    genderArr = [],
    ageArr = [],
    pdCateArr = [],
    incomeArr = [],
    orderArr = [],
    bookingArr = [],
    partyArr = [],
    completeArr = [],
    areaArr = [],
    hourArr = [],
    total = 0
  try {
    const [registrations] = await dbPromise.execute(
      `WITH months AS (
        SELECT '2024-01' AS month
        UNION ALL SELECT '2024-02'
        UNION ALL SELECT '2024-03'
        UNION ALL SELECT '2024-04'
        UNION ALL SELECT '2024-05'
        UNION ALL SELECT '2024-06'
        UNION ALL SELECT '2024-07'
        UNION ALL SELECT '2024-08'
        UNION ALL SELECT '2024-09'
        UNION ALL SELECT '2024-10'
        UNION ALL SELECT '2024-11'
        UNION ALL SELECT '2024-12'
    ) SELECT m.month, 
        IFNULL(COUNT(u.created_at), 0) AS registrations FROM months m LEFT JOIN user u ON  DATE_FORMAT(u.created_at, '%Y-%m') = m.month AND YEAR(u.created_at) = YEAR(CURDATE()) GROUP BY m.month ORDER BY m.month;`
    )

    registrations.forEach((registration) => {
      regiArr.push(registration.registrations)
    })

    const [gender] = await dbPromise.execute(
      `SELECT
    gender,
    COUNT(*) AS count
FROM
    user
GROUP BY
    gender`
    )
    gender.forEach((g) => {
      genderArr.push(g.count)
    })

    const [age] = await dbPromise.execute(
      `WITH age_groups AS (
    SELECT '20歲以下' AS age_group
    UNION ALL
    SELECT '21-35'
    UNION ALL
    SELECT '36-50'
    UNION ALL
    SELECT '51歲以上'
)
SELECT 
    ag.age_group, 
    IFNULL(COUNT(u.age_group), 0) AS count
FROM 
    age_groups ag
LEFT JOIN (
    SELECT
        CASE
            WHEN TIMESTAMPDIFF(YEAR, birth, CURDATE()) < 20 THEN '20歲以下'
            WHEN TIMESTAMPDIFF(YEAR, birth, CURDATE()) BETWEEN 21 AND 35 THEN '21-35'
            WHEN TIMESTAMPDIFF(YEAR, birth, CURDATE()) BETWEEN 36 AND 50 THEN '36-50'
            ELSE '51歲以上'
        END AS age_group
    FROM
        user
) u ON ag.age_group = u.age_group
GROUP BY 
    ag.age_group
ORDER BY 
    ag.age_group`
    )
    age.forEach((a) => {
      ageArr.push(a.count)
    })

    const [pdCate] = await dbPromise.execute(
      `SELECT
    object_type,
    SUM(quantity * price) AS total_amount
FROM
    order_detail
WHERE
    object_type IN ('course', 'product')
GROUP BY
    object_type;`
    )
    pdCate.forEach((o) => {
      pdCateArr.push(Number(o.total_amount))
      total += Number(o.total_amount)
    })

    const [order] = await dbPromise.execute(
      `WITH months AS (
    SELECT '2024-01' AS month
    UNION ALL SELECT '2024-02'
    UNION ALL SELECT '2024-03'
    UNION ALL SELECT '2024-04'
    UNION ALL SELECT '2024-05'
    UNION ALL SELECT '2024-06'
    UNION ALL SELECT '2024-07'
    UNION ALL SELECT '2024-08'
    UNION ALL SELECT '2024-09'
    UNION ALL SELECT '2024-10'
    UNION ALL SELECT '2024-11'
    UNION ALL SELECT '2024-12'
),
order_stats AS (
    SELECT
        DATE_FORMAT(order_date, '%Y-%m') AS month,
        COUNT(*) AS order_count,
        SUM(total) AS total_amount
    FROM
        user_order
    WHERE
        YEAR(order_date) = YEAR(CURDATE())
    GROUP BY
        month
)
SELECT
    m.month,
    IFNULL(os.order_count, 0) AS order_count,
    IFNULL(os.total_amount, 0) AS total_amount
FROM
    months m
LEFT JOIN
    order_stats os ON m.month = os.month
ORDER BY
    m.month;`
    )
    order.forEach((o) => {
      orderArr.push(o.order_count)
      incomeArr.push(Number(o.total_amount))
    })

    const [booking] = await dbPromise.execute(
      `WITH months AS (
    SELECT '2024-01' AS month
    UNION ALL SELECT '2024-02'
    UNION ALL SELECT '2024-03'
    UNION ALL SELECT '2024-04'
    UNION ALL SELECT '2024-05'
    UNION ALL SELECT '2024-06'
    UNION ALL SELECT '2024-07'
    UNION ALL SELECT '2024-08'
    UNION ALL SELECT '2024-09'
    UNION ALL SELECT '2024-10'
    UNION ALL SELECT '2024-11'
    UNION ALL SELECT '2024-12'
),
booking_stats AS (
    SELECT
        DATE_FORMAT(date, '%Y-%m') AS month,
        COUNT(*) AS booking_count
    FROM
        booking_record
    WHERE
        status IN ('booked', 'completed')
        AND YEAR(date) = YEAR(CURDATE())
    GROUP BY
        month
)
SELECT
    m.month,
    IFNULL(bs.booking_count, 0) AS booking_count
FROM
    months m
LEFT JOIN
    booking_stats bs ON m.month = bs.month
ORDER BY
    m.month;`
    )

    booking.forEach((b) => {
      bookingArr.push(b.booking_count)
    })

    const [party] = await dbPromise.execute(
      `WITH months AS (
    SELECT '2024-01' AS month
    UNION ALL SELECT '2024-02'
    UNION ALL SELECT '2024-03'
    UNION ALL SELECT '2024-04'
    UNION ALL SELECT '2024-05'
    UNION ALL SELECT '2024-06'
    UNION ALL SELECT '2024-07'
    UNION ALL SELECT '2024-08'
    UNION ALL SELECT '2024-09'
    UNION ALL SELECT '2024-10'
    UNION ALL SELECT '2024-11'
    UNION ALL SELECT '2024-12'
),
party_stats AS (
    SELECT
        DATE_FORMAT(date, '%Y-%m') AS month,
        COUNT(*) AS party_count
    FROM
        party
    WHERE
        YEAR(date) = YEAR(CURDATE())
    GROUP BY
        month
)
SELECT
    m.month,
    IFNULL(ps.party_count, 0) AS party_count
FROM
    months m
LEFT JOIN
    party_stats ps ON m.month = ps.month
ORDER BY
    m.month;`
    )

    party.forEach((p) => {
      partyArr.push(p.party_count)
    })

    const [complete] = await dbPromise.execute(
      `SELECT
    SUM(CASE WHEN status IN ('completed', 'booked') THEN 1 ELSE 0 END) AS completed_and_booked_count,
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_count
FROM
    party
WHERE
    YEAR(date) = YEAR(CURDATE());`
    )
    complete.forEach((c) => {
      completeArr.push(c.completed_and_booked_count)
      completeArr.push(c.cancelled_count)
    })

    const [area] = await dbPromise.execute(
      `WITH table_info AS ( SELECT br.id AS booking_id, mt.company_id FROM booking_record br JOIN mahjong_table mt ON br.table_id = mt.id ), region_stats AS ( SELECT CASE WHEN c.city IN ('台北市', '新北市', '基隆市', '新竹市', '桃園市', '新竹縣', '宜蘭縣') THEN '北部區域' WHEN c.city IN ('台中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣') THEN '中部區域' WHEN c.city IN ('高雄市', '台南市', '嘉義市', '嘉義縣', '屏東縣', '澎湖縣') THEN '南部區域' ELSE '其他' END AS region, COUNT(*) AS total_count FROM table_info ti JOIN company c ON ti.company_id = c.id GROUP BY region ) SELECT region, total_count FROM region_stats ORDER BY region;`
    )

    area.forEach((a) => {
      areaArr.push(a.total_count)
    })

    const [hour] = await dbPromise.execute(
      `WITH hours AS ( SELECT '08:00:00' AS hour UNION ALL SELECT '09:00:00' UNION ALL SELECT '10:00:00' UNION ALL SELECT '11:00:00' UNION ALL SELECT '12:00:00' UNION ALL SELECT '13:00:00' UNION ALL SELECT '14:00:00' UNION ALL SELECT '15:00:00' UNION ALL SELECT '16:00:00' UNION ALL SELECT '17:00:00' UNION ALL SELECT '18:00:00' UNION ALL SELECT '19:00:00' UNION ALL SELECT '20:00:00' UNION ALL SELECT '21:00:00' UNION ALL SELECT '22:00:00' UNION ALL SELECT '23:00:00' ), hourly_counts AS ( SELECT DATE_FORMAT(start_time, '%H:%i:%s') AS hour, COUNT(*) AS count FROM booking_record WHERE TIME(start_time) BETWEEN '08:00:00' AND '23:00:00' GROUP BY hour ) SELECT h.hour, COALESCE(c.count, 0) AS count FROM hours h LEFT JOIN hourly_counts c ON h.hour = c.hour ORDER BY h.hour;`
    )

    hour.forEach((h) => {
      hourArr.push(Number(h.count))
    })

    res.status(200).json({
      status: 'success',
      data: {
        message: '已取得資訊',
        regiArr,
        genderArr,
        ageArr,
        pdCateArr,
        total,
        orderArr,
        incomeArr,
        bookingArr,
        partyArr,
        completeArr,
        areaArr,
        hourArr,
      },
    })
  } catch (err) {
    res.status(400).json({ status: 'error', data: { message: err.message } })
  }
})

export default router
