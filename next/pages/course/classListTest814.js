import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/aa/classList.scss'

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
      const newClasses = {}
      for (const category of categories) {
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

  const handleShowMore = (category) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [category]: prev[category] + 4,
    }))
  }

  if (loading) return <div>載入中...</div>
  if (error) return <div>{error}</div>
  if (Object.keys(classes).length === 0)
    return <div className="no-classes">目前沒有可用的課程</div>

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
    <>
      <div className="container">
        <div className="desktop-list-aa">
          <div className="class-header-aa">
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
          </div>
          <div className="sec1-aa">
            <div className="text2-aa">
              <h2>課程排行</h2>
            </div>
            {/* <div className="classCards-aa">
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <div className="rank1">1</div>
                  <img
                    src="https://hahow-production.imgix.net/5fb4fc22563bc0262f9fb105?w=1000&sat=0&auto=format&s=f7cb3bd23dc48b1089edb34423906993"
                    alt=""
                  />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <div className="rank2">2</div>
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <div className="rank3">3</div>
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <div className="rank4">4</div>
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
            </div> */}

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
            <div className="texth2-aa">
              <h2>所有課程 列表</h2>
            </div>
            <div className="text2-aa">
              <h2>西洋棋</h2>
            </div>
            <div className="classCards-aa">
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
            </div>

            {/* <div className="classCards-aa">
  {classes.map((classItem) => (
    <div key={classItem.id} className="classCard-aa">
      <div className="imgBox-aa">
        <img src={classItem.image} alt={classItem.title} />
      </div>
      <div className="cardBody-aa">
        <div className="className-aa">
          <p>{classItem.title}</p>
          <p className="classDescription-aa">{classItem.instructor}</p>
        </div>
        <p>NT. {classItem.price}</p>
      </div>
    </div>
  ))}
</div> */}

            <div className="btn-more d-flex">
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

            <div className="text2-aa">
              <h2>麻將</h2>
            </div>
            <div className="classCards-aa">
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
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
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
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
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
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
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
              <div className="classCard-aa">
                <div className="imgBox-aa">
                  <img src="" alt="" />
                </div>
                <div className="cardBody-aa">
                  <div className="className-aa">
                    <p>西洋棋國手教你下西洋棋</p>
                    <p className="classDescription-aa">劉業揚＆楊元翰</p>
                  </div>
                  <p>NT. 450</p>
                </div>
              </div>
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
        </div>
      </div>
    </>
  )
}
