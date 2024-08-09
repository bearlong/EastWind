import React from 'react'
import styles from '@/styles/boyu/register.module.scss'

export default function Register() {
  return (
    <>
      <main>
        <section
          className={`${styles['register-box-bo']} d-flex flex-column flex-md-row justify-content-center align-items-center`}
        >
          {/* 使用者註冊區域 */}
          <div
            className={`${styles['user-register-section-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div className={`${styles['user-register-title-bo']} d-flex`}>
              <h3>會</h3>
              <h3>員</h3>
              <h3>註</h3>
              <h3>冊</h3>
            </div>
            <div
              className={`${styles['user-register-box-bo']} justify-content-center align-items-center`}
            >
              <form
                className={`${styles['user-register-form-bo']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['form-group-bo']}>
                  <div
                    className={`${styles['email-box-bo']} d-flex justify-content-end align-items-start`}
                  >
                    <button className="btn btn-get-CAPTCHA-bo">
                      傳送驗證碼
                    </button>
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
                className={`${styles['user-register-btn-box-bo']} d-flex justify-content-center align-items-center`}
              >
                <button
                  className={`btn-user-register-bo btn h6 d-flex justify-content-between align-items-center`}
                >
                  取消註冊 <i className="fa-solid fa-xmark"></i>
                </button>
                <button
                  className={`btn-user-register-bo btn h6 d-flex justify-content-between align-items-center`}
                >
                  確定註冊 <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          </div>

          {/* 公司註冊區域 */}
          <div
            className={`${styles['company-register-section-bo']} d-flex flex-column gap-5 justify-content-center align-items-center`}
          >
            <div className={`${styles['company-register-title-bo']} d-flex`}>
              <h3>企</h3>
              <h3>業</h3>
              <h3>註</h3>
              <h3>冊</h3>
            </div>
            <div
              className={`${styles['company-register-box-bo']} justify-content-center align-items-center`}
            >
              <form
                className={`${styles['company-register-form-bo']} d-flex flex-column gap-3 justify-content-center align-items-center`}
              >
                <div className={styles['form-group-bo']}>
                  <div
                    className={`${styles['email-box-bo']} d-flex justify-content-end align-items-start`}
                  >
                    <button className="btn btn-get-CAPTCHA-bo">點擊驗證</button>
                  </div>
                  <input
                    type="text"
                    className={`h6 ${styles['form-input-bo']} ${styles['input-taxID-bo']}`}
                    placeholder="請輸入統編"
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
              </form>

              <div
                className={`${styles['company-register-btn-box-bo']} d-flex justify-content-center align-items-center`}
              >
                <button
                  className={`btn-company-register-bo btn h6 d-flex justify-content-between align-items-center`}
                >
                  取消註冊 <i className="fa-solid fa-xmark"></i>
                </button>
                <button
                  className={`btn-company-register-bo btn h6 d-flex justify-content-between align-items-center`}
                >
                  確定註冊 <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
