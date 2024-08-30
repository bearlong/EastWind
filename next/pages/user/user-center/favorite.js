import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/boyu/user-favorite.module.scss'
import UserCenterLayout from '@/components/layout/user-center-layout'
import { FaMagnifyingGlass, FaPhone } from 'react-icons/fa6'
import { PiDeskFill } from 'react-icons/pi'
import { FaStar, FaHeart, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { AuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import Swal from 'sweetalert2'

export default function UserFavorite() {
  const [activeTab, setActiveTab] = useState('product') // 預設顯示 "課程"
  const { user } = useContext(AuthContext)
  const userId = user?.id

  const [favorites, setFavorites] = useState([])
  const [searchQuery, setSearchQuery] = useState('') // 用來存儲用戶輸入值的狀態
  const [searchKeyword, setSearchKeyword] = useState('') // 新增搜尋關鍵字狀態

  // 當 activeTab 改變時從後端獲取對應的最愛資料
  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = user?.id
      console.log(favorites)

      try {
        const response = await fetch(
          `http://localhost:3005/api/user-favorite/${userId}/${activeTab}?search=${encodeURIComponent(
            searchKeyword
          )}`
        )
        const result = await response.json()

        if (response.ok) {
          setFavorites(result.data.favorites)
        } else {
          console.error(result.data.message)
        }
      } catch (error) {
        console.error('Failed to fetch favorites:', error)
      }
    }

    if (userId) {
      fetchFavorites()
    }
  }, [activeTab, searchKeyword, userId])

  const triggerSearch = () => {
    setSearchKeyword(searchQuery) // 當按下搜尋按鈕時，將用戶輸入的值賦予 searchKeyword
  }

  // 當輸入框內容改變時執行的函數
  const searchInputChange = (e) => {
    const inputValue = e.target.value
    setSearchQuery(inputValue)

    // 如果輸入框為空，觸發顯示所有最愛的動作
    if (inputValue === '') {
      setSearchKeyword('') // 重設為空字串以顯示所有最愛
    }
  }

  const removeFavorite = async (favoriteId) => {
    const result = await Swal.fire({
      title: '確認刪除',
      html: `<span class="p">你確定要刪除此最愛嗎？</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認刪除',
      cancelButtonText: '取消刪除',
      customClass: {
        popup: `${styles['swal-popup-bo']}`,
        title: 'h6',
        icon: `${styles['swal-icon-bo']}`,
        confirmButton: `${styles['swal-btn-bo']}`,
        cancelButton: `${styles['swal-btn-cancel-bo']}`,
      },
    })
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3005/api/user-favorite/${userId}/${favoriteId}`,
          {
            method: 'DELETE',
          }
        )

        const data = await response.json()

        if (data.status === 'success') {
          Swal.fire({
            title: '已刪除!',
            html: `<span class="p">你的最愛已被刪除。</span>`,
            icon: 'success',
            confirmButtonText: '確認',
            customClass: {
              popup: `${styles['swal-popup-bo']}`,
              title: 'h6',
              icon: `${styles['swal-icon-bo']}`,
              confirmButton: `${styles['swal-btn-bo']}`,
              cancelButton: `${styles['swal-btn-cancel-bo']}`,
            },
          })

          setFavorites(
            favorites.filter((fav) => fav.favorite_id !== favoriteId)
          )
        } else {
          Swal.fire('錯誤!', '刪除失敗，請稍後再試。', 'error')
        }
      } catch (error) {
        Swal.fire('錯誤!', '無法刪除最愛。', 'error')
      }
    }
  }

  return (
    <div className={`${styles['user-favorite-box-bo']} w-100`}>
      <div
        className={`${styles['search-box-bo']} d-flex flex-column flex-sm-row justify-content-center align-items-center gap-lg-4 gap-3 `}
      >
        <h6>搜尋最愛</h6>
        <input
          type="text"
          placeholder="請輸入關鍵字"
          className={`${styles['input-search-bo']} p`}
          value={searchQuery} // 綁定搜尋關鍵字
          onChange={searchInputChange} // 更新搜尋關鍵字並監聽輸入
        />
        <button
          className={`${styles['btn-search']} h6 d-flex justify-content-between align-items-center`}
          onClick={triggerSearch} // 點擊後觸發搜尋
        >
          <FaMagnifyingGlass />
        </button>
      </div>

      <div className={`${styles['favorite-list-box-bo']} flex-column d-flex`}>
        <div className={styles['favorite-list-head-bo']}>
          <ul
            className={`${styles['favorite-state-box-bo']} d-flex justify-content-around align-items-center text-center`}
          >
            <li>
              <button
                onClick={() => setActiveTab('product')}
                className={`${styles['favorite-state-bo']} h5 ${
                  activeTab === 'product' ? styles['state-choose-bo'] : ''
                }`}
              >
                商品
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('company')}
                className={`${styles['favorite-state-bo']} h5 ${
                  activeTab === 'company' ? styles['state-choose-bo'] : ''
                }`}
              >
                棋牌室
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('course')}
                className={`${styles['favorite-state-bo']} h5 ${
                  activeTab === 'course' ? styles['state-choose-bo'] : ''
                }`}
              >
                課程
              </button>
            </li>
          </ul>
        </div>

        <div
          className={`${styles['favorite-list-body-bo']} d-flex flex-column justify-content-center align-items-center gap-5`}
        >
          {favorites.length === 0 ? (
            <div className="h5 p-5">尚未增加我的最愛</div>
          ) : (
            <>
              {activeTab === 'course' && (
                <div className={styles['favorite-course-box-bo']}>
                  {favorites.map((favorite, index) => (
                    <Link
                      key={index}
                      href={`  /course/detail?id=${favorite.id}`}
                      className={`w-100`}
                    >
                      <div
                        className={`${styles['courseCard']} d-flex flex-column justify-content-center align-items-center`}
                      >
                        <div className={styles['courseImgBox']}>
                          <FaHeart
                            className={` ${styles['course-icon-heart-bo']}`}
                            onClick={(e) => {
                              e.preventDefault() // 阻止預設行為，避免連結點擊
                              removeFavorite(favorite.favorite_id)
                            }}
                          />
                          <img
                            src={`/images/aa/${favorite.images}`}
                            alt={favorite.course_name}
                          />
                        </div>
                        <div className={`${styles['cardBody']} text-center`}>
                          <div
                            className={`${styles['courseName']} d-flex flex-column justify-content-center align-items-center text-center`}
                          >
                            <p className={` p  text-center`}>
                              {favorite.category_name}
                            </p>
                            <p
                              className={`p ${styles['courseDescription']} d-flex  justify-content-center align-items-center `}
                            >
                              {favorite.course_name}
                            </p>
                            <p className="p">NT$ {favorite.price}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {activeTab === 'product' && (
                <div className={styles['favorite-product-box-bo']}>
                  {favorites.map((favorite, index) => {
                    return (
                      <Link
                        key={index}
                        href={`/product/${favorite.id}`}
                        className={`w-100`}
                      >
                        <div
                          className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
                        >
                          <div className={styles['productImgBox']}>
                            <FaHeart
                              className={` ${styles['product-icon-heart-bo']}
                            `}
                              onClick={(e) => {
                                e.preventDefault() // 阻止預設行為，避免連結點擊
                                removeFavorite(favorite.favorite_id)
                              }}
                            />
                            <img
                              src={`/images/product/${favorite.image}`}
                              alt={favorite.name}
                            />
                          </div>
                          <div className={`${styles['cardBody']} text-center`}>
                            <div
                              className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                            >
                              <p className={`p`}>{favorite.brand_name}</p>
                              <p
                                className={`h6 ${styles['productDescription']}  d-flex  justify-content-center align-items-center text-center`}
                              >
                                {favorite.name}
                              </p>
                              <p className="p">NT$ {favorite.price}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {activeTab === 'company' && (
                <div className={styles['favorite-company-box-bo']}>
                  {favorites.map((favorite, index) => (
                    <Link
                      key={index}
                      href={`/lobby/Company/${favorite.id}`}
                      className={`w-100`}
                    >
                      <div
                        className={`${styles['company-card-bo']}  d-flex flex-column justify-content-start align-items-center gap-2`}
                      >
                        <div className="h5 d-flex w-100 justify-content-between align-items-center">
                          <h6 className={`${styles['ellipsis']}`}>
                            {favorite.name}
                          </h6>
                          <FaHeart
                            className={` ${styles['icon-heart-bo']}`}
                            onClick={(e) => {
                              e.preventDefault() // 阻止預設行為，避免連結點擊
                              removeFavorite(favorite.favorite_id)
                            }}
                          />
                        </div>
                        <div
                          className={`${styles['company-card-body-bo']} d-flex justify-content-center align-items-center w-100`}
                        >
                          <div className={styles['company-img-box-bo']}>
                            <img
                              src={`/images/company/room-default.jpg`}
                              alt={favorite.name}
                            />
                          </div>
                          <div
                            className={`${styles['company-text-box-bo']} w-100 d-flex flex-column align-items-start gap-1`}
                          >
                            <p
                              className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                            >
                              <FaStar
                                className={` ${styles['icon-star-bo']} ${styles['col-icon-bo']}`}
                              />
                              {parseFloat(favorite.rating) === 0
                                ? '0'
                                : parseFloat(favorite.rating).toFixed(1)}{' '}
                              ( {favorite.user_rating_total}人 )
                            </p>
                            <div
                              className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                            >
                              <FaMapMarkerAlt
                                className={`  ${styles['col-icon-bo']}`}
                              />
                              <div
                                className={`${styles['time-text-box-bo']} d-flex justify-content-center align-items-start text-start`}
                              >
                                <p className={`${styles['ellipsis']}`}>
                                  {favorite.address}
                                </p>
                              </div>
                            </div>
                            <p
                              className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                            >
                              <FaPhone
                                className={`  ${styles['col-icon-bo']}`}
                              />
                              {favorite.phone}
                            </p>
                            <div
                              className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                            >
                              <FaClock
                                className={`  ${styles['col-icon-bo']}`}
                              />
                              <div
                                className={`${styles['time-text-box-bo']} d-flex gap-1 justify-content-center align-items-start text-start`}
                              >
                                <p>{favorite.close_time} </p>
                                <p>結束營業</p>
                              </div>
                            </div>

                            <div
                              className={`${styles['btn-detail-box-bo']} d-flex justify-content-end w-100`}
                            >
                              <button
                                className={`${styles['btn-company-detail']} btn p d-flex justify-content-between align-items-center`}
                              >
                                <FaMagnifyingGlass
                                  className={` ${styles['btn-icon-bo']}`}
                                />

                                <div
                                  className={`${styles['btn-text-bo']}  d-flex justify-content-center align-items-center text-center`}
                                >
                                  <p>前往訂位</p>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

UserFavorite.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
