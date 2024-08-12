import React, { useEffect, useRef } from 'react'
import styles from '@/styles/boyu/register.module.scss'
import { FaXmark, FaCheck } from 'react-icons/fa6'

export default function Register() {
  const userRegisterBoxRef = useRef(null)
  const userRegisterFormRef = useRef(null)
  const companyRegisterBoxRef = useRef(null)
  const companyRegisterFormRef = useRef(null)

  useEffect(() => {
    const userRegisterBox = userRegisterBoxRef.current
    const userRegisterForm = userRegisterFormRef.current
    const companyRegisterBox = companyRegisterBoxRef.current
    const companyRegisterForm = companyRegisterFormRef.current

    const handleUserRegisterBoxClick = (event) => {
      if (!userRegisterForm.contains(event.target)) {
        userRegisterForm.classList.toggle(`${styles['active']}`)
      }
    }

    const handleUserRegisterBoxMouseLeave = () => {
      if (!userRegisterForm.classList.contains(`${styles['form-focused']}`)) {
        userRegisterForm.classList.remove(`${styles['active']}`)
      }
    }

    const handleUserRegisterFormClick = (event) => {
      event.stopPropagation()
    }

    const handleCompanyRegisterBoxClick = (event) => {
      if (!companyRegisterForm.contains(event.target)) {
        companyRegisterForm.classList.toggle(`${styles['active']}`)
      }
    }

    const handleCompanyRegisterBoxMouseLeave = () => {
      if (
        !companyRegisterForm.classList.contains(`${styles['form-focused']}`)
      ) {
        companyRegisterForm.classList.remove(`${styles['active']}`)
      }
    }

    const handleCompanyRegisterFormClick = (event) => {
      event.stopPropagation()
    }

    const addInputFocusHandlers = (formInputs, registerBox, registerForm) => {
      formInputs.forEach((input) => {
        input.addEventListener('focus', () => {
          registerBox.classList.add(`${styles['hover']}`)
          registerForm.classList.add(`${styles['form-focused']}`)
        })

        input.addEventListener('blur', () => {
          registerForm.classList.remove(`${styles['form-focused']}`)
          if (!registerForm.contains(document.activeElement)) {
            registerBox.classList.remove(`${styles['hover']}`)
          }
        })
      })
    }

    const userFormInputs = userRegisterForm.querySelectorAll('input')
    const companyFormInputs = companyRegisterForm.querySelectorAll('input')

    addInputFocusHandlers(userFormInputs, userRegisterBox, userRegisterForm)
    addInputFocusHandlers(
      companyFormInputs,
      companyRegisterBox,
      companyRegisterForm
    )

    userRegisterBox.addEventListener('click', handleUserRegisterBoxClick)
    userRegisterBox.addEventListener(
      'mouseleave',
      handleUserRegisterBoxMouseLeave
    )
    userRegisterForm.addEventListener('click', handleUserRegisterFormClick)
    companyRegisterBox.addEventListener('click', handleCompanyRegisterBoxClick)
    companyRegisterBox.addEventListener(
      'mouseleave',
      handleCompanyRegisterBoxMouseLeave
    )
    companyRegisterForm.addEventListener(
      'click',
      handleCompanyRegisterFormClick
    )

    // 清理事件監聽器
    return () => {
      userRegisterBox.removeEventListener('click', handleUserRegisterBoxClick)
      userRegisterBox.removeEventListener(
        'mouseleave',
        handleUserRegisterBoxMouseLeave
      )
      userRegisterForm.removeEventListener('click', handleUserRegisterFormClick)
      companyRegisterBox.removeEventListener(
        'click',
        handleCompanyRegisterBoxClick
      )
      companyRegisterBox.removeEventListener(
        'mouseleave',
        handleCompanyRegisterBoxMouseLeave
      )
      companyRegisterForm.removeEventListener(
        'click',
        handleCompanyRegisterFormClick
      )
    }
  }, [])

  return (
    <section
      className={`${styles['register-box-bo']} d-flex flex-column flex-md-row justify-content-center align-items-center`}
    >
      {/* 使用者註冊區域 */}
      <div
        className={`${styles['user-register-section-bo']} d-flex flex-column justify-content-center align-items-center`}
        ref={userRegisterBoxRef}
      >
        <div className={`${styles['user-register-title-bo']} d-flex`}>
          <h3>會</h3>
          <h3>員</h3>
          <h3>註</h3>
          <h3>冊</h3>
        </div>
        <div
          className={`${styles['user-register-box-bo']} justify-content-center align-items-center`}
          ref={userRegisterFormRef}
        >
          <form
            className={`${styles['user-register-form-bo']} d-flex flex-column justify-content-center align-items-center`}
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
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="帳號"
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="password"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="密碼"
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="驗證碼"
                required
              />
            </div>
          </form>

          <div
            className={`${styles['user-register-btn-box-bo']} d-flex justify-content-center align-items-center`}
          >
            <button
              className={`${styles['btn-user-register-bo']} btn h6 d-flex justify-content-between align-items-center`}
            >
              取消註冊
              <FaXmark />
            </button>
            <button
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
        ref={companyRegisterBoxRef}
      >
        <div className={`${styles['company-register-title-bo']} d-flex`}>
          <h3>企</h3>
          <h3>業</h3>
          <h3>註</h3>
          <h3>冊</h3>
        </div>
        <div
          className={`${styles['company-register-box-bo']} justify-content-center align-items-center`}
          ref={companyRegisterFormRef}
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
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="text"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="帳號"
                required
              />
            </div>
            <div className={styles['form-group-bo']}>
              <input
                type="password"
                className={`h6 ${styles['form-input-bo']}`}
                placeholder="密碼"
                required
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
