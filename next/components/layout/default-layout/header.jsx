import { useContext, useEffect, useState } from 'react'
import styles from '@/styles/boyu/header.module.scss'
import { IoHome } from 'react-icons/io5'
import { FaUser, FaRightFromBracket } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/hooks/use-cart'
import Cart from '@/components/cart'
import useAuth from '@/hooks/user-auth-bo'
import Link from 'next/link'
import { AuthContext } from '@/context/AuthContext'
import Swal from 'sweetalert2'

export default function Header() {
  const {
    cart,
    top,
    error,
    remark,
    show,
    setRemark,
    handleIncrease = () => {},
    handleDecrease = () => {},
    handleRemove = () => {},
    handleShow = () => {},
    handleClose = () => {},
  } = useCart()

  const { logout } = useAuth()
  const { user } = useContext(AuthContext)

  const onLogout = (event) => {
    event.preventDefault()

    // 顯示登出確認提示

    Swal.fire({
      title: '您確定要登出嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認登出',
      cancelButtonText: '取消登出',
      customClass: {
        popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
        title: 'h6',
        icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
        confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
        cancelButton: `${styles['swal-btn-cancel-bo']}`, // 你可以自定義取消按鈕的樣式
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout() // 如果用戶確認登出，執行登出操作
        Swal.fire({
          title: '登出成功！',
          icon: 'success',
          confirmButtonText: 'OK', // 修改按鈕文字

          customClass: {
            title: 'h6',
            icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
            confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
          },
        })
      }
    })
  }

  return (
    <>
      <header
        className={`${styles['header-bo']} fixed-top container-fluid sticky-top py-3`}
      >
        <div
          className={`${styles['header-box-bo']}  container-fluid d-flex justify-content-between align-items-center ${styles['nav-bar-bo']}`}
        >
          <div className={styles['logo-box-bo']}>
            <Link href="/home">
              <img
                src="/images/boyu/logo.svg"
                alt=""
                className={styles['logo-bo']}
              />
            </Link>
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
                <Link href="/home">
                  <IoHome className={` ${styles['icon-bo']}`} />
                </Link>
              </li>
              <li>
                {user ? (
                  <Link href="/user/user-center/info">
                    <FaUser className={` ${styles['icon-bo']}`} />
                  </Link>
                ) : (
                  <Link href="/login">
                    <FaUser className={` ${styles['icon-bo']}`} />
                  </Link>
                )}
              </li>
              <li>
                <div className="position-relative">
                  <FaShoppingCart
                    className={` ${styles['icon-bo']}`}
                    onClick={handleShow}
                  />

                  <div
                    className={`d-flex justify-content-center align-items-center p ${
                      styles['cart-number-bo']
                    } ${cart.length ? '' : 'd-none'}`}
                  >
                    {cart.length}
                  </div>
                </div>
              </li>
              {user && ( // 只有在 user 存在時才顯示登出按鈕
                <li>
                  <Link href="" type="button" onClick={onLogout}>
                    <FaRightFromBracket className={` ${styles['icon-bo']}`} />
                  </Link>
                </li>
              )}

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
                      <span className={styles['navigation-icon-bo']}>
                        &nbsp;
                      </span>
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
        <style jsx>
          {`
            header {
              padding-right: 0 !important;
              margin-right: 0 !important;
            }
          `}
        </style>
      </header>
      <Cart
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        cart={cart}
        top={top}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
        handleRemove={handleRemove}
        remark={remark}
        setRemark={setRemark}
      />
    </>
  )
}
