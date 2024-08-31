import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/aa/classDetail.module.scss'

// 隨機生成 ID 的函數
const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// 單個卡片組件
const CourseCard = ({ recommendData = {}, id }) => {
  return (
    <Link
      href={`/course/classDetail/`}
      className={styles['card-link']}
      key={id}
    >
      <div className={styles['sec2classtCard-aa']}>
        {/* <img
          src="https://hahow-production.imgix.net/5fb4fc22563bc0262f9fb105?w=1000&sat=0&auto=format&s=f7cb3bd23dc48b1089edb34423906993"
          alt="課程圖片"
          className={styles['sec2CardImg-aa']}
        /> */}

        <Image
          src={`/images/aa/${id.images}` || ''}
          alt={id.course_name || ''}
          className={styles['sec2CardImg-aa']}
          width={280}
          height={175}
        />

        <div className={styles['sec2cardBody-aa']}>
          <div className={styles['declassName-aa']}>
            {/* <p>西洋棋國手教你下西洋棋</p>
            <p>劉業揚＆楊元翰</p> */}
            <p>{id.course_name}</p>
            <p>{id.ch_name}</p>
          </div>
          <p
            style={{
              color: 'var(--text-color, #0e0e0e)',
              textAlign: 'center',
              alignSelf: 'stretch',
            }}
          >
            {/* NT$450 */}
            {id.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

// 主組件
const Recommends = () => {
  // 生成 4 個隨機 ID 的卡片
  const cards = Array.from({ length: 4 }, () => generateRandomId())

  return (
    <div className={styles['sec2cardgroup-aa']}>
      {cards.map((id) => (
        <CourseCard key={id} id={id} />
      ))}
    </div>
  )
}

export default Recommends
