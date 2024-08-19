import React, { useEffect, useState, useContext } from 'react'
import OrderList from '@/components/order/orderList'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/use-cart'
import UserCenterLayout from '@/components/layout/user-center-layout'
import styles from '@/styles/bearlong/orderDetail.module.scss'
import { FaChevronLeft, FaCircle, FaCheck, FaStar } from 'react-icons/fa6'

export default function OrderDetail() {
  const router = useRouter()
  const { oid } = router.query
  const [orderInfo, setOrderInfo] = useState({
    id: 0,
    numerical_order: '',
    user_id: 0,
    delivery_method: '',
    delivery_address: {},
    recipient: '',
    pay_method: '',
    pay_info: {},
    total: 0,
    coupons_id: 0,
    discount_info: 0,
    remark: '',
    status_now: '',
    order_date: '',
  })
  const [status, setStatus] = useState([{}])
  const [orderDetail, setOrderDetail] = useState([{}])
  const statusMapping = {
    付款完成: { displayText: '待出貨', color: 'var(--primary)' },
    已出貨: { displayText: '待收貨', color: 'var(--primary-dark)' },
    已完成: { displayText: '已完成', color: 'var(--background)' },
    已取消: { displayText: '已取消', color: 'var(--text-hover-color)' },
    '退貨/款': { displayText: '退貨/款', color: 'var(--error-color)' },
  }
  let currentStatus = statusMapping[orderInfo.status_now] || {
    displayText: '未知狀態',
    color: 'var(--default-color)',
  }
  const getStatusUpdateAt = (statuses, targetStatus) => {
    const statusObj = statuses.find((status) => status.status === targetStatus)
    return statusObj ? statusObj.update_at : null
  }

  const paymentStatus = getStatusUpdateAt(status, '付款完成')
  const shipmentStatus = getStatusUpdateAt(status, '已出貨')
  const completionStatus = getStatusUpdateAt(status, '已完成')
  const reviewStatus = getStatusUpdateAt(status, '已評論')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const url = `http://localhost:3005/api/order/${oid}`
        const response = await fetch(url)
        const result = await response.json()
        if (result.status === 'success') {
          const updatedOrderInfo = {
            ...result.data.orderInfo,
            delivery_address: result.data.orderInfo.delivery_address
              ? JSON.parse(result.data.orderInfo.delivery_address)
              : {},
            pay_info: result.data.orderInfo.pay_info
              ? JSON.parse(result.data.orderInfo.pay_info)
              : {},
          }
          setOrderInfo(updatedOrderInfo)
          setStatus(result.data.status)
          setOrderDetail(result.data.orderDetail)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (router.isReady) {
      fetchUserInfo()
    }
  }, [router.isReady])
  return (
    <>
      <div className={`${styles.main}`}>
        <div className={`${styles['orderList-bl']}`}>
          <div
            className={`${styles['orderTitle-bl']} d-flex flex-column flex-md-row justify-content-between`}
          >
            <div
              className={`${styles['btnBack-bl']} d-flex align-items-center`}
            >
              <FaChevronLeft className="h5 mb-2 mb-md-0" />
              <p>回上頁</p>
            </div>
            <div
              className={`${styles['orderNumber-bl']} d-flex align-items-center justify-content-between`}
            >
              <p>訂單編號: {orderInfo.numerical_order}</p>
              <span className="mx-3 d-none d-md-inline"> |</span>
              <span
                className={`${styles['statusLight-bl']}`}
                style={{ color: currentStatus.color }}
              >
                <FaCircle size={12} className="me-1" />
                {currentStatus.displayText}
              </span>
            </div>
          </div>
          <div
            className={`${styles['status-bl']} d-flex justify-content-between align-items-start`}
          >
            <div
              className={`${styles['statusBox-bl']} text-center d-md-flex flex-column justify-content-between align-items-center d-none`}
            >
              <div
                className={`${
                  styles['checkStatus-bl']
                } d-flex justify-content-center align-items-center ${
                  paymentStatus ? styles.active : ''
                }`}
              >
                <FaCheck className={`p ${paymentStatus ? '' : 'd-none'}`} />
              </div>
              <p>{paymentStatus ? '訂單成立' : '尚未付款'}</p>
              {paymentStatus ? paymentStatus : ''}
            </div>
            <div
              className={`${styles['statusBox-bl']} text-center d-md-flex flex-column justify-content-between align-items-center d-none`}
            >
              <div
                className={`${
                  styles['checkStatus-bl']
                } d-flex justify-content-center align-items-center ${
                  shipmentStatus ? styles.active : ''
                }`}
              >
                <FaCheck className={`p ${shipmentStatus ? '' : 'd-none'}`} />
              </div>
              <p>{shipmentStatus ? '已出貨' : '待出貨'}</p>
              {shipmentStatus ? shipmentStatus : ''}
            </div>
            <div
              className={`${styles['statusBox-bl']} text-center d-flex flex-column justify-content-between align-items-center`}
            >
              <div
                className={`${
                  styles['checkStatus-bl']
                } d-flex justify-content-center align-items-center ${
                  completionStatus ? styles.active : ''
                }`}
              >
                <FaCheck className={`p ${completionStatus ? '' : 'd-none'}`} />
              </div>
              <p>{completionStatus ? '訂單完成' : '待收貨'}</p>
              <p>{completionStatus ? completionStatus : ''}</p>
            </div>
            <div
              className={`${styles['statusBox-bl']} text-center d-flex flex-column justify-content-between align-items-center`}
            >
              <div
                className={`${
                  styles['checkStatus-bl']
                } d-flex justify-content-center align-items-center ${
                  reviewStatus ? styles.active : ''
                }`}
              >
                <FaCheck className={`p ${reviewStatus ? '' : 'd-none'}`} />
              </div>
              <p>{reviewStatus ? '評論完成' : '尚未評論'}</p>
              <p>{reviewStatus ? reviewStatus : ''}</p>
            </div>
            <div className={`${styles['line']} d-none d-md-block`} />
            <div className={`${styles['arrow']} d-grid d-md-none`}>
              <i className="fa-solid fa-arrow-right h3" />
            </div>
          </div>
          <div className={`${styles['orderInfo-bl']} d-flex`}>
            <div className={`${styles['leftArea-bl']}`}>
              <div className={`${styles['infoBox-bl']} mb-4`}>
                <div className={`${styles['infoTitle-bl']}`}>
                  <h6>收件人資訊</h6>
                </div>
                <div className={`${styles['infoBody-bl']}`}>
                  <div className={`${styles['receiver']} d-flex mb-4`}>
                    <span className={`${styles['title']} p me-3`}>收件人</span>
                    <p>{orderInfo.recipient}</p>
                  </div>
                  <div className={`${styles['address']} d-flex mb-4`}>
                    <span className={`${styles['title']} p me-3`}>寄送</span>
                    <p>
                      {orderInfo.delivery_method === '宅配'
                        ? `${orderInfo.delivery_address.city} ${orderInfo.delivery_address.address}`
                        : '自取'}
                    </p>
                  </div>
                  <div className={`${styles['receiverPhone']} d-flex mb-4`}>
                    <span className={`${styles['title']} p me-3`}>
                      收件人電話
                    </span>
                    <p>0912-345-678</p>
                  </div>
                </div>
              </div>
              <div className={`${styles['infoBox-bl']}`}>
                <div className={`${styles['infoTitle-bl']}`}>
                  <h6>訂單內容</h6>
                </div>
                <div className={`${styles['infoBody-bl']}`}>
                  <div className={`${styles['orderItem-bl']} d-flex mb-5`}>
                    <div className={`${styles['itemContent-bl']}`}>
                      <div className={`${styles['itemImg-bl']}`}>
                        <img src="./images/product/040.jpg" alt="" />
                      </div>
                      <div className={`${styles['itemTitle-bl']}  ms-3`}>
                        <p>634精選系列-34mm</p>
                      </div>
                    </div>
                    <div
                      className={`${styles['itemAmount-bl']}  d-flex justify-content-center align-items-center p-0`}
                    >
                      <p className={`${styles['amount']}`}>
                        x <span>1</span>
                      </p>
                    </div>
                    <div
                      className={`${styles['itemPrice-bl']} d-flex justify-content-end align-items-center p-0`}
                    >
                      <p>NT$ 2,3850</p>
                    </div>
                  </div>

                  <div className={`${styles['orderprice-bl']}`}>
                    <div
                      className={`${styles['subtotal-price-box-bl']} d-flex justify-content-between justify-content-md-end align-items-center my-3`}
                    >
                      <p>小計</p>
                      <div className={`${styles['num-bl']}`}>
                        <p>NT$ 2,380</p>
                      </div>
                    </div>
                    <div
                      className={`${styles['discount-price-box-bl']} d-flex justify-content-between justify-content-md-end align-items-center mb-3`}
                    >
                      <p>折扣</p>
                      <div
                        className={`${styles['num-bl']} ${styles['discount-bl']}`}
                      >
                        <p>-NT$ 2,380</p>
                      </div>
                    </div>
                    <div
                      className={`${styles['delivery-price-box-bl']} d-flex justify-content-between justify-content-md-end align-items-center mb-3`}
                    >
                      <p>運費</p>
                      <div className={`${styles['num-bl']}`}>
                        <p>NT$ 60</p>
                      </div>
                    </div>
                    <div
                      className={`${styles['total-price-box-bl']} d-flex justify-content-between justify-content-md-end align-items-center`}
                    >
                      <p>總計</p>
                      <div
                        className={`${styles['num-bl']} ${styles['totle-bl']}`}
                      >
                        <h6>NT$ 2,380</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles['rightArea-bl']} px-md-3`}>
              <div className={`${styles['infoBox-bl']} mb-4`}>
                <div className={`${styles['infoTitle-bl']}`}>
                  <h6>付款資訊</h6>
                </div>
                <div className={`${styles['infoBody-bl']}`}>
                  <div className={`${styles['payType-bl']} d-flex mb-4`}>
                    <span className={`${styles['title']} p me-3`}>
                      付款方式
                    </span>
                    <p>信用卡</p>
                  </div>
                  <div
                    className={`${styles['cardNumber-bl']} d-flex justify-content-start align-items-center mb-4`}
                  >
                    <span className={`${styles['title']} p me-3`}>
                      卡號末碼
                    </span>
                    <p>2234</p>
                  </div>
                  <div className={`${styles['payTime-bl']} d-flex mb-4`}>
                    <span className={`${styles['title']} p me-3`}>
                      交易時間
                    </span>
                    <p>2024-05-12</p>
                  </div>
                </div>
              </div>
              <div className={`${styles['infoBox-bl']} mb-4`}>
                <div className={`${styles['infoTitle-bl']}`}>
                  <h6>訂單備註</h6>
                </div>
                <div className={`${styles['infoBody-bl']}`}>
                  <div className={`${styles['payType-bl']} d-flex mb-4`}></div>
                </div>
              </div>
              <div
                className={`${styles['btnGroup-bl']} d-flex flex-column flex-lg-row justify-content-center align-items-center`}
              >
                <button
                  className={`${styles['openFull-bl']} ${styles['btnOrder-bl']} ${styles['btnComment-bl']} me-0 me-lg-3 mb-lg-0 mb-3`}
                >
                  商品評價
                </button>
                <button
                  className={`${styles['btnOrder-bl']} ${styles['btnRefund-bl']}`}
                >
                  退貨退款
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles['fullscreenblack-bl']}`}>
          <div className={`${styles['comment-bl']}`}>
            <h6 className="my-3">商品評論</h6>
            <div className={`${styles['commentArea-bl']} mb-5`}>
              <div className={`${styles['commentItem-bl']} mb-5 px-2`}>
                <div className={`${styles['itemContent-bl']} mb-3`}>
                  <div className={`${styles['itemImg-bl']} mb-3 me-3`}>
                    <img src="./images/product/040.jpg" alt="" />
                  </div>
                  <div
                    className={`${styles['iteminfo-bl']} d-flex flex-column justify-content-between`}
                  >
                    <p>蛋黃哥懶得打麻將組</p>
                    <div
                      className={`${styles['star-bl']} d-flex align-items-center`}
                    >
                      <p className="me-3">評分:</p>
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </div>
                <div className={`${styles['commentBox-bl']} `}>
                  <p className="mb-3">評論:</p>
                  <textarea
                    className="form-control p"
                    name="comment"
                    id=""
                    rows={3}
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles['btnGroup-bl']} d-flex justify-content-around justify-content-md-end`}
            >
              <button
                className={`${styles['btnComment-bl']} ${styles['btnOrder-bl']} me-3`}
              >
                送出
              </button>
              <button
                className={`${styles['btnOrder-bl']} ${styles['closeFull-bl']}`}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

OrderDetail.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
