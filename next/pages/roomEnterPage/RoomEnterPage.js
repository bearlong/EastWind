import styles from '@/styles/gw/_RoomEnterPage.module.scss'

const RoomOption = ({ text, imageUrl, className }) => (
  <div
    className={`${styles.roomOption} ${styles[className]}`}
    style={{ backgroundImage: `url(${imageUrl})` }}
  >
    <div className={styles.text}>{text}</div>
    <div className={styles.blackMask} />
  </div>
)

export default function RoomEnterPage() {
  return (
    <div className={styles.room}>
      <RoomOption
        text="我要訂桌"
        imageUrl="/images/gw/img/001.JPG"
        className="bookingBox"
      />
      <RoomOption
        text="我要組團"
        imageUrl="/images/gw/img/002.jpg"
        className="partyRoom"
      />
    </div>
  )
}
