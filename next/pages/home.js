import { useState, useEffect, useRef } from 'react'
import styles from '@/styles/boyu/home.module.scss'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Autoplay } from 'swiper/modules' // 引入 Autoplay 模塊

export default function Home() {
  const [swiperInstance, setSwiperInstance] = useState(false)
  const [mahjongProducts, setMahjongProducts] = useState([])
  const [boardGameProducts, setBoardGameProducts] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [swiperReady, setSwiperReady] = useState(false) // 控制 Swiper 是否已經就緒
  const [mahjongSwiperState, setMahjongSwiperState] = useState({
    isLastSlide: false,
    isFirstSlide: true,
  })
  const [boardGameSwiperState, setBoardGameSwiperState] = useState({
    isLastSlide: false,
    isFirstSlide: true,
  })

  const [courseSwiperState, setCourseSwiperState] = useState({
    isLastSlide: false,
    isFirstSlide: true,
  }) // 用來監控 course Swiper 狀態

  const [mahjongVisible, setMahjongVisible] = useState(false)
  const [boardGameVisible, setBoardGameVisible] = useState(false)
  const [courseVisible, setCourseVisible] = useState(false)

  const mahjongSectionRef = useRef(null) // 用於觀察麻將區域
  const boardGameSectionRef = useRef(null) // 用於觀察桌遊區域

  const courseRefs = useRef([]) // 儲存每個課程卡片的引用
  const courseSectionRef = useRef(null) // 儲存線上課程區域的引用

  const [backgroundVideo, setBackgroundVideo] = useState('') // 初始背景影片

  useEffect(() => {
    setIsClient(true) // 在客戶端渲染時設置為 true
  }, [])

  // 定義所有的Mahjong icon圖片
  const mahjongIconsIntro = [
    { src: '/images/boyu/mahjong/Man1.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Man2.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Man3.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Pin1.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Pin2.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Pin3.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Sou1.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Sou2.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Sou3.svg', hidden: 'd-none d-md-block' },
    { src: '/images/boyu/mahjong/Ton.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Nan.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Shaa.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Pei.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Chun.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Hatsu.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Haku.svg', hidden: '' },
  ]

  const mahjongIconsRoom = [
    { src: '/images/boyu/mahjong/Man1.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Man2.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Man3.svg', hidden: 'd-none d-sm-block' },
  ]

  const mahjongIconsProduct = [
    { src: '/images/boyu/mahjong/Pin1.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Pin2.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Pin3.svg', hidden: 'd-none d-sm-block' },
  ]

  const mahjongIconsCourse = [
    { src: '/images/boyu/mahjong/Sou1.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Sou2.svg', hidden: '' },
    { src: '/images/boyu/mahjong/Sou3.svg', hidden: 'd-none d-sm-block' },
  ]

  // 定義所有的棋牌室圖片
  const roomImages = Array.from(
    { length: 24 },
    (_, index) => `/images/boyu/rooms/room${index + 1}.jpg`
  )

  // 課程資料數組
  const courses = [
    { title: '麻將', description: '智慧與運氣的完美結合。' },
    { title: '西洋棋', description: '策略與智力的精彩對決。' },
    { title: '撲克牌', description: '簡單易學，挑戰無限。' },
    { title: '圍棋', description: '黑白交錯，古老智慧。' },
    { title: '象棋', description: '車馬交鋒，運籌帷幄。' },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/home/products')
        const data = await response.json()
        if (response.ok) {
          setMahjongProducts(data.mahjongProducts)
          setBoardGameProducts(data.boardGameProducts)
        } else {
          console.error('Failed to fetch products:', data.message)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    setSwiperReady(true) // Swiper 就緒後設置為 true
  }, [])

  // 添加一個課程卡片到引用列表
  const addToRefs = (el) => {
    if (el && !courseRefs.current.includes(el)) {
      courseRefs.current.push(el)
    }
  }

  // 設置 IntersectionObserver 觀察麻將和桌遊區域
  useEffect(() => {
    if (mahjongSectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setMahjongVisible(true)
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.5,
        }
      )

      observer.observe(mahjongSectionRef.current)

      return () => {
        if (mahjongSectionRef.current) {
          observer.unobserve(mahjongSectionRef.current)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (boardGameSectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setBoardGameVisible(true)
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.5,
        }
      )

      observer.observe(boardGameSectionRef.current)

      return () => {
        if (boardGameSectionRef.current) {
          observer.unobserve(boardGameSectionRef.current)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (courseSectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log('Setting courseVisible to true')
              setCourseVisible(true)
              // 確保每個卡片的動畫 class 正確應用
              courseRefs.current.forEach((ref, index) => {
                setTimeout(() => {
                  if (ref) {
                    ref.classList.add(styles.visible)
                    console.log(`Course card ${index + 1} is visible`)
                  }
                }, index * 500)
              })
              observer.unobserve(entry.target) // 停止觀察，避免重複觸發
            }
          })
        },
        { threshold: 0.5 }
      )

      observer.observe(courseSectionRef.current)

      return () => {
        if (courseSectionRef.current) {
          observer.unobserve(courseSectionRef.current)
        }
      }
    }
  }, [])

  return (
    <>
      {isClient && (
        <div className={styles['bg-video-box']}>
          <video
            src="/video/bg-video.mp4"
            autoPlay
            muted
            loop
            className={styles['bg-video-bo']}
          ></video>
          <div className={styles['video-overlay-bo']}></div>
        </div>
      )}
      <main>
        {/* 主視覺 */}
        <section
          className={`${styles['hero-section-bo']} text-center d-flex justify-content-center align-items-center`}
        >
          <div className="d-flex flex-column flex-sm-row">
            <h2>萬事俱備，</h2>
            <h2>只欠東風。</h2>
          </div>
        </section>

        {/* intro */}
        <section
          className={`${styles['intro-section-bo']} text-center d-flex flex-column justify-content-center align-items-center`}
        >
          <div
            className={`${styles['intro-mahjong-box-bo']} container d-flex justify-content-center gap-2`}
          >
            {mahjongIconsIntro.map((icon, index) => (
              <img
                key={index}
                className={`${styles['icon-mahjong-bo']} ${icon.hidden}`}
                src={icon.src}
                alt={`Mahjong Icon ${index + 1}`}
              />
            ))}
          </div>
          <div
            className={`${styles['intro-text-box-bo']} d-flex gap-5 flex-column justify-content-center align-items-center`}
          >
            <h2 className={styles['intro-title-bo']}>麻將</h2>
            <div
              className={`${styles['intro-text-body-bo']} d-flex flex-column`}
            >
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <div className="d-flex flex-column flex-sm-row">
                  <h6>不僅是一種遊戲，更是一種生活的藝術，</h6>
                </div>
                <h6>每一張牌都蘊含著智慧與運氣的微妙平衡。</h6>
                <div className="d-flex flex-column flex-sm-row">
                  <h6>當你坐在牌桌旁，握著一手好牌，</h6>
                  <h6>分享歡笑與策略，</h6>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <h6>那份默契與競技的快感讓人陶醉。</h6>
                <h6>不論你是初學者還是經驗豐富的老手，</h6>
                <h6>麻將都能帶給你無限的樂趣與挑戰。</h6>
              </div>
            </div>
          </div>
          <div
            className={`${styles['intro-mahjong-box-bo']} container d-flex justify-content-center gap-2`}
          >
            {mahjongIconsIntro.map((icon, index) => (
              <img
                key={index}
                className={`${styles['icon-mahjong-bo']} ${icon.hidden}`}
                src={icon.src}
                alt={`Mahjong Icon ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 棋牌室 */}
        <section
          className={`${styles['room-section-bo']} gap-3 ${styles['bg-front-photo-bo']} d-flex flex-column flex-md-row justify-content-between align-items-center`}
        >
          <div
            className={`${styles['room-image-box-bo']} ${styles['room-image-box-down-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            {' '}
            {roomImages.slice(0, 12).map((image, index) => (
              <img
                key={index}
                className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
                src={image}
                alt={`Room Image ${index + 1}`}
              />
            ))}
          </div>
          <div
            className={`${styles['room-text-box-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div
              className={`${styles['room-text-title-bo']} container d-flex justify-content-center align-items-center`}
            >
              <div className="d-flex gap-2">
                {mahjongIconsRoom.map((icon, index) => (
                  <img
                    key={index}
                    className={`${styles['icon-mahjong-bo']} ${icon.hidden}`}
                    src={icon.src}
                    alt={`Mahjong Icon ${index + 1}`}
                  />
                ))}
              </div>
              <h2 className={styles['room-title-bo']}>棋牌室</h2>
              <div className="d-flex gap-2">
                {mahjongIconsRoom.map((icon, index) => (
                  <img
                    key={index}
                    className={`${styles['icon-mahjong-bo']} ${icon.hidden}`}
                    src={icon.src}
                    alt={`Mahjong Icon ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div
              className={`${styles['room-text-body-bo']} d-flex flex-column justify-content-center align-items-center gap-5 text-center`}
            >
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <h6>加入麻將揪團，享受每場精彩對局。</h6>
                <h6>每次對局都是全新的挑戰，盡情享受麻將的樂趣。</h6>
                <h6>立即糾團，尋找不同風格的對手！</h6>
              </div>
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <h6>輕鬆找到各地優質麻將棋牌室，隨時預訂。</h6>
                <h6>提供舒適環境與專業設備，提升對局體驗。</h6>
                <h6>方便快捷的預訂流程，讓您無憂享受麻將樂趣。</h6>
              </div>
            </div>
            <Link
              href="/lobby/Entrance"
              className={`${styles['btn-more']} d-flex align-items-center`}
            >
              <p>立即查看</p>
              <i className={`${styles['edit-icon']}`}></i>
            </Link>
          </div>
          <div
            className={`${styles['room-image-box-bo']} ${styles['room-image-box-up-bo']} d-flex flex-row flex-md-column justify-content-center align-items-center`}
          >
            {roomImages.slice(12).map((image, index) => (
              <img
                key={index}
                className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
                src={image}
                alt={`Room Image ${index + 13}`}
              />
            ))}
          </div>
        </section>

        {/* 商品 */}
        <section
          className={`${styles['product-section-bo']} ${styles['bg-front-photo-bo']} d-flex flex-column justify-content-center align-items-center`}
        >
          <div
            className={`${styles['product-text-title-bo']} gap-5 d-flex justify-content-center align-items-center`}
          >
            <div className="d-flex gap-2">
              {mahjongIconsProduct.map((icon, index) => (
                <img
                  key={index}
                  className={`${styles['icon-mahjong-bo']} ${icon.hidden}`}
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
                  className={`${styles['icon-mahjong-bo']} ${icon.hidden}`}
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
              {/* <div
                className={`${styles['mahjong-card-btn-bo']} d-flex flex-row flex-sm-column gap-5 align-items-center`}
              >
                <div
                  id="swiper-next-mahjong"
                  className={`${styles['move-card-btn-left-box']}  
                  ${
                    mahjongSwiperState.isLastSlide
                      ? styles['disabled-button']
                      : ''
                  } d-flex justify-content-center align-items-center`}
                >
                  <FaArrowLeft className={styles['btn-move-card-left-bo']} />
                </div>
                <div
                  id="swiper-prev-mahjong"
                  className={`${styles['move-card-btn-right-box']}
                   ${
                     mahjongSwiperState.isFirstSlide
                       ? styles['disabled-button']
                       : ''
                   } d-flex justify-content-center align-items-center`}
                >
                  <FaArrowRight className={styles['btn-move-card-right-bo']} />
                </div>
              </div> */}

              {swiperReady && (
                <Swiper
                  slidesPerView={'auto'} /* 根據內容自動調整寬度 */
                  navigation={{
                    prevEl: '#swiper-prev-mahjong',
                    nextEl: '#swiper-next-mahjong',
                  }}
                  autoHeight={true}
                  modules={[Navigation, Autoplay]} // 添加 Autoplay 模塊
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

                    if (
                      swiper.isEnd &&
                      !swiper.params.autoplay.reverseDirection
                    ) {
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
                  // onSwiper={(swiper) => {
                  //   setSwiperInstance(swiper)

                  //   const prevButton = document.querySelector(
                  //     '#swiper-prev-mahjong'
                  //   )
                  //   const nextButton = document.querySelector(
                  //     '#swiper-next-mahjong'
                  //   )

                  //   const handlePrevClick = () => {
                  //     if (swiper) {
                  //       swiper.autoplay.stop()
                  //       swiper.params.autoplay.reverseDirection = false

                  //       swiper.autoplay.start()
                  //     }
                  //   }

                  //   const handleNextClick = () => {
                  //     if (swiper) {
                  //       swiper.autoplay.stop()
                  //       swiper.params.autoplay.reverseDirection = true
                  //       swiper.autoplay.start()
                  //     }
                  //   }

                  //   prevButton.addEventListener('click', handlePrevClick)
                  //   nextButton.addEventListener('click', handleNextClick)

                  //   return () => {
                  //     prevButton.removeEventListener('click', handlePrevClick)
                  //     nextButton.removeEventListener('click', handleNextClick)
                  //   }
                  // }}
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
              {/* <div
                className={`${styles['boardGame-card-btn-bo']} d-flex flex-row-reverse flex-sm-column align-items-center gap-5`}
              >
                <div
                  id="swiper-prev-boardGame"
                  className={`${styles['move-card-btn-left-box']} ${
                    styles['move-boardGame-btn-left-box']
                  } ${
                    boardGameSwiperState.isFirstSlide
                      ? styles['disabled-button']
                      : ''
                  }  d-flex justify-content-center align-items-center`}
                >
                  <FaArrowLeft className={styles['btn-move-card-left-bo']} />
                </div>
                <div
                  id="swiper-next-boardGame"
                  className={`${styles['move-card-btn-right-box']}  ${
                    styles['move-boardGame-btn-right-box']
                  } ${
                    boardGameSwiperState.isLastSlide
                      ? styles['disabled-button']
                      : ''
                  } d-flex justify-content-center align-items-center`}
                >
                  <FaArrowRight className={styles['btn-move-card-right-bo']} />
                </div>
              </div> */}
              {swiperReady && (
                <Swiper
                  style={{ transform: 'scaleX(-1)' }} // 反轉滑動容器
                  slidesPerView={'auto'} /* 根據內容自動調整寬度 */
                  navigation={{
                    prevEl: '#swiper-prev-boardGame',
                    nextEl: '#swiper-next-boardGame',
                  }}
                  autoHeight={true}
                  modules={[Navigation, Autoplay]} // 添加 Autoplay 模塊
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

                    if (
                      swiper.isEnd &&
                      !swiper.params.autoplay.reverseDirection
                    ) {
                      swiper.autoplay.stop()
                      swiper.params.autoplay.reverseDirection = false
                      swiper.autoplay.start()
                    }

                    if (
                      swiper.isBeginning &&
                      swiper.params.autoplay.reverseDirection
                    ) {
                      swiper.autoplay.stop()
                      swiper.params.autoplay.reverseDirection = true
                      swiper.autoplay.start()
                    }
                  }}
                  onSwiper={(swiper) => {
                    setSwiperInstance(swiper)

                    const prevButton = document.querySelector(
                      '#swiper-prev-boardGame'
                    )
                    const nextButton = document.querySelector(
                      '#swiper-next-boardGame'
                    )

                    const handlePrevClick = () => {
                      if (swiper) {
                        swiper.autoplay.stop()
                        swiper.params.autoplay.reverseDirection = false

                        swiper.autoplay.start()
                      }
                    }

                    const handleNextClick = () => {
                      if (swiper) {
                        swiper.autoplay.stop()
                        swiper.params.autoplay.reverseDirection = true
                        swiper.autoplay.start()
                      }
                    }

                    // prevButton.addEventListener('click', handlePrevClick)
                    // nextButton.addEventListener('click', handleNextClick)

                    return () => {
                      prevButton.removeEventListener('click', handlePrevClick)
                      nextButton.removeEventListener('click', handleNextClick)
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

        {/* 線上課程 */}
        <section
          ref={courseSectionRef} // 設置引用
          className={`${styles['course-section-bo']} ${styles['bg-front-photo-bo']} d-flex flex-column justify-content-center align-items-center`}
        >
          {isClient && backgroundVideo && (
            <>
              <video
                src={backgroundVideo}
                autoPlay
                muted
                loop
                className={styles['course-bg-video-bo']}
              ></video>
              <div className={styles['course-video-overlay-bo']}></div>
            </>
          )}
          <div
            className={`${styles['course-title-box-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <div className="d-flex gap-2">
              {mahjongIconsCourse.map((icon, index) => (
                <img
                  key={index}
                  className={`${styles['icon-mahjong-bo']} ${icon.hidden}`}
                  src={icon.src}
                  alt={`Mahjong Icon ${index + 1}`}
                />
              ))}
            </div>
            <div className={`${styles['course-title-bo']} d-flex`}>
              <h2>線上</h2>
              <h2>課程</h2>
            </div>
            <div className="d-flex gap-2">
              {mahjongIconsCourse.map((icon, index) => (
                <img
                  key={index}
                  className={`${styles['icon-mahjong-bo']} ${icon.hidden}`}
                  src={icon.src}
                  alt={`Mahjong Icon ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div
            className={`${styles['guide-box-bo']} ${styles['course-box-bo']} container-fluid d-flex flex-column justify-content-center`}
          >
            <div
              className={`${styles['course-text-body-bo']} d-flex justify-content-between`}
            >
              <div className="d-flex justify-content-center align-items-center gap-5">
                <div
                  className={`${styles['course-text-guide-bo']} d-flex flex-column gap-1`}
                >
                  <p className="h6">加入線上課程，隨時學習新技能。</p>
                  <p className="h6">專業講師指導，助你快速提升！</p>
                </div>
              </div>

              <Link
                href="/course/classList"
                className={`${styles['text-more-bo']} d-flex justify-content-center align-items-center`}
              >
                <p className="h6 d-none d-sm-block">查看更多線上課程</p>
                <p className="h6 d-block d-sm-none text-nowrap">查看更多</p>

                <div
                  className={`${styles['btn-more-mini']} d-flex justify-content-center align-items-center`}
                >
                  <FaArrowRight className={styles['more-mini-icon']} />
                </div>
              </Link>
            </div>
            <div
              className={`${
                styles['course-card-box-bo']
              } d-flex justify-content-center align-items-center  ${
                courseVisible ? styles['course-visible'] : ''
              }  `}
            >
              {swiperReady && (
                <Swiper
                  slidesPerView={'auto'}
                  navigation={{
                    prevEl: '#swiper-prev-course',
                    nextEl: '#swiper-next-course',
                  }}
                  autoHeight={true}
                  modules={[Navigation]}
                  loop={false}
                  freeMode={false}
                  spaceBetween={10}
                  touchReleaseOnEdges={true}
                  onSlideChange={(swiper) => {
                    // 根據 swiper 的狀態來更新 courseSwiperState
                    setCourseSwiperState({
                      isFirstSlide: swiper.isBeginning,
                      isLastSlide: swiper.isEnd,
                    })
                  }}
                  className={`${styles['swiper-container']}`}
                >
                  {courses.map((course, index) => (
                    <SwiperSlide
                      key={index}
                      className={`${styles['swiper-slide']} ${
                        styles[`course-slide-${index + 1}`]
                      }`}
                    >
                      <Link
                        ref={addToRefs}
                        href={`/course/classListCate?category_id=${index}`}
                        className={`${styles['course-card-bo']} justify-content-center align-items-center`}
                        onMouseEnter={() =>
                          setBackgroundVideo(
                            `/video/course-type-${index + 1}.mp4`
                          )
                        } // 更改背景影片
                        onMouseLeave={() => setBackgroundVideo('')} // 恢復為預設背景影片
                      >
                        <div
                          className={`${styles['course-card-front-bo']} d-flex flex-column justify-content-end`}
                        >
                          <div
                            className={`${styles['course-card-body-bo']} d-flex flex-column gap-3`}
                          >
                            <h5>{course.title}</h5>
                            <p>{course.description}</p>
                            <div
                              className={`${styles['course-more']} d-flex justify-content-end align-items-center`}
                            >
                              <i className={`${styles['edit-icon']}`}></i>
                            </div>
                          </div>
                        </div>
                        <div className={styles['course-card-back-bo']}></div>
                      </Link>
                    </SwiperSlide>
                  ))}

                  <SwiperSlide className={`${styles['swiper-slide']}`}>
                    <div className={`${styles['course-empty-slide']}`}></div>
                  </SwiperSlide>
                </Swiper>
              )}
            </div>
          </div>
          <div className=" d-flex gap-5">
            <div
              id="swiper-prev-course" // 指定為 swiper-prev-course
              className={`${styles['move-course-btn-box-left-bo']} ${
                styles['move-course-btn-box-bo']
              } d-flex justify-content-center align-items-center ${
                courseSwiperState.isFirstSlide
                  ? styles['course-disabled-button']
                  : ''
              }`}
            >
              <FaArrowLeft className={styles['btn-course-move-left-bo']} />
            </div>
            <div
              id="swiper-next-course" // 指定為 swiper-next-course
              className={`${styles['move-course-btn-box-right-bo']} ${
                styles['move-course-btn-box-bo']
              } d-flex justify-content-center align-items-center  ${
                courseSwiperState.isLastSlide
                  ? styles['course-disabled-button']
                  : ''
              }`}
            >
              <FaArrowRight className={styles['btn-course-move-right-bo']} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
