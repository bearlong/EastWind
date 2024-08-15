import BookingLeftArea from '@/components/BookingPage/BookingLeftArea'
import BookingRightArea from '@/components/BookingPage/BookingRightArea'
import styles from '@/styles/gw/_partypage.module.scss'



function Company() {
  return (
    <>
      <div className={styles.main}>
        <BookingLeftArea />
        <BookingRightArea />
      </div>
    </>
  )
}

export default Company
