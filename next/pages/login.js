import { useContext, useEffect, useRef, useState } from 'react'
import styles from '@/styles/boyu/login.module.scss'
import { FaCheck } from 'react-icons/fa6'
import useAuth from '@/hooks/use-auth-bo'
import useFirebase from '@/hooks/use-firebase-bo'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GoogleLogo from '@/components/icons/google-logo'
import LineLogo from '@/components/icons/line-logo'
import GoogleLogoHover from '@/components/icons/google-logo-hover'
import LineLogoHover from '@/components/icons/line-logo-hover' // 引入Line logo的hover狀態
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import {
  lineLoginRequest,
  lineLogout,
  lineLoginCallback,
  getUserById,
  parseJwt,
} from '@/services/user'

export default function Login() {
  const router = useRouter()

  // 定義狀態來管理表單輸入值和錯誤訊息
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [accountError, setAccountError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { login } = useAuth() // 從 useAuth 中解構獲取  和 setUser
  const { loginGoogle } = useFirebase() // 使用 Google 登入功能
  const { setUser, user, setToken, setAuth, initUserData } =
    useContext(AuthContext)
  const [isHovered, setIsHovered] = useState(false)
  const [isLineHovered, setIsLineHovered] = useState(false) // 定義 Line hover 狀態

  // 從 localStorage 中讀取賬號並設置到狀態中
  useEffect(() => {
    const storedAccount = localStorage.getItem('savedAccount') || ''
    setAccount(storedAccount)
  }, [])

  useEffect(() => {
    const storedAccount = localStorage.getItem('registeredAccount') || ''
    const storedPassword = localStorage.getItem('registeredPassword') || ''

    if (storedAccount && storedPassword) {
      setAccount(storedAccount)
      setPassword(storedPassword)
    }
  }, [])

  // 處理登入邏輯
  const onLogin = async (event) => {
    event.preventDefault()

    // 重置錯誤訊息
    setAccountError('')
    setPasswordError('')

    // 檢查是否填寫帳號和密碼
    if (!account) {
      setAccountError('請填寫帳號')
      return
    }

    if (!password) {
      setPasswordError('請填寫密碼')
      return
    }

    try {
      const result = await login(account, password) // 等待登入結果

      if (result.success) {
        onLoginSuccess(result.name)
      } else {
        // 根據返回的錯誤訊息設置相應的錯誤狀態
        if (result.message.includes('帳號')) {
          setAccountError(result.message)
        }
        if (result.message.includes('密碼')) {
          setPasswordError(result.message)
        }
      }
    } catch (error) {
      setAccountError('發生未知錯誤，請稍後再試')
    }
  }

  // 處理Google登入的回調邏輯
  const onGoogleLoginSuccess = async () => {
    try {
      const providerData = await loginGoogle() // 確保 loginGoogle 返回的是完整的使用者資料
      const { uid, email, displayName, photoURL } = providerData

      const response = await fetch('http://localhost:3005/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          google_uid: uid,
          email,
          displayName,
          photoURL,
        }), // 發送使用者資訊到後端
      })

      const result = await response.json()
      console.log('Login Result:', result)

      if (result.status === 'success') {
        localStorage.setItem('refreshToken', result.refreshToken)
        localStorage.setItem('accessToken', result.accessToken)

        setUser({
          id: result.id,
          name: result.name,
          email: email,
          photoURL: photoURL,
        })

        if (result.isNewUser) {
          localStorage.setItem('showWelcomeAlert', 'true')
          window.location.href = '/home'
        } else {
          // 新增歡迎回來的 SweetAlert
          Swal.fire({
            title: '登入成功！',
            html: `<span class="p">${result.name} 歡迎回來！</span>`,
            icon: 'success',
            customClass: {
              popup: `${styles['swal-popup-bo']}`,
              title: 'h6',
              icon: `${styles['swal-icon-bo']}`,
              confirmButton: `${styles['swal-btn-bo']}`,
            },
            confirmButtonText: '確認',
          }).then(() => {
            window.location.href = '/home'
          })
        }
      } else {
        Swal.fire({
          title: 'Google 登入失敗',
          html: `<span class="p">請稍後再試</span>`,
          icon: 'error',
          confirmButtonText: '確認',
          customClass: {
            popup: `${styles['swal-popup-bo']}`,
            title: 'h6',
            icon: `${styles['swal-icon-bo']}`,
            confirmButton: `${styles['swal-btn-bo']}`,
          },
        })
      }
    } catch (error) {
      console.log('Login Error:', error)
      Swal.fire({
        title: '登入錯誤',
        html: `<span class="p">發生未知錯誤，請稍後再試</span>`,
        icon: 'error',
        confirmButtonText: '確認',
        customClass: {
          popup: `${styles['swal-popup-bo']}`,
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`,
          confirmButton: `${styles['swal-btn-bo']}`,
        },
      })
    }
  }

  // 處理登出
  // const handleLineLogout = async () => {
  //   if (!auth.isAuth) return

  //   const res = await lineLogout(auth.userData.line_uid)

  //   console.log(res.data)

  //   // 成功登出個回復初始會員狀態
  //   if (res.data.status === 'success') {
  //     toast.success('已成功登出')

  //     setAuth({
  //       isAuth: false,
  //       userData: initUserData,
  //     })
  //   } else {
  //     toast.error(`登出失敗`)
  //   }
  // }

  // 處理line登入後，要向伺服器進行登入動作
  const callbackLineLogin = async (query) => {
    try {
      // 從 localStorage 中取回保存的 `state` 和 `nonce`
      const savedState = localStorage.getItem('lineLoginState')
      const savedNonce = localStorage.getItem('lineLoginNonce')

      console.log(query)
      // 比對從 URL 中獲得的 `state` 和保存的是否相符
      if (query.state !== savedState) {
        throw new Error('Authorization failed. State does not match.')
      }

      // 清除 localStorage 中的 `state` 和 `nonce`
      localStorage.removeItem('lineLoginState')
      localStorage.removeItem('lineLoginNonce')

      // 發送回調請求至後端
      const res = await lineLoginCallback(query)

      if (res.status === 'error') {
        throw new Error(res.message || 'Authorization failed.')
      }

      // 處理回應邏輯
      if (res.status === 'success' && res.data) {
        const { accessToken, refreshToken } = res.data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        // 進一步處理，例如設置用戶狀態
        // ...
      } else {
        throw new Error('Line 登入失敗')
      }
    } catch (error) {
      console.error('Line login callback error:', error)
      Swal.fire({
        title: '登入錯誤',
        html: `<span class="p">${error.message || '發生未知錯誤'}</span>`,
        icon: 'error',
        confirmButtonText: '確認',
      })
    }
  }

  // 處理登入
  const goLineLogin = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/line-login/login',
        {
          credentials: 'include', // 確保請求攜帶憑證（如 cookies）
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.url) {
        // 在重定向之前，將 `line_login_state` 和 `line_login_nonce` 保存到 localStorage
        localStorage.setItem('lineLoginState', data.state)
        localStorage.setItem('lineLoginNonce', data.nonce)

        window.location.href = data.url
      }
    } catch (error) {
      console.error('Login Error:', error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.code) return

      callbackLineLogin(router.query)
    }
  }, [router.isReady, router.query])

  // 從line登入畫面後回調到本頁面用
  useEffect(() => {
    // 水合作用(hydration)保護，以免得不到window全域物件
    if (router.isReady) {
      // 判斷是否有query.code(網址上沒有code是進登入頁的時候)
      if (!router.query.code) return

      const qs = new URLSearchParams({
        ...router.query,
      }).toString()

      const cbUrl = `http://localhost:3000/login/callback?${qs}`

      // 發送至後端伺服器得到line會員資料
      callbackLineLogin(cbUrl)
    }
    // eslint-disable-next-line
}, [router.isReady, router.query])

  // 成功登入後的處理邏輯
  const onLoginSuccess = (name) => {
    const registeredAccount = localStorage.getItem('registeredAccount')
    if (registeredAccount && registeredAccount === account) {
      localStorage.removeItem('registeredAccount')
      localStorage.removeItem('registeredPassword')
      Swal.fire({
        title: '註冊成功！',
        html: `<span class="p">歡迎加入！請先填寫會員資料。</span>`,
        icon: 'info',
        customClass: {
          popup: `${styles['swal-popup-bo']}`,
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`,
          confirmButton: `${styles['swal-btn-bo']}`,
        },
        confirmButtonText: '確認',
      }).then(() => {
        router.push('/user/user-center/info-edit')
      })
    } else {
      Swal.fire({
        title: '登入成功！',
        html: `<span class="p">${name} 歡迎回來！</span>`,
        icon: 'success',
        customClass: {
          popup: `${styles['swal-popup-bo']}`,
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`,
          confirmButton: `${styles['swal-btn-bo']}`,
        },
        confirmButtonText: '確認',
      })
    }
  }

  // 處理使用者登入表單的交互效果
  const userBoxRef = useRef(null)
  const userFormRef = useRef(null)
  const compBoxRef = useRef(null)
  const compFormRef = useRef(null)

  useEffect(() => {
    const userBox = userBoxRef.current
    const userForm = userFormRef.current
    const userInputs = userForm.querySelectorAll('input')

    const toggleFormActive = (event) => {
      if (!userForm.contains(event.target)) {
        userForm.classList.toggle(styles.active)
      }
    }

    const deactivateForm = () => {
      if (!userForm.classList.contains(styles['form-focused'])) {
        userForm.classList.remove(styles.active)
      }
    }

    const focusInput = () => {
      userBox.classList.add(styles.hover)
      userForm.classList.add(styles['form-focused'])
    }

    const blurInput = () => {
      userForm.classList.remove(styles['form-focused'])
      if (!userForm.contains(document.activeElement)) {
        userBox.classList.remove(styles.hover)
      }
    }

    userBox.addEventListener('click', toggleFormActive)
    userBox.addEventListener('mouseleave', deactivateForm)

    userInputs.forEach((input) => {
      input.addEventListener('focus', focusInput)
      input.addEventListener('blur', blurInput)
    })

    return () => {
      userBox.removeEventListener('click', toggleFormActive)
      userBox.removeEventListener('mouseleave', deactivateForm)
      userInputs.forEach((input) => {
        input.removeEventListener('focus', focusInput)
        input.removeEventListener('blur', blurInput)
      })
    }
  }, [])

  // 處理公司登入表單的交互效果
  useEffect(() => {
    const companyBox = compBoxRef.current
    const companyForm = compFormRef.current
    const companyInputs = companyForm.querySelectorAll('input')

    const toggleFormActive = (event) => {
      if (!companyForm.contains(event.target)) {
        companyForm.classList.toggle(styles.active)
      }
    }

    const deactivateForm = () => {
      if (!companyForm.classList.contains(styles['form-focused'])) {
        companyForm.classList.remove(styles.active)
      }
    }

    const focusInput = () => {
      companyBox.classList.add(styles.hover)
      companyForm.classList.add(styles['form-focused'])
    }

    const blurInput = () => {
      companyForm.classList.remove(styles['form-focused'])
      if (!companyForm.contains(document.activeElement)) {
        companyBox.classList.remove(styles.hover)
      }
    }

    companyBox.addEventListener('click', toggleFormActive)
    companyBox.addEventListener('mouseleave', deactivateForm)

    companyInputs.forEach((input) => {
      input.addEventListener('focus', focusInput)
      input.addEventListener('blur', blurInput)
    })

    return () => {
      companyBox.removeEventListener('click', toggleFormActive)
      companyBox.removeEventListener('mouseleave', deactivateForm)
      companyInputs.forEach((input) => {
        input.removeEventListener('focus', focusInput)
        input.removeEventListener('blur', blurInput)
      })
    }
  }, [])

  // 渲染登入頁面
  return (
    <section
      className={`${styles['login-box-bo']} d-flex flex-column flex-md-row justify-content-center align-items-center`}
    >
      {/* 使用者登入區域 */}
      <div
        className={`${styles['user-login-section-bo']} d-flex flex-column justify-content-center align-items-center`}
        ref={userBoxRef}
      >
        <div className={`${styles['user-login-title-bo']} d-flex`}>
          <h3>會</h3>
          <h3>員</h3>
          <h3>登</h3>
          <h3>入</h3>
        </div>
        <form
          className={`${styles['user-login-box-bo']} justify-content-center align-items-center`}
          ref={userFormRef}
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
              {accountError && (
                <div className={`p ${styles['text-error-bo']}`}>
                  {accountError}
                </div>
              )}
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
              {passwordError && (
                <div className={`p ${styles['text-error-bo']}`}>
                  {passwordError}
                </div>
              )}
            </div>
          </div>
          <div
            className={`${styles['user-login-option-bo']} d-flex justify-content-center align-items-center h6 mb-5`}
          >
            <ul className="d-flex gap-3  justify-content-center align-items-center">
              <li>
                <Link href="/user/forgot-password">忘記密碼</Link>
              </li>
              <li>|</li>
              <li>
                <Link href="/user/register">立即註冊</Link>
              </li>
              <li>|</li>
              <li>
                <button
                  type="button"
                  className={` btn h6 d-flex  justify-content-center  align-items-center`}
                  onClick={onGoogleLoginSuccess} // 直接調用 onGoogleLoginSuccess
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {isHovered ? <GoogleLogoHover /> : <GoogleLogo />}
                </button>
              </li>
              <li>|</li>
              <li>
                <button
                  type="button"
                  className={` btn h6 d-flex  justify-content-center  align-items-center`}
                  onClick={goLineLogin} // 直接調用 onGoogleLoginSuccess
                  onMouseEnter={() => setIsLineHovered(true)} // Line hover 狀態邏輯
                  onMouseLeave={() => setIsLineHovered(false)} // Line hover 狀態邏輯
                >
                  {isLineHovered ? <LineLogoHover /> : <LineLogo />}
                </button>
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
        ref={compBoxRef}
      >
        <div className={`${styles['company-login-title-bo']} d-flex`}>
          <h3>企</h3>
          <h3>業</h3>
          <h3>登</h3>
          <h3>入</h3>
        </div>
        <div
          className={`${styles['company-login-box-bo']} justify-content-center align-items-center`}
          ref={compFormRef}
        >
          <div
            className={`${styles['company-login-form-bo']} d-flex flex-column gap-3 justify-content-center align-items-center`}
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
              {accountError && (
                <div className={`p ${styles['text-error-bo']}`}>
                  {accountError}
                </div>
              )}
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
              {passwordError && (
                <div className={`p ${styles['text-error-bo']}`}>
                  {passwordError}
                </div>
              )}
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
              className={`${styles['btn-user-login-bo']}  btn h6 d-flex justify-content-between align-items-center`}
              onClick={onLogin}
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
