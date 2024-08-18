import { useContext, useState, useEffect } from 'react'
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
  const { user } = useContext(AuthContext)

  // 狀態管理
  const [cards, setCards] = useState([]) // 信用卡列表

  // 用戶詳細資料的狀態管理
  const [formValues, setFormValues] = useState({
    email: '',
    account: '',
    password: '',
    confirmPassword: '',
    username: '',
    gender: '',
    birthDate: '',
    city: '',
    address: '',
    phone: '',
  })

  const [initialFormValues, setInitialFormValues] = useState({}) // 用於追蹤初始值
  const [isPasswordChanged, setIsPasswordChanged] = useState(false) // 用於追蹤密碼是否修改
  const [emailVerified, setEmailVerified] = useState(false) // 追蹤 email 是否驗證過
  const [needPwdValidation, setNeedPwdValidation] = useState(true) // 是否需要驗證原密碼
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  // 從伺服器獲取用戶資料
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/user/user/${user.id}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      const result = await response.json()
      const updatedUser = result.data // 從 data 屬性中提取用戶信息

      // 設定初始值
      const initialValues = {
        email: updatedUser.email || '',
        account: updatedUser.account || '',
        password: updatedUser.password || '',
        username: updatedUser.username || '',
        confirmPassword: '',
        gender: updatedUser.gender || '',
        birthDate: updatedUser.birth || '',
        city: updatedUser.city || '',
        address: updatedUser.address || '',
        phone: updatedUser.phone || '',
      }

      setFormValues(initialValues)
      setInitialFormValues(initialValues)
      setEmailVerified(true)
      setNeedPwdValidation(true)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  // 初始化用戶數據
  useEffect(() => {
    console.log(user) // 調試輸出 user

    if (user && user.id) {
      fetchUserData()
    } else {
      console.error('User ID is missing or user is not defined.')
      // 你可以在這裡做額外處理，例如重導或顯示錯誤訊息給用戶
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
      birthDate,
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
        text: '您尚未對資料進行任何修改。',
        icon: 'warning',
        confirmButtonText: 'OK',
      })
      return false // 返回 false，表示驗證未通過
    }

    // 檢查並驗證 email
    if (email !== initialFormValues.email) {
      if (!email || !emailRegex.test(email)) {
        newErrors.email = '請輸入有效的電子信箱'
      }
    }
    toggleCorrectClass('email', !newErrors.email) // 無論有無錯誤，都要調用

    // 檢查並驗證帳號
    if (account !== initialFormValues.account) {
      if (!account || !accountPasswordRegex.test(account)) {
        newErrors.account = '帳號應至少6碼，且包含英文字'
      }
    }
    toggleCorrectClass('account', !newErrors.account) // 無論有無錯誤，都要調用

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
    ) // 無論有無錯誤，都要調用

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

    if (birthDate !== initialFormValues.birthDate) {
      if (!birthDate) {
        newErrors.birthDate = '請選擇生日'
      }
    }
    toggleCorrectClass('birthDate', !newErrors.birthDate)

    if (city !== initialFormValues.city) {
      if (!city) {
        newErrors.city = '請選擇縣市'
      }
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

    // 更新錯誤訊息狀態
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 動態添加或移除 info-correct-bo 類的輔助函數
  const toggleCorrectClass = (fieldName, isValid) => {
    const element = document.querySelector(`[name="${fieldName}"]`)
    console.log(`Element for fieldName "${fieldName}":`, element)
    if (element) {
      // 檢查並強制應用背景色
      if (isValid) {
        element.style.backgroundColor = 'rgba(183, 148, 71, 0.2)'
      } else {
        element.style.backgroundColor = '' // 清除內聯樣式
      }
    } else {
      console.log(`Element with name "${fieldName}" not found.`)
    }
  }

  // 發送驗證郵件
  const sendVerificationEmail = () => {
    // 如果 email 已經存在，禁用驗證按鈕
    if (errors.email) {
      Swal.fire({
        title: '電子信箱已被使用',
        text: '此電子信箱已被使用，請選擇其他電子信箱。',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return
    }

    // 模擬發送驗證郵件的 API 請求
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
            text: '請檢查您的郵箱並點擊驗證連結',
            icon: 'success',
            confirmButtonText: 'OK',
          })
          setEmailVerified(true) // 將 email 設為已驗證
        } else {
          Swal.fire({
            title: '發送失敗',
            text: '無法發送驗證郵件，請稍後再試',
            icon: 'error',
            confirmButtonText: 'OK',
          })
        }
      })
      .catch((error) => {
        Swal.fire({
          title: '伺服器錯誤',
          text: '請稍後再試',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      })
  }

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
          router.push('/user/user-center/info')
        }
      })
    } else {
      router.push('/user/user-center/info')
    }
  }

  // 更新用戶信息
  const updateUserInfo = async () => {
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
          setIsFormSubmitted(true) // 表單驗證通過後設置為已提交

          // 表單驗證通過，執行更新操作
          fetch(`http://localhost:3005/api/user-edit/update-user/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 'success') {
                sessionStorage.setItem('updateSuccess', 'true')
                router.push('/user/user-center/info')
              } else {
                Swal.fire({
                  title: '修改失敗',
                  text: '請稍後再試',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  customClass: {
                    title: 'h6',
                    icon: `${styles['swal-icon-bo']}`,
                    confirmButton: `${styles['swal-btn-bo']}`,
                  },
                })
              }
            })
            .catch((error) => {
              Swal.fire({
                title: '伺服器錯誤',
                text: '請稍後再試',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                  title: 'h6',
                  icon: `${styles['swal-icon-bo']}`,
                  confirmButton: `${styles['swal-btn-bo']}`,
                },
              })
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
  const birthDate = user.birth.replace(/-/g, ' / ')

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
                      value={formValues.email}
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
                    value={formValues.account}
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
                    value={formValues.password}
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
                        value={formValues.confirmPassword}
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
                      ? `/images/boyu/users/${user.user_img}.jpg`
                      : user && user.gender === '男'
                      ? '/images/boyu/users/user-male-default.svg'
                      : '/images/boyu/users/user-female-default.svg'
                  }
                  alt={user?.username || 'User'}
                />
                <div className={styles['btn-edit-img']}>
                  <FaEdit />
                </div>
              </div>
              <div
                className={`${styles['create-date-box-bo']} h6 text-center d-flex justify-content-center align-items-center`}
              >
                <h6>創建日期&nbsp;:&nbsp;</h6>
                <h6>{createdAt}</h6>
              </div>
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
                    value={formValues.username}
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
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={formValues.gender}
                    onChange={onInputChange}
                    name="gender"
                    placeholder="請輸入需修改的性別"
                  />
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
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={formValues.birthDate}
                    onChange={onInputChange}
                    name="birthDate"
                    placeholder="請輸入需修改的生日"
                  />
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
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} ${styles['info-city-bo']} h6 d-flex align-items-center`}
                      value={formValues.city}
                      onChange={onInputChange}
                      name="city"
                      placeholder="縣市"
                    />
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={formValues.address}
                      onChange={onInputChange}
                      name="address"
                      placeholder="請輸入需修改的地址"
                    />
                  </div>
                </div>
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
                    value={formValues.phone}
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
