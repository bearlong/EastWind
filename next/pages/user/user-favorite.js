import styles from '@/styles/boyu/user-favorite.module.scss'
import UserSidebar from '../../components/user/user-sidebar'

import { FaMagnifyingGlass, FaPhone } from 'react-icons/fa6'
import { PiDeskFill } from 'react-icons/pi'
import { FaStar, FaHeart, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

export default function UserFavorite() {
  return (
    <section className="d-flex flex-column flex-md-row">
      <UserSidebar />
      <div className={`${styles['user-favorite-box-bo']} w-100`}>
        <div className={`${styles['favorite-list-box-bo']} flex-column d-flex`}>
          <div className={styles['favorite-list-head-bo']}>
            <ul
              className={`${styles['favorite-state-box-bo']} d-flex justify-content-around align-items-center text-center`}
            >
              <li>
                <a href="#" className={`${styles['favorite-state-bo']} h5`}>
                  商品
                </a>
              </li>
              <li>
                <a href="#" className={`${styles['favorite-state-bo']} h5`}>
                  棋牌室
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${styles['favorite-state-bo']} ${styles['state-choose-bo']} h5`}
                >
                  課程
                </a>
              </li>
            </ul>
          </div>
          <div
            className={`${styles['favorite-list-body-bo']} d-flex flex-column justify-content-center align-items-center gap-5 `}
          >
            <div className={styles['favorite-course-box-bo']}>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className={`${styles['courseCard']} d-flex flex-column justify-content-center align-items-center`}
                  >
                    <div className={styles['courseImgBox']}>
                      <FaHeart
                        className={` ${styles['course-icon-heart-bo']}`}
                      />
                      <img src="/images/boyu/course/course1.jpg" alt="" />
                    </div>
                    <div className={`${styles['cardBody']} text-center`}>
                      <div
                        className={`${styles['courseName']} d-flex flex-column justify-content-center align-items-center text-center`}
                      >
                        <p className="h6">麻將教練艾瑞克</p>
                        <p
                          className={`${styles['courseDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                        >
                          麻將高手大師班
                        </p>
                        <p className="h6">NT$ 400</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className={styles['favorite-product-box-bo']}>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
                  >
                    <div className={styles['productImgBox']}>
                      <FaHeart
                        className={` ${styles['product-icon-heart-bo']}`}
                      />
                      <img src="/images/boyu/product/product1.jpg" alt="" />
                    </div>
                    <div className={`${styles['cardBody']} text-center`}>
                      <div
                        className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                      >
                        <p className="h6">高竹嵐</p>
                        <p
                          className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                        >
                          矮人十兄弟
                        </p>
                        <p className="h6">NT$ 400</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className={styles['favorite-shop-box-bo']}>
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className={`${styles['shop-card-bo']} d-flex flex-column justify-content-start align-items-center gap-2`}
                  >
                    <div className="h5 d-flex w-100 justify-content-between align-items-center">
                      <h5>長江棋牌社</h5>

                      <FaHeart className={` ${styles['icon-heart-bo']}`} />
                    </div>

                    <div
                      className={`${styles['shop-card-body-bo']} d-flex justify-content-center align-items-center w-100`}
                    >
                      <div className={styles['shop-img-box-bo']}>
                        <img
                          className={styles['shop-img-bo']}
                          src="/images/boyu/shop-logo.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={`${styles['shop-text-box-bo']} w-100 d-flex flex-column align-items-start gap-1`}
                      >
                        <p
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaStar
                            className={` ${styles['icon-star-bo']} ${styles['col-icon-bo']}`}
                          />
                          4.9 ( 27人 )
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
                            <p>新北市板橋區</p>
                            <p>松江街28號</p>
                          </div>
                        </div>
                        <p
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaPhone className={`  ${styles['col-icon-bo']}`} />
                          02-22222222
                        </p>
                        <div
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaClock className={`  ${styles['col-icon-bo']}`} />

                          <div
                            className={`${styles['time-text-box-bo']} d-flex justify-content-center align-items-start text-start `}
                          >
                            <p>營業中</p>
                            <p>(23:30 結束營業)</p>
                          </div>
                        </div>

                        <h6
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <PiDeskFill
                            className={`  ${styles['col-icon-bo']}`}
                          />
                          剩餘桌數：10
                        </h6>
                        <div
                          className={`${styles['btn-detail-box-bo']} d-flex justify-content-end w-100`}
                        >
                          <button
                            className={`${styles['btn-shop-detail']} btn p d-flex justify-content-between align-items-center`}
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
                ))}
            </div>
            <div
              className={`${styles['btn-more']} d-flex justify-content-center align-items-center`}
            >
              <p>查看更多</p>
              <i className={styles['edit-icon']}></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
