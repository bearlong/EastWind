import React from 'react'
import Carousel from '@/components/product/carousel'
import ProductNav from '@/components/product/product-nav'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaStar, FaPlus, FaMinus } from 'react-icons/fa6'
import styles from '@/styles/bearlong/productDetail.module.scss'

export default function Detail() {
  return (
    <>
      <ProductNav />
      <main className={styles['main']}>
        <div className={styles['productDetailSection1-bl']}>
          <p className="my-lg-5 my-3">
            首頁/麻將牌/馬丘麻將精裝組-金馬59聯名款
          </p>
          <div className="d-flex flex-md-row flex-column justify-content-between">
            <div
              className={`${styles['imgGroup-bl']} d-flex flex-column-reverse flex-lg-row me-0 me-lg-3`}
            >
              <div
                className={`${styles['imgSmall-bl']}  mx-lg-5 d-flex flex-lg-column mt-3 mt-lg-0 justify-content-between justify-content-lg-start`}
              >
                <div
                  className={`${styles['imgSmallBox-bl']} ${styles['active']}  mb-3`}
                >
                  <img
                    src="./images/product/970_65fbaa6c41532.jpg.webp"
                    alt=""
                  />
                </div>
                <div className={`${styles['imgSmallBox-bl']} mb-3`}>
                  <img src="./images/product/H900-1-1.png" alt="" />
                </div>
                <div className={`${styles['imgSmallBox-bl']} mb-3`}>
                  <img
                    src="./images/product/sg-11134201-22110-1tms94aehojv91.jpg"
                    alt=""
                  />
                </div>
                <div className={`${styles['imgSmallBox-bl']} mb-3`}>
                  <img src="./images/product/E1165097506068 (1).jpg" alt="" />
                </div>
              </div>
              <div
                className={`${styles['imgMain-bl']} align-self-center align-self-md-stretch`}
              >
                <img src="./images/product/970_65fbaa6c41532.jpg.webp" alt="" />
              </div>
            </div>
            <div
              className={`${styles['productDetailContent-bl']} d-flex justify-content-between flex-column`}
            >
              <div className={styles['titleGroup-bl']}>
                <p>馬丘machill</p>
                <div className={`${styles['productName-bl']} m-0`}>
                  <h5>馬丘麻將精裝組-金馬59聯名款</h5>
                </div>
                <div
                  className={`${styles['score-bl']} d-flex justify-content-between mb-2`}
                >
                  <div
                    className={`${styles['productStar']} d-flex align-items-center`}
                  >
                    <p className="me-2">4.7</p>
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <p className="ms-2">(48)</p>
                  </div>
                  <div
                    className={`${styles['like']} d-flex align-items-center`}
                  >
                    <i className="fa-solid fa-heart" />
                    <p className="ms-2">已收藏</p>
                  </div>
                </div>
                <h5>
                  NT$ <span>5,180</span>
                </h5>
              </div>
              <div className={styles['category']}>
                <p className="mb-2">
                  類別: <span>麻將牌</span>
                </p>
                <p className="mb-2">
                  顏色: <span>白</span>
                </p>
                <p className="mb-2">
                  尺寸: <span>3.3mm</span>
                </p>
              </div>
              <div className="my-3 my-md-0">
                <p className="mb-2">
                  庫存數量: <span>30</span>
                </p>
                <div
                  className={`${styles['amount-bl']} d-flex justify-content-between`}
                >
                  <h5>數量</h5>
                  <div
                    className={`${styles['plusMinus']} d-flex align-items-center`}
                  >
                    <i className="fa-solid fa-minus me-5" />
                    <h5 className={styles['amount']}>1</h5>
                    <i className="fa-solid fa-plus ms-5" />
                  </div>
                </div>
              </div>
              <div
                className={`${styles['buttonGroup-bl']} d-flex justify-content-between flex-column`}
              >
                <div
                  type="button"
                  className={`${styles['btnRectangle']} ${styles['buy']}  mb-3`}
                >
                  立即購買
                </div>
                <div
                  type="button"
                  className={`${styles['btnRectangle']} ${styles['cartPlus']}`}
                >
                  加入購物車
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles['productDetailSection2-bl']}  row`}>
          <div className={`${styles['section2Left-bl']}  col-12 col-md-8`}>
            <div className={`${styles['detailContent-bl']}   mb-5`}>
              <div className={styles['underLine-bl']}>
                <h6>產品敘述:</h6>
              </div>
              <p>
                ・金馬馬丘麻將 1 副(144張)
                <br />
                ・金馬 59 紀念麻將 1 張<br />
                ・空白麻將 1 張<br />
                ・玫瑰金方向環 1 個<br />
                ・骰子 6 顆<br />
                ・牌尺 4 支(白色x3、透明x1)
              </p>
            </div>
            <div className={`${styles['comment-bl']}   mb-5`}>
              <div className={styles['underLine-bl']}>
                <h6>商品評論:</h6>
              </div>
              <div
                className={`${styles['star-bl']}   d-flex justify-content-between flex-column flex-md-row`}
              >
                <div className={`${styles['starBox-bl']}   mb-3 mb-md-0`}>
                  <h5>4.7 / 5</h5>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <div className={styles['btnBox-bl']}>
                  <div
                    className={`${styles['btnComment']}  ${styles['active']} `}
                  >
                    全部
                  </div>
                  <div className={styles['btnComment']}>5星(40)</div>
                  <div className={styles['btnComment']}>4星(3)</div>
                  <div className={styles['btnComment']}>3星(5)</div>
                  <div className={styles['btnComment']}>2星</div>
                  <div className={styles['btnComment']}>1星</div>
                </div>
              </div>
              <label htmlFor="collapse" className={styles['collapseButton']}>
                <i className="fa-solid fa-chevron-down h5 my-3" />
                <i className="fa-solid fa-chevron-up d-none h5 my-3" />
              </label>
              <input
                id="collapse"
                className={styles['collapse']}
                type="checkbox"
                hidden=""
                defaultChecked=""
              />
              <div className={styles['fold']}>
                <div className={styles['commentBox-bl']}>
                  <div
                    className={`${styles['commentCard-bl']} ${styles['underLine-bl']} d-flex`}
                  >
                    <div className={`${styles['pic-bl']} me-3`}>
                      <img src="./images/web/pic/18.jpg" alt="" />
                    </div>
                    <div className={styles['cardBody-bl']}>
                      <div className={`${styles['userInfo-bl']} mb-4`}>
                        <p>poxxxxin</p>
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <p>2024-07-11</p>
                      </div>
                      <div className={styles['commentContent-bl']}>
                        <p>讚讚攢五星好評，老鐵六六六</p>
                      </div>
                    </div>
                  </div>
                  <div className="commentCard-bl underLine-bl d-flex">
                    <div className="pic-bl me-3">
                      <img src="./images/web/pic/18.jpg" alt="" />
                    </div>
                    <div className="cardBody-bl">
                      <div className="userInfo-bl mb-4">
                        <p>poxxxxin</p>
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <p>2024-07-11</p>
                      </div>
                      <div className="commentContent-bl">
                        <p>讚讚攢五星好評，老鐵六六六</p>
                      </div>
                    </div>
                  </div>
                  <div className="commentCard-bl underLine-bl d-flex">
                    <div className="pic-bl me-3">
                      <img src="./images/web/pic/18.jpg" alt="" />
                    </div>
                    <div className="cardBody-bl">
                      <div className="userInfo-bl mb-4">
                        <p>poxxxxin</p>
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <p>2024-07-11</p>
                      </div>
                      <div className="commentContent-bl">
                        <p>
                          這款麻將牌具備高品質的材質，手感極佳，每次摸牌都能感受到流暢的質感。細緻的雕刻和清晰的字樣，不僅提升了遊戲的體驗，也讓每一局麻將都變得更加精彩。無論是家庭聚會還是朋友相聚，這款麻將都是您最佳的選擇。帶上它，讓您的麻將之夜更加難忘。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 section2Right-bl">
            <div className="underLine-bl">
              <h6>你可能也會喜歡:</h6>
            </div>
            <div className="products-bl swiper">
              <div className="swiper-wrapper column1">
                <div className="productCard swiper-slide">
                  <div className="swiperImg">
                    <div className="imgBox">
                      <img src="./images/product/015.jpg" alt="" />
                    </div>
                    <div className="imgBox secondImg">
                      <img src="./images/product/019.jpg" alt="" />
                    </div>
                  </div>
                  <div className="cardBody">
                    <div className="productName-bl">
                      <p>馬丘machill</p>
                      <p className="productDescription">
                        馬丘麻將【電動麻將桌用版】
                      </p>
                    </div>
                    <div className="star d-flex justify-content-center gap-1">
                      <p>
                        4.7 <i className="fa-solid fa-star" />
                      </p>
                    </div>
                    <p>NT. 2,500</p>
                  </div>
                </div>
                <div className="productCard swiper-slide">
                  <div className="swiperImg">
                    <div className="imgBox">
                      <img src="./images/product/015.jpg" alt="" />
                    </div>
                    <div className="imgBox secondImg">
                      <img src="./images/product/019.jpg" alt="" />
                    </div>
                  </div>
                  <div className="cardBody">
                    <div className="productName-bl">
                      <p>馬丘machill</p>
                      <p className="productDescription">
                        馬丘麻將【電動麻將桌用版】
                      </p>
                    </div>
                    <div className="star d-flex justify-content-center gap-1">
                      <p>
                        4.7 <i className="fa-solid fa-star" />
                      </p>
                    </div>
                    <p>NT. 2,500</p>
                  </div>
                </div>
                <div className="productCard swiper-slide">
                  <div className="swiperImg">
                    <div className="imgBox">
                      <img src="./images/product/015.jpg" alt="" />
                    </div>
                    <div className="imgBox secondImg">
                      <img src="./images/product/019.jpg" alt="" />
                    </div>
                  </div>
                  <div className="cardBody">
                    <div className="productName-bl">
                      <p>馬丘machill</p>
                      <p className="productDescription">
                        馬丘麻將【電動麻將桌用版】
                      </p>
                    </div>
                    <div className="star d-flex justify-content-center gap-1">
                      <p>
                        4.7 <i className="fa-solid fa-star" />
                      </p>
                    </div>
                    <p>NT. 2,500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
