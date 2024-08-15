import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/boyu/user-info.module.scss'
import { FaEdit } from 'react-icons/fa'
import { HiCreditCard } from 'react-icons/hi2'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa6'
import Link from 'next/link'
import UserSidebar from '@/components/user/user-sidebar'
import { AuthContext } from '@/context/AuthContext'

export default function UserInfo() {
  const router = useRouter()

  // 從 AuthContext 中獲取 user 狀態
  const { user } = useContext(AuthContext)

  const [isLoaded, setIsLoaded] = useState(false) // 新增一個狀態來追踪數據是否加載完成

  // 檢查是否已經登入，如果沒有登入則跳轉到登入頁面
  useEffect(() => {
    if (!user) {
      router.push('/login') // 跳轉到登入頁面
    } else {
      setIsLoaded(true) // 當user數據加載完成後設置isLoaded為true
    }
  }, [user, router])

  // 如果用戶未登入或者數據尚未加載，暫時不渲染頁面內容
  if (!user || !isLoaded) {
    return null
  }

  // 確保 created_at 欄位存在
  const createdAt = user.created_at.split(' ')[0].replace(/-/g, ' / ')

  const birthDate = user.birth.replace(/-/g, ' / ')

  return (
    <section className="d-flex flex-column flex-md-row">
      <UserSidebar /> {/* 會員中心側邊欄 */}
      <div className={`${styles['user-info-box-bo']} w-100`}>
        <div className={`${styles['info-form-box-bo']} flex-column d-flex`}>
          <div
            className={`${styles['info-default-box-bo']} row justify-content-center align-items-center`}
          >
            {/* 用戶基本資訊區塊 */}
            <div
              className={`${styles['default-information-box-bo']} col-12 col-md-7 col-lg-8 d-flex flex-column justify-content-center align-items-center`}
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
                    {user.email}
                  </div>
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>帳號</h6>
                  <div
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                  >
                    {user.account}
                  </div>
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>密碼</h6>
                  <div
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                  >
                    {'●'.repeat(user.password.length)}
                  </div>
                </div>
              </div>
            </div>

            {/* 用戶圖片區塊 */}
            <div
              className={`${styles['default-img-box-bo']} ${styles['move-up-bo']} col-12 col-md-5 col-lg-4 d-flex flex-column justify-content-center align-items-center position-relative`}
            >
              <div className={styles['user-img-box-bo']}>
                <img
                  className={`${styles['user-img-bo']} d-none d-md-block`}
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
                <h6>{createdAt}</h6> {/* 顯示格式化後的創建日期 */}{' '}
              </div>
            </div>
          </div>

          {/* 用戶詳細資訊區塊 */}
          <div
            className={`${styles['info-detail-box-bo']} row justify-content-center align-items-start gap-md-5 gap-lg-0`}
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
                    {user.username}
                  </div>
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>性別</h6>
                  <div
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                  >
                    {user.gender}
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
                    {`${user.city} 
                    ${user.address}`}
                  </div>
                </div>
                <div
                  className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                >
                  <h6 className={`${styles['info-name-bo']} h6`}>手機</h6>
                  <div
                    className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                  >
                    {user.address}
                  </div>
                </div>
              </div>
            </div>

            {/* 用戶信用卡資訊區塊 */}
            <div
              className={`${styles['detail-card-box-bo']} ${styles['move-up-bo']} col-12 col-lg-4 d-flex flex-column justify-content-start align-items-center`}
            >
              <div className={`${styles['detail-card-title-bo']} h5`}>
                信用卡
              </div>
              <div
                className={`${styles['detail-card-list-bo']} d-flex flex-column gap-4`}
              >
                {/* 信用卡項目 */}
                <div
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
                        className={`${styles['card-text-up-bo']} d-flex justify-content-between align-items-center`}
                      >
                        <p>台北富邦</p>
                        <p>***</p>
                      </div>
                      <div
                        className={`${styles['card-text-down-bo']} d-flex justify-content-between align-items-center gap-1 p`}
                      >
                        <p>1233</p>
                        <p>1234</p>
                        <p>1233</p>
                        <p>1233</p>
                      </div>
                    </div>
                    <div
                      className={`${styles['icon-card-date-bo']} d-flex flex-column justify-content-center align-items-center`}
                    >
                      <FaCcMastercard
                        className={`${styles['icon-master-bo']} `}
                      />

                      <p className={styles['card-date-bo']}>06/29</p>
                    </div>
                  </div>
                </div>
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
                href="http://localhost:3000/user/user-info-edit"
              >
                修改資訊
                <FaEdit />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
