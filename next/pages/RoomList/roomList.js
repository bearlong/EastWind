import BTNGroup from '@/components/roomList/BtnGroup'
import PageNext from '@/components/roomList/PageNext'
import RoomCard from '@/components/roomList/RoomCard'
import RoomSearch from '@/components/roomList/RoomSearch'
import JoinBTN from '@/components/roomList/joinBtn'
import styles from '@/styles/gw/_roomList.module.sass'

export default function RoomList() {
  return (
    <>
      <div className="container">
        <div className={styles.topBar}>
          <JoinBTN />
          <RoomSearch />
          <BTNGroup />
          <div className="h6">共72團</div>
        </div>

        <div className={styles.cardArea}>
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>
        <PageNext />
      </div>
    </>
  )
}
