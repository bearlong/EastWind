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
  const [generalError, setGeneralError] = useState('') // 存放一般錯誤訊息

  const [formData, setFormData] = useState({
    email: '',
    account: '',
    password: '',
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
      setEmailError('電子信箱未驗證')
      return
    }

    // 重置錯誤訊息
    setEmailError('')
    setAccountError('')
    setPasswordError('')
    setGeneralError('')

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
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.href = '/login' // 跳轉到登入頁面
        })
      } else {
        // 顯示後端返回的錯誤訊息在表單中
        setEmailError(result.errors?.email || '')
        console.log('Email Error:', emailError)

        setAccountError(result.errors?.account || '')
        console.log('Account Error:', accountError)

        setPasswordError(result.errors?.password || '')
        console.log('Password Error:', passwordError)

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
          text: '請檢查您的電子信箱以完成驗證',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      } else {
        setEmailError(result.message)
      }
    } catch (error) {
      setGeneralError('無法連接伺服器，請稍後再試')
    }
  }

  // 驗證電子信箱的邏輯
  const verifyEmail = async () => {
    const token = router.query.token // 從 URL 中獲取 token

    if (token) {
      try {
        const response = await fetch(
          `http://localhost:3005/api/register/verify-email?token=${token}`
        )
        const result = await response.json()

        if (result.status === 'success') {
          setFormData((prevData) => ({
            ...prevData,
            email: result.email, // 保留驗證成功的 email
          }))
          setEmailVerified(true) // 設置為已驗證
          Swal.fire({
            title: '驗證成功！',
            text: '您的電子信箱已驗證成功，可以進行後續操作。',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        } else {
          Swal.fire({
            title: '驗證失敗',
            text: result.message,
            icon: 'error',
            confirmButtonText: 'OK',
          })
        }
      } catch (error) {
        Swal.fire({
          title: '驗證失敗',
          text: '無法連接伺服器，請稍後再試',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    }
  }

  // 初始化時檢查是否有驗證 token
  useEffect(() => {
    const { status, email, error } = router.query

    if (status === 'success' && email) {
      setFormData((prevData) => ({
        ...prevData,
        email: email, // 保留從查詢參數中獲取的已驗證 email
      }))
      setEmailVerified(true)
      Swal.fire({
        title: '驗證成功！',
        text: '您的電子信箱已驗證成功，請繼續完成註冊。',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    } else if (status === 'error' && error) {
      setGeneralError(decodeURIComponent(error)) // 顯示來自 URL 的錯誤訊息
    }
  }, [router.query])

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
                disabled={emailVerified} // 如果已經驗證，禁用 email 輸入框
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
