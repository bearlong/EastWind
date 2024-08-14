import React, { useEffect, useState } from 'react'
import styles from '@/styles/bearlong/checkout.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function Checkout() {
  const [delivery, setDelivery] = useState('homeDelivery')
  const [sendForm, setSendForm] = useState({
    country: '',
    firstname: '',
    lastname: '',
    postCode: '',
    city: '',
    address: '',
  })
  const [payMethod, setPayMethod] = useState('credit')
  const [payInfo, setPayInfo] = useState({
    creditNum1: '',
    creditNum2: '',
    creditNum3: '',
    creditNum4: '',
    expDate: '',
    csc: '',
    cardholder: '',
    country: '',
    postCode: '',
    city: '',
    address: '',
    useDeliveryAddress: true,
  })
  const [coupon, setCoupon] = useState({
    id: '',
    discount: 0,
    name: '',
  })
  const [formError, setFormError] = useState({
    sendFormErrors: {},
    payInfoErrors: {},
  })

  return (
    <>
      <div className={`${styles['payment-bl']} row`}>
        <div className={`${styles['payment-section-bo']} col-12 col-md-6`}>
          <div className={`${styles['paypayment-title-bo']} h5 my-4`}>
            配送方式
          </div>
          <div className={`${styles['payment-delivery-box-bo']}  mb-3`}>
            <input
              type="radio"
              id="homeDelivery"
              defaultValue={1}
              name="delivery"
              defaultChecked={true}
            />
            <label
              htmlFor="homeDelivery"
              className={`${styles['payment-delivery-radio-bo']} ${styles['payment-radio-bo']} ${styles['topBorder']}  p`}
            >
              <div className={styles.circle} />
              宅配
            </label>
            <input type="radio" id="pickup" defaultValue={2} name="delivery" />
            <label
              htmlFor="pickup"
              className={`${styles['payment-delivery-radio-bo']} ${styles['payment-radio-bo']} ${styles['bottomBorder']}  p`}
            >
              <div className={styles.circle} />
              自取
            </label>
          </div>
          <div className={`${styles['errorBox']}`} />
          <div className={`${styles['payment-send-form-bo']} mb-3`}>
            <div className={`${styles['payment-title-bo']} h5 mb-4`}>寄送</div>
            <div
              className={`${styles['input-select-bo']} ${styles['form-floating-bl']}  form-floating  mb-3`}
            >
              <select
                className={`${styles['form-select-bl']} form-select`}
                id="countrySelect"
                aria-label="Floating label select example"
                name="countrySelect"
              >
                <option value="" selected="">
                  請選擇
                </option>
                <option value={1}>台灣</option>
              </select>
              <label htmlFor="countrySelect">國家 / 地區</label>
              <div className={`${styles['errorBox']}`} />
            </div>
            <div className="row">
              <div
                className={`${styles['form-floating-bl']} ${styles['col-6-bl']} form-floating mb-3 col-6 pe-3`}
              >
                <input
                  type="text"
                  className={`${styles['form-control-bl']} form-control`}
                  id="firstname"
                  placeholder="firstname"
                  name="firstname"
                />
                <label htmlFor="Firstname">姓</label>
                <div className={`${styles['errorBox']}`} />
              </div>
              <div
                className={`${styles['form-floating-bl']} ${styles['col-6-bl']} form-floating mb-3 col-6`}
              >
                <input
                  type="text"
                  className={`${styles['form-control-bl']} form-control`}
                  id="lastname"
                  placeholder="Lastname"
                  name="lastname"
                />
                <label htmlFor="lastname">名</label>
                <div className={`${styles['errorBox']}`} />
              </div>
              <div
                className={`${styles['form-floating-bl']} ${styles['col-6-bl']} form-floating mb-3 pe-3 col-6`}
              >
                <input
                  type="text"
                  className={`${styles['form-control-bl']} form-control`}
                  id="postCode"
                  placeholder="post code"
                  name="postCode"
                />
                <label htmlFor="postCode">郵遞區號</label>
                <div className={`${styles['errorBox']}`} />
              </div>
              <div
                className={`${styles['city-select-bo']} ${styles['form-floating-bl']} ${styles['col-6-bl']} form-floating  mb-3 col-6`}
              >
                <select
                  className={`${styles['form-select-bl']} form-select`}
                  id="citySelect"
                  aria-label="Floating label select example"
                  name="citySelect"
                >
                  <option value="" selected="">
                    請選擇
                  </option>
                  <option value={1}>台北市</option>
                  <option value={2}>新北市</option>
                </select>
                <label htmlFor="citySelect">縣市</label>
                <div className={`${styles['errorBox']}`} />
              </div>
            </div>
            <div className={`${styles['form-floating-bl']} form-floating mb-3`}>
              <input
                type="text"
                className={`${styles['form-control-bl']} form-control`}
                id="address"
                placeholder="Address"
                name="address"
              />
              <label htmlFor="address">地址</label>
              <div className={`${styles['errorBox']}`} />
            </div>
          </div>
          <div className={`${styles['payment-pay-box-bo']} mb-3`}>
            <div className={`${styles['payment-title-bo']} h5 mb-4`}>
              交易方式
              <p>所有交易都是安全且加密的。</p>
            </div>
            <div className={`${styles['payment-pay-form-bo']}`}>
              <input
                type="radio"
                id="credit"
                defaultValue={1}
                name="pay-method"
                defaultChecked={true}
                className={`${styles['credit']}`}
              />
              <label
                htmlFor="credit"
                className={` ${styles['payment-pay-radio-bo']} ${styles['payment-radio-bo']} ${styles['topBorder']} p`}
              >
                <div className={`${styles['circle']}`} />
                信用卡
              </label>
              <div className={`${styles['payment-card-form-bo']} px-3`}>
                <div className="row my-3">
                  <p>卡號</p>
                  <div className="col-2">
                    <input
                      type="text"
                      className={`${styles['cdNum']} ${styles['form-control-bl']} form-control`}
                      name="creditNum1"
                      maxLength={4}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="text"
                      className={`${styles['cdNum']} ${styles['form-control-bl']} form-control`}
                      name="creditNum2"
                      maxLength={4}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="text"
                      className={`${styles['cdNum']} ${styles['form-control-bl']} form-control`}
                      name="creditNum3"
                      maxLength={4}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="text"
                      className={`${styles['cdNum']} ${styles['form-control-bl']} form-control`}
                      name="creditNum4"
                      maxLength={4}
                    />
                  </div>
                  <div className={`${styles['city-select-bo']}  mb-3 col-4`}>
                    <select
                      className={`${styles['form-select-bl']} form-select`}
                      id="citySelect"
                      name="citySelect"
                    >
                      <option value="" selected="">
                        快速選卡
                      </option>
                      <option value={1}>末四碼4456</option>
                      <option value={2}>末四碼1968</option>
                    </select>
                  </div>
                  <div className={`${styles['errorBox']}`} />
                </div>
                <div className="row">
                  <div
                    className={`${styles['form-floating-bl']} ${styles['col-6-bl']} form-floating mb-3 col-6 pe-3`}
                  >
                    <input
                      type="text"
                      className={`${styles['form-control-bl']} form-control`}
                      id="expDate"
                      placeholder="expDate"
                      name="expDate"
                      maxLength={5}
                    />
                    <label htmlFor="expDate">有效期(mm/yy)</label>
                    <div className={`${styles['errorBox']}`} />
                  </div>
                  <div
                    className={`${styles['form-floating-bl']} ${styles['col-6-bl']} form-floating mb-3 col-6`}
                  >
                    <input
                      type="text"
                      className={`${styles['form-control-bl']} form-control`}
                      id="csc"
                      placeholder="csc"
                      name="csc"
                      maxLength={3}
                    />
                    <label htmlFor="csc">安全碼</label>
                    <div className={`${styles['errorBox']}`} />
                  </div>
                </div>
                <div
                  className={`${styles['form-floating-bl']} form-floating mb-3`}
                >
                  <input
                    type="text"
                    className={`${styles['form-control-bl']} form-control`}
                    id="cardholder"
                    placeholder="cardholder"
                    name="cardholder"
                  />
                  <label htmlFor="cardholder">持卡人</label>
                  <div className={`${styles['errorBox']}`} />
                </div>
                <input
                  className={`${styles['checkBillingAddress']} `}
                  type="checkbox"
                  id="checkBillingAddress"
                  name="Billing Address"
                  defaultChecked={true}
                />
                <label
                  className="form-check-label p"
                  htmlFor="checkBillingAddress"
                >
                  <div className={`${styles['circle']}`} />
                  使用送貨地址作為帳單地址
                </label>
                <div className={`${styles['billing-address-form-bo']} mb-3`}>
                  <div className={`${styles['payment-title-bo']} p mb-3`}>
                    寄送
                  </div>
                  <div
                    className={`${styles['form-floating-bl']} ${styles['input-select-bo']} form-floating  mb-3`}
                  >
                    <select
                      className={`${styles['form-select-bl']} form-select`}
                      id="billingAddressCountry"
                      aria-label="Floating label select example"
                      name="billingAddressCountry"
                    >
                      <option value="" selected="">
                        請選擇
                      </option>
                      <option value={1}>台灣</option>
                    </select>
                    <label htmlFor="billingAddressCountry">國家 / 地區</label>
                    <div className={`${styles['errorBox']}`} />
                  </div>
                  <div className="row">
                    <div
                      className={`${styles['form-floating-bl']} ${styles['col-6-bl']} form-floating mb-3 col-6 pe-3`}
                    >
                      <input
                        type="text"
                        className={`${styles['form-control-bl']} form-control`}
                        id="billingAddressPostCode"
                        placeholder="post code"
                        name="billingAddressPostCode"
                      />
                      <label htmlFor="billingAddressPostCode">郵遞區號</label>
                      <div className={`${styles['errorBox']}`} />
                    </div>
                    <div
                      className={`${styles['city-select-bo']} ${styles['form-floating-bl']} ${styles['col-6-bl']} form-floating  mb-3 col-6`}
                    >
                      <select
                        className={`${styles['form-select-bl']} form-select`}
                        id="billingAddressCity"
                        aria-label="Floating label select example"
                        name="billingAddressCity"
                      >
                        <option value="" selected="">
                          請選擇
                        </option>
                        <option value={1}>台北市</option>
                        <option value={2}>新北市</option>
                      </select>
                      <label htmlFor="billingAddressCity">縣市</label>
                      <div className={`${styles['errorBox']}`} />
                    </div>
                  </div>
                  <div
                    className={`${styles['form-floating-bl']} form-floating mb-3`}
                  >
                    <input
                      type="text"
                      className={`${styles['form-control-bl']} form-control`}
                      id="billingAddressAddress"
                      placeholder="Address"
                      name="billingAddressAddress"
                    />
                    <label htmlFor="billingAddressAddress">地址</label>
                    <div className={`${styles['errorBox']}`} />
                  </div>
                </div>
              </div>
              <input
                type="radio"
                id="ECpay"
                defaultValue={1}
                name="pay-method"
              />
              <label
                htmlFor="ECpay"
                className={`${styles['payment-pay-radio-bo']} ${styles['payment-radio-bo']} p`}
              >
                <div className={`${styles['circle']}`} />
                ECpay(綠界金流)
              </label>
              <input
                type="radio"
                id="line"
                defaultValue={1}
                name="pay-method"
              />
              <label
                htmlFor="line"
                className={`${styles['payment-pay-radio-bo']} ${styles['bottomBorder']} ${styles['payment-radio-bo']} mb-3 p`}
              >
                <div className={`${styles['circle']}`} />
                Line pay
              </label>
            </div>
          </div>
          <div className={`${styles['payment-coupon-box-bo']} mb-3`}>
            <div className={`${styles['payment-title-bo']} h5 mb-4`}>
              優惠券
            </div>
            <div
              className={`${styles['input-select-bo']} ${styles['form-floating-bl']} form-floating  mb-3`}
            >
              <select
                className={`${styles['form-select-bl']} form-select`}
                id="couponSelect"
                aria-label="Floating label select example"
                name="couponSelect"
              >
                <option value="" selected="">
                  請選擇
                </option>
                <option value={1}>夏日優惠</option>
              </select>
              <label htmlFor="couponSelect">選擇優惠券</label>
              <div className={`${styles['errorBox']}`} />
            </div>
          </div>
          <div className={`${styles['cart-text-box-bo']} d-block d-md-none`}>
            <div
              className={`${styles['subtotal-price-box-bo']} d-flex justify-content-between align-items-center my-3`}
            >
              <p>小計</p>
              <p>NT$ 2,380</p>
            </div>
            <div
              className={`${styles['delivery-price-box-bo']} d-flex justify-content-between align-items-center mb-3`}
            >
              <p>運費</p>
              <p>NT$ 60</p>
            </div>
            <div
              className={`${styles['total-price-box-bo']} d-flex justify-content-between align-items-center mb-3`}
            >
              <h6>總計</h6>
              <h6>NT$ 2,380</h6>
            </div>
            <div
              className={`${styles['discount-price-box-bo']}  d-flex justify-content-between align-items-center mb-3`}
            >
              <h6>折價後</h6>
              <h6>NT$ 2,380</h6>
            </div>
          </div>
          <button
            className={`${styles['paypent-button-bo']}  h5 d-flex justify-content-center align-items-center mb-3`}
          >
            現在付款
          </button>
        </div>
        <div className={`${styles['cart-section-bo']}  col-12 col-md-6`}>
          <h5 className={`${styles['cart-title-bo']}  my-5`}>
            訂單商品（2 件）
          </h5>
          <div
            className={`${styles['cart-bo']}  d-flex flex-column justify-content-between`}
          >
            <input
              type="checkbox"
              name="checkCart"
              id="checkCart"
              className="d-none"
            />
            <label htmlFor="checkCart" className="d-inline d-md-none p">
              顯示商品
              <i className="fa-solid fa-chevron-down p" />
            </label>
            <div className={`${styles['cart-body-bo']} mb-5`}>
              <div className={`${styles['cart-product-bo']} d-flex mb-5`}>
                <div className={`${styles['cart-product-img-bo']} me-4`}>
                  <img src="./images/product/015.jpg" alt="" />
                </div>
                <div
                  className={`${styles['cart-product-text-box-bo']} flex-grow-1 d-flex flex-column justify-content-between`}
                >
                  <div className={`${styles['cart-product-text-bo']}`}>
                    <div className={`${styles['cart-product-title-bo']} `}>
                      <h6>634精選系4精選系4精選系4精選系4精選系列-34mm</h6>
                    </div>
                  </div>
                  <div
                    className={`${styles['cart-product-text-bo']} d-flex justify-content-between`}
                  >
                    <div
                      className={`${styles['cart-product-number-bo']} d-flex justify-content-between align-items-center`}
                    >
                      <h6 className={`${styles['quantity']}`}>
                        x <span>1</span>
                      </h6>
                    </div>
                    <div className={`${styles['product-price-bo']}`}>
                      <h6>NT$ 2,380</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles['cart-product-bo']} d-flex mb-5`}>
                <div className={`${styles['cart-product-img-bo']} me-4`}>
                  <img src="./images/product/015.jpg" alt="" />
                </div>
                <div
                  className={`${styles['cart-product-text-box-bo']} flex-grow-1 d-flex flex-column justify-content-between`}
                >
                  <div className={`${styles['cart-product-text-bo']}`}>
                    <div className={`${styles['cart-product-title-bo']} `}>
                      <h6>634精選系4精選系4精選系4精選系4精選系列-34mm</h6>
                    </div>
                  </div>
                  <div
                    className={`${styles['cart-product-text-bo']} d-flex justify-content-between`}
                  >
                    <div
                      className={`${styles['cart-product-number-bo']} d-flex justify-content-between align-items-center`}
                    >
                      <h6 className={`${styles['quantity']}`}>
                        x <span>1</span>
                      </h6>
                    </div>
                    <div className={`${styles['product-price-bo']}`}>
                      <h6>NT$ 2,380</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles['cart-product-bo']} d-flex mb-5`}>
                <div className={`${styles['cart-product-img-bo']} me-4`}>
                  <img src="./images/product/015.jpg" alt="" />
                </div>
                <div
                  className={`${styles['cart-product-text-box-bo']} flex-grow-1 d-flex flex-column justify-content-between`}
                >
                  <div className={`${styles['cart-product-text-bo']}`}>
                    <div className={`${styles['cart-product-title-bo']} `}>
                      <h6>634精選系4精選系4精選系4精選系4精選系列-34mm</h6>
                    </div>
                  </div>
                  <div
                    className={`${styles['cart-product-text-bo']} d-flex justify-content-between`}
                  >
                    <div
                      className={`${styles['cart-product-number-bo']} d-flex justify-content-between align-items-center`}
                    >
                      <h6 className={`${styles['quantity']}`}>
                        x <span>1</span>
                      </h6>
                    </div>
                    <div className={`${styles['product-price-bo']}`}>
                      <h6>NT$ 2,380</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles['cart-product-bo']} d-flex mb-5`}>
                <div className={`${styles['cart-product-img-bo']} me-4`}>
                  <img src="./images/product/015.jpg" alt="" />
                </div>
                <div
                  className={`${styles['cart-product-text-box-bo']} flex-grow-1 d-flex flex-column justify-content-between`}
                >
                  <div className={`${styles['cart-product-text-bo']}`}>
                    <div className={`${styles['cart-product-title-bo']} `}>
                      <h6>634精選系4精選系4精選系4精選系4精選系列-34mm</h6>
                    </div>
                  </div>
                  <div
                    className={`${styles['cart-product-text-bo']} d-flex justify-content-between`}
                  >
                    <div
                      className={`${styles['cart-product-number-bo']} d-flex justify-content-between align-items-center`}
                    >
                      <h6 className={`${styles['quantity']}`}>
                        x <span>1</span>
                      </h6>
                    </div>
                    <div className={`${styles['product-price-bo']}`}>
                      <h6>NT$ 2,380</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles['cart-product-bo']} d-flex mb-5`}>
                <div className={`${styles['cart-product-img-bo']} me-4`}>
                  <img src="./images/product/015.jpg" alt="" />
                </div>
                <div
                  className={`${styles['cart-product-text-box-bo']} flex-grow-1 d-flex flex-column justify-content-between`}
                >
                  <div className={`${styles['cart-product-text-bo']}`}>
                    <div className={`${styles['cart-product-title-bo']} `}>
                      <h6>634精選系4精選系4精選系4精選系4精選系列-34mm</h6>
                    </div>
                  </div>
                  <div
                    className={`${styles['cart-product-text-bo']} d-flex justify-content-between`}
                  >
                    <div
                      className={`${styles['cart-product-number-bo']} d-flex justify-content-between align-items-center`}
                    >
                      <h6 className={`${styles['quantity']}`}>
                        x <span>1</span>
                      </h6>
                    </div>
                    <div className={`${styles['product-price-bo']}`}>
                      <h6>NT$ 2,380</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles['cart-product-bo']} d-flex mb-5`}>
                <div className={`${styles['cart-product-img-bo']} me-4`}>
                  <img src="./images/product/015.jpg" alt="" />
                </div>
                <div
                  className={`${styles['cart-product-text-box-bo']} flex-grow-1 d-flex flex-column justify-content-between`}
                >
                  <div className={`${styles['cart-product-text-bo']}`}>
                    <div className={`${styles['cart-product-title-bo']} `}>
                      <h6>634精選系4精選系4精選系4精選系4精選系列-34mm</h6>
                    </div>
                  </div>
                  <div
                    className={`${styles['cart-product-text-bo']} d-flex justify-content-between`}
                  >
                    <div
                      className={`${styles['cart-product-number-bo']} d-flex justify-content-between align-items-center`}
                    >
                      <h6 className={`${styles['quantity']}`}>
                        x <span>1</span>
                      </h6>
                    </div>
                    <div className={`${styles['product-price-bo']}`}>
                      <h6>NT$ 2,380</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles['cart-text-box-bo']}`}>
              <div
                className={`${styles['subtotal-price-box-bo']} d-flex justify-content-between align-items-center mb-3`}
              >
                <p>小計</p>
                <p>NT$ 2,380</p>
              </div>
              <div
                className={`${styles['delivery-price-box-bo']} d-flex justify-content-between align-items-center mb-3`}
              >
                <p>運費</p>
                <p>NT$ 60</p>
              </div>
              <div
                className={`${styles['total-price-box-bo']} d-flex justify-content-between align-items-center mb-3`}
              >
                <h6>總計</h6>
                <h6>NT$ 2,380</h6>
              </div>
              <div
                className={`${styles['discount-price-box-bo']} d-flex justify-content-between align-items-center mb-3`}
              >
                <h6>折價後</h6>
                <h6>NT$ 2,380</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
