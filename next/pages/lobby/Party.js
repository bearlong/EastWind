import BreadCrumb from '@/components/partypages/BreadCrumb'
import PartyLeftArea from '@/components/partypages/PartyLeftArea'
import PartyRightArea from '@/components/partypages/PartyRightArea'
import styles from '@/styles/gw/_partypage.module.scss'

function Party() {
  return (
    <>
      <div className="container">
        <BreadCrumb />
        <div className={styles.main}>
          <PartyLeftArea />
          <PartyRightArea />
        </div>
      </div>
    </>
  )
}

export default Party
