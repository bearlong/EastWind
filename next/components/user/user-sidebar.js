import styles from './user-siderbar.module.scss'
import { FaUserCircle, FaAddressCard } from 'react-icons/fa'
import { HiTicket } from 'react-icons/hi2'
import {
  FaChevronDown,
  FaShop,
  FaHeartCircleCheck,
  FaUserGroup,
} from 'react-icons/fa6'
import { ImBook } from 'react-icons/im'
import { IoReceipt } from 'react-icons/io5'
import Link from 'next/link'

export default function UserSidebar() {
  return (
    <section>
      <aside
        className={`${styles['user-sidebar-bo']} d-flex flex-column align-items-center h-100`}
      >
        <div
          className={`${styles['user-sidebar-head-bo']} d-flex flex-column justify-content-center align-items-center`}
        >
          <div
            className={`d-none d-md-flex ${styles['user-sidebar-title-bo']} d-flex justify-content-center align-items-center h6  gap-3`}
          >
            <FaUserCircle />
            會員中心
          </div>
          <div className={styles['user-img-box-bo']}>
            <img
              className={`${styles['user-img-bo']} d-none d-md-block`}
              src="/images/boyu/user.jpg"
              alt="User"
            />
          </div>
          <div
            className={`${styles['user-welcome-box-bo']} h6 d-none d-md-block`}
          >
            歡迎，蔡宗鈞。
          </div>
        </div>
        <div
          className={`${styles['user-sidebar-body-bo']} d-flex justify-content-start align-items-center`}
        >
          <ul
            className={`${styles['user-sidebar-menu-bo']} d-flex flex-column`}
          >
            <li>
              <input
                type="checkbox"
                id="showDetail"
                className={`d-none ${styles['show-detail-bo']}`}
              />
              <label
                htmlFor="showDetail"
                id="firstLink"
                className={`${styles['user-sidebar-link-bo']} h6 d-flex justify-content-between align-items-center gap-4 ${styles['first-link-bo']}`}
              >
                <div className="d-flex gap-4 justify-content-between align-items-center">
                  <FaAddressCard /> 個人資料
                </div>

                <FaChevronDown
                  className={`fa-solid fa-chevron-down d-block d-md-none ${styles['chevron-icon']}`}
                />
              </label>

              <ul
                id="linkList"
                className={`d-md-block ${styles['user-sidebar-submenu-bo']}`}
              >
                <li>
                  <Link
                    href="http://localhost:3000/user/user-booking-booked"
                    className={`${styles['user-sidebar-link-bo']} h6 d-flex align-items-center gap-4`}
                  >
                    <FaShop />
                    訂桌紀錄
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${styles['user-sidebar-link-bo']} h6 d-flex align-items-center gap-4`}
                  >
                    <FaUserGroup />
                    揪團紀錄
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${styles['user-sidebar-link-bo']} h6 d-flex align-items-center gap-4`}
                  >
                    <IoReceipt />
                    歷史訂單
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${styles['user-sidebar-link-bo']} h6 d-flex align-items-center gap-4`}
                  >
                    <ImBook />
                    課程
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${styles['user-sidebar-link-bo']} h6 d-flex align-items-center gap-4`}
                  >
                    <FaHeartCircleCheck />
                    我的最愛
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${styles['user-sidebar-link-bo']} h6 d-flex align-items-center gap-4`}
                  >
                    <HiTicket />
                    優惠卷
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  )
}
