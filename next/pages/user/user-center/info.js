import { useContext, useEffect, useState } from 'react'
import styles from '@/styles/boyu/user-info.module.scss'
import { FaEdit } from 'react-icons/fa'
import { HiCreditCard } from 'react-icons/hi2'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa6'
import Link from 'next/link'
import { AuthContext } from '@/context/AuthContext'
import UserCenterLayout from '@/components/layout/user-center-layout'
import Swal from 'sweetalert2'

export default function UserInfo() {
  // 從 AuthContext 中獲取 user 狀態
  const { user } = useContext(AuthContext)
  const [userData, setUserData] = useState(null) // 使用 useState 管理用戶資料
  const [cards, setCards] = useState([])

  useEffect(() => {
    const updateSuccess = sessionStorage.getItem('updateSuccess')
    if (updateSuccess) {
      Swal.fire({
        title: '修改成功！',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          title: 'h6',
          icon: `${styles['swal-icon-bo']}`,
          confirmButton: `${styles['swal-btn-bo']}`,
        },
      })
      sessionStorage.removeItem('updateSuccess') // 清除成功訊息
    }

    // 從伺服器獲取最新的用戶資料
    if (user) {
      fetch(`http://localhost:3005/api/user/user/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setUserData(data.data) // 更新 userData 狀態
          }
        })
        .catch()
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3005/api/user/user/${user.id}/cards`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setCards(data.data)
          }
        })
        .catch()
    }
  }, [user])

  if (!user || !userData) {
    return null
  }

  // 格式化日期
  const createdAt = userData.created_at.split(' ')[0].replace(/-/g, ' / ')
  const birthDate = userData.birth.replace(/-/g, ' / ')

  return (
    <div className={`${styles['user-info-box-bo']} w-100`}>
      <div className={`${styles['info-form-box-bo']} flex-column d-flex`}>
        <div
          className={`${styles['info-default-box-bo']} row justify-content-center align-items-center gap-5 gap-lg-0`}
        >
          {/* 用戶基本資訊區塊 */}
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
                  className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                >
                  {userData.email}
                </div>
              </div>
              <div
                className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
              >
                <h6 className={`${styles['info-name-bo']} h6`}>帳號</h6>
                <div
                  className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                >
                  {userData.account}
                </div>
              </div>
              <div
                className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
              >
                <h6 className={`${styles['info-name-bo']} h6`}>密碼</h6>
                <div
                  className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                >
                  {'●'.repeat(userData.password.length)}
                </div>
              </div>
            </div>
          </div>

          {/* 用戶圖片區塊 */}
          <div
            className={`${styles['default-img-box-bo']} ${styles['move-up-bo']} col-12  col-lg-4 d-flex flex-column justify-content-center align-items-center position-relative`}
          >
            <div className={styles['user-img-box-bo']}>
              <img
                className={`${styles['user-img-bo']}`}
                src={
                  userData && userData.user_img
                    ? `/images/boyu/users/${userData.user_img}.jpg`
                    : userData && userData.gender === '男'
                    ? '/images/boyu/users/user-male-default.svg'
                    : '/images/boyu/users/user-female-default.svg'
                }
                alt={userData?.username || 'User'}
              />
            </div>
            <div
              className={`${styles['create-date-box-bo']} h6 text-center d-flex justify-content-center align-items-center`}
            >
              <h6>創建日期&nbsp;:&nbsp;</h6>
              <h6>{createdAt}</h6>
            </div>
          </div>
        </div>

        {/* 用戶詳細資訊區塊 */}
        <div
          className={`${styles['info-detail-box-bo']} row justify-content-center align-items-start  gap-5 gap-lg-0`}
        >
          <div
            className={`${styles['detail-information-box-bo']} col-12 col-lg-8 d-flex flex-column justify-content-center align-items-center `}
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
                <div
                  className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                >
                  {userData.username}
                </div>
              </div>
              <div
                className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
              >
                <h6 className={`${styles['info-name-bo']} h6`}>性別</h6>
                <div
                  className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                >
                  {userData.gender}
                </div>
              </div>
              <div
                className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
              >
                <h6 className={`${styles['info-name-bo']} h6`}>生日</h6>
                <div
                  className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                >
                  {birthDate}
                </div>
              </div>
              <div
                className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
              >
                <h6 className={`${styles['info-name-bo']} h6`}>地址</h6>
                <div
                  className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                >
                  {`${userData.city} ${userData.address}`}
                </div>
              </div>
              <div
                className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
              >
                <h6 className={`${styles['info-name-bo']} h6`}>手機</h6>
                <div
                  className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                >
                  {userData.phone}
                </div>
              </div>
            </div>
          </div>

          {/* 用戶信用卡資訊區塊 */}
          <div
            className={`${styles['detail-card-box-bo']}  col-12 col-lg-4 d-flex flex-column justify-content-start align-items-center`}
          >
            <div className={`${styles['detail-card-title-bo']} h5`}>信用卡</div>
            <div
              className={`${styles['detail-card-list-bo']} d-flex flex-column  gap-4 gap-md-5 gap-lg-4`}
            >
              {/* 信用卡項目 */}
              {cards.length > 0 ? (
                cards.map((card, index) => (
                  <div
                    key={index}
                    className={`${styles['card-col-bo']} d-flex justify-content-center align-items-center`}
                  >
                    <div
                      className={`${styles['card-body-bo']} d-flex justify-content-between align-items-center`}
                    >
                      <div className={styles['icon-card-box-bo']}>
                        <HiCreditCard className={`${styles['icon-card-bo']}`} />
                      </div>
                      <div className={styles['card-text-box-bo']}>
                        <div
                          className={`${styles['card-text-up-bo']} d-flex align-items-center`}
                        >
                          <p>{card.card_name}</p>
                        </div>
                        <div
                          className={`${styles['card-text-down-bo']} d-flex justify-content-center align-items-center gap-1`}
                        >
                          <div
                            className={` d-flex justify-content-center align-items-center gap-1`}
                          >
                            <p className={`text-center`}>**** ****</p>
                            <p className={`text-center`}>
                              **** {card.card_number.slice(-4)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles['icon-card-date-bo']} d-flex flex-column justify-content-center align-items-center`}
                      >
                        <p className={styles['card-type-bo']}>
                          {/* 根據卡片類型顯示相應圖標 */}
                          {card.card_type === 'Visa' && (
                            <FaCcVisa className={`${styles['icon-card-bo']}`} />
                          )}
                          {card.card_type === 'MasterCard' && (
                            <FaCcMastercard
                              className={`${styles['icon-card-bo']}`}
                            />
                          )}
                          {/* 如果不是 Visa 或 MasterCard，顯示默認圖標 */}
                          {!['Visa', 'MasterCard'].includes(card.card_type) && (
                            <HiCreditCard
                              className={`${styles['icon-card-bo']}`}
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>尚未新增信用卡</p>
              )}

              {/* 可新增更多的信用卡資訊項目 */}
            </div>
          </div>
        </div>

        {/* 修改資訊按鈕區塊 */}
        <div
          className={`${styles['info-btn-box-bo']} d-flex justify-content-center align-items-center`}
        >
          <button className={`${styles['btn-edit-info-bo']} btn h6 `}>
            <Link
              className={`${styles['link']} d-flex justify-content-center align-items-center  gap-5`}
              href="/user/user-center/info-edit"
            >
              修改資訊
              <FaEdit />
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
UserInfo.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
