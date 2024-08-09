import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import styles from '../styles/UserInfoEdit.module.css' // 確保你有這個 CSS 模組文件

export default function UserInfoEdit() {
  return (
    <>
      <Head>
        <title>user-info</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <section>
        <div className={styles['user-info-box-bo']}>
          <div className={`${styles['info-form-box-bo']} flex-column d-flex`}>
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
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      placeholder="z0123455@gmail.com"
                    />
                  </div>
                  <div
                    className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                  >
                    <h6 className={`${styles['info-name-bo']} h6`}>帳號</h6>
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      placeholder="a385345"
                    />
                  </div>
                  <div
                    className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                  >
                    <h6 className={`${styles['info-name-bo']} h6`}>密碼</h6>
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      placeholder="asdffs"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${styles['default-img-box-bo']} ${styles['move-up-bo']} col-12 col-md-5 col-lg-4 d-flex flex-column justify-content-center align-items-center position-relative`}
              >
                <div className={styles['user-img-box-bo']}>
                  <img
                    className={styles['user-img-bo']}
                    src="/image/user.jpg"
                    alt="User"
                  />
                  <div className={styles['btn-edit-img']}>
                    <i className="fa-solid fa-pen-to-square"></i>
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

            <div
              className={`${styles['info-detail-box-bo']} row justify-content-center align-items-start`}
            >
              <div
                className={`${styles['detail-information-box-bo']} col-12 col-md-7 col-lg-8 d-flex flex-column justify-content-center align-items-center`}
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
                className={`${styles['detail-card-box-bo']} ${styles['move-up-bo']} col-12 col-md-5 col-lg-4 d-flex flex-column justify-content-start align-items-center`}
              >
                <div className={`${styles['detail-card-title-bo']} h5`}>
                  信用卡
                </div>
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
                        <i
                          className={`${styles['icon-card-bo']} fa-solid fa-credit-card`}
                        ></i>
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
                        <i
                          className={`${styles['icon-visa-bo']} fa-brands fa-cc-visa`}
                        ></i>
                        <p className={styles['card-date-bo']}>06/29</p>
                      </div>
                      <div className={styles['trash-can-box-bo']}>
                        <i
                          className={`${styles['icon-trash-can-bo']} fa-solid fa-trash-can`}
                        ></i>
                      </div>
                    </div>

                    <div
                      className={`${styles['card-body-bo']} d-flex justify-content-between align-items-center`}
                    >
                      <div className={styles['icon-card-box-bo']}>
                        <i
                          className={`${styles['icon-card-bo']} fa-solid fa-credit-card`}
                        ></i>
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
                        <i
                          className={`${styles['icon-master-bo']} fa-brands fa-cc-mastercard`}
                        ></i>
                        <p className={styles['card-date-bo']}>06/29</p>
                      </div>
                      <div className={styles['trash-can-box-bo']}>
                        <i
                          className={`${styles['icon-trash-can-bo']} fa-solid fa-trash-can`}
                        ></i>
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
                        <i
                          className={`${styles['icon-card-bo']} fa-solid fa-credit-card`}
                        ></i>
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
                        <i
                          className={`${styles['icon-master-bo']} fa-brands fa-cc-mastercard`}
                        ></i>
                        <input
                          type="text"
                          className={`${styles['info-card-bo']} ${styles['input-card-date-bo']} p text-center`}
                          maxLength="5"
                        />
                      </div>
                      <div className={styles['trash-can-box-bo']}>
                        <i
                          className={`${styles['icon-trash-can-bo']} fa-solid fa-trash-can`}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${styles['info-btn-box-bo']} d-flex justify-content-center align-items-center gap-5`}
            >
              <button
                className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-3 gap-sm-5`}
              >
                取消修改<i className="fa-solid fa-xmark"></i>
              </button>
              <button
                className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-3 gap-sm-5`}
              >
                修改資訊<i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
