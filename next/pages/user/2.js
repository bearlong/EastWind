import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/boyu/forgot.module.scss'
import { FaXmark, FaCheck } from 'react-icons/fa6'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const sendResetEmail = async (event) => {
    event.preventDefault()

    setEmailError('')

    if (!email) {
      setEmailError('請輸入有效的電子信箱')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:3005/api/forgot-password/forgot-password',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )

      const result = await response.json()

      if (result.status === 'success') {
        Swal.fire({
          title: '重設密碼郵件已發送！',
          text: '請檢查您的電子信箱以完成密碼重設。',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      } else {
        setEmailError(result.message)
      }
    } catch (error) {
      setEmailError('發生未知錯誤，請稍後再試')
    }
  }

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
      className={`${styles['forgot-box-bo']} d-flex flex-column flex-md-row justify-content-center align-items-center`}
    >
      {/* 使用者忘記密碼區域 */}
      <div
        className={`${styles['user-forgot-section-bo']} d-flex flex-column justify-content-center align-items-center`}
        ref={userBoxRef}
      >
        <div className={`${styles['user-forgot-title-bo']} d-flex`}>
          <h3>會</h3>
          <h3>員</h3>
          <h3>信</h3>
          <h3>箱</h3>
          <h3>驗</h3>
          <h3>證</h3>
        </div>
        <div
          className={`${styles['user-forgot-box-bo']} justify-content-center align-items-center`}
          ref={userFormRef}
        >
          <form
            onSubmit={sendResetEmail}
            className={`${styles['user-forgot-form-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div className={styles['form-group-bo']}>
              <input
                name="email"
                type="email"
                className={`h6 ${styles['form-input-bo']} ${styles['input-email-bo']}`}
                placeholder="電子信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <div className={`p ${styles['text-error-bo']}`}>
                  {emailError}
                </div>
              )}
            </div>
            <div
              className={`${styles['user-forgot-btn-box-bo']} d-flex justify-content-center align-items-center`}
            >
              <Link
                href="/login"
                className={`${styles['btn-user-forgot-bo']} btn h6 d-flex justify-content-between align-items-center`}
              >
                取消重設
                <FaXmark />
              </Link>

              <button
                type="submit"
                className={`${styles['btn-user-forgot-bo']} btn h6 d-flex justify-content-between align-items-center`}
              >
                驗證信箱 <FaCheck />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 公司重設密碼區域 */}
      <div
        className={`${styles['company-forgot-section-bo']} d-flex flex-column gap-5 justify-content-center align-items-center`}
        ref={compBoxRef}
      >
        <div className={`${styles['company-forgot-title-bo']} d-flex`}>
          <h3>企</h3>
          <h3>業</h3>
          <h3>重</h3>
          <h3>設</h3>
          <h3>密</h3>
          <h3>碼</h3>
        </div>
        <div
          className={`${styles['company-forgot-box-bo']} justify-content-center align-items-center`}
          ref={compFormRef}
        >
          <form
            className={`${styles['company-forgot-form-bo']} d-flex flex-column gap-3 justify-content-center align-items-center`}
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
            <div
              className={`${styles['company-forgot-btn-box-bo']} d-flex justify-content-center align-items-center`}
            >
              <Link
                href="/login"
                className={`${styles['btn-company-forgot-bo']} btn h6 d-flex justify-content-between align-items-center`}
              >
                取消重設
                <FaXmark />
              </Link>
              <button
                type="submit"
                className={`${styles['btn-company-forgot-bo']} btn h6 d-flex justify-content-between align-items=center`}
              >
                確定重設
                <FaCheck />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
