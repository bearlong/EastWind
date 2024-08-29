import React from 'react'
import Image from 'next/image' // 假設使用 Next.js 的 Image 元件
import styles from '@/styles/aa/classDetail.module.scss'

const Content = () => {
  return (
    <>
      <div className={styles['detailpic-aa']}>
        <div className={styles['detailpic1-aa']}>
          <div className={styles['depic1-aa']}>
            <Image
              src="https://hahow-production.imgix.net/5fb4fc22563bc0262f9fb105?w=1000&sat=0&auto=format&s=f7cb3bd23dc48b1089edb34423906993"
              alt="教學圖片"
              width={640}
              height={360}
            />
          </div>
        </div>
      </div>
      <div className={styles['detextgroup-aa']}>
        <div className={styles['texth2detail3-aa']}>
          <div className={styles['texth2detail31-aa']}>
            <h4>想學程式？推薦你從 麻將 開始！</h4>
          </div>
        </div>
        <div className={styles['texth2detail4-aa']}>
          <h6>
            程式語言的學習，首重邏輯思考能力，面對未來快速變化的社會，若能培養運算思維（Computational
            Thinking）結合工程的務實與效率、數理方面的抽象邏輯思考，將能更有效解決複雜的問題。
          </h6>
        </div>
        <div className={styles['texth2detail4-aa']}>
          <h6>
            版本管理是現今軟體開發大家都一定要會的技能，而 Git
            更是目前的版本管理主流。
            這門課會教你如何從最簡單的個人版本管理到多人版本管理，以及共同開發時如何有效率的管理程式碼。
          </h6>
        </div>
      </div>
    </>
  )
}

export default Content
