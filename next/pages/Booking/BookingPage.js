import BookingLeftArea from '@/components/BookingPage/BookingLeftArea'
import BookingRightArea from '@/components/BookingPage/BookingRightArea'
import styles from '@/styles/gw/_partypage.module.scss'



function BookingPage() {
  return (
    <>
      <div className={styles.main}>
        <BookingLeftArea />
        <BookingRightArea />
      </div>
    </>
  )
}

export default BookingPage
