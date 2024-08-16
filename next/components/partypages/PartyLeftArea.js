import RoomNav from '@/components/partypages/PartyRoomNav'
import PartyCard from '@/components/partypages/PartyCard'
import PhotoCard from '@/components/partypages/PhotoCard'
import ToKnow from '@/components/partypages/ToKnowCard'
import RoomCard from '@/components/partypages/PageRoomCard'
import styles from '@/styles/gw/_partyLeft.module.scss'

export default function PartyLeftArea(partyData={partyData}) {
  return (
    <>
      <div className={styles.leftArea}>
        <RoomNav />
        <PartyCard />
        <RoomCard  partyData={partyData}/>
        <PhotoCard />
        <ToKnow />
      </div>
    </>
  )
}
