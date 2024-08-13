import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/boyu/register.module.scss'
import { FaXmark, FaCheck } from 'react-icons/fa6'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    account: '',
    password: '',
  })

  // 處理表單輸入變更
  const onInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 提交註冊表單
  const submitForm = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    if (!formData.email || !formData.account || !formData.password) {
      Swal.fire({
        title: '請填寫所有欄位',
        text: '所有欄位都是必填的，請確保填寫完整後再提交。',
        icon: 'warning',
        confirmButtonText: 'OK',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:3005/api/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData), // 包含已驗證的 email
      })

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
        Swal.fire({
          title: '註冊失敗',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      Swal.fire({
        title: '註冊失敗',
        text: '無法連接伺服器，請稍後再試',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // 發送驗證信
  const SendEmail = async () => {
    if (!formData.email) {
      Swal.fire({
        title: '電子信箱不可為空',
        text: '請輸入您的電子信箱再進行驗證',
        icon: 'warning',
        confirmButtonText: 'OK',
      })
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
        Swal.fire({
          title: '發送失敗',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      Swal.fire({
        title: '發送失敗',
        text: '無法連接伺服器，請稍後再試',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      console.error('Error during sending email:', error)
    }
  }

  // 驗證 email
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

  useEffect(() => {
    verifyEmail()
  }, [router.query.token]) // 當 token 改變時重新執行

  useEffect(() => {
    if (router.query.status === 'success' && router.query.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: router.query.email, // 保留從查詢參數中獲取的已驗證 email
      }))
      Swal.fire({
        title: '驗證成功！',
        text: '您的電子信箱已驗證成功，請繼續完成註冊。',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    }
  }, [router.query.status, router.query.email])

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
                  disabled={isSubmitting}
                >
                  點擊驗證
                </button>
              </div>
              <input
                name="email"
                type="email"
                className={`h6 ${styles['form-input-bo']} ${styles['input-email-bo']}`}
                placeholder="電子信箱"
                value={formData.email} // 預填已驗證的 email
                onChange={onInputChange}
              />
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
              disabled={isSubmitting}
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
              className={`${styles['btn-company-register-bo']} btn h6 d-flex justify-content-between align-items-center`}
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
