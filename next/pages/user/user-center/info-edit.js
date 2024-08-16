import { useContext, useState, useEffect } from 'react'
import UserCenterLayout from '@/components/layout/user-center-layout'
import styles from '@/styles/boyu/user-info-edit.module.scss'
import { FaEdit } from 'react-icons/fa'
import { HiCreditCard } from 'react-icons/hi2'
import {
  FaCcVisa,
  FaCcMastercard,
  FaTrashCan,
  FaXmark,
  FaPlus,
  FaCheck,
} from 'react-icons/fa6'
import { AuthContext } from '@/context/AuthContext'
import Swal from 'sweetalert2'
import Link from 'next/link'
import CreditCardForm from '@/components/user/credit-card-form'

export default function UserInfoEdit() {
  // 取得當前登入用戶資訊
  const { user } = useContext(AuthContext)

  // 狀態管理
  const [cards, setCards] = useState([]) // 信用卡列表

  // 新信用卡的狀態管理
  const [newCard, setNewCard] = useState({
    card_name: '',
    card_number: '',
    card_type: '',
    exp_date: '',
  })

  // 用戶詳細資料的狀態管理
  const [formValues, setFormValues] = useState({
    email: '',
    account: '',
    password: '',
    username: '',
    gender: '',
    birthDate: '',
    address: '',
    phone: '',
  })

  // 處理表單輸入變更
  const onInputChange = (event) => {
    const { name, value } = event.target
    setNewCard({
      ...newCard,
      [name]: value,
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
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={user?.email || ''}
                    onChange={onInputChange}
                    name="email"
                    placeholder="請輸入需修改的email"
                  />
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>帳號</h6>
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={user?.account || ''}
                    onChange={onInputChange}
                    name="account"
                    placeholder="請輸入需修改的帳號"
                  />
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>密碼</h6>
                  <input
                    type="password"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={user?.password || ''}
                    onChange={onInputChange}
                    name="password"
                    placeholder="請輸入需修改的密碼"
                  />
                </div>
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
                    value={user?.username || ''}
                    onChange={onInputChange}
                    name="username"
                    placeholder="請輸入需修改的姓名"
                  />
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>性別</h6>
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={user?.gender || ''}
                    onChange={onInputChange}
                    name="gender"
                    placeholder="請輸入需修改的性別"
                  />
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>生日</h6>
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={birthDate || ''}
                    onChange={onInputChange}
                    name="birthDate"
                    placeholder="請輸入需修改的生日"
                  />
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>地址</h6>
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={user?.address || ''}
                    onChange={onInputChange}
                    name="address"
                    placeholder="請輸入需修改的地址"
                  />
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>手機</h6>
                  <input
                    type="text"
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                    value={user?.phone || ''}
                    onChange={onInputChange}
                    name="phone"
                    placeholder="請輸入需修改的手機號碼"
                  />
                </div>
              </div>
            </div>
            <CreditCardForm cards={cards} setCards={setCards} user={user} />
          </div>

          <div
            className={`${styles['info-btn-box-bo']} d-flex justify-content-center align-items-center gap-5`}
          >
            <Link
              href="/user/user-center/info"
              className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-2 gap-sm-3`}
            >
              取消修改
              <FaXmark />
            </Link>
            <button
              className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-2 gap-sm-3`}
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
