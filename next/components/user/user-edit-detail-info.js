import React from 'react'
import styles from '@/styles/boyu/user-info-edit.module.scss'
import { HiCreditCard } from 'react-icons/hi2'
import { FaCcVisa } from 'react-icons/fa6'
import { FaCcMastercard, FaTrashCan } from 'react-icons/fa6'

export default function UserEditDetailInfo() {
  return (
    <div
      className={`${styles['info-detail-box-bo']} row justify-content-center align-items-start gap-md-5 gap-lg-0`}
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
              placeholder="蔡宗鈞"
            />
          </div>
          <div
            className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
          >
            <h6 className={`${styles['info-name-bo']} h6`}>性別</h6>
            <input
              type="text"
              className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
              placeholder="男"
            />
          </div>
          <div
            className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
          >
            <h6 className={`${styles['info-name-bo']} h6`}>生日</h6>
            <input
              type="text"
              className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
              placeholder="1999 / 1 / 1"
            />
          </div>
          <div
            className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
          >
            <h6 className={`${styles['info-name-bo']} h6`}>地址</h6>
            <input
              type="text"
              className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
              placeholder="臺北市士林區士商路35號"
            />
          </div>
          <div
            className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
          >
            <h6 className={`${styles['info-name-bo']} h6`}>手機</h6>
            <input
              type="text"
              className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
              placeholder="0932-456-234"
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles['detail-card-box-bo']} ${styles['move-up-bo']} col-12  col-lg-12 col-xl-4 d-flex flex-column justify-content-start align-items-center`}
      >
        <div className={`${styles['detail-card-title-bo']} h5`}>信用卡</div>
        <div
          className={`${styles['detail-card-list-bo']} d-flex flex-column gap-4`}
        >
          <div
            className={`${styles['card-col-bo']} d-flex justify-content-center align-items-center`}
          >
            <div
              className={`${styles['card-body-bo']} d-flex justify-content-between align-items-center`}
            >
              <div className={styles['icon-card-box-bo']}>
                <HiCreditCard className={`${styles['icon-card-bo']} `} />
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
                className={`${styles['card-date-box-bo']} d-flex flex-column justify-content-center align-items-center`}
              >
                <FaCcVisa className={`${styles['icon-visa-bo']} `} />
                <p className={styles['card-date-bo']}>06/29</p>
              </div>
              <div className={styles['trash-can-box-bo']}>
                <FaTrashCan className={styles['icon-trashcan-bo']} />
              </div>
            </div>

            <div
              className={`${styles['card-body-bo']} d-flex justify-content-between align-items-center`}
            >
              <div className={styles['icon-card-box-bo']}>
                <HiCreditCard className={`${styles['icon-card-bo']} `} />
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
                className={`${styles['card-date-box-bo']} d-flex flex-column justify-content-center align-items-center`}
              >
                <FaCcMastercard className={`${styles['icon-master-bo']} `} />
                <p className={styles['card-date-bo']}>06/29</p>
              </div>
              <div className={styles['trash-can-box-bo']}>
                <FaTrashCan className={styles['icon-trashcan-bo']} />
              </div>
            </div>
          </div>
          <div
            className={`${styles['card-col-bo']} d-flex justify-content-center align-items-center`}
          >
            <div
              className={`${styles['card-body-bo']} d-flex justify-content-between align-items-center`}
            >
              <div className={styles['icon-card-box-bo']}>
                <HiCreditCard className={`${styles['icon-card-bo']} `} />
              </div>
              <div className={styles['card-text-box-bo']}>
                <div
                  className={`${styles['card-text-up-bo']} d-flex justify-content-between align-items-center`}
                >
                  <input
                    type="text"
                    className={`${styles['info-card-bo']} ${styles['input-card-name-bo']} p text-center`}
                  />
                  <input
                    type="text"
                    className={`${styles['info-card-bo']} ${styles['input-card-saveCode-bo']} p text-center`}
                    maxLength="3"
                  />
                </div>
                <div
                  className={`${styles['card-text-down-bo']} d-flex justify-content-between align-items-center gap-1 p`}
                >
                  <input
                    type="text"
                    className={`${styles['info-card-bo']} ${styles['input-card-number-bo']} p text-center`}
                    maxLength="4"
                  />
                  <input
                    type="text"
                    className={`${styles['info-card-bo']} ${styles['input-card-number-bo']} p text-center`}
                    maxLength="4"
                  />
                  <input
                    type="text"
                    className={`${styles['info-card-bo']} ${styles['input-card-number-bo']} p text-center`}
                    maxLength="4"
                  />
                  <input
                    type="text"
                    className={`${styles['info-card-bo']} ${styles['input-card-number-bo']} p text-center`}
                    maxLength="4"
                  />
                </div>
              </div>
              <div
                className={`${styles['card-date-box-bo']} d-flex flex-column justify-content-center align-items-center`}
              >
                <FaCcMastercard className={`${styles['icon-master-bo']} `} />
                <input
                  type="text"
                  className={`${styles['info-card-bo']} ${styles['input-card-date-bo']} p text-center`}
                  maxLength="5"
                />
              </div>
              <div className={styles['trash-can-box-bo']}>
                <FaTrashCan className={styles['icon-trashcan-bo']} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
