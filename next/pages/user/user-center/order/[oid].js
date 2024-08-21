import React, { useEffect, useState, useContext } from 'react'
import OrderList from '@/components/order/orderList'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/use-cart'
import { AuthContext } from '@/context/AuthContext'
import UserCenterLayout from '@/components/layout/user-center-layout'
import styles from '@/styles/bearlong/orderDetail.module.scss'
import { FaChevronLeft, FaCircle, FaCheck, FaStar } from 'react-icons/fa6'
import Image from 'next/image'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function OrderDetail() {
  const { user, loading } = useContext(AuthContext)
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
  const [commentShow, setCommentShow] = useState(false)
  const [ratings, setRatings] = useState({})
  const [hoverRatings, setHoverRatings] = useState({})
  const [comments, setComments] = useState({})
  const [existingComments, setExistingComments] = useState([{}])

  const statusMapping = {
    付款完成: { displayText: '待出貨', color: 'var(--primary)' },
    已出貨: { displayText: '待收貨', color: 'var(--primary-dark)' },
    已完成: { displayText: '已完成', color: 'var(--background)' },
    已評論: { displayText: '已完成', color: 'var(--background)' },
    已取消: { displayText: '已取消', color: 'var(--text-hover-color)' },
    '退貨/款': { displayText: '退貨/款', color: 'var(--error-color)' },
  }
  let currentStatus = statusMapping[orderInfo.status_now] || {
    displayText: '未知狀態',
    color: 'var(--default-color)',
  }
  let subtotal = 0
  const getStatusUpdateAt = (statuses, targetStatus) => {
    const statusObj = statuses.find((status) => status.status === targetStatus)
    return statusObj ? statusObj.update_at : null
  }

  let paymentStatus = getStatusUpdateAt(status, '付款完成')
  let shipmentStatus = getStatusUpdateAt(status, '已出貨')
  let completionStatus = getStatusUpdateAt(status, '已完成')
  let reviewStatus = getStatusUpdateAt(status, '已評論')

  const notifyAndRemove = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      customClass: {
        popup: `h6`,
        title: `h4`,
        content: `h1`,
      },
      title: `評論已完成!`,
      showConfirmButton: false,
      timer: 2000,
    })
  }

  const notifyAndReceipt = () => {
    Swal.fire({
      title: '確認收貨?',
      text: '確定商品品項及數量都正確!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b79347',
      cancelButtonColor: '#747474',
      confirmButtonText: '完成訂單',
      cancelButtonText: '取消',
      customClass: {
        popup: `h5`,
        title: `h4`,
        confirmButton: `p me-3`,
        cancelButton: `p`,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleChangeStatus()
      }
    })
  }

  const handleCommentShow = () => {
    setCommentShow(true)
  }

  const handleCommentHidden = () => {
    setCommentShow(false)
  }

  const handleRatingChange = (object, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [object.name]: {
        object_id: object.id,
        object_type: object.object_type,
        star: value,
      },
    }))
  }

  const handleHoverRatingChange = (name, value) => {
    setHoverRatings((prevHoverRatings) => ({
      ...prevHoverRatings,
      [name]: value,
    }))
  }

  const handleChangeStatus = async () => {
    try {
      const url = `http://localhost:3005/api/order/${oid}`
      const response = await fetch(url, {
        method: 'PUT',
      })
      const result = await response.json()
      if (result.status === 'success') {
        setStatus(result.data.status)
        Swal.fire({
          position: 'center',
          icon: 'success',
          customClass: {
            popup: `h6`,
            title: `h4`,
            content: `h1`,
          },
          title: `確認收貨!`,
          showConfirmButton: false,
          timer: 1500,
        })
        setTimeout(() => {
          setCommentShow(true)
        }, 1500)
      }
    } catch (error) {
      console.log(error)
      toast.error(`收貨失敗，請洽客服人員`, {
        style: {
          border: '1px solid #d71515',
          padding: '20px',
          fontSize: '20px',
          color: '#d71515',
        },
        iconTheme: {
          primary: '#d71515',
          secondary: '#ffffff',
          fontSize: '20px',
        },
      })
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    const dataArray = Object.keys(ratings).map((key) => ({
      user_id: user.id,
      order_id: orderInfo.id,
      object_id: ratings[key].object_id,
      object_type: ratings[key].object_type,
      star: ratings[key].star,
      content: comments[key] || '', // 若評論不存在，則為空字符串
    }))

    if (dataArray.length === orderDetail.length) {
      try {
        const url = 'http://localhost:3005/api/order/comment'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataArray),
        })
        const result = await response.json()
        if (result.status === 'success') {
          setExistingComments(result.data.comments)
          setStatus(result.data.status)
          setOrderDetail(result.data.orderDetails)
          notifyAndRemove()
          setTimeout(() => {
            router.push('/user/user-center/order?status_now=已評論')
          }, 2000)
        }
      } catch (error) {
        console.log(error)
        toast.error(`評論失敗`, {
          style: {
            border: '1px solid #d71515',
            padding: '20px',
            fontSize: '20px',
            color: '#d71515',
          },
          iconTheme: {
            primary: '#d71515',
            secondary: '#ffffff',
            fontSize: '20px',
          },
        })
      }
    } else {
      toast.error(`尚未評論完畢`, {
        style: {
          border: '1px solid #d71515',
          padding: '20px',
          fontSize: '20px',
          color: '#d71515',
        },
        iconTheme: {
          primary: '#d71515',
          secondary: '#ffffff',
          fontSize: '20px',
        },
      })
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (user) {
          const url = `http://localhost:3005/api/order/${oid}`
          console.log(url)
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
            setOrderDetail(result.data.orderDetails)
            setExistingComments(result.data.comment)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (router.isReady && !loading && oid) {
      fetchUserInfo()
    } else if (!user && loading === false) {
      alert('請先登入會員')
      router.push('/login')
    }
  }, [router.isReady, oid, user, loading])

  useEffect(() => {
    paymentStatus = getStatusUpdateAt(status, '付款完成')
    shipmentStatus = getStatusUpdateAt(status, '已出貨')
    completionStatus = getStatusUpdateAt(status, '已完成')
    reviewStatus = getStatusUpdateAt(status, '已評論')
  }, [status])
  return (
    <>
      <div className={`${styles.main}`}>
        <div className={`${styles['orderList-bl']}`}>
          <div
            className={`${styles['orderTitle-bl']} d-flex flex-column flex-md-row justify-content-between`}
          >
            <Link
              href={`/user/user-center/order?status_now=${orderInfo.status_now}`}
              className={`${styles['btnBack-bl']} d-flex align-items-center`}
            >
              <FaChevronLeft className="h5 mb-2 mb-md-0" />
              <p>回上頁</p>
            </Link>
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
              {completionStatus ? completionStatus : ''}
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
              {reviewStatus ? reviewStatus : ''}
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
                      {orderInfo.delivery_method === '宅配' ||
                      orderInfo.delivery_method === '7-11店到店'
                        ? `${orderInfo.delivery_address.city} ${orderInfo.delivery_address.address}`
                        : '自取'}
                    </p>
                  </div>
                  <div className={`${styles['receiverPhone']} d-flex mb-4`}>
                    <span className={`${styles['title']} p me-3`}>
                      收件人電話
                    </span>
                    <p>{orderInfo.phone}</p>
                  </div>
                </div>
              </div>
              <div className={`${styles['infoBox-bl']}`}>
                <div className={`${styles['infoTitle-bl']}`}>
                  <h6>訂單內容</h6>
                </div>
                <div className={`${styles['infoBody-bl']}`}>
                  {orderDetail.map((v, i) => {
                    subtotal += v.price
                    return (
                      <div
                        key={i}
                        className={`${styles['orderItem-bl']} d-flex mb-5`}
                      >
                        <div className={`${styles['itemContent-bl']}`}>
                          <div className={`${styles['itemImg-bl']}`}>
                            <Image
                              src={`/images/${v.object_type}/${v.img}`}
                              width={200}
                              height={200}
                              alt=""
                              className={`${styles.img}`}
                            />
                          </div>
                          <div className={`${styles['itemTitle-bl']}  ms-3`}>
                            <p>{v.name}</p>
                          </div>
                        </div>
                        <div
                          className={`${styles['itemAmount-bl']}  d-flex justify-content-center align-items-center p-0`}
                        >
                          <p className={`${styles['amount']}`}>
                            x <span>{v.quantity}</span>
                          </p>
                        </div>
                        <div
                          className={`${styles['itemPrice-bl']} d-flex justify-content-end align-items-center p-0`}
                        >
                          <p>NT$ {v.price}</p>
                        </div>
                      </div>
                    )
                  })}

                  <div className={`${styles['orderprice-bl']}`}>
                    <div
                      className={`${styles['subtotal-price-box-bl']} d-flex justify-content-between justify-content-md-end align-items-center my-3`}
                    >
                      <p>小計</p>
                      <div className={`${styles['num-bl']}`}>
                        <p>NT$ {subtotal}</p>
                      </div>
                    </div>
                    <div
                      className={`${styles['discount-price-box-bl']} d-flex justify-content-between justify-content-md-end align-items-center mb-3`}
                    >
                      <p>折扣</p>
                      <div
                        className={`${styles['num-bl']} ${styles['discount-bl']}`}
                      >
                        <p>
                          {orderInfo.total === subtotal
                            ? ''
                            : `-NT$ ${subtotal - orderInfo.total}`}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${styles['delivery-price-box-bl']} d-flex justify-content-between justify-content-md-end align-items-center mb-3`}
                    >
                      <p>運費</p>
                      <div className={`${styles['num-bl']}`}>
                        <p>
                          NT$ {orderInfo.delivery_method === '宅配' ? 60 : 0}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${styles['total-price-box-bl']} d-flex justify-content-between justify-content-md-end align-items-center`}
                    >
                      <p>總計</p>
                      <div
                        className={`${styles['num-bl']} ${styles['totle-bl']}`}
                      >
                        <h6>NT$ {orderInfo.total}</h6>
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
                    <p>
                      {orderInfo.pay_method === 'credit'
                        ? '信用卡'
                        : orderInfo.pay_method}
                    </p>
                  </div>
                  <div
                    className={`${styles['cardNumber-bl']} d-flex justify-content-start align-items-center mb-4`}
                  >
                    <span className={`${styles['title']} p me-3`}>
                      卡號末碼
                    </span>
                    <p>
                      {orderInfo.pay_info.creditNum4
                        ? orderInfo.pay_info.creditNum4
                        : ''}
                    </p>
                  </div>
                  <div className={`${styles['payTime-bl']} d-flex mb-4`}>
                    <span className={`${styles['title']} p me-3`}>
                      交易時間
                    </span>
                    <p>{orderInfo.order_date}</p>
                  </div>
                </div>
              </div>
              <div className={`${styles['infoBox-bl']} mb-4`}>
                <div className={`${styles['infoTitle-bl']}`}>
                  <h6>訂單備註</h6>
                </div>
                <div className={`${styles['infoBody-bl']}`}>
                  <div className={`${styles['payType-bl']} d-flex p`}>
                    {orderInfo.remark}
                  </div>
                </div>
              </div>
              <div
                className={`${styles['btnGroup-bl']} d-flex flex-column flex-lg-row justify-content-center align-items-center`}
              >
                <button
                  className={`${styles['openFull-bl']} ${styles['btnOrder-bl']} ${styles['btnComment-bl']} me-0 me-lg-3 mb-lg-0 mb-3`}
                  onClick={() => {
                    if (orderInfo.status_now !== '已出貨') {
                      handleCommentShow()
                    } else {
                      notifyAndReceipt()
                    }
                  }}
                  disabled={orderInfo.status_now === '付款完成'}
                >
                  {orderInfo.status_now === '已出貨' ||
                  orderInfo.status_now === '付款完成'
                    ? '確認收貨'
                    : '商品評論'}
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
        <div
          className={`${styles['fullscreenblack-bl']} ${
            commentShow ? styles['active'] : ''
          }`}
        >
          <div className={`${styles['comment-bl']}`}>
            <h6 className="my-3">商品評論</h6>
            <div className={`${styles['commentArea-bl']} mb-5`}>
              {orderDetail.map((v, i) => {
                if (v.comment_status === 1) {
                  const index = existingComments.findIndex(
                    (r) =>
                      r.object_id === v.id && r.object_type === v.object_type
                  )
                  return (
                    <div
                      key={i}
                      className={`${styles['commentItem-bl']} mb-5 px-2`}
                    >
                      <div className={`${styles['itemContent-bl']} mb-3`}>
                        <div className={`${styles['itemImg-bl']} mb-3 me-3`}>
                          <Image
                            src={`/images/${v.object_type}/${v.img}`}
                            width={200}
                            height={200}
                            alt=""
                            className={`${styles.img}`}
                          />
                        </div>
                        <div
                          className={`${styles['iteminfo-bl']} d-flex flex-column justify-content-between`}
                        >
                          <p>{v.name}</p>
                          <div
                            className={`${styles['star-bl']} d-flex align-items-center`}
                          >
                            <p className="me-3">評分:</p>
                            {Array(5)
                              .fill()
                              .map((r, i) => {
                                const score = i + 1
                                return (
                                  <div key={score}>
                                    <span
                                      className={`${
                                        score <= existingComments[index]?.star
                                          ? styles.on
                                          : styles.off
                                      } p d-inline-grid justify-content-between align-items-center`}
                                    >
                                      <FaStar />
                                    </span>
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                      <div className={`${styles['commentBox-bl']} `}>
                        <p className="mb-3">評論:</p>
                        <div className={`${styles['box-bl']} p`}>
                          {existingComments[index]?.content}
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={i}
                      className={`${styles['commentItem-bl']} mb-5 px-2`}
                    >
                      <div className={`${styles['itemContent-bl']} mb-3`}>
                        <div className={`${styles['itemImg-bl']} mb-3 me-3`}>
                          <Image
                            src={`/images/${v.object_type}/${v.img}`}
                            width={200}
                            height={200}
                            alt=""
                            className={`${styles.img}`}
                          />
                        </div>
                        <div
                          className={`${styles['iteminfo-bl']} d-flex flex-column justify-content-between`}
                        >
                          <p>{v.name}</p>
                          <div
                            className={`${styles['star-bl']} d-flex align-items-center`}
                          >
                            <p className="me-3">評分:</p>
                            {Array(5)
                              .fill()
                              .map((r, i) => {
                                const score = i + 1
                                return (
                                  <button
                                    key={score}
                                    onClick={() => {
                                      handleRatingChange(v, score)
                                    }}
                                    onMouseEnter={() => {
                                      handleHoverRatingChange(v.name, score)
                                    }}
                                    onMouseLeave={() => {
                                      handleHoverRatingChange(v.name, 0)
                                    }}
                                  >
                                    <span
                                      className={`${
                                        score <= ratings[v.name]?.star ||
                                        score <= hoverRatings[v.name]
                                          ? styles.on
                                          : styles.off
                                      } p d-inline-grid justify-content-between align-items-center`}
                                    >
                                      <FaStar />
                                    </span>
                                  </button>
                                )
                              })}
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
                          value={comments[v.name]}
                          onChange={(e) => {
                            setComments({
                              ...comments,
                              [v.name]: e.target.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              })}
            </div>
            <div
              className={`${styles['btnGroup-bl']} d-flex justify-content-around justify-content-md-end`}
            >
              <button
                className={`${styles['btnComment-bl']} ${styles['btnOrder-bl']} me-3`}
                onClick={(e) => {
                  handleCommentSubmit(e)
                }}
                disabled={existingComments.length}
              >
                送出
              </button>
              <button
                className={`${styles['btnOrder-bl']} ${styles['closeFull-bl']}`}
                onClick={handleCommentHidden}
              >
                取消
              </button>
              <Toaster position="bottom-center" reverseOrder={false} />
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
