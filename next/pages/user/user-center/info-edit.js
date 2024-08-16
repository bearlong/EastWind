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

  const [isPasswordChanged, setIsPasswordChanged] = useState(false) // 用於追蹤密碼是否更改

  const [emailVerified, setEmailVerified] = useState(false) // 追蹤 email 是否驗證過

  useEffect(() => {
    if (user) {
      const initialValues = {
        email: user.email,
        account: user.account,
        password: '●'.repeat(user.password.length),
        username: user.username,
        confirmPassword: '',
        gender: user.gender,
        birthDate: user.birth,
        city: user.city,
        address: user.address,
        phone: user.phone,
      }

      setFormValues(initialValues)
      setInitialFormValues(initialValues) // 保存初始值
      setEmailVerified(true) // 初始的 email 預設為已驗證
    }
  }, [user])

  const onInputChange = (event) => {
    const { name, value } = event.target

    // 如果用戶修改了 email，將驗證狀態設置為 false
    if (name === 'email') {
      setEmailVerified(false)
    }

    // 如果用戶修改了密碼框的內容，更新`isPasswordChanged`
    if (name === 'password') {
      setIsPasswordChanged(true)
    }

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    // 當用戶實際更改了密碼時，才顯示確認密碼輸入框
    setShowConfirmPassword(formValues.password !== initialFormValues.password)
  }, [formValues.password, initialFormValues.password])

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

    // 用於驗證的正則表達式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const accountPasswordRegex = /^(?=.*[A-Za-z])[A-Za-z\d]{6,}$/ // 至少6碼且包含英文字
    const phoneRegex = /^09\d{8}$/

    const newErrors = {}

    // 檢查帳號和電子信箱的唯一性
    const { accountExists, emailExists } = await checkUniqueValues(
      email,
      account
    )

    if (emailExists) {
      newErrors.email = '電子信箱已被使用'
    }

    if (accountExists) {
      newErrors.account = '帳號已存在'
    }

    // 如果電子信箱已存在，直接返回錯誤，無需驗證
    if (newErrors.email) {
      setErrors(newErrors)
      return false
    }

    // 驗證電子信箱
    if (!email || !emailRegex.test(email)) {
      newErrors.email = '請輸入有效的電子信箱'
    }

    // 驗證帳號和密碼是否相同
    if (account && password && account === password) {
      newErrors.password = '帳號與密碼不能相同'
    }

    // 驗證帳號（至少6碼且包含英文字）
    if (!account || !accountPasswordRegex.test(account)) {
      newErrors.account = '帳號應至少6碼，且包含英文字'
    }

    // 驗證密碼（至少6碼且包含英文字）
    if (!password || !accountPasswordRegex.test(password)) {
      newErrors.password = '密碼應至少6碼，且包含英文字'
    }

    // 驗證確認密碼（僅當密碼已更改時）
    if (showConfirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = '兩次密碼輸入不一致'
    }

    // 驗證其他欄位
    if (!username) {
      newErrors.username = '姓名不能為空'
    }

    if (!gender) {
      newErrors.gender = '請選擇性別'
    }

    if (!birthDate) {
      newErrors.birthDate = '請選擇生日'
    }

    if (!city) {
      newErrors.city = '請選擇縣市'
    }

    if (!address) {
      newErrors.address = '地址不能為空'
    }

    if (!phone || !phoneRegex.test(phone)) {
      newErrors.phone = '請輸入有效的手機號碼'
    }

    if (!emailVerified) {
      newErrors.emailVerified = '請點擊驗證按鈕以驗證電子信箱'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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

  const updateUserInfo = async () => {
    const isValid = await validateForm() // 驗證表單

    if (!isValid) {
      // 若表單有錯誤，直接返回，不進行後續的資料提交
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
    }).then((result) => {
      if (result.isConfirmed) {
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
                    type="password"
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
                        type="password"
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
            <CreditCardForm cards={cards} setCards={setCards} user={user} />
          </div>

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
UserInfoEdit.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
