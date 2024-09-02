import React, { useEffect, useState, useRef } from 'react'
import styles from '@/styles/boyu/home.module.scss'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function ProductSection({ mahjongProducts }) {
  const mahjongSectionRef = useRef(null) // 用於觀察麻將區域
  const [mahjongVisible, setMahjongVisible] = useState(false) // Mahjong Icons 的可見狀態
  const [swiperReady, setSwiperReady] = useState(false) // Swiper 初始化狀態

  // 設置 Swiper 準備狀態
  useEffect(() => {
    setSwiperReady(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMahjongVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (mahjongSectionRef.current) {
      observer.observe(mahjongSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`${styles['product-section-bo']} ${styles['bg-front-photo-bo']} d-flex flex-column justify-content-center align-items-center`}
    >
      <div
        ref={productSectionRef} // 設置引用
        className={`${styles['product-text-title-bo']} gap-5 d-flex justify-content-center align-items-center`}
      >
        <div className="d-flex gap-2">
          {mahjongIconsProduct.map((icon, index) => (
            <img
              key={index}
              className={`${styles['icon-mahjong-bo-product']} ${icon.hidden}`}
              src={icon.src}
              alt={`Mahjong Icon ${index + 1}`}
            />
          ))}
        </div>
        <h2>商品</h2>
        <div className="d-flex gap-2">
          {mahjongIconsProduct.map((icon, index) => (
            <img
              key={index}
              className={`${styles['icon-mahjong-bo-product']} ${icon.hidden}`}
              src={icon.src}
              alt={`Mahjong Icon ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div
        className={`${styles['guide-box-bo']} container-fluid d-flex flex-column justify-content-center`}
        ref={mahjongSectionRef} // 設置引用
      >
        <div
          className={`${styles['product-text-box-bo']}   d-flex gap-5 flex-column`}
        >
          <div
            className={`${styles['product-text-body-bo']} gap-2 d-flex justify-content-between`}
          >
            <div
              className={`${styles['product-title-box-bo']} gap-3 d-flex flex-column justify-content-center align-items-start`}
            >
              <div className={`${styles['product-text-type-bo']} h3`}>
                麻將類
              </div>
              <div
                className={`${styles['product-text-guide-bo']} d-flex flex-column gap-1`}
              >
                <p className="h6">精美麻將套組，質感上乘。</p>
                <p className="h6">讓你每一局都充滿樂趣。</p>
              </div>
            </div>

            <Link
              href="/product/productList?category_id=1"
              className={`${styles['text-more-bo']} d-flex justify-content-center align-items-center`}
            >
              <p className="h6 d-none d-sm-block">查看更多麻將商品</p>
              <p className="h6 d-block d-sm-none  text-nowrap">查看更多</p>
              <div
                className={`${styles['btn-more-mini']} d-flex justify-content-center align-items-center`}
              >
                <FaArrowRight className={styles['more-mini-icon']} />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`${
            styles['mahjong-card-box-bo']
          } d-flex gap-5 justify-content-center align-items-center  ${
            mahjongVisible ? styles['mahjong-visible'] : ''
          }`}
        >
          {swiperReady && (
            <Swiper
              slidesPerView={'auto'} /* 根據內容自動調整寬度 */
              autoHeight={true}
              modules={[Autoplay]} // 添加 Autoplay 模塊
              loop={false} // 開啟無限循環
              freeMode={true} // 允許自由滑動，不固定到某個點
              autoplay={{
                delay: 1500, // 設置自動播放的  時間間隔（毫秒）
                disableOnInteraction: false, // 用戶操作後停止自動播放
                stopOnLastSlide: false, // 到達最後一張後停止自動播放
              }}
              breakpoints={{
                768: {
                  spaceBetween: 28,
                },

                0: {
                  spaceBetween: 20, // 針對 0px 到 576px 的斷點
                },
              }}
              className={`${styles['swiper-container']}`} // 新增這一行
              onSlideChange={(swiper) => {
                setMahjongSwiperState({
                  isLastSlide: swiper.isEnd,
                  isFirstSlide: swiper.isBeginning,
                })

                if (swiper.isEnd && !swiper.params.autoplay.reverseDirection) {
                  swiper.autoplay.stop()
                  swiper.params.autoplay.reverseDirection = true
                  swiper.autoplay.start()
                }

                if (
                  swiper.isBeginning &&
                  swiper.params.autoplay.reverseDirection
                ) {
                  swiper.autoplay.stop()
                  swiper.params.autoplay.reverseDirection = false
                  swiper.autoplay.start()
                }
              }}
            >
              {mahjongProducts.map((product) => (
                <SwiperSlide
                  key={product.id}
                  className={`${styles['swiper-slide']}
                ${mahjongVisible ? styles['slide-in-right'] : ''}`}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className={`${styles['productCard']}  d-flex flex-column justify-content-center align-items-center`}
                  >
                    <div className={styles['imgBox']}>
                      <img
                        src={`/images/product/${product.img}`}
                        alt={product.name}
                      />
                    </div>
                    <div className={`${styles['cardBody']} text-center`}>
                      <div
                        className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                      >
                        <p className="h6"> {product.brand_name}</p>
                        <p
                          className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                        >
                          {product.product_name}
                        </p>
                        <p className="h6">NT$ {product.price}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
              {/* 加入空白卡片 */}
              <SwiperSlide className={`${styles['swiper-slide']} `}>
                <div className={` ${styles['empty-slide']}`}></div>
              </SwiperSlide>
            </Swiper>
          )}
        </div>
      </div>
      <div
        ref={boardGameSectionRef} // 設置引用
        className={`${styles['guide-box-bo']} container-fluid d-flex flex-column justify-content-center`}
      >
        <div
          className={`${styles['product-text-box-bo']} d-flex gap-5 flex-column`}
        >
          <div
            className={`${styles['product-text-body-bo']}  gap-1 d-flex justify-content-between`}
          >
            <div
              className={`${styles['product-title-box-bo']} gap-3 d-flex flex-column justify-content-center align-items-start`}
            >
              <div className={`${styles['product-text-type-bo']} h3`}>
                桌遊類
              </div>
              <div
                className={`${styles['product-text-guide-bo']} d-flex flex-column gap-1`}
              >
                <p className="h6">多樣桌遊選擇，帶來無窮樂趣。</p>
                <p className="h6">享受智慧與樂趣的完美結合。</p>
              </div>
            </div>

            <Link
              href="/product/productList?category_id=5"
              className={`${styles['text-more-bo']} d-flex justify-content-center align-items-center`}
            >
              <p className="h6 d-none d-sm-block">查看更多桌遊商品</p>
              <p className="h6 d-block d-sm-none text-nowrap">查看更多</p>
              <div
                className={`${styles['btn-more-mini']} d-flex justify-content-center align-items-center`}
              >
                <FaArrowRight className={styles['more-mini-icon']} />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`${
            styles['boardGame-card-box-bo']
          } d-flex gap-5 justify-content-center align-items-center ${
            boardGameVisible ? styles['boardGame-visible'] : ''
          }`}
        >
          {swiperReady && (
            <Swiper
              style={{ transform: 'scaleX(-1)' }} // 反轉滑動容器
              slidesPerView={'auto'} /* 根據內容自動調整寬度 */
              autoHeight={true}
              modules={[Autoplay]} // 添加 Autoplay 模塊
              loop={false}
              freeMode={true} // 允許自由滑動，不固定到某個點
              autoplay={{
                delay: 1500, // 設置自動播放的時間間隔（毫秒）
                disableOnInteraction: false, // 用戶操作後不停止自動播放
                // stopOnLastSlide: false, // 到達最後一張後停止自動播放
              }}
              breakpoints={{
                768: {
                  spaceBetween: 28,
                },
                0: {
                  spaceBetween: 20, // 針對 0px 到 576px 的斷點
                },
              }}
              className={`${styles['swiper-container']}`} // 新增這一行
              onSlideChange={(swiper) => {
                setBoardGameSwiperState({
                  isLastSlide: swiper.isEnd,
                  isFirstSlide: swiper.isBeginning,
                })

                if (swiper.isEnd && !swiper.params.autoplay.reverseDirection) {
                  swiper.autoplay.stop()
                  swiper.params.autoplay.reverseDirection = true
                  swiper.autoplay.start()
                }

                if (
                  swiper.isBeginning &&
                  swiper.params.autoplay.reverseDirection
                ) {
                  swiper.autoplay.stop()
                  swiper.params.autoplay.reverseDirection = false
                  swiper.autoplay.start()
                }
              }}
            >
              {boardGameProducts.map((product) => (
                <SwiperSlide
                  style={{ transform: 'scaleX(-1)' }} // 反轉滑動容器
                  key={product.id}
                  className={`${styles['swiper-slide']} ${
                    boardGameVisible ? styles['slide-in-left'] : ''
                  }`}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
                  >
                    <div className={styles['imgBox']}>
                      <img
                        src={`/images/product/${product.img}`}
                        alt={product.name}
                      />
                    </div>
                    <div className={`${styles['cardBody']} text-center`}>
                      <div
                        className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                      >
                        <p className="h6"> {product.brand_name}</p>
                        <p
                          className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                        >
                          {product.product_name}
                        </p>
                        <p className="h6">NT$ {product.price}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
              {/* 加入空白卡片 */}
              <SwiperSlide className={`${styles['swiper-slide']} `}>
                <div className={` ${styles['empty-slide']}`}></div>
              </SwiperSlide>
            </Swiper>
          )}
        </div>
      </div>
    </section>
  )
}
