import React from 'react'
import styles from '@/styles/boyu/header.module.scss'
import { IoHome } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'

export default function Header() {
  return (
    <header
      className={`${styles['header-bo']} fixed-top container-fluid sticky-top py-3`}
    >
      <div
        className={`${styles['header-box-bo']}  container-fluid d-flex justify-content-between align-items-center ${styles['nav-bar-bo']}`}
      >
        <div className={styles['logo-box-bo']}>
          <a href="">
            <img
              src="/images/boyu/logo.svg"
              alt=""
              className={styles['logo-bo']}
            />
          </a>
        </div>
        <nav className={styles['nav-bar-bo']}>
          <ul
            className={`d-flex justify-content-center align-items-center ${styles['nav-list-bo']}`}
          >
            <li>
              <a className={`h6 ${styles['nav-link-bo']}`} href="">
                棋牌室
              </a>
            </li>
            <li>
              <a className={`h6 ${styles['nav-link-bo']}`} href="">
                商城
              </a>
            </li>
            <li>
              <a className={`h6 ${styles['nav-link-bo']}`} href="">
                線上課程
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles['icon-box-bo']}>
          <ul
            className={`d-flex justify-content-center align-items-center ${styles['icon-list-bo']}`}
          >
            <li>
              <a href="">
                <IoHome className={` ${styles['icon-bo']}`} />
              </a>
            </li>
            <li>
              <a href="">
                <FaUser className={` ${styles['icon-bo']}`} />
              </a>
            </li>
            <li>
              <a href="" className="position-relative">
                <FaShoppingCart className={` ${styles['icon-bo']}`} />

                <div
                  className={`d-flex justify-content-center align-items-center p ${styles['cart-number-bo']}`}
                >
                  1
                </div>
              </a>
            </li>
            <li>
              <div className={styles['navigation-bo']}>
                <div className={styles['navigation-box-bo']}>
                  <input
                    type="checkbox"
                    className={styles['navigation-checkbox-bo']}
                    id="navi-toggle"
                  />
                  <label
                    htmlFor="navi-toggle"
                    className={styles['navigation-button-bo']}
                  >
                    <span className={styles['navigation-icon-bo']}>&nbsp;</span>
                  </label>
                  <div className={styles['navigation-background-bo']}>
                    &nbsp;
                  </div>
                  <nav className={styles['navigation-nav-bo']}>
                    <ul className={styles['navigation-list-bo']}>
                      <li className={styles['navigation-item-bo']}>
                        <a
                          href="#"
                          className={`h6 ${styles['navigation-link-bo']}`}
                        >
                          棋牌室
                        </a>
                      </li>
                      <li className={styles['navigation-item-bo']}>
                        <a
                          href="#"
                          className={`h6 ${styles['navigation-link-bo']}`}
                        >
                          商城
                        </a>
                      </li>
                      <li className={styles['navigation-item-bo']}>
                        <a
                          href="#"
                          className={`h6 ${styles['navigation-link-bo']}`}
                        >
                          線上課程
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
