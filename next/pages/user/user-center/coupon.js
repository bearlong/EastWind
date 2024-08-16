import styles from '@/styles/boyu/user-coupon.module.scss'
import UserCenterLayout from '@/components/layout/user-center-layout'
import {
  FaPlus,
  FaMagnifyingGlass,
  FaBan,
  FaMoneyBill,
  FaXmark,
} from 'react-icons/fa6'
import { FaPercent } from 'react-icons/fa'

export default function UserCoupons() {
  // 假設這些資料來自於你的後端或狀態
  const coupons = [
    {
      type: 'percent', // 'percent' 表示百分比折扣
      title: '夏日優惠',
      discount: '打 9 折',
      minimum: '低消 3000 元',
      validUntil: '2024/07/24',
      used: false,
      expired: false,
    },
    {
      type: 'cash', // 'cash' 表示現金折扣
      title: '中秋優惠',
      discount: '折 300 元',
      minimum: '低消 3000 元',
      validUntil: '2024/07/24',
      used: true,
      expired: false,
    },
  ]

  return (
    <div className={`${styles['user-coupon-box-bo']} w-100`}>
      <div
        className={`${styles['add-coupon-box-bo']} d-flex flex-column flex-sm-row justify-content-center align-items-center gap-lg-5 gap-3 `}
      >
        <h6>新增優惠劵</h6>
        <input
          type="text"
          placeholder="輸入優惠代碼"
          className={`${styles['input-add-bo']} p`}
        />
        <button
          className={`${styles['btn-coupon-add']} h6 d-flex justify-content-between align-items-center`}
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
              <a href="#" className={`${styles['coupon-state-bo']} h5`}>
                未使用
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`${styles['coupon-state-bo']} ${styles['state-choose-bo']} h5`}
              >
                已使用
              </a>
            </li>
            <li>
              <a href="#" className={`${styles['coupon-state-bo']} h5`}>
                已失效
              </a>
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
                <h5 className="text-nowrap">{coupon.title}</h5>
                <div
                  className={`${styles['btn-detail-box-bo']} d-flex justify-content-end w-100`}
                >
                  {coupon.used ? (
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
                  ) : coupon.expired ? (
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
                    >
                      <FaMagnifyingGlass
                        className={`${styles['btn-icon-bo']} `}
                      />

                      <div
                        className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                      >
                        <p>去逛逛</p>
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
                  {coupon.type === 'percent' ? (
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
                    {coupon.discount}
                  </h6>
                  <p
                    className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
                  >
                    {coupon.minimum}
                  </p>
                  <div
                    className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                  >
                    <div
                      className={`${styles['time-text-box-bo']} d-flex justify-content-center align-items-start text-start`}
                    >
                      <p>有效日期 :&nbsp;</p>
                      <p>{coupon.validUntil}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            className={`${styles['btn-more']} d-flex justify-content-center align-items-center`}
          >
            <p>查看更多</p>
            <i className={styles['edit-icon']}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCoupons.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
