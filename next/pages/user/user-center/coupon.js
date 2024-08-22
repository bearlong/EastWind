import { useState, useEffect, useContext } from 'react'
import styles from '@/styles/boyu/user-coupon.module.scss'
import UserCenterLayout from '@/components/layout/user-center-layout'
import { AuthContext } from '@/context/AuthContext'
import Swal from 'sweetalert2'

import {
  FaPlus,
  FaMagnifyingGlass,
  FaBan,
  FaMoneyBill,
  FaXmark,
} from 'react-icons/fa6'
import { FaPercent } from 'react-icons/fa'

export default function UserCoupons() {
  const { user } = useContext(AuthContext) // 獲取當前用戶資訊
  const userId = user?.id // 使用可選鏈式操作來確保 `user` 已初始化
  const [coupons, setCoupons] = useState([]) // 儲存從後端獲取的優惠券數據
  const [couponCode, setCouponCode] = useState('') // 優惠代碼狀態
  const [filterStatus, setFilterStatus] = useState('active') // 預設顯示可領取的優惠券

  // 獨立函數：通過代碼新增優惠券
  const addCouponByCode = async (couponCode) => {
    if (!couponCode) {
      Swal.fire({
        title: '請輸入代碼',
        html: `<span class="p">請輸入有效的優惠代碼</span>`,
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

    try {
      const response = await fetch(
        `http://localhost:3005/api/coupons/redeem-code/${userId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: couponCode }), // 傳遞優惠代碼至後端
        }
      )
      const result = await response.json()
      if (response.ok) {
        Swal.fire({
          title: '新增成功',
          html: `<span class="p">優惠券已新增!</span>`,
          icon: 'success',
          customClass: {
            popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
            title: 'h6',
            icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
            confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
          },
          confirmButtonText: '確認', // 修改按鈕文字
        })
        // 重新加載優惠券列表，切換到可使用的列表
        setFilterStatus('unused')
      } else {
        Swal.fire({
          title: '新增失敗',
          html: `<span class="p">${
            result.message || '優惠券無效或已被使用'
          }</span>`, // 正確使用方式
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
      console.log(error.message)
    }
  }

  // 根據狀態加載優惠券
  useEffect(() => {
    const fetchCoupons = async () => {
      if (!userId && filterStatus !== 'active') return

      let apiUrl = `http://localhost:3005/api/coupons/${filterStatus}/${userId}`

      try {
        const response = await fetch(apiUrl)
        if (response.ok) {
          const data = await response.json()
          const validCoupons = data.data.filter((coupon) => {
            const today = new Date().toISOString().split('T')[0]
            return coupon.valid_to >= today // 過濾出有效的優惠券
          })
          setCoupons(validCoupons)
        } else {
          console.error('無法撈取優惠券:', response.statusText)
        }
      } catch (error) {
        console.error('撈取優惠券時發生錯誤:', error)
      }
    }

    fetchCoupons()
  }, [filterStatus, userId])

  const redeemCoupon = async (couponId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/coupons/add/${userId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ couponId }), // 傳遞選中的優惠券ID至後端
        }
      )

      const result = await response.json()
      if (response.ok) {
        Swal.fire({
          title: '領取成功',
          html: `<span class="p">優惠券領取成功!</span>`,
          icon: 'success',
          customClass: {
            popup: `${styles['swal-popup-bo']}`, // 自訂整個彈出視窗的 class
            title: 'h6',
            icon: `${styles['swal-icon-bo']}`, // 添加自定義 class
            confirmButton: `${styles['swal-btn-bo']}`, // 添加自定義按鈕 class
          },
          confirmButtonText: '確認', // 修改按鈕文字
        })

        // 直接從 coupons 狀態中移除已領取的優惠券
        setCoupons((prevCoupons) =>
          prevCoupons.filter((coupon) => coupon.id !== couponId)
        )

        // 如果已領取，切換到可使用的列表
        setFilterStatus('unused')
      } else {
        Swal.fire({
          title: '領取失敗',
          html: `<span class="p">${result.message || '領取失敗'}</span>`, // 正確的使用方式
          icon: 'warning',
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
      console.error('領取優惠券時發生錯誤:', error)
    }
  }

  return (
    <div className={`${styles['user-coupon-box-bo']} w-100`}>
      <div
        className={`${styles['add-coupon-box-bo']} d-flex flex-column flex-sm-row justify-content-center align-items-center gap-lg-5 gap-3 `}
      >
        <h6>新增優惠券</h6>
        <input
          type="text"
          placeholder="輸入優惠代碼"
          value={couponCode} // 綁定 couponCode 狀態
          className={`${styles['input-add-bo']} p`}
          onChange={(e) => setCouponCode(e.target.value)} // 更新 couponCode 狀態
        />
        <button
          className={`${styles['btn-coupon-add']} h6 d-flex justify-content-between align-items-center`}
          onClick={() => addCouponByCode(couponCode)} // 調用獨立函數新增優惠券
        >
          <FaPlus />
          <h6>新增</h6>
        </button>
      </div>

      <div className={`${styles['coupon-list-box-bo']} flex-column d-flex`}>
        <div className={styles['coupon-list-head-bo']}>
          <ul
            className={`${styles['coupon-state-box-bo']} d-flex justify-content-around align-items-center text-center`}
          >
            <li>
              <button
                type="button"
                className={`${styles['coupon-state-bo']} ${
                  filterStatus === 'active' ? styles['state-choose-bo'] : ''
                }  h5`}
                onClick={() => setFilterStatus('active')}
              >
                可領取
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles['coupon-state-bo']} ${
                  filterStatus === 'unused' ? styles['state-choose-bo'] : ''
                } h5`}
                onClick={() => setFilterStatus('unused')}
              >
                可使用
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles['coupon-state-bo']} ${
                  filterStatus === 'used' ? styles['state-choose-bo'] : ''
                }  h5`}
                onClick={() => setFilterStatus('used')}
              >
                已使用
              </button>
            </li>
          </ul>
        </div>

        <div className={styles['coupon-list-body-bo']}>
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className={`${styles['coupon-card-bo']} d-flex flex-column justify-content-start align-items-center gap-3`}
            >
              <div className="h5 d-flex w-100 justify-content-between align-items-center">
                <h5 className="text-nowrap">{coupon.name}</h5>
                <div
                  className={`${styles['btn-detail-box-bo']} d-flex justify-content-end w-100`}
                >
                  {coupon.status === 'used' ? (
                    <div
                      className={`${styles['text-coupon-detail']} p d-flex justify-content-between align-items-center`}
                    >
                      <FaXmark />
                      <div
                        className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                      >
                        <p>已使用</p>
                      </div>
                    </div>
                  ) : coupon.status === 'inactive' ? (
                    <div
                      className={`${styles['text-coupon-detail']} p d-flex justify-content-between align-items-center`}
                    >
                      <FaBan />
                      <div
                        className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                      >
                        <p>已失效</p>
                      </div>
                    </div>
                  ) : (
                    <button
                      className={`${styles['btn-coupon-detail']} p d-flex justify-content-between align-items-center`}
                      onClick={() => {
                        if (filterStatus === 'active') {
                          redeemCoupon(coupon.id) // 領取優惠券
                        } else {
                          window.location.href = '/product/productList' // 將用戶引導至商城首頁
                        }
                      }}
                    >
                      {filterStatus === 'active' ? (
                        <FaPlus className={`${styles['btn-icon-bo']} `} />
                      ) : (
                        <FaMagnifyingGlass
                          className={`${styles['btn-icon-bo']} `}
                        />
                      )}
                      <div
                        className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                      >
                        <p>{filterStatus === 'active' ? '領取' : '去逛逛'}</p>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`${styles['coupon-card-body-bo']} d-flex justify-content-start align-items-center w-100`}
              >
                <div
                  className={`${styles['coupon-type-box-bo']} d-flex justify-content-center align-items-center flex-column gap-3`}
                >
                  {coupon.discount_type === 'percent' ? (
                    <>
                      <FaPercent className={`${styles['icon-shop-bo']} `} />
                      <p className={styles['coupon-type-text-bo']}>折數折扣</p>
                    </>
                  ) : (
                    <>
                      <FaMoneyBill className={`${styles['icon-shop-bo']} `} />
                      <p className={styles['coupon-type-text-bo']}>現金折扣</p>
                    </>
                  )}
                </div>

                <div
                  className={`${styles['coupon-text-box-bo']} d-flex flex-column align-items-start gap-3`}
                >
                  <h6
                    className={`${styles['list-text-bo']} d-flex justify-content-center align-items-center`}
                  >
                    {coupon.discount_type === 'percent'
                      ? coupon.discount_value % 10 === 0
                        ? `打 ${coupon.discount_value / 10} 折`
                        : `打 ${coupon.discount_value} 折`
                      : `折 ${coupon.discount_value} 元`}
                  </h6>
                  <p
                    className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                  >
                    低消 {coupon.limit_value} 元
                  </p>
                  <div
                    className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                  >
                    <div
                      className={`${styles['time-text-box-bo']} d-flex justify-content-center align-items-start text-start`}
                    >
                      <p>有效日期 :&nbsp;</p>
                      <p>{coupon.valid_to}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

UserCoupons.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
