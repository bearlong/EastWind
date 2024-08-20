import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/aa/classList.scss'
import Footer from '@/components/layout/default-layout/footer'
import Header from '@/components/layout/default-layout/header'
import mysql from 'mysql2/promise'

// 創建 MySQL 連接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'mahjong',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default function ClassList() {
  const router = useRouter()
  const [classes, setClasses] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCounts, setVisibleCounts] = useState({
    西洋棋: 4,
    麻將: 4,
    圍棋: 4,
    撲克: 4,
    象棋: 4,
  })

  const categories = ['西洋棋', '麻將', '圍棋', '撲克', '象棋']

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      setLoading(true)

      const query = `
        SELECT 
          course.id,
          course.course_name,
          course.content,
          course.price,
          course.images,
          course.file,
          course.created_at,
          course.updated_at,
          course.on_datetime,
          course.off_datetime,
          course.valid,
          category.name AS category_name
        FROM 
          course
        JOIN 
          course_category AS category ON course.course_category_id = category.id
        WHERE 
          category.name IN (?)
        ORDER BY 
          category.name, course.created_at DESC
      `

      const [rows] = await pool.query(query, [categories])

      const newClasses = categories.reduce((acc, category) => {
        acc[category] = rows.filter((row) => row.category_name === category)
        return acc
      }, {})

      setClasses(newClasses)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching classes:', err)
      setError('無法載入課程資料')
      setLoading(false)
    }
  }

  const handleShowMore = (category) => (event) => {
    event.preventDefault()
    setVisibleCounts((prev) => ({
      ...prev,
      [category]: prev[category] + 4,
    }))
  }

  if (loading) return <div>載入中...</div>
  if (error) return <div>{error}</div>
  if (Object.keys(classes).length === 0)
    return <div className="no-classes">目前沒有可用的課程</div>

  const ClassCard = ({ courseData, rank }) => (
    <div className="classCard-aa">
      <div className="imgBox-aa">
        {rank && <div className={`rank${rank}`}>{rank}</div>}
        <img src={courseData.images} alt={courseData.course_name} />
      </div>
      <div className="cardBody-aa">
        <div className="className-aa">
          <p>{courseData.course_name}</p>
          <p className="classDescription-aa">{courseData.category_name}</p>
        </div>
        <p>NT. {courseData.price}</p>
      </div>
    </div>
  )

  return (
    <>
      <div className="container">
        <div className="desktop-list-aa">
          <Header />
          <div className="sec1-aa">
            <div className="text2-aa">
              <h2>課程排行</h2>
            </div>
            <div className="classCards-aa">
              {Object.values(classes)
                .flat()
                .sort((a, b) => b.price - a.price)
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard
                    key={classItem.id}
                    courseData={classItem}
                    rank={index + 1}
                  />
                ))}
            </div>
            {/* ... 其他 JSX 結構保持不變 ... */}
            {categories.map((category) => (
              <React.Fragment key={category}>
                <div className="text2-aa">
                  <h2>{category}</h2>
                </div>
                <div className="classCards-aa">
                  {classes[category]
                    ?.slice(0, visibleCounts[category])
                    .map((classItem, index) => (
                      <ClassCard key={classItem.id} courseData={classItem} />
                    ))}
                </div>
                {classes[category]?.length > visibleCounts[category] && (
                  <div
                    className="btn-more d-flex"
                    onClick={handleShowMore(category)}
                  >
                    <p>查看更多</p>
                    <svg
                      className="btn-more1"
                      xmlns="http://www.w3.org/2000/svg"
                      width={109}
                      height={14}
                      viewBox="0 0 109 14"
                      fill="none"
                    >
                      <path
                        d="M43 11H83"
                        stroke="#B79347"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                      <path
                        d="M82.8994 10.8995L72.9999 0.99998"
                        stroke="#B79347"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
