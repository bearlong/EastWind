import React from 'react'
import styles from '@/styles/gw/_RoomListCard.module.sass'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function RoomCard({ party }) {
  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '時間未知'
    const dateTime = new Date(dateTimeString)
    return dateTime.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const calculateDuration = (start, end) => {
    if (!start || !end) return '持續時間未知'
    const startTime = new Date(start)
    const endTime = new Date(end)
    let durationHours = (endTime - startTime) / (1000 * 60 * 60)
    return Math.max(0, Math.round(durationHours * 10) / 10)
  }

  const startTime = formatDate(party.start_time)
  const duration = calculateDuration(party.start_time, party.end_time)

  return (
    <div className={styles.card}>
      <div className={styles['card-body']}>
        <div className={styles['flex-container']}>
          <h6 className={styles['card-title']}>
            團號: {party.numerical_order || '未知'}
          </h6>
          <span className={`${styles.badge} ${styles['bg-primary']}`}>
            {typeof duration === 'number' ? `${duration} 小時` : duration}
          </span>
        </div>
        <p className={styles['card-subtitle']}>開始時間：{startTime}</p>
        <div className={styles['flex-container']}>
          <p>{party.company_name}</p>
          <p>玩家數: {party.player_count}/4</p>
        </div>
        <div className={styles['flex-container']}>
          <Link href={`/lobby/Party/${party.id}`}>
            <button className={styles.btn}>馬上加入</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
