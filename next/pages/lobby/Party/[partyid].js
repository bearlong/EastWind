import BreadCrumb from '@/components/partypages/BreadCrumb'
import PartyLeftArea from '@/components/partypages/PartyLeftArea'
import PartyRightArea from '@/components/partypages/PartyRightArea'
import styles from '@/styles/gw/_partypage.module.scss'

import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'

import { AuthContext } from '@/context/AuthContext'

export default function Party() {
  const router = useRouter()
  const [partyData, setPartyData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useContext(AuthContext)
  console.log(user)

  useEffect(() => {
    if (!router.isReady) return

    const { partyid } = router.query
    console.log(partyid)

    if (partyid) {
      fetch(`http://localhost:3005/api/parties/${partyid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          if (data) {
            setPartyData(data)
          } else {
            throw new Error('No data received')
          }
        })
        .catch((error) => {
          console.error('Error fetching company data:', error)
          setError(error.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [router.isReady])

  if (!router.isReady || loading) return <div>載入中...</div>
  if (error) return <div>錯誤：{error}</div>
  if (!partyData) return <div>找不到派對資料</div>

  return (
    
      <div className="container">
        {/* <BreadCrumb /> */}
        <div className={styles.main}>
          <PartyLeftArea partyData={partyData} />
          <PartyRightArea user={user} partyData={partyData} />
        </div>
      </div>
    
  )
}
