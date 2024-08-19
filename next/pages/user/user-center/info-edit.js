import { useContext, useState, useEffect, useRef } from 'react'
import UserCenterLayout from '@/components/layout/user-center-layout'
import styles from '@/styles/boyu/user-info-edit.module.scss'
import { FaEdit } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { AuthContext } from '@/context/AuthContext'
import Swal from 'sweetalert2'
import Link from 'next/link'
import CreditCardForm from '@/components/user/credit-card-form'
import { useRouter } from 'next/router'

export default function UserInfoEdit() {
  const router = useRouter()

  // 取得當前登入用戶資訊
  const { user, updateUserImage } = useContext(AuthContext)

  // 狀態管理
  const [cards, setCards] = useState([]) // 信用卡列表
  const [formValues, setFormValues] = useState({
    email: '',
    account: '',
    password: '',
    confirmPassword: '',
    username: '',
    gender: '',
    year: '', // 新增年份
    month: '', // 新增月份
    day: '', // 新增日期
    city: '',
    address: '',
    phone: '',
  })

  const [initialFormValues, setInitialFormValues] = useState({}) // 用於追蹤初始值
  const [isPasswordChanged, setIsPasswordChanged] = useState(false) // 用於追蹤密碼是否修改
  const [emailVerified, setEmailVerified] = useState(false) // 追蹤 email 是否驗證過
  const [needPwdValidation, setNeedPwdValidation] = useState(true) // 是否需要驗證原密碼
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const fileInputRef = useRef(null) // 用於參考文件輸入元素

  // 從伺服器獲取用戶資料
  const fetchUserData = async () => {
    if (!user || !user.id) {
      console.error('User ID is missing or user is not defined.')
      return
    }
    try {
      const response = await fetch(
        `http://localhost:3005/api/user/user/${user.id}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      const result = await response.json()
      const updatedUser = result.data

      // 將生日拆分為年、月、日
      const [year, month, day] = updatedUser.birth
        ? new Date(updatedUser.birth).toISOString().split('T')[0].split('-')
        : ['', '', '']

      // 初始化表單值
      const initialValues = {
        email: updatedUser.email || '',
        account: updatedUser.account || '',
        password: updatedUser.password || '',
        confirmPassword: '',
        username: updatedUser.username || '',
        gender: updatedUser.gender || '',
        year, // 年
        month, // 月
        day, // 日
        city: updatedUser.city || '',
        address: updatedUser.address || '',
        phone: updatedUser.phone || '',
      }

      setFormValues(initialValues)
      setInitialFormValues(initialValues)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  // 初始化用戶數據
  useEffect(() => {
    if (user && user.id) {
      fetchUserData()
    }
  }, [user])

  // 處理表單輸入變更
  const onInputChange = (event) => {
    const { name, value } = event.target

    // 如果用戶修改了 email，將驗證狀態設置為 false
    if (name === 'email') {
      setEmailVerified(false)
    }

    // 如果用戶修改了密碼框的內容，更新`isPasswordChanged`
    if (name === 'password') {
      setIsPasswordChanged(true)
      setNeedPwdValidation(false) // 當用戶修改密碼時，不再需要驗證原密碼
    }

    // 更新表單值
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  // 控制是否顯示確認密碼欄位
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    // 當用戶實際修改了密碼時，才顯示確認密碼輸入框
    setShowConfirmPassword(formValues.password !== initialFormValues.password)
  }, [formValues.password, initialFormValues.password])

  // 表單驗證
  const [errors, setErrors] = useState({})

  const validateForm = async () => {
    const {
      email,
      account,
      password,
      confirmPassword,
      username,
      gender,
      year,
      month,
      day,
      city,
      address,
      phone,
    } = formValues

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const accountPasswordRegex = /^(?=.*[A-Za-z])[A-Za-z\d]{6,}$/
    const phoneRegex = /^09\d{8}$/

    const newErrors = {}

    // 檢查是否有任何值被修改
    const isFormChanged = Object.keys(formValues).some(
      (key) => formValues[key] !== initialFormValues[key]
    )

    if (!isFormChanged) {
      Swal.fire({
        title: '未進行任何修改',
        html: `<span class="p">您尚未對資料進行任何修改。</span>`,
        icon: 'warning',
        customClass: {
          popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
          confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
        },
        confirmButtonText: '確認', // 修改按鈕文字
      })
      return false // 返回 false，表示驗證未通過
    }

    // 檢查並驗證 email
    if (email !== initialFormValues.email) {
      if (!email || !emailRegex.test(email)) {
        newErrors.email = '請輸入有效的電子信箱'
      } else {
        const { emailExists } = await checkUniqueValues(email, account)
        if (emailExists) {
          newErrors.email = '電子信箱已被使用'
        }
      }
    }
    toggleCorrectClass('email', !newErrors.email)

    // 檢查並驗證帳號
    if (account !== initialFormValues.account) {
      if (!account || !accountPasswordRegex.test(account)) {
        newErrors.account = '帳號應至少6碼，且包含英文字'
      } else {
        const { accountExists } = await checkUniqueValues(email, account)
        if (accountExists) {
          newErrors.account = '帳號已存在'
        }
      }
    }
    toggleCorrectClass('account', !newErrors.account)

    // 檢查並驗證密碼
    if (isPasswordChanged) {
      if (!password || !accountPasswordRegex.test(password)) {
        newErrors.password = '密碼應至少6碼，且包含英文字'
      } else if (password === initialFormValues.password) {
        newErrors.password = '原密碼不需修改'
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = '兩次密碼輸入不一致'
      }
    }
    toggleCorrectClass(
      'password',
      !newErrors.password && !newErrors.confirmPassword
    )

    // 其他欄位驗證
    if (username !== initialFormValues.username) {
      if (!username) {
        newErrors.username = '姓名不能為空'
      }
    }
    toggleCorrectClass('username', !newErrors.username)

    if (gender !== initialFormValues.gender) {
      if (!gender) {
        newErrors.gender = '請選擇性別'
      }
    }
    toggleCorrectClass('gender', !newErrors.gender)

    toggleCorrectClass('birthDate', !newErrors.birthDate)

    // 檢查並驗證城市
    if (!city) {
      newErrors.city = '請選擇城市'
    }
    toggleCorrectClass('city', !newErrors.city)

    if (address !== initialFormValues.address) {
      if (!address) {
        newErrors.address = '地址不能為空'
      }
    }
    toggleCorrectClass('address', !newErrors.address)

    if (phone !== initialFormValues.phone) {
      if (!phoneRegex.test(phone)) {
        newErrors.phone = '請輸入有效的手機號碼'
      }
    }
    toggleCorrectClass('phone', !newErrors.phone)

    // 檢查 `年`、`月`、和 `日` 的值是否正確
    if (!year || !month || !day) {
      newErrors.birthDate = '請選擇完整的生日'
      toggleCorrectClass('year', false)
      toggleCorrectClass('month', false)
      toggleCorrectClass('day', false)
    } else {
      toggleCorrectClass('year', true)
      toggleCorrectClass('month', true)
      toggleCorrectClass('day', true)
    }
    toggleCorrectClass('birthDate', !newErrors.birthDate)

    // 更新錯誤訊息狀態
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 動態添加或移除 info-correct-bo 類的輔助函數
  const toggleCorrectClass = (fieldName, isValid) => {
    const element = document.querySelector(`[name="${fieldName}"]`)

    if (element) {
      // 檢查是否為 `select` 元素
      if (element.tagName.toLowerCase() === 'select') {
        // 檢查並強制應用背景色
        if (isValid && element.value !== '') {
          element.style.backgroundColor = 'rgba(183, 148, 71, 0.2)'
        } else {
          element.style.backgroundColor = '' // 清除內聯樣式
        }
      } else {
        // 處理其他類型的元素（如`input`）
        if (isValid) {
          element.style.backgroundColor = 'rgba(183, 148, 71, 0.2)'
        } else {
          element.style.backgroundColor = '' // 清除內聯樣式
        }
      }
    } else {
      console.log(`Element with name "${fieldName}" not found.`)
    }
  }

  // 發送驗證郵件
  const sendVerificationEmail = () => {
    // 如果 email 與初始 email 相同，則不需驗證
    if (formValues.email === initialFormValues.email) {
      Swal.fire({
        title: '原電子信箱',
        html: `<span class="p">這是您的原電子信箱，不需重新驗證。</span>`,
        icon: 'error',
        customClass: {
          popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
          confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
        },
        confirmButtonText: '確認', // 修改按鈕文字
      })
      return
    }

    // 如果 email 已經存在，禁用驗證按鈕
    if (errors.email) {
      Swal.fire({
        title: '電子信箱已被使用',
        html: `<span class="p">此電子信箱已被使用，請選擇其他電子信箱。</span>`,
        icon: 'error',
        customClass: {
          popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
          confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
        },
        confirmButtonText: '確認', // 修改按鈕文字
      })
      return
    }

    // 儲存 email 到 localStorage
    localStorage.setItem('emailToVerify', formValues.email)

    // 發送驗證郵件的 API 請求
    fetch('http://localhost:3005/api/user-edit/send-verification-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formValues.email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          Swal.fire({
            title: '驗證郵件已發送',
            html: `<span class="p">請檢查您的郵箱並點擊驗證連結。</span>`,
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
          Swal.fire({
            title: '發送失敗',
            html: `<span class="p">無法發送驗證郵件，請稍後再試</span>`,
            icon: 'error',
            customClass: {
              popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
              title: 'h6',
              icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
              confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
            },
            confirmButtonText: '確認', // 修改按鈕文字
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // 監聽驗證結果並處理
  useEffect(() => {
    const { success } = router.query

    if (success === 'true') {
      const verifiedEmail = localStorage.getItem('emailToVerify')

      Swal.fire({
        title: '驗證成功',
        html: `<span class="p">您的電子信箱已成功驗證。</span>`,
        icon: 'success',
        customClass: {
          popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
          confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
        },
        confirmButtonText: '確認', // 修改按鈕文字
      }).then(() => {
        setFormValues((prevValues) => ({
          ...prevValues,
          email: verifiedEmail,
        }))
        setEmailVerified(true)

        // 清除 localStorage 中的 emailToVerify
        localStorage.removeItem('emailToVerify')
      })

      // 替換 URL 中的 query 參數
      router.replace('/user/user-center/info-edit', undefined, {
        shallow: true,
      })
    }
  }, [router.query])

  // 檢查 email 和 account 是否唯一
  const checkUniqueValues = async (email, account) => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/user-edit/check-unique',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, account, userId: user.id }), // 傳送 userId
        }
      )

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error checking uniqueness:', error)
      return { emailExists: false, accountExists: false }
    }
  }

  // 處理圖片文件選擇
  const onFileChange = async (event) => {
    const file = event.target.files[0]

    if (file) {
      // 檢查文件類型是否為圖片格式
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: '無效的圖片格式',
          html: `<span class="p">請上傳 JPEG、PNG 或 GIF 格式的圖片。</span>`,
          icon: 'error',
          customClass: {
            popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
            title: 'h6',
            icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
            confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
          },
          confirmButtonText: '確認', // 修改按鈕文字
        })
        return
      }

      const formData = new FormData()
      formData.append('avatar', file)

      try {
        const response = await fetch(
          `http://localhost:3005/api/user-edit/update-avatar/${user.id}`,
          {
            method: 'POST',
            body: formData,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to upload avatar')
        }

        const data = await response.json()
        if (data.status === 'success') {
          updateUserImage(data.filename) // 更新 AuthContext 中的 user_img

          Swal.fire({
            title: '圖片上傳成功',
            html: `<span class="p">您的大頭照已成功更換。</span>`,
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
          Swal.fire({
            title: '圖片上傳失敗',
            html: `<span class="p">無法上傳圖片，請稍後再試。</span>`,
            icon: 'error',
            customClass: {
              popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
              title: 'h6',
              icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
              confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
            },
            confirmButtonText: '確認', // 修改按鈕文字
          })
        }
      } catch (error) {
        console.error('Error uploading avatar:', error)
      }
    }
  }

  // 取消編輯
  const cancelEdit = () => {
    const isFormChanged = Object.keys(formValues).some(
      (key) => formValues[key] !== initialFormValues[key]
    )

    if (isFormChanged) {
      Swal.fire({
        title: '確定取消修改嗎？',
        html: `<span class="p">您的變更尚未保存，確定要取消嗎？</span>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '取消修改',
        cancelButtonText: '繼續修改',
        customClass: {
          popup: `${styles['swal-popup-bo']}`,
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`,
          confirmButton: `${styles['swal-btn-bo']}`,
          cancelButton: `${styles['swal-btn-cancel-bo']}`,
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // 清理 localStorage
          localStorage.removeItem('emailToVerify')
          localStorage.removeItem('emailVerificationStatus')
          router.push('/user/user-center/info')
        }
      })
    } else {
      // 清理 localStorage
      localStorage.removeItem('emailToVerify')
      localStorage.removeItem('emailVerificationStatus')
      router.push('/user/user-center/info')
    }
  }

  // 更新用戶信息
  const updateUserInfo = async () => {
    if (!emailVerified && formValues.email !== initialFormValues.email) {
      Swal.fire({
        title: '電子信箱未驗證',
        html: `<span class="p">請先驗證您的新電子信箱後再進行修改。</span>`,
        icon: 'warning',
        customClass: {
          popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
          confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
        },
        confirmButtonText: '確認', // 修改按鈕文字
      })
      return
    }

    Swal.fire({
      title: '確認修改？',
      html: `<span class="p">您確定要修改這些資料嗎？</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認修改',
      cancelButtonText: '取消',
      customClass: {
        popup: `${styles['swal-popup-bo']}`,
        title: 'h6',
        icon: `${styles['swal-icon-bo']}`,
        confirmButton: `${styles['swal-btn-bo']}`,
        cancelButton: `${styles['swal-btn-cancel-bo']}`,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formIsValid = await validateForm()

        if (formIsValid) {
          const birthDate = `${formValues.year}-${formValues.month}-${formValues.day}`

          const updatedFormValues = {
            ...formValues,
            birthDate,
          }

          setIsFormSubmitted(true)

          fetch(`http://localhost:3005/api/user-edit/update-user/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFormValues),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 'success') {
                localStorage.removeItem('emailToVerify')
                localStorage.removeItem('emailVerificationStatus')

                sessionStorage.setItem('updateSuccess', 'true')

                // 顯示成功訊息並跳轉
                Swal.fire({
                  title: '修改成功',
                  html: `<span class="p">您的資料已成功修改。</span>`,
                  icon: 'success',
                  customClass: {
                    popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
                    title: 'h6',
                    icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
                    confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
                  },
                  confirmButtonText: '確認', // 修改按鈕文字
                }).then(() => {
                  router.push('/user/user-center/info')
                })
              } else {
                Swal.fire({
                  title: '修改失敗',
                  html: `<span class="p">請稍後再試</span>`,
                  icon: 'error',
                  customClass: {
                    popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
                    title: 'h6',
                    icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
                    confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
                  },
                  confirmButtonText: '確認', // 修改按鈕文字
                })
              }
            })
            .catch((error) => {
              console.error('Error updating user info:', error)
            })
        }
      }
    })
  }

  // 如果沒有用戶登入則不顯示
  if (!user) {
    return null
  }

  // 格式化日期
  const createdAt = user.created_at.split(' ')[0].replace(/-/g, ' / ')
  // 現在年份
  const currentYear = new Date().getFullYear()
  // 最早可選年份（年滿18歲的年份）
  const earliestYear = currentYear - 18

  return (
    <>
      <div className={`${styles['user-info-box-bo']}  w-100`}>
        <div className={`${styles['info-form-box-bo']} flex-column d-flex`}>
          {/* 基本資訊區塊 */}
          <div
            className={`${styles['info-default-box-bo']} row justify-content-center align-items-center gap-5 gap-lg-0`}
          >
            <div
              className={`${styles['default-information-box-bo']} col-12  col-lg-8 d-flex flex-column justify-content-center align-items-center`}
            >
              <div className={`${styles['default-information-title-bo']} h5`}>
                基本資訊
              </div>
              <div
                className={`${styles['default-information-form-bo']} justify-content-center align-items-center d-flex flex-column`}
              >
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>email</h6>
                  <div
                    className={`w-100 d-flex justify-content-center  gap-3 `}
                  >
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={formValues.email || ''} // 確保 value 有預設值
                      onChange={onInputChange}
                      name="email"
                      placeholder="請輸入需修改的email"
                    />
                    <button
                      className={`${styles['btn-email-bo']} btn p`}
                      type="button"
                      onClick={sendVerificationEmail}
                    >
                      驗證
                    </button>
                  </div>
                </div>
                {(errors.email || errors.emailVerified) && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.email || errors.emailVerified}
                    </p>
                  </div>
                )}
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>帳號</h6>
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={formValues.account || ''} // 確保 value 有預設值
                    onChange={onInputChange}
                    name="account"
                    placeholder="請輸入需修改的帳號"
                  />
                </div>
                {errors.account && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.account}
                    </p>
                  </div>
                )}
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>密碼</h6>
                  <input
                    type="text" // 改成 text 顯示密碼
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={formValues.password || ''} // 確保 value 有預設值
                    onChange={onInputChange}
                    name="password"
                    placeholder="請輸入需修改的密碼"
                  />
                </div>
                {errors.password && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.password}
                    </p>
                  </div>
                )}
                {showConfirmPassword && (
                  <>
                    <div
                      className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                    >
                      <h6 className={`${styles['info-name-bo']} h6`}>確認</h6>
                      <input
                        type="text" // 這裡改成 text 顯示原密碼
                        className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                        value={formValues.confirmPassword || ''} // 確保 value 有預設值
                        onChange={onInputChange}
                        name="confirmPassword"
                        placeholder="請再次輸入密碼"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <div
                        className={`d-flex justify-content-start w-100 mb-3`}
                      >
                        <p className={`${styles['text-error-bo']} p`}>
                          {errors.confirmPassword}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 使用者圖片區塊 */}
            <div
              className={`${styles['default-img-box-bo']} ${styles['move-up-bo']} col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center position-relative`}
            >
              <div className={styles['user-img-box-bo']}>
                <img
                  className={`${styles['user-img-bo']}`}
                  src={
                    user && user.user_img
                      ? `/images/boyu/users/${
                          user.user_img
                        }.jpg?${new Date().getTime()}`
                      : user && user.gender === '男'
                      ? '/images/boyu/users/user-male-default.svg'
                      : '/images/boyu/users/user-female-default.svg'
                  }
                  alt={user?.username || 'User'}
                />

                <button
                  type="button"
                  className={`${styles['btn-edit-img']} btn`}
                  onClick={() => fileInputRef.current.click()} // 觸發文件輸入點擊事件
                >
                  <FaEdit />
                </button>
              </div>
              <div
                className={`${styles['create-date-box-bo']} h6 text-center d-flex justify-content-center align-items-center`}
              >
                <h6>創建日期&nbsp;:&nbsp;</h6>
                <h6>{createdAt}</h6>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // 隱藏文件輸入
                onChange={onFileChange}
                accept="image/*" // 限制只能選擇圖片文件
              />
            </div>
          </div>

          {/* 詳細資訊區塊 */}
          <div
            className={`${styles['info-detail-box-bo']} row justify-content-center align-items-start gap-5 gap-xl-0`}
          >
            <div
              className={`${styles['detail-information-box-bo']} col-12 col-lg-8 d-flex flex-column justify-content-center align-items-center`}
            >
              <div className={`${styles['detail-information-title-bo']} h5`}>
                詳細資訊
              </div>
              <div
                className={`${styles['detail-information-form-bo']} justify-content-center align-items-center d-flex flex-column`}
              >
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>姓名</h6>
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={formValues.username || ''} // 確保 value 有預設值
                    onChange={onInputChange}
                    name="username"
                    placeholder="請輸入需修改的姓名"
                  />
                </div>
                {errors.username && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.username}
                    </p>
                  </div>
                )}
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>性別</h6>
                  <select
                    className={`${styles['info-text-bo']} ${styles['input-select']} h6 d-flex align-items-center`}
                    value={formValues.gender || ''} // 確保 value 有預設值
                    onChange={onInputChange}
                    name="gender"
                  >
                    <option value="">請選擇性別</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>

                {errors.gender && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.gender}
                    </p>{' '}
                  </div>
                )}
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>生日</h6>
                  <div className={`d-flex w-100 gap-3`}>
                    <select
                      className={`${styles['info-text-bo']} ${styles['input-select']} h6 d-flex align-items-center`}
                      value={formValues.year}
                      onChange={(e) => onInputChange(e, 'year')}
                      name="year"
                    >
                      <option value="">西元年</option>
                      {Array.from({ length: 101 }, (_, i) => {
                        const year = currentYear - i
                        if (year <= earliestYear) {
                          return (
                            <option key={i} value={year}>
                              {year}
                            </option>
                          )
                        }
                        return null
                      })}
                    </select>

                    <select
                      className={`${styles['info-text-bo']} ${styles['input-select']} h6 d-flex align-items-center`}
                      value={formValues.month}
                      onChange={(e) => onInputChange(e, 'month')}
                      name="month"
                    >
                      <option value="">月份</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <select
                      className={`${styles['info-text-bo']} ${styles['input-select']} h6 d-flex align-items-center`}
                      value={formValues.day}
                      onChange={(e) => onInputChange(e, 'day')}
                      name="day"
                    >
                      <option value="">日期</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {errors.birthDate && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.birthDate}
                    </p>{' '}
                  </div>
                )}
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>地址</h6>
                  <div
                    className={`w-100 d-flex justify-content-center  gap-3 `}
                  >
                    <select
                      className={`${styles['info-text-bo']} ${styles['info-city-bo']} ${styles['input-select']} h6 d-flex align-items-center`}
                      value={formValues.city || ''} // 確保 value 有預設值
                      onChange={onInputChange}
                      name="city"
                    >
                      <option value="">請選擇縣市</option>
                      <option value="台北市">台北市</option>
                      <option value="新北市">新北市</option>
                      <option value="桃園市">桃園市</option>
                      <option value="台中市">台中市</option>
                      <option value="台南市">台南市</option>
                      <option value="高雄市">高雄市</option>
                      <option value="基隆市">基隆市</option>
                      <option value="新竹市">新竹市</option>
                      <option value="嘉義市">嘉義市</option>
                      <option value="苗栗縣">苗栗縣</option>
                      <option value="彰化縣">彰化縣</option>
                      <option value="南投縣">南投縣</option>
                      <option value="雲林縣">雲林縣</option>
                      <option value="嘉義縣">嘉義縣</option>
                      <option value="屏東縣">屏東縣</option>
                      <option value="宜蘭縣">宜蘭縣</option>
                      <option value="花蓮縣">花蓮縣</option>
                      <option value="台東縣">台東縣</option>
                      <option value="澎湖縣">澎湖縣</option>
                      <option value="金門縣">金門縣</option>
                      <option value="連江縣">連江縣</option>
                    </select>
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={formValues.address || ''} // 確保 value 有預設值
                      onChange={onInputChange}
                      name="address"
                      placeholder="請輸入需修改的地址"
                    />
                  </div>
                </div>
                {errors.city && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.city}
                    </p>
                  </div>
                )}
                {errors.address && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.address}
                    </p>{' '}
                  </div>
                )}
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>手機</h6>
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={formValues.phone || ''} // 確保 value 有預設值
                    onChange={onInputChange}
                    name="phone"
                    placeholder="請輸入需修改的手機號碼"
                  />
                </div>
                {errors.phone && (
                  <div className={`d-flex justify-content-start w-100 mb-3`}>
                    <p className={`${styles['text-error-bo']} p`}>
                      {errors.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 信用卡表單區塊 */}
            <CreditCardForm cards={cards} setCards={setCards} user={user} />
          </div>

          {/* 操作按鈕區塊 */}
          <div
            className={`${styles['info-btn-box-bo']} d-flex justify-content-center align-items-center gap-5`}
          >
            <button
              onClick={cancelEdit}
              className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-2 gap-sm-3`}
            >
              取消修改
              <FaXmark />
            </button>
            <button
              className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-2 gap-sm-3`}
              onClick={updateUserInfo}
            >
              修改資訊
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// 指定佈局
UserInfoEdit.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
