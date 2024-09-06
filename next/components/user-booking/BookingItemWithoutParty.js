import React from 'react'
import {
  FaBan,
  FaCheck,
  FaXmark,
  FaMapMarkerAlt,
  FaPhone,
  FaShop,
  FaMoneyBill,
  FaChevronDown,
  FaMagnifyingGlass,
} from 'react-icons/fa6'
import Link from 'next/link'
import styles from '@/styles/boyu/user-booking.module.scss'

export default function BookingItemWithoutParty({
  user,
  item,
  selectedStatus,
  cancelBooking,
}) {
  return (
    <div className={styles['booking-list-tb-bo']}>
      <div className={`${styles['booking-list-col-bo']} d-flex flex-column`}>
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
                <h6>{item.end_time}</h6>
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
              <FaChevronDown className={` ${styles['btn-detail-bo']}`} />
            </h6>
          </label>
          <div
            className={`${styles['list-col-desktop-body-bo']} flex-column flex-sm-row justify-content-between align-items-center gap-2`}
          >
            <ul className="d-flex flex-column justify-content-between align-items-start gap-1">
              <li
                className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
              >
                <FaMapMarkerAlt className={`${styles['col-icon-bo']}`} />
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
                href={`/lobby/Company/${item.company_id}`}
                className={`${styles['btn-shop-detail']} btn p d-flex justify-content-center align-items-center`}
              >
                <FaMagnifyingGlass className={` ${styles['btn-icon-bo']}`} />
                <div
                  className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                >
                  <p>店家</p>
                  <p>詳情</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
