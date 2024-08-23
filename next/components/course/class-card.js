import React from 'react'
import Image from 'next/image'

const ClassCard = ({ courseData, rank }) => {
  // 定義樣式
  const styles = {
    classCard: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgBox: {
      width: '280px',
      height: '168px',
      border: '1px solid var(--text-hover-color)',
      marginBottom: '2rem',
    },
    cardBody: {
      textAlign: 'center',
    },
    className: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '3px',
      alignSelf: 'stretch',
    },
    classDescription: {
      minHeight: 'calc(1.2em * 2)',
      lineHeight: '1.2em',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      margin: 0,
    },
    paragraph: {
      margin: 0,
    },
    rank: {
      width: '3.5rem',
      height: '3.5rem',
      fontSize: '2.4rem',
      display: 'grid',
      color: 'var(--white)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 99,
    },
  }

  // 定義排名背景顏色
  const rankColors = {
    1: '#bfac00',
    2: '#bfbfbf',
    3: '#833b05',
    4: '#2b2b2b',
  }

  // 媒體查詢樣式
  const mediaStyles = {
    '@media (max-width: 768px)': {
      imgBox: {
        width: '10rem',
        height: '6rem',
      },
    },
  }

  return (
    <div style={styles.classCard}>
      <div
        style={{
          ...styles.imgBox,
          ...(window.innerWidth <= 768
            ? mediaStyles['@media (max-width: 768px)'].imgBox
            : {}),
        }}
      >
        {rank && (
          <div
            style={{
              ...styles.rank,
              backgroundColor: rankColors[rank] || '#2b2b2b',
            }}
          >
            {rank}
          </div>
        )}
        <Image
          src={`/images/aa/${courseData.images}`}
          alt={courseData.course_name || ''}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div style={styles.cardBody}>
        <div style={styles.className}>
          <p style={styles.paragraph}>{courseData.course_name}</p>
          <p style={{ ...styles.paragraph, ...styles.classDescription }}>
            {courseData.course_category_id}
          </p>
        </div>
        <p style={styles.paragraph}>NT. {courseData.price}</p>
      </div>
    </div>
  )
}

export default ClassCard
