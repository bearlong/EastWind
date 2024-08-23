import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/aa/classList.module.scss'

export default function ClassList() {
  // 注意1: 初始值至少要空陣列，初次render是用初始值
  // 注意2: 應用執行過程中，一定要保持狀態資料類型都是陣列
  const [courses, setCourses] = useState([])

  // 向伺服器連線的程式碼；向伺服器fetch獲取資料
  const getCourses = async () => {
    const apiURL = `http://localhost:3005/api/course`
    try {
      const res = await fetch(apiURL)
      const data = await res.json()

      // console.log(data)

      // 設定到狀態中 ==> 觸發re-render(進入update階段)
      if (Array.isArray(data)) {
        setCourses(data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 樣式2: didMount
  // 首次render之後(after)執行一次，之後不會再執行
  useEffect(() => {
    getCourses()
  }, [])

  // 課程卡片組件
  const ClassCard = ({ courseData, rank }) => (
    <div className={styles['classCard-aa']}>
      <div className={styles['imgBox-aa']}>
        {rank && <div className={styles[`rank${rank}`]}>{rank}</div>}
        <Image
          src={
            courseData.images ||
            'https://hahow-production.imgix.net/5fb4fc22563bc0262f9fb105?w=1000&sat=0&auto=format&s=f7cb3bd23dc48b1089edb34423906993'
          }
          alt={courseData.course_name || ''}
        />
      </div>
      <div className={styles['cardBody-aa']}>
        <div className={styles['className-aa']}>
          <p>{courseData.course_name}</p>
          <p className={styles['classDescription-aa']}>
            {courseData.course_category_id}
          </p>
        </div>
        <p>NT. {courseData.price}</p>
      </div>
    </div>
  )

  return (
    <>
      <div className="container">
        <div className={styles['className-aa']}>
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
          <div className={styles['sec1-aa']}>
            <div className={styles['text2-aa']}>
              <h2>課程排行</h2>
            </div>
            {/* <div className={styles['classCards-aa']}>
              {Object.values(courses)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard
                    key={classItem.id}
                    courseData={classItem}
                    rank={index + 1}
                  />
                ))}
            </div> */}

            <div className={styles['classCards-aa']}>
              {courses.slice(0, 4).map((classItem, index) => (
                <ClassCard
                  key={classItem.id}
                  courseData={classItem}
                  rank={index + 1}
                />
              ))}
            </div>
            <div className={styles['line-aa']}>
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
            <div className={styles['texth2-aa']}>
              <h2>所有課程 列表</h2>
            </div>
            <div className={styles['text2-aa']}>
              <h2>西洋棋</h2>
            </div>
            <div className={styles['classCards-aa']}>
              {Object.values(courses)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className={`${styles['btn-more']} d-flex`}>
              <p>查看更多</p>
              {/* <i class=""></i> */}
              <svg
                className={styles['btn-more1']}
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
            <div className={styles['text2-aa']}>
              <h2>麻將</h2>
            </div>
            <div className={styles['classCards-aa']}>
              {Object.values(courses)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className={`${styles['btn-more']} d-flex`}>
              <p>查看更多</p>
              {/* <i class="edit-icon"></i> */}
              <svg
                className={styles['btn-more1']}
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
            <div className={styles['text2-aa']}>
              <h2>圍棋</h2>
            </div>
            <div className={styles['classCards-aa']}>
              {Object.values(courses)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className={`${styles['btn-more']} d-flex`}>
              <p>查看更多</p>
              {/* <i class="edit-icon"></i> */}
              <svg
                className={styles['btn-more1']}
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
            <div className={styles['text2-aa']}>
              <h2>撲克</h2>
            </div>
            <div className={styles['classCards-aa']}>
              {Object.values(courses)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className={`${styles['btn-more']} d-flex`}>
              <p>查看更多</p>
              {/* <i class="edit-icon"></i> */}
              <svg
                className={styles['btn-more1']}
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
            <div className={styles['text2-aa']}>
              <h2>象棋</h2>
            </div>
            <div className={styles['classCards-aa']}>
              {Object.values(courses)
                .flat()
                .slice(0, 4)
                .map((classItem, index) => (
                  <ClassCard key={classItem.id} courseData={classItem} />
                ))}
            </div>
            <div className={`${styles['btn-more']} d-flex`}>
              <p>查看更多</p>
              {/* <i class="edit-icon"></i> */}
              <svg
                className={styles['btn-more1']}
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
        </div>
      </div>
    </>
  )
}
