import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/aa/classList.scss'
import Footer from '@/components/layout/default-layout/footer'
import Header from '@/components/layout/default-layout/header'

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
        const response = await axios.get(`http://localhost:3005/api/course`)
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
  const ClassCard = ({ courseData, rank }) => (
    <div className="classCard-aa">
      <div className="imgBox-aa">
        {rank && <div className={`rank${rank}`}>{rank}</div>}
        <img src={courseData.images} alt={courseData.course_name} />
      </div>
      <div className="cardBody-aa">
        <div className="className-aa">
          <p>{courseData.course_name}</p>
          <p className="classDescription-aa">{courseData.course_category_id}</p>
        </div>
        <p>NT. {courseData.price}</p>
      </div>
    </div>
  )

  return (
    <>
      <div className="container">
        <div className="desktop-list-aa">
          {/* <div className="class-header-aa">
            <ul className="d-flex subBar-aa">
              <li>
                <a className="subNav" href="">
                  <h6>西洋棋</h6>
                </a>
                <div className="subBarBody-aa d-none">
                  <div className="d-flex">
                    <div className="subBarDetail-aa">
                      <h6 className="title">總覽</h6>
                      <ul>
                        <li>
                          <a href="">啟蒙課程</a>
                        </li>
                        <li>
                          <a href="">基礎課程</a>
                        </li>
                        <li>
                          <a href="">進階課程</a>
                        </li>
                        <li>
                          <a href="">高階課程</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a className="subNav" href="">
                  <h6>麻將</h6>
                </a>
                <div className="subBarBody-aa d-none">
                  <div className="d-flex">
                    <div className="subBarDetail-aa">
                      <h6 className="title">總覽</h6>
                      <ul>
                        <li>
                          <a href="">啟蒙課程</a>
                        </li>
                        <li>
                          <a href="">基礎課程</a>
                        </li>
                        <li>
                          <a href="">進階課程</a>
                        </li>
                        <li>
                          <a href="">高階課程</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a className="subNav" href="">
                  <h6>圍棋</h6>
                </a>
                <div className="subBarBody-aa d-none">
                  <div className="d-flex">
                    <div className="subBarDetail-aa">
                      <h6 className="title">總覽</h6>
                      <ul>
                        <li>
                          <a href="">啟蒙課程</a>
                        </li>
                        <li>
                          <a href="">基礎課程</a>
                        </li>
                        <li>
                          <a href="">進階課程</a>
                        </li>
                        <li>
                          <a href="">高階課程</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a className="subNav" href="">
                  <h6>撲克</h6>
                </a>
                <div className="subBarBody-aa d-none">
                  <div className="d-flex">
                    <div className="subBarDetail-aa">
                      <h6 className="title">總覽</h6>
                      <ul>
                        <li>
                          <a href="">啟蒙課程</a>
                        </li>
                        <li>
                          <a href="">基礎課程</a>
                        </li>
                        <li>
                          <a href="">進階課程</a>
                        </li>
                        <li>
                          <a href="">高階課程</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a className="subNav" href="">
                  <h6>象棋</h6>
                </a>
                <div className="subBarBody-aa d-none">
                  <div className="d-flex">
                    <div className="subBarDetail-aa">
                      <h6 className="title">總覽</h6>
                      <ul>
                        <li>
                          <a href="">啟蒙課程</a>
                        </li>
                        <li>
                          <a href="">基礎課程</a>
                        </li>
                        <li>
                          <a href="">進階課程</a>
                        </li>
                        <li>
                          <a href="">高階課程</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div> */}
          <Header />
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
                    courseData={classItem}
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
            <div className="texth2-aa">
              <h2>所有課程 列表</h2>
            </div>
            <div className="text2-aa">
              <h2>西洋棋</h2>
            </div>
            <div className="classCards-aa">
              {Object.values(classes)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className="btn-more d-flex">
              <p>查看更多</p>
              {/* <i class=""></i> */}
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
            <div className="text2-aa">
              <h2>麻將</h2>
            </div>
            <div className="classCards-aa">
              {Object.values(classes)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className="btn-more d-flex">
              <p>查看更多</p>
              {/* <i class="edit-icon"></i> */}
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
            <div className="text2-aa">
              <h2>圍棋</h2>
            </div>
            <div className="classCards-aa">
              {Object.values(classes)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className="btn-more d-flex">
              <p>查看更多</p>
              {/* <i class="edit-icon"></i> */}
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
            <div className="text2-aa">
              <h2>撲克</h2>
            </div>
            <div className="classCards-aa">
              {Object.values(classes)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className="btn-more d-flex">
              <p>查看更多</p>
              {/* <i class="edit-icon"></i> */}
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
            <div className="text2-aa">
              <h2>象棋</h2>
            </div>
            <div className="classCards-aa">
              {Object.values(classes)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className="btn-more d-flex">
              <p>查看更多</p>
              {/* <i class="edit-icon"></i> */}
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
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
