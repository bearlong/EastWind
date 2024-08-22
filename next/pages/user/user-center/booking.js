import React, { useState, useContext, useEffect } from 'react'
import UserCenterLayout from '@/components/layout/user-center-layout'
import { AuthContext } from '@/context/AuthContext'
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
import Link from 'next/link'
import Swal from 'sweetalert2'

export default function UserBooking() {
  const [activeSortIndex, setActiveSortIndex] = useState(0)
  const { user } = useContext(AuthContext)
  const [selectedStatus, setSelectedStatus] = useState('booked')
  const [booking, setBooking] = useState([])

  // 排序方式列表
  const sortOptions = [
    { label: '預訂編號從大到小', key: 'order_number', order: 'desc' },
    { label: '預訂編號從小到大', key: 'order_number', order: 'asc' },
    { label: '棋牌室從A到Z', key: 'company_name', order: 'asc' },
    { label: '棋牌室從Z到A', key: 'company_name', order: 'desc' },
    { label: '預訂時間從早到晚', key: 'date', order: 'asc' },
    { label: '預訂時間從晚到早', key: 'date', order: 'desc' },
  ]

  const changeStatus = (status) => {
    setSelectedStatus(status)
  }

  const sortBooking = (key, order) => {
    const sortedBookings = [...booking].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1
      } else {
        return a[key] < b[key] ? 1 : -1
      }
    })
    setBooking(sortedBookings)
  }

  const sortByIndex = (index) => {
    setActiveSortIndex(index)
    const { key, order } = sortOptions[index]
    sortBooking(key, order)
  }

  const formatTime = (time) => {
    return time.split(':').slice(0, 2).join(':')
  }

  useEffect(() => {
    if (user && user.id) {
      fetch(
        `http://localhost:3005/api/user-booking/${user.id}/${selectedStatus}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            const transformedBookings = data.data.bookings.map((booking) => ({
              ...booking,
              playroom_type: booking.playroom_type === 0 ? '大廳' : '包廂',
              price: Math.floor(booking.total_price),
              start_time: formatTime(booking.start_time),
              end_time: formatTime(booking.end_time),
            }))
            setBooking(transformedBookings)
          } else {
            console.error('Failed to fetch bookings:', data.message)
          }
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error)
        })
    }
  }, [selectedStatus, user])

  const cancelBooking = (bookingId) => {
    Swal.fire({
      title: '你確定要取消預訂嗎？',
      html: `<span class="p">取消後將無法恢復！</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認取消',
      cancelButtonText: '取消操作',
      customClass: {
        popup: `${styles['swal-popup-bo']}`,
        title: 'h6',
        icon: `${styles['swal-icon-bo']}`,
        confirmButton: `${styles['swal-btn-bo']}`,
        cancelButton: `${styles['swal-btn-cancel-bo']}`,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3005/api/user-booking/cancel/${bookingId}`, {
          method: 'PUT',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'success') {
              Swal.fire({
                title: '已取消！',
                html: `<span class="p">你的預訂已被取消。</span>`,
                icon: 'success',
                confirmButtonText: '確認',
                customClass: {
                  popup: `${styles['swal-popup-bo']}`,
                  title: 'h6',
                  icon: `${styles['swal-icon-bo']}`,
                  confirmButton: `${styles['swal-btn-bo']}`,
                  cancelButton: `${styles['swal-btn-cancel-bo']}`,
                },
              }).then(() => {
                // 更新預訂狀態並跳轉到已取消狀態
                setSelectedStatus('cancelled')
                setBooking((prevBookings) =>
                  prevBookings.filter((item) => item.id !== bookingId)
                )
              })
            } else {
              Swal.fire({
                title: '錯誤！',
                html: `<span class="p">${data.message}</span>`,
                icon: 'error',
                confirmButtonText: '確認',
                customClass: {
                  popup: `${styles['swal-popup-bo']}`,
                  title: 'h6',
                  icon: `${styles['swal-icon-bo']}`,
                  confirmButton: `${styles['swal-btn-bo']}`,
                  cancelButton: `${styles['swal-btn-cancel-bo']}`,
                },
              })
            }
          })
          .catch((error) => {
            console.error('Error updating booking:', error)
            Swal.fire({
              title: '錯誤！',
              html: `<span class="p">無法取消預訂。</span>`,
              icon: 'error',
              confirmButtonText: '確認',
              customClass: {
                popup: `${styles['swal-popup-bo']}`,
                title: 'h6',
                icon: `${styles['swal-icon-bo']}`,
                confirmButton: `${styles['swal-btn-bo']}`,
                cancelButton: `${styles['swal-btn-cancel-bo']}`,
              },
            })
          })
      }
    })
  }

  return (
    <>
      <div className={`${styles['user-booking-box-bo']}   w-100`}>
        <div className={`${styles['booking-list-box-bo']} flex-column d-flex`}>
          <div className={styles['booking-list-head-bo']}>
            <ul
              className={`${styles['booking-state-box-bo']} d-flex justify-content-around align-items-center text-center`}
            >
              <li>
                <button
                  onClick={() => changeStatus('booked')}
                  className={`${styles['booking-state-bo']} h5 ${
                    selectedStatus === 'booked' ? styles['state-choose-bo'] : ''
                  }`}
                >
                  已預訂
                </button>
              </li>
              <li>
                <button
                  onClick={() => changeStatus('completed')}
                  className={`${styles['booking-state-bo']} h5 ${
                    selectedStatus === 'completed'
                      ? styles['state-choose-bo']
                      : ''
                  }`}
                >
                  已完成
                </button>
              </li>
              <li>
                <button
                  onClick={() => changeStatus('cancelled')}
                  className={`${styles['booking-state-bo']} h5 ${
                    selectedStatus === 'cancelled'
                      ? styles['state-choose-bo']
                      : ''
                  }`}
                >
                  已取消
                </button>
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
                        className={`h6 d-flex justify-content-between align-items-center gap-5 ${styles['sort-list-li-bo']}`}
                        onClick={() => sortByIndex(index)}
                      >
                        {option.label}
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
                <li
                  className="p d-flex justify-content-center align-items-center text-center gap-3"
                  onClick={() => sortByIndex(activeSortIndex === 1 ? 0 : 1)} // 切換排序方式
                >
                  預訂編號 <FaSort />
                </li>
                <li
                  className="p d-flex justify-content-center align-items-center text-center gap-3"
                  onClick={() => sortByIndex(activeSortIndex === 3 ? 2 : 3)} // 切換排序方式
                >
                  棋牌室 <FaSort />
                </li>
                <li
                  className="p d-flex justify-content-center align-items-center text-center gap-3"
                  onClick={() => sortByIndex(activeSortIndex === 5 ? 4 : 5)} // 切換排序方式
                >
                  預訂時間 <FaSort />
                </li>
                <li className="p d-flex justify-content-center align-items-center text-center gap-3"></li>
              </ul>
            </div>
            {booking.map((item) => (
              <div
                className={styles['booking-list-tb-bo']}
                key={item.order_number}
              >
                <div
                  className={`${styles['booking-list-col-bo']} d-flex flex-column`}
                >
                  <div className="d-none d-md-block">
                    <input
                      type="checkbox"
                      id={`showDetailDesktop${item.id}`}
                      className={styles['show-detail-desktop-bo']}
                    />
                    <label
                      className={`${styles['list-col-head-desktop-bo']} d-none d-md-grid text-center`}
                      htmlFor={`showDetailDesktop${item.id}`}
                    >
                      <h6>{item.order_number}</h6>
                      <h6>{item.company_name}</h6>
                      <div
                        className={`${styles['list-time-bo']} d-flex flex-column flex-row`}
                      >
                        <h6>{item.date}</h6>
                        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center text-start">
                          <h6>{item.start_time}-</h6>
                          <h6> {item.end_time}</h6>
                        </div>
                      </div>
                      {selectedStatus === 'booked' && (
                        <button
                          className={`${styles['btn-cancel-bo']} btn h6 d-flex justify-content-center align-items-center gap-2`}
                          onClick={() => cancelBooking(item.id)}
                        >
                          <FaBan />
                          <div
                            className={`${styles['btn-cancel-text-bo']} d-flex justify-content-center align-items-center text-center`}
                          >
                            <p>取消</p>
                            <p>預訂</p>
                          </div>
                        </button>
                      )}
                      {selectedStatus === 'completed' && (
                        <div
                          className={`${styles['state-text-bo']} h6 d-flex justify-content-center align-items-center gap-2`}
                        >
                          <FaCheck />
                          已完成
                        </div>
                      )}
                      {selectedStatus === 'cancelled' && (
                        <div
                          className={`${styles['state-text-bo']} h6 d-flex justify-content-center align-items-center gap-2`}
                        >
                          <FaXmark />
                          已取消
                        </div>
                      )}
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
                          {item.company_address}
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaPhone className={`${styles['col-icon-bo']}`} />
                          {item.company_tele}
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaShop className={`${styles['col-icon-bo']}`} />
                          {item.playroom_type} / {item.table_number} 號桌
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaMoneyBill className={`${styles['col-icon-bo']}`} />
                          {item.price}
                        </li>
                      </ul>

                      <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center gap-3">
                        <Link
                          href={`/lobby/Company/${item.id}`}
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
                        </Link>

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

                  {/* Mobile view */}
                  <div className="d-block d-md-none">
                    <input
                      type="checkbox"
                      id={`showDetailMobile${item.id}`}
                      className={styles['show-detail-mobile-bo']}
                    />
                    <label
                      className={`${styles['list-col-head-mobile-bo']} d-flex d-md-none justify-content-between align-items-center gap-2 text-start`}
                      htmlFor={`showDetailMobile${item.id}`}
                    >
                      <div
                        className={`d-flex flex-column justify-content-center align-items-start gap-2 `}
                      >
                        <div className="d-flex justify-content-between w-100">
                          <h6>{item.order_number}</h6>
                        </div>
                        <h6>{item.company_name}</h6>
                        <div
                          className={`${styles['list-time-bo']} d-flex flex-row text-start flex-lg-row`}
                        >
                          <h6>{item.date}</h6>
                          <h6>
                            {item.start_time} - {item.end_time}
                          </h6>
                        </div>
                      </div>
                      <div></div>
                      <div className="d-flex justify-content-center align-items-center gap-4 ">
                        {selectedStatus === 'booked' && (
                          <button
                            className={`${styles['btn-cancel-bo']} btn h6 d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => cancelBooking(item.id)}
                          >
                            <FaBan />
                            <div
                              className={`${styles['btn-cancel-text-bo']} d-flex justify-content-center align-items-center text-center`}
                            >
                              <p>取消</p>
                              <p>預訂</p>
                            </div>
                          </button>
                        )}
                        {selectedStatus === 'completed' && (
                          <div
                            className={` ${styles['state-text-bo']} h6 d-flex justify-content-center align-items-center gap-2`}
                          >
                            <FaCheck />
                            已完成
                          </div>
                        )}
                        {selectedStatus === 'cancelled' && (
                          <div
                            className={` ${styles['state-text-bo']} h6 d-flex justify-content-center align-items-center gap-2`}
                          >
                            <FaXmark />
                            已取消
                          </div>
                        )}
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
                      <ul className="d-flex flex-column justify-content-between align-items-start gap-1 ">
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                        >
                          <FaMapMarkerAlt
                            className={`${styles['col-icon-bo']}`}
                          />
                          {item.company_address}
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaPhone className={`${styles['col-icon-bo']}`} />
                          {item.company_tele}
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaShop className={`${styles['col-icon-bo']}`} />
                          {item.playroom_type} / {item.table_number} 號桌
                        </li>
                        <li
                          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                        >
                          <FaMoneyBill className={`${styles['col-icon-bo']}`} />
                          {item.price}
                        </li>
                      </ul>

                      <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center gap-3">
                        <Link
                          href={`/lobby/Company/${item.id}`}
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
                        </Link>

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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
UserBooking.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
