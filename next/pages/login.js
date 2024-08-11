import { useEffect } from 'react'
import styles from '@/styles/boyu/login.module.scss'

export default function Login() {
  return (
    <section
      className={`${styles['login-box-bo']} d-flex flex-column flex-md-row justify-content-center align-items-center`}
    >
      {/* 使用者登入區域 */}
      <div
        className={`${styles['user-login-section-bo']} d-flex flex-column justify-content-center align-items-center`}
      >
        <div className={`${styles['user-login-title-bo']} d-flex`}>
          <h3>會</h3>
          <h3>員</h3>
          <h3>登</h3>
          <h3>入</h3>
        </div>
        <div
          className={`${styles['user-login-box-bo']} justify-content-center align-items-center`}
        >
          <form
            className={`${styles['user-login-form-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div className={styles['form-group-bo']}>
              <div
                className={`${styles['email-box-bo']} d-flex justify-content-end align-items-start`}
              >
                <button className="btn btn-get-CAPTCHA-bo">傳送驗證碼</button>
              </div>
              <input
                type="email"
                className={`h6 ${styles['form-input-bo']} ${styles['input-email-bo']}`}
                placeholder="請輸入電子信箱"
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="請輸入帳號"
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="password"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="請輸入密碼"
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="請輸入驗證碼"
                required
              />
            </div>
          </form>
          <div
            className={`${styles['user-login-option-bo']} d-flex justify-content-center align-items-center h6`}
          >
            <ul className="d-flex gap-3">
              <li>
                <a href="">忘記密碼</a>
              </li>
              <li>|</li>
              <li>
                <a href="">立即註冊</a>
              </li>
            </ul>
          </div>
          <div
            className={`${styles['user-login-btn-bo']} d-flex justify-content-center align-items-center`}
          >
            <button
              className={`btn-user-login-bo btn h6 d-flex justify-content-between align-items-center`}
            >
              登入 <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 公司登入區域 */}
      <div
        className={`${styles['company-login-section-bo']} d-flex flex-column gap-5 justify-content-center align-items-center`}
      >
        <div className={`${styles['company-login-title-bo']} d-flex`}>
          <h3>企</h3>
          <h3>業</h3>
          <h3>登</h3>
          <h3>入</h3>
        </div>
        <div
          className={`${styles['company-login-box-bo']} justify-content-center align-items-center`}
        >
          <form
            className={`${styles['company-login-form-bo']} d-flex flex-column gap-3 justify-content-center align-items-center`}
          >
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="請輸入帳號"
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="password"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="請輸入密碼"
                required
              />
            </div>
          </form>
          <div
            className={`${styles['company-login-option-bo']} d-flex justify-content-center align-items-center h6`}
          >
            <ul className="d-flex gap-3">
              <li>
                <a href="">忘記密碼</a>
              </li>
              <li>|</li>
              <li>
                <a href="">立即註冊</a>
              </li>
            </ul>
          </div>
          <div
            className={`${styles['company-login-btn-bo']} d-flex justify-content-center align-items-center`}
          >
            <button
              className={`btn-company-login-bo btn h6 d-flex justify-content-between align-items-center`}
            >
              登入 <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
