import React from 'react'
import styles from '@/styles/boyu/user-info.module.scss'
import { FaEdit } from 'react-icons/fa'

export default function UserBasicInfo() {
  return (
    <div
      className={`${styles['info-default-box-bo']} row justify-content-center align-items-center`}
    >
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
              z0123455@gmail.com
            </div>
          </div>
          <div
            className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
          >
            <h6 className={`${styles['info-name-bo']} h6`}>帳號</h6>
            <div
              className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
            >
              a385345
            </div>
          </div>
          <div
            className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
          >
            <h6 className={`${styles['info-name-bo']} h6`}>密碼</h6>
            <div
              className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
            >
              asdffs
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles['default-img-box-bo']} ${styles['move-up-bo']} col-12 col-md-5 col-lg-4 d-flex flex-column justify-content-center align-items-center position-relative`}
      >
        <div className={styles['user-img-box-bo']}>
          <img
            className={styles['user-img-bo']}
            src="/images/boyu/user.jpg"
            alt="User"
          />
          <div className={styles['btn-edit-img']}>
            <FaEdit />
          </div>
        </div>
        <div
          className={`${styles['create-date-box-bo']} h6 text-center d-flex justify-content-center align-items-center`}
        >
          <h6>創建日期&nbsp;:&nbsp;</h6>
          <h6>2024 / 07 / 30</h6>
        </div>
      </div>
    </div>
  )
}
