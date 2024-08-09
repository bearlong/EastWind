import PartyNav from '@/components/partypages/PartyNav'
import PartyPlayers from '@/components/partypages/PartyPlayers'
import JoinPartyBTN from '@/components/partypages/JoinPartyBTN'
import styles from '@/styles/gw/_partyRight.module.scss'

export default function PartyRightArea() {
  return (
    <div className={styles.rightArea}>
      <PartyNav />
      <PartyPlayers />
      <JoinPartyBTN />
    </div>
  )
}
