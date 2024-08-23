import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FaHeart,
  FaStar,
  FaRegStar,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaMinus,
} from 'react-icons/fa6'
import styles from '@/styles/bearlong/productDetail.module.scss'
import { useCart } from '@/hooks/use-cart'
import { AuthContext } from '@/context/AuthContext'
import Swal from 'sweetalert2'

export default function ProductDetail({
  data = {},
  imgMain = '',
  handleImgMain = () => {},
  handleFavToggle = () => {},
}) {
  const { user } = useContext(AuthContext)

  const [quantity, setQuantity] = useState(1)
  const { handleAdd = () => {}, handleShow = () => {} } = useCart()
  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const notifyAndRemove = () => {
    Swal.fire({
      icon: 'error',
      title: '尚未登入',
      text: '請先登入才能購買!',
      customClass: {
        popup: `h6`,
        title: `h4`,
        content: `h1`,
        confirmButton: `p ${styles.confirmButton}`,
        footer: `p ${styles.confirmFooter}`,
      },
      footer: '<a href="/login">前往登入</a>',
    })
  }

  return (
    <>
      <div className={styles['productDetailSection1-bl']}>
        <p className={`${styles['breadCrumb-bl']} my-3`}>
          <Link href={'./productList'}>首頁</Link>/
          <Link href={'./productList?brand_id=' + data.product.brand_id}>
            {data.product.brand_name}
          </Link>
          /
          <Link href={'./productList?category_id=' + data.product.category_id}>
            {data.product.category_name}
          </Link>
          /
          <Link
            href={'./productList?brand=' + data.product.id}
            className={styles.here}
          >
            {data.product.name}
          </Link>
        </p>
        <div className="d-flex flex-md-row flex-column justify-content-between">
          <div
            className={`d-flex flex-column-reverse flex-lg-row me-0 me-lg-3`}
          >
            <div
              className={`${styles['imgSmall-bl']}  mx-lg-5 d-flex flex-lg-column mt-3 mt-lg-0 justify-content-between justify-content-lg-start`}
            >
              <button
                className={`${styles['imgSmallBox-bl']} mb-3  ${
                  data.product.img === imgMain ? styles['active'] : ''
                } `}
                onClick={() => {
                  handleImgMain(data.product.img)
                }}
              >
                <Image
                  src={`../../images/product/${data.product.img}`}
                  width={280}
                  height={280}
                  alt=""
                />
              </button>
              {data.img2.map((v) => {
                return (
                  <button
                    key={v.id}
                    className={`${styles['imgSmallBox-bl']} mb-3 ${
                      v.img === imgMain ? styles['active'] : ''
                    } `}
                    onClick={() => {
                      handleImgMain(v.img)
                    }}
                  >
                    <Image
                      src={`../../images/product/${v.img}`}
                      width={280}
                      height={280}
                      alt=""
                    />
                  </button>
                )
              })}
            </div>
            <div
              className={`${styles['imgMain-bl']} align-self-center align-self-md-stretch`}
            >
              <Image
                src={`../../images/product/${imgMain}`}
                width={280}
                height={280}
                alt=""
              />
            </div>
          </div>
          <div
            className={`${styles['productDetailContent-bl']} d-flex justify-content-between flex-column`}
          >
            <div>
              <p>{data.product.brand_name}</p>
              <div className={`${styles['productName-bl']} m-0`}>
                <h5>{data.product.name}</h5>
              </div>
              <div className={`d-flex justify-content-between mb-2`}>
                <div className={`d-flex align-items-center`}>
                  <p className="me-2">
                    {data.product.average_star
                      ? data.product.average_star
                      : '尚無評價'}
                  </p>
                  <div className={styles['starBox-bl']}>
                    <FaRegStar fontSize={16} style={{ color: '#b79347' }} />
                    <FaRegStar fontSize={16} style={{ color: '#b79347' }} />
                    <FaRegStar fontSize={16} style={{ color: '#b79347' }} />
                    <FaRegStar fontSize={16} style={{ color: '#b79347' }} />
                    <FaRegStar fontSize={16} style={{ color: '#b79347' }} />
                    <div
                      className={`${styles['starRating-bl']} ${
                        data.product.average_star ? '' : 'd-none'
                      }`}
                      style={{
                        width: `${(data.product.average_star / 5) * 100}%`,
                      }}
                    >
                      <FaStar fontSize={16} style={{ color: '#b79347' }} />
                      <FaStar fontSize={16} style={{ color: '#b79347' }} />
                      <FaStar fontSize={16} style={{ color: '#b79347' }} />
                      <FaStar fontSize={16} style={{ color: '#b79347' }} />
                      <FaStar fontSize={16} style={{ color: '#b79347' }} />
                    </div>
                  </div>
                  <p className="ms-2">({data.product.comment_count})</p>
                </div>
                <button
                  className={`d-flex align-items-center btn btn-outline-primary ${
                    styles.like
                  }  ${user ? '' : 'd-none'}`}
                  onClick={() => {
                    handleFavToggle(data.product.id, 'product')
                  }}
                >
                  {data.product.fav ? (
                    <FaHeart fontSize={16} />
                  ) : (
                    <FaPlus fontSize={16} />
                  )}
                  <p className="ms-2 ">
                    {data.product.fav ? '已收藏' : '未收藏'}
                  </p>
                </button>
              </div>
              <h5>
                NT$ <span>{data.product.price}</span>
              </h5>
            </div>
            <div>
              {data.specifications.color && (
                <p className="mb-2">
                  顏色: <span>{data.specifications.color}</span>
                </p>
              )}
              {data.specifications.size && (
                <p className="mb-2">
                  尺寸: <span>{data.specifications.size}</span>
                </p>
              )}
              {data.specifications.material && (
                <p className="mb-2">
                  材質: <span>{data.specifications.material}</span>
                </p>
              )}
              {data.specifications.style && (
                <p className="mb-2">
                  樣式: <span>{data.specifications.style}</span>
                </p>
              )}
              {data.specifications.weight && (
                <p className="mb-2">
                  重量: <span>{data.specifications.weight}</span>
                </p>
              )}
              {data.specifications.voltage && (
                <p className="mb-2">
                  電壓: <span>{data.specifications.voltage}</span>
                </p>
              )}
              {data.specifications.power_consumption && (
                <p className="mb-2">
                  耗電量: <span>{data.specifications.power_consumption}</span>
                </p>
              )}
            </div>
            <div className="my-3 my-md-0">
              <p className="mb-2">
                庫存數量:{' '}
                <span>{data.product.stock <= 0 ? 0 : data.product.stock}</span>{' '}
                <span className="text-danger">
                  {data.product.stock > 0
                    ? ''
                    : '暫無庫存，加入收藏關注到貨狀況'}
                </span>
              </p>
              <div className={`d-flex justify-content-between`}>
                <h5>數量</h5>
                <div
                  className={`${styles['plusMinus']} d-flex align-items-center`}
                >
                  <FaMinus
                    style={{ marginInlineEnd: '50px' }}
                    fontSize={16}
                    onClick={handleDecrease}
                  />
                  <h5 className={styles['quantity']}>{quantity}</h5>
                  <FaPlus
                    style={{ marginInlineStart: '50px' }}
                    fontSize={16}
                    onClick={() => {
                      if (quantity < data.product.stock) {
                        handleIncrease()
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles['buttonGroup-bl']} d-flex justify-content-between flex-column`}
            >
              <button
                type="button"
                className={`${styles['btnRectangle']} ${styles['buy']}  mb-3`}
                onClick={() => {
                  console.log(data.stock)
                  if (!user) {
                    notifyAndRemove()
                  } else {
                    handleAdd(data.product, 'product', quantity)
                    handleShow()
                  }
                }}
                disabled={data.product.stock <= 0}
              >
                {data.product.stock <= 0 ? '暫無庫存' : '立即購買'}
              </button>
              <button
                type="button"
                className={`${styles['btnRectangle']}`}
                onClick={() => {
                  if (!user) {
                    notifyAndRemove()
                  } else {
                    handleAdd(data.product, 'product', quantity)
                  }
                }}
                disabled={data.product.stock <= 0}
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
