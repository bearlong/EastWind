import { RiExpandUpDownFill } from 'react-icons/ri'
import { IoMdFunnel } from 'react-icons/io'
import styles from '@/styles/gw/_BTNGroup.module.sass'
export default function BTNGroup() {
  return (
    <div className="d-flex gap-2">
      <div className="d-flex gap-3">
        <button className={styles.btn}>北區</button>
        <button className={styles.btn}>中區</button>
        <button className={styles.btn}>南區</button>
      </div>
      <div className="d-flex gap-2">
        <div>
          <RiExpandUpDownFill />
        </div>
        <div>
          <IoMdFunnel />
        </div>
      </div>
    </div>
  )
}
