import { useContext, useState, useEffect } from 'react'
import UserSidebar from '@/components/user/user-sidebar'
import styles from '@/styles/boyu/user-info-edit.module.scss'
import { FaEdit } from 'react-icons/fa'
import { HiCreditCard } from 'react-icons/hi2'
import { FaCcVisa, FaCcMastercard, FaTrashCan, FaXmark } from 'react-icons/fa6'
import { AuthContext } from '@/context/AuthContext'
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function UserInfoEdit() {
  const { user } = useContext(AuthContext)
  const [cards, setCards] = useState([])

  const [newCard, setNewCard] = useState({
    card_name: '',
    card_number: '',
    card_type: '',
    exp_date: '',
  })

  const [formValues, setFormValues] = useState({
    email: '',
    account: '',
    password: '',
    username: '',
    gender: '',
    birthDate: '',
    address: '',
    phone: '',
  })

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3005/api/user/user/${user.id}/cards`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            console.log(data.data) // 打印出來檢查
            setCards(data.data)
          } else {
            console.error('Failed to fetch credit cards:', data.message)
          }
        })
        .catch((error) => console.error('Error fetching credit cards:', error))
    }
  }, [user])

  const onInputChange = (event) => {
    const { name, value } = event.target
    setNewCard({
      ...newCard,
      [name]: value,
    })
  }
  const deleteCard = (cardId) => {
    Swal.fire({
      title: '您確定要刪除這張信用卡嗎？',
      html: `<span class="p">刪除後將無法復原，請確認。</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認刪除',
      cancelButtonText: '取消',
      customClass: {
        popup: `${styles['swal-popup-bo']}`,
        title: 'h6',
        icon: `${styles['swal-icon-bo']}`,
        confirmButton: `${styles['swal-btn-bo']}`,
        cancelButton: `${styles['swal-btn-cancel-bo']}`,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `http://localhost:3005/api/user-edit/invalidate-card/${user.id}/${cardId}`,
          {
            method: 'PUT',
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'success') {
              setCards(cards.filter((card) => card.id !== cardId))
              Swal.fire({
                title: '刪除成功！',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                  title: 'h6',
                  icon: `${styles['swal-icon-bo']}`,
                  confirmButton: `${styles['swal-btn-bo']}`,
                },
              })
            } else {
              console.error('Failed to delete card:', data.message)
              Swal.fire({
                title: '刪除失敗',
                html: `<span class="p">${data.message} 歡迎回來！</span>`,
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                  title: 'h6',
                  icon: `${styles['swal-icon-bo']}`,
                  confirmButton: `${styles['swal-btn-bo']}`,
                },
              })
            }
          })
          .catch((error) => {
            console.error('Error deleting card:', error)
            Swal.fire({
              title: '刪除失敗',
              text: '伺服器錯誤，請稍後再試。',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                title: 'h6',
                icon: `${styles['swal-icon-bo']}`,
                confirmButton: `${styles['swal-btn-bo']}`,
              },
            })
          })
      }
    })
  }

  const addCard = () => {
    fetch(`http://localhost:3005/api/user/user/${user.id}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setCards([...cards, data.data])
          setNewCard({
            card_name: '',
            card_number: '',
            card_type: '',
            exp_date: '',
          })
        } else {
          console.error('Failed to add card:', data.message)
        }
      })
      .catch((error) => console.error('Error adding card:', error))
  }

  if (!user) {
    return null
  }
  //  格式化日期
  const createdAt = user.created_at.split(' ')[0].replace(/-/g, ' / ')
  const birthDate = user.birth.replace(/-/g, ' / ')

  return (
    <>
      <section className="d-flex flex-column flex-md-row">
        <UserSidebar />
        <div className={`${styles['user-info-box-bo']}  w-100`}>
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
                      value={user?.email || ''}
                      onChange={onInputChange}
                      name="email"
                      placeholder="請輸入需修改的email"
                    />
                  </div>
                  <div
                    className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                  >
                    <h6 className={`${styles['info-name-bo']} h6`}>帳號</h6>
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={user?.account || ''}
                      onChange={onInputChange}
                      name="account"
                      placeholder="請輸入需修改的帳號"
                    />
                  </div>
                  <div
                    className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                  >
                    <h6 className={`${styles['info-name-bo']} h6`}>密碼</h6>
                    <input
                      type="password"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={user?.password || ''}
                      onChange={onInputChange}
                      name="password"
                      placeholder="請輸入需修改的密碼"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${styles['default-img-box-bo']} ${styles['move-up-bo']} col-12 col-md-5 col-lg-4 d-flex flex-column justify-content-center align-items-center position-relative`}
              >
                <div className={styles['user-img-box-bo']}>
                  <img
                    className={`${styles['user-img-bo']}`}
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
                  <h6>{createdAt}</h6>
                </div>
              </div>
            </div>

            <div
              className={`${styles['info-detail-box-bo']} row justify-content-center align-items-start gap-5 gap-lg-0`}
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
                      value={user?.username || ''}
                      onChange={onInputChange}
                      name="username"
                      placeholder="請輸入需修改的姓名"
                    />
                  </div>
                  <div
                    className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                  >
                    <h6 className={`${styles['info-name-bo']} h6`}>性別</h6>
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={user?.gender || ''}
                      onChange={onInputChange}
                      name="gender"
                      placeholder="請輸入需修改的性別"
                    />
                  </div>
                  <div
                    className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                  >
                    <h6 className={`${styles['info-name-bo']} h6`}>生日</h6>
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={birthDate || ''}
                      onChange={onInputChange}
                      name="birthDate"
                      placeholder="請輸入需修改的生日"
                    />
                  </div>
                  <div
                    className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                  >
                    <h6 className={`${styles['info-name-bo']} h6`}>地址</h6>
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={user?.address || ''}
                      onChange={onInputChange}
                      name="address"
                      placeholder="請輸入需修改的地址"
                    />
                  </div>
                  <div
                    className={`${styles['info-col-bo']} d-flex justify-content-center flex-column flex-sm-row`}
                  >
                    <h6 className={`${styles['info-name-bo']} h6`}>手機</h6>
                    <input
                      type="text"
                      className={`${styles['info-text-bo']} h6 d-flex align-items-center`}
                      value={user?.phone || ''}
                      onChange={onInputChange}
                      name="phone"
                      placeholder="請輸入需修改的手機號碼"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${styles['detail-card-box-bo']} col-12  col-lg-12 col-xl-4 d-flex flex-column justify-content-start align-items-center`}
              >
                <div className={`${styles['detail-card-title-bo']} h5`}>
                  信用卡
                </div>
                <div
                  className={`${styles['detail-card-list-bo']} d-flex flex-column gap-4`}
                >
                  {cards.length === 0 ? (
                    <p className="h6 text-center">尚未增加信用卡</p>
                  ) : (
                    cards.map((card, index) => (
                      <div
                        key={index}
                        className={`${styles['card-col-bo']} d-flex justify-content-center align-items-center`}
                      >
                        <div
                          className={`${styles['card-body-bo']} d-flex justify-content-between align-items-center`}
                        >
                          <div className={styles['icon-card-box-bo']}>
                            <HiCreditCard
                              className={`${styles['icon-card-bo']}`}
                            />
                          </div>
                          <div className={styles['card-text-box-bo']}>
                            <div
                              className={`${styles['card-text-up-bo']} d-flex justify-content-between align-items-center`}
                            >
                              <p>{card.card_name}</p>
                            </div>
                            <div
                              className={`${styles['card-text-down-bo']} d-flex justify-content-between align-items-center gap-1 p`}
                            >
                              <p>{card.card_number.slice(0, 4)}</p>
                              <p>{card.card_number.slice(4, 8)}</p>
                              <p>{card.card_number.slice(8, 12)}</p>
                              <p>{card.card_number.slice(-4)}</p>
                            </div>
                          </div>
                          <div
                            className={`${styles['card-date-box-bo']} d-flex flex-column justify-content-center align-items-center`}
                          >
                            {card.card_type === 'Visa' ? (
                              <FaCcVisa
                                className={`${styles['icon-visa-bo']} `}
                              />
                            ) : (
                              <FaCcMastercard
                                className={`${styles['icon-master-bo']} `}
                              />
                            )}
                            <p className={styles['card-date-bo']}>
                              {card.exp_date}
                            </p>
                          </div>
                          <div className={styles['trash-can-box-bo']}>
                            <FaTrashCan
                              className={styles['icon-trashcan-bo']}
                              onClick={() => {
                                deleteCard(card.id)
                                console.log('Deleting card with id:', card.id)
                              }} // 確保傳遞的是 card.id
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
                          <input
                            type="text"
                            className={`${styles['info-card-bo']} ${styles['input-card-name-bo']} p `}
                            value={newCard.card_name}
                            onChange={onInputChange}
                            name="card_name"
                            placeholder="卡片名稱"
                          />
                        </div>
                        <div
                          className={`${styles['card-text-down-bo']} d-flex justify-content-between align-items-center gap-1 p`}
                        >
                          <input
                            type="text"
                            className={`${styles['info-card-bo']} ${styles['input-card-number-bo']} p `}
                            maxLength="16"
                            value={newCard.card_number}
                            onChange={onInputChange}
                            name="card_number"
                            placeholder="請輸入卡號"
                          />
                        </div>
                      </div>
                      <div
                        className={`${styles['card-date-box-bo']} d-flex flex-column justify-content-center align-items-center`}
                      >
                        {newCard.card_type === 'Visa' ? (
                          <FaCcVisa className={`${styles['icon-visa-bo']}`} />
                        ) : (
                          <FaCcMastercard
                            className={`${styles['icon-master-bo']}`}
                          />
                        )}
                        <input
                          type="text"
                          className={`${styles['info-card-bo']} ${styles['input-card-date-bo']} p text-center`}
                          maxLength="5"
                          value={newCard.exp_date}
                          onChange={onInputChange}
                          name="exp_date"
                          placeholder="M/Y"
                        />
                      </div>

                      <div className={styles['trash-can-box-bo']}>
                        <FaTrashCan
                          className={styles['icon-trashcan-bo']}
                          onClick={addCard}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${styles['info-btn-box-bo']} d-flex justify-content-center align-items-center gap-5`}
            >
              <Link
                href="/user/user-center/info"
                className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-2 gap-sm-3`}
              >
                取消修改
                <FaXmark />
              </Link>
              <button
                className={`${styles['btn-edit-info-bo']} btn h6 d-flex justify-content-center align-items-center gap-2 gap-sm-3`}
              >
                修改資訊
                <FaEdit />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
