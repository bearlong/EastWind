import styles from '@/styles/gw/_photo.module.sass'
import cardStyles from '@/styles/gw/_card.module.sass'


export default function PhotoCard() {
  return (
    <>
    <div className={cardStyles.Card}>
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
    </div>
      
    </>
  )
}
