import { FaSearch } from 'react-icons/fa'
import styles from '@/styles/gw/_Search.module.scss'

export default function RoomSearch() {
  return (
    <div className={styles.searchArea}>
      <div className={`${styles.searchBox} input-group`}>
        <input
          type="text"
          className="form-control"
          placeholder="請輸入店家"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button className="btn " type="button" id="button-addon2">
          <FaSearch />
        </button>
      </div>
    </div>
  )
}
