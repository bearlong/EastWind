import styles from '@/styles/gw/_RoomCard.module.scss'
import { TiStarFullOutline } from 'react-icons/ti'

import { FaAngleDown } from "react-icons/fa";

import Server from '../serverIcon/server';

export default function RoomCard() {
  return (
    <div className={styles.RoomCard} id="roomInfo">
      <div className={styles.roomTitle}>
        <div className={styles.logoArea}>
          <img
            alt="logo"
            src="/images/gw/img/Mahjong-masters-logo-transparent-horizontal-300x176.png"
          />
        </div>

        <div className={styles.nameArea}>
          <div className={styles.rate}>
            <div className="star">
              <TiStarFullOutline className={styles.starIcon} />
              <TiStarFullOutline className={styles.starIcon} />
              <TiStarFullOutline className={styles.starIcon} />
              <TiStarFullOutline className={styles.starIcon} />
              <TiStarFullOutline className={styles.starIcon} />
            </div>
            <div className="gap-5">
              <i className="fa-regular fa-heart faSz mx-2" />
              <i className="fa-solid fa-thumbs-up faSz" />
            </div>
          </div>
          <div className="title">
            <h3 className="title">麻將大師板橋一店</h3>
          </div>
        </div>
      </div>
      <div className={styles.roomAdBox}>
        <div className={styles.roomAdd}>
          <div className={styles.infotext}>
            <p>22047, 新北市板橋區松江街28號</p>
            <p>電話: 02-26885588</p>
          </div>
          <div className={styles.mapImg}>
            <img
              alt="mapimg"
              src="/images/gw/img/Google_Maps_icon_(2015-2020).svg.png"
            />
          </div>
        </div>
        <div>
          <div className="p">
            <a
              aria-controls="collapseExample"
              aria-expanded="false"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
            >
              週四: 8:00-22:00
              <FaAngleDown />
            </a>
            <div className="collapse" id="collapseExample">
              <div className="p">周一:8:00到22:00</div>
            </div>
          </div>
        </div>
      </div>
      
<div className={styles.serverBox}>
<Server/>

</div>

      <div className={styles.roomIntroduction}>
        <div className={styles.title}>
          <h6>店家簡介</h6>
        </div>
        <div className={styles.content}>

          <p>
            麻將大師是只欠東風精選店家，場地均提供免費飲料與無限網路，同時提供熟食簡餐多樣選擇。
          </p>
          <p>
            麻將大師所有場館均使用東方不敗過山車電動麻將桌，給您最好的硬體享受，另有麻將包廂，給您安靜隱私的遊玩環境，數量有限，儘速預定。
          </p>
          <p>全館嚴格禁菸，定時清潔。</p>
        </div>


      </div>



      <div className={styles.roomPrice}>
      <div className={styles.title}>
          <h6>費用</h6>
        </div>
        <div className={styles.content}>

        <p>大廳:100/hr</p>
        <p>包廂:200/hr</p>
        </div>
      </div>
    </div>
  )
}
