import RoomNav from '@/components/partypages/RoomNav'
import PartyCard from '@/components/partypages/PartyCard'
import PhotoCard from '@/components/partypages/PhotoCard'
import ToKnow from '@/components/partypages/ToKnowCard'
import RoomCard from '@/components/partypages/RoomCard'
import styles from '@/styles/gw/_partyLeft.module.scss'

export default function PartyLeftArea() {
  return (
    <div className={styles.leftArea}>
      <RoomNav />
      <PartyCard />
      <RoomCard />
      <PhotoCard />
      <ToKnow />
    </div>
  )
}
