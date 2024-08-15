import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/boyu/register.module.scss'
import { FaXmark, FaCheck } from 'react-icons/fa6'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const [emailVerified, setEmailVerified] = useState(false) // 判斷電子信箱是否已驗證
  const [emailError, setEmailError] = useState('') // 存放電子信箱的錯誤訊息
  const [accountError, setAccountError] = useState('') // 存放帳號的錯誤訊息
  const [passwordError, setPasswordError] = useState('') // 存放密碼的錯誤訊息
  const [checkPasswordError, setCheckPasswordError] = useState('') // 新增狀態
  const [generalError, setGeneralError] = useState('') // 存放一般錯誤訊息

  const [formData, setFormData] = useState({
    email: '',
    account: '',
    password: '',
    checkPassword: '', // 使用 checkPassword 替代確認密碼欄位
  }) // 表單數據狀態

  // 處理表單輸入變更
  const onInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 提交註冊表單的邏輯
  const submitForm = async (event) => {
    event.preventDefault()

    if (!emailVerified) {
      setEmailError('請先驗證電子信箱')
      return
    }

    // 重置錯誤訊息
    setEmailError('')
    setAccountError('')
    setPasswordError('')
    setCheckPasswordError('') // 重置 checkPassword 錯誤訊息
    setGeneralError('')

    // 驗證確認密碼
    if (formData.password !== formData.checkPassword) {
      setCheckPasswordError('密碼和確認密碼不一致')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:3005/api/register/register',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(formData),
        }
      )

      const result = await response.json()

      if (result.status === 'success') {
        Swal.fire({
          title: '註冊成功！',
          html: `<span class="p">歡迎加入！</span>`,
          icon: 'success',
          customClass: {
            popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
            title: 'h6',
            icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
            confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
          },
          confirmButtonText: '確認', // 修改按鈕文字
        }).then(() => {
          sessionStorage.setItem('registeredAccount', formData.account)
          sessionStorage.setItem('registeredPassword', formData.password)
          window.location.href = '/login' // 跳轉到登入頁面
        })
      } else {
        // 顯示後端返回的錯誤訊息在表單中
        setEmailError(result.errors?.email || '')
        setAccountError(result.errors?.account || '')
        setPasswordError(result.errors?.password || '')
        setGeneralError(result.message || '發生錯誤，請稍後再試')
      }
    } catch (error) {
      setGeneralError('發生未知錯誤，請稍後再試')
    }
  }

  // 發送驗證信的邏輯
  const SendEmail = async () => {
    // 電子信箱格式的正則表達式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(formData.email)) {
      setEmailError('請提供有效的電子信箱')
      return
    }

    if (!formData.email) {
      setEmailError('電子信箱不可為空')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:3005/api/register/send-verification',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        }
      )

      const result = await response.json()

      if (result.status === 'success') {
        Swal.fire({
          title: '驗證信已發送',
          html: `<span class="p">請檢查您的電子信箱以完成驗證！</span>`,
          icon: 'success',
          customClass: {
            popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
            title: 'h6',
            icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
            confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
          },
          confirmButtonText: '確認', // 修改按鈕文字
        })
      } else {
        setEmailError(result.message)
      }
    } catch (error) {
      setGeneralError('無法連接伺服器，請稍後再試')
    }
  }

  // 初始化時檢查 sessionStorage 是否有已驗證的 email
  useEffect(() => {
    const { email, status, error } = router.query

    if (status === 'success' && email) {
      sessionStorage.setItem('emailVerified', 'true')
      sessionStorage.setItem('verifiedEmail', email)

      // 清理 URL 中的參數
      router.replace('/user/register', undefined, { shallow: true })
    } else if (error) {
      // 顯示錯誤訊息
      console.error('Verification Error:', error)
    }
  }, [router.query])

  useEffect(() => {
    if (router.isReady) {
      const verifiedEmail = sessionStorage.getItem('verifiedEmail')
      const emailVerifiedStorage = sessionStorage.getItem('emailVerified')

      console.log('Verified Email:', verifiedEmail)
      console.log('Email Verified From Storage:', emailVerifiedStorage)

      if (emailVerifiedStorage === 'true' && verifiedEmail) {
        setFormData((prevData) => ({
          ...prevData,
          email: verifiedEmail, // 從 sessionStorage 中獲取已驗證 email
        }))
        setEmailVerified(true)
      }
    }
  }, [router.isReady])

  // 處理使用者註冊表單的交互效果
  const userBoxRef = useRef(null)
  const userFormRef = useRef(null)

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

  // 處理公司註冊表單的交互效果
  const compBoxRef = useRef(null)
  const compFormRef = useRef(null)

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

  // 渲染表單頁面
  return (
    <section
      className={`${styles['register-box-bo']} d-flex flex-column flex-md-row justify-content-center align-items-center`}
    >
      {/* 使用者註冊區域 */}
      <div
        className={`${styles['user-register-section-bo']} d-flex flex-column justify-content-center align-items-center`}
        ref={userBoxRef}
      >
        <div className={`${styles['user-register-title-bo']} d-flex`}>
          <h3>會</h3>
          <h3>員</h3>
          <h3>註</h3>
          <h3>冊</h3>
        </div>
        <div
          className={`${styles['user-register-box-bo']} justify-content-center align-items-center`}
          ref={userFormRef}
        >
          <form
            onSubmit={submitForm}
            className={`${styles['user-register-form-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div className={styles['form-group-bo']}>
              <div
                className={`${styles['email-box-bo']} d-flex justify-content-end align-items-start`}
              >
                <button
                  type="button"
                  onClick={SendEmail}
                  className={`${styles['btn-get-CAPTCHA-bo']} btn`}
                >
                  點擊驗證
                </button>
              </div>
              <input
                name="email"
                type="email"
                className={`h6 ${styles['form-input-bo']} ${styles['input-email-bo']}`}
                placeholder="電子信箱"
                value={formData.email}
                onChange={onInputChange}
              />
              {emailError && (
                <div className={`p ${styles['text-error-bo']}`}>
                  {emailError}
                </div>
              )}
            </div>
            <div className={styles['form-group-bo']}>
              <input
                name="account"
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="帳號"
                value={formData.account}
                onChange={onInputChange}
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
                value={formData.password}
                onChange={onInputChange}
              />
              {passwordError && (
                <div className={`p ${styles['text-error-bo']}`}>
                  {passwordError}
                </div>
              )}
            </div>
            <div className={styles['form-group-bo']}>
              <input
                name="checkPassword"
                type="password"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="確認密碼"
                value={formData.checkPassword}
                onChange={onInputChange}
              />
              {checkPasswordError && (
                <div className={`p ${styles['text-error-bo']}`}>
                  {checkPasswordError}
                </div>
              )}
            </div>
          </form>

          <div
            className={`${styles['user-register-btn-box-bo']} d-flex justify-content-center align-items-center`}
          >
            <Link
              href="/login"
              className={`${styles['btn-user-register-bo']} btn h6 d-flex justify-content-between align-items-center`}
            >
              取消註冊
              <FaXmark />
            </Link>

            <button
              onClick={submitForm}
              type="submit"
              className={`${styles['btn-user-register-bo']} btn h6 d-flex justify-content-between align-items-center`}
            >
              確定註冊 <FaCheck />
            </button>
          </div>
        </div>
      </div>

      {/* 公司註冊區域 */}
      <div
        className={`${styles['company-register-section-bo']} d-flex flex-column gap-5 justify-content-center align-items-center`}
        ref={compBoxRef}
      >
        <div className={`${styles['company-register-title-bo']} d-flex`}>
          <h3>企</h3>
          <h3>業</h3>
          <h3>註</h3>
          <h3>冊</h3>
        </div>
        <div
          className={`${styles['company-register-box-bo']} justify-content-center align-items-center`}
          ref={compFormRef}
        >
          <form
            className={`${styles['company-register-form-bo']} d-flex flex-column gap-3 justify-content-center align-items-center`}
          >
            <div className={styles['form-group-bo']}>
              <div
                className={`${styles['email-box-bo']} d-flex justify-content-end align-items-start`}
              >
                <button className={`${styles['btn-get-CAPTCHA-bo']} btn`}>
                  點擊驗證
                </button>
              </div>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']} ${styles['input-taxID-bo']}`}
                placeholder="統編"
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
          </form>

          <div
            className={`${styles['company-register-btn-box-bo']} d-flex justify-content-center align-items-center`}
          >
            <button
              className={`${styles['btn-company-register-bo']} btn h6 d-flex justify-content-between align-items-center`}
            >
              取消註冊
              <FaXmark />
            </button>
            <button
              className={`${styles['btn-company-register-bo']} btn h6 d-flex justify-content-between align-items=center`}
            >
              確定註冊
              <FaCheck />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
