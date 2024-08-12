import { useEffect, useRef } from 'react'
import styles from '@/styles/boyu/login.module.scss'
import { FaCheck } from 'react-icons/fa6'

export default function Login() {
  const userLoginBoxRef = useRef(null)
  const userLoginFormRef = useRef(null)
  const companyLoginBoxRef = useRef(null)
  const companyLoginFormRef = useRef(null)

  useEffect(() => {
    const userLoginBox = userLoginBoxRef.current
    const userLoginForm = userLoginFormRef.current
    const companyLoginBox = companyLoginBoxRef.current
    const companyLoginForm = companyLoginFormRef.current

    // 點擊 .user-login-section-bo 時切換 active 類
    const handleUserLoginBoxClick = (event) => {
      if (!userLoginForm.contains(event.target)) {
        userLoginForm.classList.toggle(`${styles['active']}`) // 使用 `${styles['active']}`
      }
    }

    // 當鼠標移出 .user-login-section-bo 時，隱藏表單
    const handleUserLoginBoxMouseLeave = () => {
      if (!userLoginForm.classList.contains(`${styles['form-focused']}`)) {
        userLoginForm.classList.remove(`${styles['active']}`) // 使用 `${styles['active']}`
      }
    }

    // 防止點擊 .user-login-box-bo 內部時觸發 .user-login-section-bo 的點擊事件
    const handleUserLoginFormClick = (event) => {
      event.stopPropagation()
    }

    // 點擊 .company-login-section-bo 時切換 active 類
    const handleCompanyLoginBoxClick = (event) => {
      if (!companyLoginForm.contains(event.target)) {
        companyLoginForm.classList.toggle(`${styles['active']}`) // 使用 `${styles['active']}`
      }
    }

    // 當鼠標移出 .company-login-section-bo 時，隱藏表單
    const handleCompanyLoginBoxMouseLeave = () => {
      if (!companyLoginForm.classList.contains(`${styles['form-focused']}`)) {
        companyLoginForm.classList.remove(`${styles['active']}`) // 使用 `${styles['active']}`
      }
    }

    // 防止點擊 .company-login-box-bo 內部時觸發 .company-login-section-bo 的點擊事件
    const handleCompanyLoginFormClick = (event) => {
      event.stopPropagation()
    }

    // 添加事件監聽器
    userLoginBox.addEventListener('click', handleUserLoginBoxClick)
    userLoginBox.addEventListener('mouseleave', handleUserLoginBoxMouseLeave)
    userLoginForm.addEventListener('click', handleUserLoginFormClick)
    companyLoginBox.addEventListener('click', handleCompanyLoginBoxClick)
    companyLoginBox.addEventListener(
      'mouseleave',
      handleCompanyLoginBoxMouseLeave
    )
    companyLoginForm.addEventListener('click', handleCompanyLoginFormClick)

    // 在 useEffect 清理階段移除事件監聽器
    return () => {
      userLoginBox.removeEventListener('click', handleUserLoginBoxClick)
      userLoginBox.removeEventListener(
        'mouseleave',
        handleUserLoginBoxMouseLeave
      )
      userLoginForm.removeEventListener('click', handleUserLoginFormClick)
      companyLoginBox.removeEventListener('click', handleCompanyLoginBoxClick)
      companyLoginBox.removeEventListener(
        'mouseleave',
        handleCompanyLoginBoxMouseLeave
      )
      companyLoginForm.removeEventListener('click', handleCompanyLoginFormClick)
    }
  }, [])

  return (
    <section
      className={`${styles['login-box-bo']} d-flex flex-column flex-md-row justify-content-center align-items-center`}
    >
      {/* 使用者登入區域 */}
      <div
        className={`${styles['user-login-section-bo']} d-flex flex-column justify-content-center align-items-center`}
        ref={userLoginBoxRef}
      >
        <div className={`${styles['user-login-title-bo']} d-flex`}>
          <h3>會</h3>
          <h3>員</h3>
          <h3>登</h3>
          <h3>入</h3>
        </div>
        <div
          className={`${styles['user-login-box-bo']} justify-content-center align-items-center`}
          ref={userLoginFormRef}
        >
          <form
            className={`${styles['user-login-form-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div className={styles['form-group-bo']}>
              <div
                className={`${styles['email-box-bo']} d-flex justify-content-end align-items-start`}
              >
                <button className={`${styles['btn-get-CAPTCHA-bo']} btn `}>
                  傳送驗證碼
                </button>
              </div>
              <input
                type="email"
                className={`h6 ${styles['form-input-bo']} ${styles['input-email-bo']}`}
                placeholder="電子信箱"
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="帳號"
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="password"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="密碼"
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="驗證碼"
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
              className={`${styles['btn-user-login-bo']} btn h6 d-flex justify-content-between align-items-center`}
            >
              登入
              <FaCheck />
            </button>
          </div>
        </div>
      </div>

      {/* 公司登入區域 */}
      <div
        className={`${styles['company-login-section-bo']} d-flex flex-column gap-5 justify-content-center align-items-center`}
        ref={companyLoginBoxRef}
      >
        <div className={`${styles['company-login-title-bo']} d-flex`}>
          <h3>企</h3>
          <h3>業</h3>
          <h3>登</h3>
          <h3>入</h3>
        </div>
        <div
          className={`${styles['company-login-box-bo']} justify-content-center align-items-center`}
          ref={companyLoginFormRef}
        >
          <form
            className={`${styles['company-login-form-bo']} d-flex flex-column gap-3 justify-content-center align-items-center`}
          >
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="帳號"
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="password"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="密碼"
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
              className={`${styles['btn-company-login-bo']} btn h6 d-flex justify-content-between align-items-center`}
            >
              登入
              <FaCheck />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
