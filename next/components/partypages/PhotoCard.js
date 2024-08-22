import styles from '@/styles/gw/_photo.module.scss'
import cardStyles from '@/styles/gw/_card.module.sass'
const DEFAULT_PHOTO = '/images/default-company-photo.jpg';
export default function PhotoCard({ companyData }) {
 // 確保 company_photos 是一個數組，如果為 null 則使用空數組
 const photos = companyData.company_photos 
 ? companyData.company_photos.split(',') 
 : [];

// 確保總是有 5 個元素的數組
const photoArray = Array(5).fill(null);

  return (
    <div className={cardStyles.Card}>
    <div className={styles.imgArea}>
      {photoArray.map((_, index) => (
        <img 
          key={index}
          className={styles.photo}
          src={photos[index] ? `/images/company_photos/${photos[index].trim()}` : DEFAULT_PHOTO}
          alt={`Company photo ${index + 1}`}
          style={{gridArea: `photo${index + 1}`}}
        />
      ))}
    </div>
    {/* <div className={cardStyles.Card}>
    <div className={styles.imgArea} id='photo'>
      <div className={styles.bgImg}>
        <img src="/images/gw/img/store_img-1.jpeg" alt="11" />
      </div>
      <div>
        <div className={styles.smImg}>
          <img src="/images/gw/img/store_img-1.jpeg" alt="11" />
        </div>
        <div className={styles.smImg}>
          <img src="/images/gw/img/store_img-1.jpeg" alt="11" />
        </div>
      </div>
      <div>
        <div className={styles.smImg}>
          <img src="/images/gw/img/store_img-1.jpeg" alt="11" />
        </div>
        <div className={styles.smImg}>
          <img src="/images/gw/img/store_img-1.jpeg" alt="11" />
        </div>
      </div>
    </div>
  </div> */}
  </div>

  )
}
