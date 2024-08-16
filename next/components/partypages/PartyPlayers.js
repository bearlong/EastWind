import PlayerCard from './PlayerCard'
import styles from '@/styles/gw/_PartyPlayers.module.scss'
export default function PartyPlayers() {
  return (
    <>
      <div className={styles.partyPayers}>
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </div>
    </>
  )
}
