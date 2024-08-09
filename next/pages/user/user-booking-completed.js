import React, { useState } from 'react'
import UserSidebar from '../../components/user/user-sidebar'
import styles from '@/styles/boyu/user-booking.module.scss'
import {
  FaSort,
  FaBan,
  FaXmark,
  FaCommentDots,
  FaMagnifyingGlass,
  FaMoneyBill,
  FaShop,
  FaCheck,
  FaPhone,
} from 'react-icons/fa6'
import { FaStar, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa'

export default function UserBookingCanceled() {
  // 使用 useState 來管理選中的排序方式的索引
  const [activeSortIndex, setActiveSortIndex] = useState(0)

  // 排序方式列表
  const sortOptions = [
    '揪團編號從大到小',
    '揪團編號從小到大',
    '預訂時間從早到晚',
    '預訂時間從晚到早',
  ]

  return (
    <>
      <section className="d-flex flex-column flex-md-row">
        <UserSidebar />

        <div className={`${styles['user-booking-box-bo']}   w-100`}>
          <div
            className={`${styles['booking-list-box-bo']} flex-column d-flex`}
          >
            <div className={styles['booking-list-head-bo']}>
              <ul
                className={`${styles['booking-state-box-bo']} d-flex justify-content-around align-items-center text-center`}
              >
                <li>
                  <a href="#" className={`${styles['booking-state-bo']} h5 `}>
                    已預訂
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${styles['booking-state-bo']} ${styles['state-choose-bo']} h5`}
                  >
                    已完成
                  </a>
                </li>
                <li>
                  <a href="#" className={`${styles['booking-state-bo']} h5  `}>
                    已取消
                  </a>
                </li>
              </ul>
            </div>
            <div
              className={`${styles['booking-list-body-bo']} d-flex flex-column justify-content-center text-center`}
            >
              <div className="d-flex justify-content-end align-items-center d-md-none">
                <button
                  className={`${styles['btn-sort-bo']} btn p`}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  排序方式
                  <FaSort />
                </button>

                <div
                  className={`${styles['offcanvas-bo']} offcanvas offcanvas-end`}
                  tabIndex="-1"
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <ul
                      className={`${styles['sort-list-bo']} d-flex flex-column justify-content-center align-items-start`}
                    >
                      <li className="h5">排序方式</li>
                      {sortOptions.map((option, index) => (
                        <li
                          key={index}
                          className="h6 d-flex justify-content-between align-items-center gap-5"
                          onClick={() => setActiveSortIndex(index)}
                        >
                          {option}
                          <FaCheck
                            className={` ${
                              activeSortIndex === index ? '' : 'd-none'
                            }`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles['booking-list-th-bo']}>
                <ul className="text-center">
                  <li className="p d-flex justify-content-center align-items-center text-center gap-3">
                    揪團編號 <FaSort />
                  </li>
                  <li className="p d-flex justify-content-center align-items-center text-center gap-3">
                    棋牌室 <FaSort />
                  </li>
                  <li className="p d-flex justify-content-center align-items-center text-center gap-3">
                    預訂時間 <FaSort />
                  </li>
                  <li className="p d-flex justify-content-center align-items-center text-center gap-3"></li>
                </ul>
              </div>

              <div className={styles['booking-list-tb-bo']}>
                <div
                  className={`${styles['booking-list-col-bo']} d-flex flex-column`}
                >
                  <div className="d-none d-md-block">
                    <input
                      type="checkbox"
                      id="showDetailDesktop"
                      className={styles['show-detail-desktop-bo']}
                    />
                    <label
                      className={`${styles['list-col-head-desktop-bo']} d-none d-md-flex justify-content-around align-items-center text-center`}
                      htmlFor="showDetailDesktop"
                    >
                      <h6>17465544</h6>
                      <h6>麻將大師 板橋店</h6>
                      <div
                        className={`${styles['list-time-bo']} d-flex flex-column flex-row`}
                      >
                        <h6>2023 / 12 / 12</h6>
                        <h6>10 : 00 - 13 : 00</h6>
                      </div>
                      <div
                        className={`h6 d-flex justify-content-center align-items-center gap-2`}
                      >
                        <FaCheck />
                        已完成
                      </div>
                      <h6>
                        <FaChevronDown
                          className={` ${styles['btn-detail-bo']}`}
                        />
                      </h6>
                    </label>
                    <div
                      className={`${styles['list-col-desktop-body-bo']} flex-column flex-sm-row justify-content-between align-items-center gap-2`}
                    >
                      <ul className="d-flex flex-column justify-content-between align-items-start gap-1">
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                        >
                          <FaMapMarkerAlt
                            className={`${styles['col-icon-bo']}`}
                          />
                          新北市板橋區松江街28號
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaPhone className={`${styles['col-icon-bo']}`} />
                          02-22222222
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaShop className={`${styles['col-icon-bo']}`} />
                          大廳 / 1桌
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaMoneyBill className={`${styles['col-icon-bo']}`} />
                          600
                        </li>
                      </ul>

                      <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center gap-3">
                        <button
                          className={`${styles['btn-shop-detail']} btn p d-flex justify-content-center align-items-center`}
                        >
                          <FaMagnifyingGlass
                            className={` ${styles['btn-icon-bo']}`}
                          />
                          <div
                            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                          >
                            <p>店家</p>
                            <p>詳情</p>
                          </div>
                        </button>
                        <button
                          className={`${styles['btn-shop-Contact']} btn p d-flex justify-content-center align-items-center`}
                        >
                          <FaCommentDots />
                          <div
                            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                          >
                            <p>聯絡</p>
                            <p>店家</p>
                          </div>
                        </button>
                        <button
                          className={`${styles['btn-QR-code']} btn p d-flex justify-content-center align-items-center`}
                        >
                          <FaStar />
                          <div
                            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                          >
                            <p>評價</p>
                            <p>店家</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="d-block d-md-none">
                    <input
                      type="checkbox"
                      id="showDetailMobile"
                      className={styles['show-detail-mobile-bo']}
                    />
                    <label
                      className={`${styles['list-col-head-mobile-bo']} d-flex d-md-none justify-content-between align-items-center text-center`}
                      htmlFor="showDetailMobile"
                    >
                      <div className="d-flex flex-column justify-content-center align-items-start gap-2">
                        <div className="d-flex justify-content-between w-100">
                          <h6>17465544</h6>
                        </div>
                        <h6>麻將大師 板橋店</h6>
                        <div
                          className={`${styles['list-time-bo']} d-flex flex-row flex-lg-row`}
                        >
                          <h6>2023 / 12 / 12</h6>
                          <h6>10 : 00 - 13 : 00</h6>
                        </div>
                      </div>
                      <div></div>
                      <div className="d-flex justify-content-center align-items-center gap-4">
                        <div
                          className={`h6 d-flex justify-content-center align-items-center gap-2`}
                        >
                          <FaCheck />
                          已完成
                        </div>
                        <h6>
                          <FaChevronDown
                            className={` ${styles['btn-detail-bo']}`}
                          />
                        </h6>
                      </div>
                    </label>
                    <div
                      className={`${styles['list-col-body-bo']} flex-column flex-sm-row justify-content-between align-items-center gap-2`}
                    >
                      <ul className="d-flex flex-column justify-content-between align-items-start gap-1">
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                        >
                          <FaMapMarkerAlt
                            className={`${styles['col-icon-bo']}`}
                          />
                          新北市板橋區松江街28號
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaPhone className={`${styles['col-icon-bo']}`} />
                          02-22222222
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaShop className={`${styles['col-icon-bo']}`} />
                          大廳 / 1桌
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaMoneyBill className={`${styles['col-icon-bo']}`} />
                          600
                        </li>
                      </ul>

                      <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center gap-3">
                        <button
                          className={`${styles['btn-shop-detail']} btn p d-flex justify-content-center align-items-center`}
                        >
                          <FaMagnifyingGlass
                            className={` ${styles['btn-icon-bo']}`}
                          />
                          <div
                            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                          >
                            <p>店家</p>
                            <p>詳情</p>
                          </div>
                        </button>
                        <button
                          className={`${styles['btn-shop-Contact']} btn p d-flex justify-content-center align-items-center`}
                        >
                          <FaCommentDots />
                          <div
                            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                          >
                            <p>聯絡</p>
                            <p>店家</p>
                          </div>
                        </button>
                        <button
                          className={`${styles['btn-QR-code']} btn p d-flex justify-content-center align-items-center`}
                        >
                          <FaStar />
                          <div
                            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                          >
                            <p>評價</p>
                            <p>店家</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 這裡省略了其餘的預訂列表項目，你可以根據需要添加更多項目 */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
