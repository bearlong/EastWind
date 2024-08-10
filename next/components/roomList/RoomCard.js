import styles from '@/styles/gw/_RoomListCard.module.sass'
export default function RoomCard() {
  return (
    <>
      <div className={styles.card}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h6 className="card-title">團號:BDEE93338G</h6>
            <p>台灣麻將</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="card-subtitle mb-2 text-muted">
              開團時間：24/07/11 21:30
            </p>
            <div className="p mb-2">2/4</div>
          </div>
          <div className="d-flex justify-content-between">
            <p className="card-text">還有 1:30:42 開打!</p>
            <div className={styles.btn}>馬上加入</div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <a
              href="#"
              className="card-link"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              LOOK MORE
            </a>
          </div>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">店家資料</div>
          </div>
        </div>
      </div>
    </>
  )
}
