import { useEffect, useRef, useState, useContext } from 'react'
import styles from '@/styles/boyu/login.module.scss'
import { FaCheck } from 'react-icons/fa6'
import useAuth from '@/hooks/user-bo-auth'
import { AuthContext } from '@/context/AuthContext'

export default function Login() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const onLogin = (event) => {
    event.preventDefault()
    console.log('Login button clicked')
    console.log('Account:', account)
    console.log('Password:', password)
    // login(account, password)
  }

  const userLoginBoxRef = useRef(null)
  const userLoginFormRef = useRef(null)
  const companyLoginBoxRef = useRef(null)
  const companyLoginFormRef = useRef(null)

  useEffect(() => {
    const userLoginBox = userLoginBoxRef.current
    const userLoginForm = userLoginFormRef.current
    // const userFormInputs = userLoginForm.querySelectorAll('input')

    const handleUserLoginBoxClick = (event) => {
      if (!userLoginForm.contains(event.target)) {
        userLoginForm.classList.toggle(styles.active)
      }
    }

    const handleUserLoginBoxMouseLeave = () => {
      if (!userLoginForm.classList.contains(styles['form-focused'])) {
        userLoginForm.classList.remove(styles.active)
      }
    }

    const handleUserLoginFormClick = (event) => {
      event.stopPropagation()
    }

    const handleFocus = () => {
      userLoginBox.classList.add(styles.hover)
      userLoginForm.classList.add(styles['form-focused'])
    }

    const handleBlur = () => {
      userLoginForm.classList.remove(styles['form-focused'])
      if (!userLoginForm.contains(document.activeElement)) {
        userLoginBox.classList.remove(styles.hover)
      }
    }

    userLoginBox.addEventListener('click', handleUserLoginBoxClick)
    userLoginBox.addEventListener('mouseleave', handleUserLoginBoxMouseLeave)
    userLoginForm.addEventListener('click', handleUserLoginFormClick)
    // userFormInputs.forEach((input) => {
    //   input.addEventListener('focus', handleFocus)
    //   input.addEventListener('blur', handleBlur)
    // })

    return () => {
      userLoginBox.removeEventListener('click', handleUserLoginBoxClick)
      userLoginBox.removeEventListener(
        'mouseleave',
        handleUserLoginBoxMouseLeave
      )
      userLoginForm.removeEventListener('click', handleUserLoginFormClick)
    }
  }, [])

  useEffect(() => {
    const companyLoginBox = companyLoginBoxRef.current
    const companyLoginForm = companyLoginFormRef.current
    const companyFormInputs = companyLoginForm.querySelectorAll('input')

    const handleCompanyLoginBoxClick = (event) => {
      if (!companyLoginForm.contains(event.target)) {
        companyLoginForm.classList.toggle(styles.active)
      }
    }

    const handleCompanyLoginBoxMouseLeave = () => {
      if (!companyLoginForm.classList.contains(styles['form-focused'])) {
        companyLoginForm.classList.remove(styles.active)
      }
    }

    const handleCompanyLoginFormClick = (event) => {
      event.stopPropagation()
    }

    const handleFocus = () => {
      companyLoginBox.classList.add(styles.hover)
      companyLoginForm.classList.add(styles['form-focused'])
    }

    const handleBlur = () => {
      companyLoginForm.classList.remove(styles['form-focused'])
      if (!companyLoginForm.contains(document.activeElement)) {
        companyLoginBox.classList.remove(styles.hover)
      }
    }

    companyLoginBox.addEventListener('click', handleCompanyLoginBoxClick)
    companyLoginBox.addEventListener(
      'mouseleave',
      handleCompanyLoginBoxMouseLeave
    )
    companyLoginForm.addEventListener('click', handleCompanyLoginFormClick)
    companyFormInputs.forEach((input) => {
      input.addEventListener('focus', handleFocus)
      input.addEventListener('blur', handleBlur)
    })

    return () => {
      companyLoginBox.removeEventListener('click', handleCompanyLoginBoxClick)
      companyLoginBox.removeEventListener(
        'mouseleave',
        handleCompanyLoginBoxMouseLeave
      )
      companyLoginForm.removeEventListener('click', handleCompanyLoginFormClick)
      companyFormInputs.forEach((input) => {
        input.removeEventListener('focus', handleFocus)
        input.removeEventListener('blur', handleBlur)
      })
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
        <form
          // onSubmit={xx}
          // method="post"
          // action={'http://localhost:3005/api/user/login'}
          className={`${styles['user-login-box-bo']}  ${styles['']} justify-content-center align-items-center`}
          ref={userLoginFormRef}
        >
          <div
            className={`${styles['user-login-form-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div className={styles['form-group-bo']}>
              <input
                name="account"
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="帳號"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                name="password"
                type="password"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
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
              type="button"
              className={`${styles['btn-user-login-bo']}  btn h6 d-flex justify-content-between align-items-center`}
              onClick={onLogin}
            >
              登入
              <FaCheck />
            </button>
          </div>
        </form>
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
          <div
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
          </div>
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
              type="button"
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
