import React, { useState, useContext, useEffect } from 'react'
import UserCenterLayout from '@/components/layout/user-center-layout'
import { AuthContext } from '@/context/AuthContext'
import styles from '@/styles/boyu/user-party.module.scss'
import {
  FaSort,
  FaXmark,
  FaCommentDots,
  FaMagnifyingGlass,
  FaMoneyBill,
  FaPhone,
  FaCheck,
  FaShop,
  FaUserGroup,
} from 'react-icons/fa6'
import { FaStar, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa'

import Link from 'next/link'

export default function UserParty() {
  const [activeSortIndex, setActiveSortIndex] = useState(0)
  const { user } = useContext(AuthContext)
  const [selectedStatus, setSelectedStatus] = useState('booked')
  const [party, setParty] = useState([])
  const [role, setRole] = useState('主揪') // 新增角色狀態
  const [members, setMembers] = useState([])

  const [searchQuery, setSearchQuery] = useState('') // 用來存儲用戶輸入值的狀態
  const [searchKeyword, setSearchKeyword] = useState('') // 新增搜尋關鍵字狀態

  // 排序方式列表
  const sortOptions = [
    { label: '揪團編號從大到小', key: 'order_number', order: 'desc' },
    { label: '揪團編號從小到大', key: 'order_number', order: 'asc' },
    { label: '棋牌室從 A 到 Z ', key: 'company_name', order: 'asc' },
    { label: '棋牌室從 Z 到 A ', key: 'company_name', order: 'desc' },
    { label: '揪團時間從早到晚', key: 'date', order: 'asc' },
    { label: '揪團時間從晚到早', key: 'date', order: 'desc' },
  ]

  const changeStatus = (status) => {
    setSelectedStatus(status)
  }

  const changeRole = (newRole) => {
    setRole(newRole)
  }

  const sortParty = (key, order) => {
    const sortedParty = [...party].sort((a, b) => {
      let valueA, valueB

      if (key === 'date') {
        valueA = new Date(`${a.date}T${a.start_time}`)
        valueB = new Date(`${b.date}T${b.start_time}`)
      } else if (key === 'company_name') {
        // 忽略大小寫比較公司名稱
        valueA = a[key].toLowerCase()
        valueB = b[key].toLowerCase()
      } else {
        // 其他情況下的排序處理
        valueA = a[key]
        valueB = b[key]
      }

      if (order === 'asc') {
        return valueA > valueB ? 1 : -1
      } else {
        return valueA < valueB ? 1 : -1
      }
    })

    setParty(sortedParty)
  }

  const sortByIndex = (index) => {
    setActiveSortIndex(index)
    const { key, order } = sortOptions[index]
    sortParty(key, order)
  }

  const formatTime = (time) => {
    return time.split(':').slice(0, 2).join(':')
  }

  const triggerSearch = () => {
    setSearchKeyword(searchQuery) // 按下搜尋按鈕時，根據 `searchQuery` 設置 `searchKeyword`
  }

  // 當輸入框內容改變時執行的函數
  const searchInputChange = (e) => {
    const inputValue = e.target.value
    setSearchQuery(inputValue)

    if (inputValue === '') {
      setSearchKeyword('') // 當輸入框為空時，設置 `searchKeyword` 為空，這樣會顯示全部結果
    }
  }

  useEffect(() => {
    if (user && user.id) {
      let apiUrl = `http://localhost:3005/api/user-party/${user.id}/${selectedStatus}`

      if (role === '主揪') {
        apiUrl = `http://localhost:3005/api/user-party/${user.id}/${selectedStatus}`
      } else if (role === '參團') {
        apiUrl = `http://localhost:3005/api/user-party/join/${user.id}/${selectedStatus}`
      }

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            const transformedPartys = data.data.partys.map((party) => {
              const membersArray = [
                {
                  role: '主揪',
                  name: party.main_username,
                  id: party.user_main,
                },
              ]
              if (party.join1_username) {
                membersArray.push({
                  role: '參團',
                  name: party.join1_username,
                  id: party.user_join1,
                })
              }
              if (party.join2_username) {
                membersArray.push({
                  role: '參團',
                  name: party.join2_username,
                  id: party.user_join2,
                })
              }
              if (party.join3_username) {
                membersArray.push({
                  role: '參團',
                  name: party.join3_username,
                  id: party.user_join3,
                })
              }

              return {
                ...party,
                playroom_type: party.playroom_type === 0 ? '大廳' : '包廂',
                price: Math.floor(party.total_price),
                start_time: formatTime(party.start_at),
                end_time: formatTime(party.end_at),
                members: membersArray,
              }
            })
            setParty(transformedPartys)
          } else {
            console.error('Failed to fetch parties:', data.message)
          }
        })
        .catch((error) => {
          console.error('Error fetching parties:', error)
        })
    }
  }, [selectedStatus, role, user])

  const filteredParty = party.filter((item) => {
    const matchCompanyName = item.company_name.includes(searchKeyword)
    const matchOrderNumber = item.order_number
      .toString()
      .includes(searchKeyword)

    if (role === '主揪') {
      return (
        item.main_username === user.username &&
        (matchCompanyName || matchOrderNumber)
      )
    } else if (role === '參團') {
      return (
        [
          item.join1_username,
          item.join2_username,
          item.join3_username,
        ].includes(user.username) &&
        (matchCompanyName || matchOrderNumber)
      )
    }
    return false
  })

  return (
    <div className={`${styles['user-party-box-bo']}   w-100`}>
      <div
        className={`${styles['search-box-bo']} d-flex flex-column flex-sm-row justify-content-center align-items-center gap-lg-4 gap-3 `}
      >
        <h6>搜尋</h6>
        <input
          type="text"
          placeholder="請輸入店名或揪團編號"
          className={`${styles['input-search-bo']} p`}
          value={searchQuery} // 綁定搜尋關鍵字
          onChange={searchInputChange} // 更新搜尋關鍵字並監聽輸入
        />
        <button
          className={`${styles['btn-search']} h6 d-flex justify-content-between align-items-center`}
          onClick={triggerSearch} // 點擊後觸發搜尋
        >
          <FaMagnifyingGlass />
        </button>
      </div>

      <div className={`${styles['party-list-box-bo']} flex-column d-flex`}>
        <div className={styles['party-list-head-bo']}>
          <ul
            className={`${styles['party-state-box-bo']} d-flex justify-content-around align-items-center text-center`}
          >
            <li
              onClick={() => changeRole('主揪')}
              className={`${styles['party-type-bo']} h5 ${
                role === '主揪' ? styles['type-choose-bo'] : ''
              }`}
            >
              主揪
            </li>
            <li
              onClick={() => changeRole('參團')}
              className={`${styles['party-type-bo']} h5 ${
                role === '參團' ? styles['type-choose-bo'] : ''
              }`}
            >
              參團
            </li>
          </ul>
        </div>
        <div
          className={`${styles['party-list-body-bo']} d-flex flex-column justify-content-center text-center`}
        >
          <ul
            className={`${styles['party-state-box-bo']} d-flex justify-content-around align-items-center text-center`}
          >
            <li
              onClick={() => changeStatus('booked')}
              className={`${styles['party-state-bo']} h6 ${
                selectedStatus === 'booked' ? styles['state-choose-bo'] : ''
              }`}
            >
              等待中
            </li>
            <li
              onClick={() => changeStatus('completed')}
              className={`${styles['party-state-bo']} h6 ${
                selectedStatus === 'completed' ? styles['state-choose-bo'] : ''
              }`}
            >
              已完成
            </li>
            <li
              onClick={() => changeStatus('cancelled')}
              className={`${styles['party-state-bo']} h6 ${
                selectedStatus === 'cancelled' ? styles['state-choose-bo'] : ''
              }`}
            >
              已流團
            </li>
          </ul>

          <div className="d-flex justify-content-end align-items-center d-md-none">
            <button
              className={`${styles['btn-sort-bo']} btn p`}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              排序方式
              <FaSort />
            </button>

            <div
              className={`${styles['offcanvas-bo']} offcanvas offcanvas-end`}
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul
                  className={`${styles['sort-list-bo']} d-flex flex-column justify-content-center align-items-start`}
                >
                  <li className="h5">排序方式</li>
                  {sortOptions.map((option, index) => (
                    <li
                      key={index}
                      className={`h6 d-flex justify-content-between align-items-center gap-5 ${styles['sort-list-li-bo']}`}
                      onClick={() => sortByIndex(index)}
                    >
                      {option.label}
                      <FaCheck
                        className={` ${
                          activeSortIndex === index ? '' : 'd-none'
                        }`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles['party-list-th-bo']}>
            <ul className="text-center">
              <li
                className="p d-flex justify-content-center align-items-center text-center gap-3"
                onClick={() => sortByIndex(activeSortIndex === 1 ? 0 : 1)} // 切換排序方式
              >
                揪團編號 <FaSort />
              </li>
              <li
                className="p d-flex justify-content-center align-items-center text-center gap-3"
                onClick={() => sortByIndex(activeSortIndex === 3 ? 2 : 3)} // 切換排序方式
              >
                棋牌室 <FaSort />
              </li>
              <li
                className="p d-flex justify-content-center align-items-center text-center gap-3"
                onClick={() => sortByIndex(activeSortIndex === 5 ? 4 : 5)} // 切換排序方式
              >
                揪團時間 <FaSort />
              </li>
              <li className="p d-flex justify-content-center align-items-center text-center gap-3"></li>
            </ul>
          </div>
          {filteredParty.length === 0 ? (
            <div className="h5 p-5">尚未有揪團紀錄</div>
          ) : (
            filteredParty.map((item) => (
              <div
                className={styles['party-list-tb-bo']}
                key={`${item.order_number}-${item.id}`}
              >
                <div
                  className={`${styles['party-list-col-bo']} d-flex flex-column`}
                >
                  <div className="d-none d-md-block">
                    <input
                      type="checkbox"
                      id={`showDetailDesktop${item.id}`}
                      className={styles['show-detail-desktop-bo']}
                    />
                    <label
                      className={`${styles['list-col-head-desktop-bo']} d-none d-md-grid gap-2 `}
                      htmlFor={`showDetailDesktop${item.id}`}
                    >
                      <h6>{item.order_number}</h6>
                      <h6>{item.company_name}</h6>
                      <div
                        className={`${styles['list-time-bo']} d-flex flex-column`}
                      >
                        <h6>{item.date}</h6>
                        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center text-start">
                          <h6>{item.start_time}-</h6>
                          <h6> {item.end_time}</h6>
                        </div>
                      </div>

                      {selectedStatus === 'booked' && (
                        <div
                          className={`${styles['btn-party-bo']} btn h6 d-flex justify-content-center align-items-center gap-2`}
                        >
                          <FaUserGroup />
                          <div
                            className={`${styles['btn-party-text-bo']} d-flex justify-content-center align-items-center text-center`}
                          >
                            <p>參團</p>
                            <p>詳情</p>
                          </div>
                        </div>
                      )}
                      {selectedStatus === 'completed' && (
                        <div
                          className={`${styles['state-text-bo']} h6 d-flex justify-content-center align-items-center gap-2`}
                        >
                          <FaCheck />
                          已完成
                        </div>
                      )}
                      {selectedStatus === 'cancelled' && (
                        <div
                          className={`${styles['state-text-bo']} h6 d-flex justify-content-center align-items-center gap-2`}
                        >
                          <FaXmark />
                          已流團
                        </div>
                      )}

                      <h6>
                        <FaChevronDown
                          className={` ${styles['btn-detail-bo']}`}
                        />
                      </h6>
                    </label>
                    <div
                      className={`${styles['list-col-desktop-body-bo']} flex-column flex-xl-row justify-content-between align-items-center gap-4  gap-xl-2 `}
                    >
                      <div
                        className={`${styles['shop-box-bo']} d-flex  justify-content-between align-items-center`}
                      >
                        <ul className="d-flex flex-column justify-content-between align-items-start gap-1">
                          <li
                            className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                          >
                            <FaMapMarkerAlt
                              className={` ${styles['col-icon-bo']} `}
                            />
                            {item.company_address}
                          </li>
                          <li
                            className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                          >
                            <FaPhone className={` ${styles['col-icon-bo']}`} />
                            {item.company_tele}
                          </li>
                          {/* 只有當狀態為 'completed' 時才顯示桌子ID */}
                          {selectedStatus === 'completed' && (
                            <li
                              className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                            >
                              <FaShop className={` ${styles['col-icon-bo']}`} />
                              {item.table_id !== '未指定'
                                ? `${item.playroom_type} / ${item.table_number} 號桌`
                                : '未指定桌號'}
                            </li>
                          )}

                          <li
                            className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                          >
                            <FaMoneyBill
                              className={`${styles['col-icon-bo']}`}
                            />
                            {item.price}
                          </li>
                        </ul>

                        <div className="d-flex flex-column justify-content-between align-items-center gap-3">
                          <Link
                            href={`/lobby/Company/${item.id}`}
                            className={`${styles['btn-shop-detail']} btn p d-flex justify-content-center align-items-center`}
                          >
                            <FaMagnifyingGlass
                              className={` ${styles['btn-icon-bo']}`}
                            />
                            <div
                              className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                            >
                              <p>店家</p>
                              <p>詳情</p>
                            </div>
                          </Link>

                          <button
                            className={`${styles['btn-rating']} btn p d-flex justify-content-center align-items-center`}
                          >
                            <FaStar className={` ${styles['icon-star-bo']}`} />

                            <div
                              className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                            >
                              <p>評論</p>
                              <p>店家</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className={styles['group-box-bo']}>
                        {item.members.map((member, index) => (
                          <div
                            key={index}
                            className={`${
                              styles['group-member-box-bo']
                            } d-flex justify-content-center align-items-center ${
                              member.id === user.id
                                ? styles['member-self-bo']
                                : ''
                            } gap-3`}
                          >
                            <img
                              className={styles['member-img-bo']}
                              src={`/images/boyu/users/user${member.id}.jpg`} // 動態生成圖片路徑
                              alt={member.name}
                            />
                            <div
                              className={`${styles['member-text-box']} d-flex`}
                            >
                              <p>{member.role}</p>
                              <p>{member.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="d-block d-md-none">
                    <input
                      type="checkbox"
                      id={`showDetailMobile${item.id}`}
                      className={styles['show-detail-mobile-bo']}
                    />
                    <label
                      className={`${styles['list-col-head-mobile-bo']} d-flex d-md-none justify-content-between align-items-center text-center`}
                      htmlFor={`showDetailMobile${item.id}`}
                    >
                      <div className="d-flex flex-column justify-content-center align-items-start gap-2 text-start ">
                        <div className="d-flex justify-content-between w-100">
                          <h6>{item.order_number}</h6>
                        </div>
                        <h6>{item.company_name}</h6>
                        <div
                          className={`${styles['list-time-bo']} d-flex text-start`}
                        >
                          <h6>{item.date}</h6>
                          <h6>
                            {item.start_time} - {item.end_time}
                          </h6>
                        </div>
                      </div>
                      <div></div>
                      <div className="d-flex justify-content-center align-items-center gap-4">
                        {selectedStatus === 'booked' && (
                          <div
                            className={`${styles['btn-party-bo']} btn h6 d-flex justify-content-center align-items-center gap-2`}
                          >
                            <FaUserGroup />
                            <div
                              className={`${styles['btn-party-text-bo']} d-flex justify-content-center align-items-center text-center`}
                            >
                              <p>參團</p>
                              <p>詳情</p>
                            </div>
                          </div>
                        )}
                        {selectedStatus === 'completed' && (
                          <div
                            className={`${styles['state-text-bo']} h6 d-flex justify-content-center align-items-center gap-2`}
                          >
                            <FaCheck />
                            已完成
                          </div>
                        )}
                        {selectedStatus === 'cancelled' && (
                          <div
                            className={`${styles['state-text-bo']} h6 d-flex justify-content-center align-items-center gap-2`}
                          >
                            <FaXmark />
                            已流團
                          </div>
                        )}
                        <h6>
                          <FaChevronDown
                            className={` ${styles['btn-detail-bo']}`}
                          />
                        </h6>
                      </div>
                    </label>
                    <div
                      className={`${styles['list-col-mobile-body-bo']} flex-column fle flex-xl-row justify-content-between align-items-center gap-4  gap-xl-2 `}
                    >
                      <div
                        className={`${styles['shop-box-bo']} d-flex  flex-column flex-sm-row justify-content-between align-items-center`}
                      >
                        <ul className="d-flex flex-column justify-content-between align-items-start gap-1">
                          <li
                            className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                          >
                            <FaMapMarkerAlt
                              className={` ${styles['col-icon-bo']} `}
                            />
                            {item.company_address}
                          </li>
                          <li
                            className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                          >
                            <FaPhone className={` ${styles['col-icon-bo']}`} />
                            {item.company_tele}
                          </li>
                          {/* 只有當狀態為 'completed' 時才顯示桌子ID */}
                          {selectedStatus === 'completed' && (
                            <li
                              className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                            >
                              <FaShop className={` ${styles['col-icon-bo']}`} />
                              {item.table_id !== '未指定'
                                ? `${item.playroom_type} / ${item.table_number} 號桌`
                                : '未指定桌號'}
                            </li>
                          )}

                          <li
                            className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
                          >
                            <FaMoneyBill
                              className={`${styles['col-icon-bo']}`}
                            />
                            {item.price}
                          </li>
                        </ul>

                        <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center gap-3">
                          <Link
                            href={`/lobby/Company/${item.id}`}
                            className={`${styles['btn-shop-detail']} btn p d-flex justify-content-center align-items-center`}
                          >
                            <FaMagnifyingGlass
                              className={` ${styles['btn-icon-bo']}`}
                            />
                            <div
                              className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                            >
                              <p>店家</p>
                              <p>詳情</p>
                            </div>
                          </Link>

                          <button
                            className={`${styles['btn-rating']} btn p d-flex justify-content-center align-items-center`}
                          >
                            <FaStar className={` ${styles['icon-star-bo']}`} />

                            <div
                              className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
                            >
                              <p>評論</p>
                              <p>店家</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className={styles['group-box-bo']}>
                        {item.members.map((member, index) => (
                          <div
                            key={index}
                            className={`${
                              styles['group-member-box-bo']
                            } d-flex justify-content-center align-items-center ${
                              member.id === user.id
                                ? styles['member-self-bo']
                                : ''
                            } gap-3`}
                          >
                            <img
                              className={styles['member-img-bo']}
                              src={`/images/boyu/users/user${member.id}.jpg`} // 動態生成圖片路徑
                              alt={member.name}
                            />
                            <div
                              className={`${styles['member-text-box']} d-flex`}
                            >
                              <p>{member.role}</p>
                              <p>{member.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
UserParty.getLayout = function (page) {
  return <UserCenterLayout>{page}</UserCenterLayout>
}
