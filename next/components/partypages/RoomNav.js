import styles from "@/styles/gw/_roomNav.module.scss"
export default function RoomNav() {

  return (

      <nav className={styles.roomNav}>
        <ul className="nav nav-fill ">
          <li className="nav-item">
            <a aria-current="page" className="nav-active h6" href="#party">
              揪團
            </a>
          </li>
          <li className="nav-item">
            <a className="h6" href="#roomInfo">
              店家資訊{' '}
            </a>
          </li>
          <li className="nav-item">
            <a className="h6" href="#photo">
              相片
            </a>
          </li>
          <li className="nav-item">
            <a className="h6" href="#toKnow">
              注意事項
            </a>
          </li>
        </ul>
      </nav>
 
  )
}
