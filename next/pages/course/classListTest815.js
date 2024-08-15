import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/aa/classList.scss'

export default function ClassList() {
  const router = useRouter()
  // 設置狀態來存儲課程數據、加載狀態、錯誤和每個類別顯示的課程數量
  const [classes, setClasses] = useState({}) // 用於存儲各類別的課程數據
  const [loading, setLoading] = useState(true) // 控制加載狀態
  const [error, setError] = useState(null) // 存儲錯誤信息
  const [visibleCounts, setVisibleCounts] = useState({
    西洋棋: 4,
    麻將: 4,
    圍棋: 4,
    撲克: 4,
    象棋: 4,
  }) // 控制每個類別顯示的課程數量，初始值為4

  // 定義課程類別
  const categories = ['西洋棋', '麻將', '圍棋', '撲克', '象棋']

  // 組件加載時獲取課程數據
  useEffect(() => {
    fetchClasses()
  }, [])

  // 獲取課程數據的函數
  const fetchClasses = async () => {
    try {
      setLoading(true)
      const newClasses = {}
      for (const category of categories) {
        // 對每個類別發送API請求
        const response = await axios.get(
          `https://your-api-endpoint.com/classes?category=${category}`
        )
        newClasses[category] = response.data
      }
      setClasses(newClasses)
      setLoading(false)
    } catch (err) {
      setError('無法載入課程資料')
      setLoading(false)
    }
  }

  // 處理"查看更多"按鈕點擊事件
  const handleShowMore = (category) => (event) => {
    event.preventDefault()
    setVisibleCounts((prev) => ({
      ...prev,
      [category]: prev[category] + 4, // 每次點擊增加4個課程
    }))
  }

  // 加載中、錯誤和無課程的情況處理
  if (loading) return <div>載入中...</div>
  if (error) return <div>{error}</div>
  if (Object.keys(classes).length === 0)
    return <div className="no-classes">目前沒有可用的課程</div>

  // 課程卡片組件
  const ClassCard = ({ classData, rank }) => (
    <div className="classCard-aa">
      <div className="imgBox-aa">
        {rank && <div className={`rank${rank}`}>{rank}</div>}
        <img src={classData.image} alt={classData.title} />
      </div>
      <div className="cardBody-aa">
        <div className="className-aa">
          <p>{classData.title}</p>
          <p className="classDescription-aa">{classData.instructor}</p>
        </div>
        <p>NT. {classData.price}</p>
      </div>
    </div>
  )

  return (
    <div className="container">
      <div className="desktop-list-aa">
        <div className="class-header-aa">
          <ul className="d-flex subBar-aa">
            {categories.map((category) => (
              <li key={category}>
                <a className="subNav" href="">
                  <h6>{category}</h6>
                </a>
                <div className="subBarBody-aa d-none">{/* 下拉菜單內容 */}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sec1-aa">
          <div className="text2-aa">
            <h2>課程排行</h2>
          </div>
          <div className="classCards-aa">
            {Object.values(classes)
              .flat()
              .slice(0, 4)
              .map((classItem, index) => (
                <ClassCard
                  key={classItem.id}
                  classData={classItem}
                  rank={index + 1}
                />
              ))}
          </div>

          <div className="line-aa">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={1298}
              height={4}
              viewBox="0 0 1298 4"
              fill="none"
            >
              <path
                d="M2 0H0V4H2V0ZM1296 4C1297.1 4 1298 3.10457 1298 2C1298 0.895431 1297.1 0 1296 0V4ZM2 4H1296V0H2V4Z"
                fill="url(#paint0_linear_2284_1232)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2284_1232"
                  x1={649}
                  y1={2}
                  x2={649}
                  y2={3}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#DAA520" />
                  <stop offset={1} stopColor="#745811" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 回到頂部按鈕（新增） */}
          <div className="btn-up-aa">
            <div className="Vectorup-aa">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
              >
                <path
                  d="M8.99141 0.439367C9.54926 -0.146456 10.4552 -0.146456 11.0131 0.439367L19.5816 9.43761C20.1395 10.0234 20.1395 10.9748 19.5816 11.5606C19.0238 12.1465 18.1178 12.1465 17.56 11.5606L10 3.62156L2.44003 11.5559C1.88218 12.1418 0.976236 12.1418 0.418387 11.5559C-0.139462 10.9701 -0.139462 10.0187 0.418387 9.43292L8.98695 0.434681L8.99141 0.439367Z"
                  fill="#76592A"
                />
              </svg>
            </div>
          </div>

          {/* 所有課程列表 */}
          <div className="texth2-aa">
            <h2>所有課程 列表</h2>
          </div>

          {/* 按類別顯示課程 */}
          {categories.map((category) => (
            <div key={category}>
              <div className="text2-aa">
                <h2>{category}</h2>
              </div>
              <div className="classCards-aa">
                {classes[category]
                  ?.slice(0, visibleCounts[category])
                  .map((classItem) => (
                    <ClassCard key={classItem.id} classData={classItem} />
                  ))}
              </div>
              {/* 如果還有更多課程，顯示"查看更多"按鈕 */}
              {classes[category]?.length > visibleCounts[category] && (
                <div
                  className="btn-more d-flex"
                  onClick={handleShowMore(category)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      handleShowMore(category)(event)
                    }
                  }}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
