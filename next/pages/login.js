import { useContext, useEffect, useRef, useState } from 'react'
import styles from '@/styles/boyu/login.module.scss'
import { FaCheck } from 'react-icons/fa6'
import useAuth from '@/hooks/user-auth-bo'
import useFirebase from '@/hooks/use-firebase-bo'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GoogleLogo from '@/components/icons/google-logo'
import { AuthContext } from '@/context/AuthContext'

export default function Login() {
  const router = useRouter()

  // 定義狀態來管理表單輸入值和錯誤訊息
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [accountError, setAccountError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { login } = useAuth() // 從 useAuth 中解構獲取  和 setUser
  const { loginGoogle } = useFirebase() // 使用 Google 登入功能
  const { setUser } = useContext(AuthContext)

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
        // 儲存 token 和用戶信息到 AuthContext 和 localStorage
        localStorage.setItem('refreshToken', result.refreshToken)
        localStorage.setItem('accessToken', result.accessToken)

        setUser({
          id: result.id, // 確保這裡的 `id` 是正確的
          name: result.name,
          email: email,
          photoURL: photoURL,
        })

        // 檢查是否是新會員
        if (result.isNewUser) {
          // 設置一個標記，表示新會員需要顯示 SweetAlert
          localStorage.setItem('showWelcomeAlert', 'true')
          // 跳轉到首頁
          window.location.href = '/home' // 可以直接導航而不需要 reload
        } else {
          // 如果不是新會員，直接重整首頁
          window.location.href = '/home' // 可以直接導航而不需要 reload
        }
      } else {
        // 處理失敗邏輯
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
      // 錯誤處理
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
            className={`${styles['user-login-option-bo']} d-flex justify-content-center align-items-center h6`}
          >
            <ul className="d-flex gap-3">
              <li>
                <Link href="/user/forgot-password">忘記密碼</Link>
              </li>
              <li>|</li>
              <li>
                <Link href="/user/register">立即註冊</Link>
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
          <div></div>
          <div
            className={`${styles['user-login-google-bo']} d-flex justify-content-center align-items-center`}
          >
            <button
              type="button"
              className={`${styles['btn-google-login-bo']} btn h6 d-flex justify-content-between align-items-center`}
              onClick={onGoogleLoginSuccess} // 直接調用 onGoogleLoginSuccess
            >
              <GoogleLogo /> Google 登入
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
