import styles from '@/styles/gw/_nextPage.module.scss'

export default function PageNext() {
  return (
    <div className={styles.pagesplit}>
      <div className={`${styles.progress} progress`}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: '25%' }}
          aria-valuenow={25}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className={styles.btnMore}>
        <p>查看更多</p>
        <i className={styles.editIcon}></i>
      </div>
    </div>
  )
}
