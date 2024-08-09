import styles from "@/styles/gw/_photo.module.sass"

export default function PhotoCard() {
  return (
<>

<div className={styles.imgArea}>
<div className={styles.bgImg}>
  <img 
  src="/images/gw/img/store_img-1.jpeg" 
  alt="11" />
</div>
<div className={styles.smArea}>
<div className={styles.smImg}>
<img 
src="/images/gw/img/store_img-1.jpeg" 
alt="11" />
</div>
<div className={styles.smImg}>
<img 
src="/images/gw/img/store_img-1.jpeg" 
alt="11" />
</div>
<div className={styles.smImg}>
<img 
src="/images/gw/img/store_img-1.jpeg" 
alt="11" />
</div>
{/* <div className={styles.smImg}>
<img 
src="/images/gw/img/store_img-1.jpeg" 
alt="11" />
</div> */}

</div>
</div>



    <div className="imgArea gw-infoCard mb-3" id="photo">
      <h5 className="gw-bb">相片</h5>
      <div className="d-flex justify-content-between">
        <div className="mainImg">
          <img alt="" src="/img/store_img-1.jpeg" />
        </div>
        <div className="sideImg">
          <div className="smallImg">
            <img alt="" src="/img/store_img-2.jpeg" srcSet="" width="80" />
          </div>
          <div className="smallImg">
            <img alt="" src="/img/store_img-3.jpeg" srcSet="" width="80" />
          </div>
          <div className="smallImg">
            <img alt="" src="/img/store_img-4.jpeg" srcSet="" width="80" />
          </div>
          <div className="smallImg">
            <img alt="" src="/img/store_img-1.jpeg" srcSet="" width="80" />
          </div>
        </div>
      </div>
    </div>
</>
  )
}
