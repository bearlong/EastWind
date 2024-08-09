import styles from "@/styles/gw/_server.module.sass"
import { MdSmokeFree } from "react-icons/md";


export default function Server(){
  return(
    <div className={styles.server}>
<div className={styles.serverIcon}><MdSmokeFree/></div>
<div className={styles.serverText}><p>禁菸環境</p></div>
</div>
  )
}