import RoomNav from '@/components/partypages/PartyRoomNav'
import PartyCard from '@/components/partypages/PartyCard'
import PhotoCard from '@/components/partypages/PhotoCard'
import ToKnow from '@/components/partypages/ToKnowCard'
import RoomCard from '../partypages/RoomCard'
import styles from '@/styles/Booking/_bookingLeftArea.module.scss'

export default function BookingLeftArea() {
  return (
    <div className={styles.leftArea}>
      <RoomNav />
      <RoomCard/>
      <PhotoCard />
      <ToKnow />
    </div>
  )
}
