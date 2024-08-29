import React, { useState } from 'react'
import styles from '@/styles/gw/_companyCard.module.scss'
import Link from 'next/link';

export default function CompanyCard({ company }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
 

  //  <div className={styles.card}>
  //     <div className={styles.logoContainer}>
  //       {!imageError ? (
  //         <img
  //           src={company.logo || "/images/default-company-logo.png"}
  //           alt={company.name}
  //           className={styles.logo}
  //           onError={handleImageError}
  //         />
  //       ) : (
  //         <div className={styles.logoFallback}>{company.name[0]}</div>
  //       )}
  //     </div>
  //     <div className={styles.cardBody}>
  //       <div className={styles.cardInfo}>
  //         <h6 className={styles.companyName}>{company.name}</h6>
  //         <div className={styles.rating}>
  //           <span className={styles.ratingNumber}>{company.rating}</span>
  //           <span className={styles.ratingIcon}>★</span>
  //         </div>
  //       </div>
  //       <div className={styles.cardInfo}>
  //         <p className={styles.location}>{company.city}{company.district}</p>
  //       </div>

  //       <Link href={`/lobby/Company/${company.id}`}>
  //       <button  className={styles.bookButton}>
  //         查看詳情
  //       </button>
  //     </Link>
  //     </div>
  //   </div>

  <div className={styles.card}>
  <div className={styles.cardBody}>
    <div className={styles.flexContainer}>
      <div className={styles.logoAndName}>
        <div className={styles.logoContainer}>
          {!imageError ? (
            <img
              src={company.logo || "/images/default-company-logo.png"}
              alt={company.name}
              className={styles.logo}
              onError={handleImageError}
            />
          ) : (
            <div className={styles.logoFallback} >{company.name[0]}</div>
          )}
        </div>
        <h6 className={styles.companyName}>{company.name}</h6>
      </div>
      <div className={styles.rating}>
        <span className={styles.ratingNumber}>{company.rating}</span>
        <span className={styles.ratingIcon}>★</span>
      </div>
    </div>
    <p className={styles.info}>地址：{company.address}</p>
    <div className={styles.flexContainer}>
    <p className={styles.info}>電話：{company.tele}</p>
    <p className={styles.info}>營業時間：{company.open_time}</p>
        </div>
        <div className={styles.buttonContainer}>
          <Link href={`/lobby/Company/${company.id}`}>
            <button className={styles.btn}>查看詳情</button>
          </Link>
        </div>
  </div>
</div>
  )
}