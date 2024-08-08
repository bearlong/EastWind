import styles from '@/styles/boyu/home.module.scss'
import { FaArrowRight } from 'react-icons/fa'

export default function Home() {
  return (
    <>
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
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Man1.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Man2.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Man3.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Pin1.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Pin2.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Pin3.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Sou1.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Sou2.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Sou3.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Ton.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Nan.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Shaa.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Pei.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Chun.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Hatsu.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Haku.svg"
              alt=""
            />
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
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Man1.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Man2.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Man3.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Pin1.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Pin2.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Pin3.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Sou1.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Sou2.svg"
              alt=""
            />
            <img
              className={`d-none d-md-block ${styles['icon-mahjong-bo']}`}
              src="/images/boyu/mahjong/Sou3.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Ton.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Nan.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Shaa.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Pei.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Chun.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Hatsu.svg"
              alt=""
            />
            <img
              className={styles['icon-mahjong-bo']}
              src="/images/boyu/mahjong/Haku.svg"
              alt=""
            />
          </div>
        </section>

        {/* 棋牌室 */}
        <section
          className={`${styles['room-section-bo']} gap-3 ${styles['bg-front-photo-bo']} d-flex flex-column flex-md-row justify-content-between align-items-center`}
        >
          <div
            className={`${styles['room-image-box-bo']} ${styles['room-image-box-down-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-down-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
          </div>
          <div
            className={`${styles['room-text-box-bo']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div
              className={`${styles['room-text-title-bo']} container d-flex justify-content-center align-items-center`}
            >
              <div className="d-flex gap-2">
                <img
                  className={styles['icon-mahjong-bo']}
                  src="/images/boyu/mahjong/Man1.svg"
                  alt=""
                />
                <img
                  className={styles['icon-mahjong-bo']}
                  src="/images/boyu/mahjong/Man2.svg"
                  alt=""
                />
                <img
                  className={`${styles['icon-mahjong-bo']} d-none d-sm-block`}
                  src="/images/boyu/mahjong/Man3.svg"
                  alt=""
                />
              </div>
              <h2 className={styles['room-title-bo']}>棋牌室</h2>
              <div className="d-flex gap-2">
                <img
                  className={styles['icon-mahjong-bo']}
                  src="/images/boyu/mahjong/Man1.svg"
                  alt=""
                />
                <img
                  className={styles['icon-mahjong-bo']}
                  src="/images/boyu/mahjong/Man2.svg"
                  alt=""
                />
                <img
                  className={`${styles['icon-mahjong-bo']} d-none d-sm-block`}
                  src="/images/boyu/mahjong/Man3.svg"
                  alt=""
                />
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
            <div className={`${styles['btn-more']} d-flex align-items-center`}>
              <p>立即查看</p>
              <i className={`${styles['edit-icon']}`}></i>
            </div>
          </div>
          <div
            className={`${styles['room-image-box-bo']} ${styles['room-image-box-up-bo']} d-flex flex-row flex-md-column justify-content-center align-items-center`}
          >
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
            <img
              className={`${styles['room-image-bo']} ${styles['image-up-bo']}`}
              src="/images/boyu/rooms/24H自助桌遊逢甲館電動麻將桌-1.jpg"
              alt=""
            />
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
              <img
                className={styles['icon-mahjong-bo']}
                src="/images/boyu/mahjong/Pin1.svg"
                alt=""
              />
              <img
                className={styles['icon-mahjong-bo']}
                src="/images/boyu/mahjong/Pin2.svg"
                alt=""
              />
              <img
                className={`${styles['icon-mahjong-bo']} d-none d-sm-block`}
                src="/images/boyu/mahjong/Pin3.svg"
                alt=""
              />
            </div>

            <h2>商品</h2>
            <div className="d-flex gap-2">
              <img
                className={styles['icon-mahjong-bo']}
                src="/images/boyu/mahjong/Pin1.svg"
                alt=""
              />
              <img
                className={styles['icon-mahjong-bo']}
                src="/images/boyu/mahjong/Pin2.svg"
                alt=""
              />
              <img
                className={`${styles['icon-mahjong-bo']} d-none d-sm-block`}
                src="/images/boyu/mahjong/Pin3.svg"
                alt=""
              />
            </div>
          </div>
          <div
            className={`${styles['guide-box-bo']} container-xl d-flex flex-column justify-content-center`}
          >
            <div
              className={`${styles['product-text-box-bo']} d-flex gap-5 flex-column`}
            >
              <div
                className={`${styles['product-text-body-bo']} d-flex justify-content-between`}
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

                <div
                  className={`${styles['text-more-bo']} d-flex justify-content-center align-items-center`}
                >
                  <p className="h6 d-none d-sm-block">查看更多麻將商品</p>
                  <p className="h6 d-block d-sm-none">查看更多</p>
                  <div
                    className={`${styles['btn-more-mini']} d-flex justify-content-center align-items-center`}
                  >
                    <FaArrowRight className={styles['more-mini-icon']} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles['product-card-box-bo']} d-flex gap-5 justify-content-center justify-content-sm-start align-items-center`}
            >
              <div
                className={`${styles['mahjong-card-btn-bo']} d-flex flex-row flex-sm-column gap-5 align-items-center`}
              >
              
                <i className="fa-solid fa-arrow-left btn-move-card-left-bo"></i>
                <i className="fa-solid fa-arrow-right btn-move-card-right-bo"></i>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product.png" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">東方不敗</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      132東方無聲派-33mm
                    </p>
                    <p className="h6">NT$ 1,900</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product.png" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">東方不敗</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      132東方無聲派-33mm
                    </p>
                    <p className="h6">NT$ 1,900</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product.png" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">東方不敗</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      132東方無聲派-33mm
                    </p>
                    <p className="h6">NT$ 1,900</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product.png" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">東方不敗</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      132東方無聲派-33mm
                    </p>
                    <p className="h6">NT$ 1,900</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product.png" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">東方不敗</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      132東方無聲派-33mm
                    </p>
                    <p className="h6">NT$ 1,900</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles['guide-box-bo']} container-xl d-flex flex-column justify-content-center`}
          >
            <div
              className={`${styles['product-text-box-bo']} d-flex gap-5 flex-column`}
            >
              <div
                className={`${styles['product-text-body-bo']} d-flex justify-content-between`}
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
                <div
                  className={`${styles['text-more-bo']} d-flex justify-content-center align-items-center`}
                >
                  <p className="h6 d-none d-sm-block">查看更多桌遊商品</p>
                  <p className="h6 d-block d-sm-none">查看更多</p>
                  <div className={styles['btn-more-mini']}>
                    <i className="fa-solid fa-arrow-right more-mini-icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles['product-card-box-bo']} d-flex gap-5 justify-content-center justify-content-sm-end align-items-center`}
            >
              <div
                className={`${styles['boardGame-card-btn-bo']} d-flex flex-row flex-sm-column align-items-center gap-5`}
              >
                <i className="fa-solid fa-arrow-left btn-move-card-left-bo"></i>
                <i className="fa-solid fa-arrow-right btn-move-card-right-bo"></i>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product1.jpg" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">高竹嵐</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      矮人十兄弟
                    </p>
                    <p className="h6">NT$ 400</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product1.jpg" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">高竹嵐</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      矮人十兄弟
                    </p>
                    <p className="h6">NT$ 400</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product1.jpg" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">高竹嵐</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      矮人十兄弟
                    </p>
                    <p className="h6">NT$ 400</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product1.jpg" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">高竹嵐</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      矮人十兄弟
                    </p>
                    <p className="h6">NT$ 400</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles['productCard']} d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={styles['imgBox']}>
                  <img src="/image/product/product1.jpg" alt="" />
                </div>
                <div className={`${styles['cardBody']} text-center`}>
                  <div
                    className={`${styles['productName']} d-flex flex-column justify-content-center align-items-center text-center`}
                  >
                    <p className="h6">高竹嵐</p>
                    <p
                      className={`${styles['productDescription']} h6 d-flex justify-content-center align-items-center text-center`}
                    >
                      矮人十兄弟
                    </p>
                    <p className="h6">NT$ 400</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 線上課程 */}
        <section
          className={`${styles['course-section-bo']} ${styles['bg-front-photo-bo']} d-flex flex-column justify-content-center align-items-center`}
        >
          <div
            className={`${styles['course-title-box-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <div className="d-flex gap-2">
              <img
                className={styles['icon-mahjong-bo']}
                src="/image/mahjong/Sou1.svg"
                alt=""
              />
              <img
                className={styles['icon-mahjong-bo']}
                src="/image/mahjong/Sou2.svg"
                alt=""
              />
              <img
                className={`${styles['icon-mahjong-bo']} d-none d-sm-block`}
                src="/image/mahjong/Sou3.svg"
                alt=""
              />
            </div>
            <div className={styles['course-title-bo']}>
              <h2>線上</h2>
              <h2>課程</h2>
            </div>
            <div className="d-flex gap-2">
              <img
                className={styles['icon-mahjong-bo']}
                src="/image/mahjong/Sou1.svg"
                alt=""
              />
              <img
                className={styles['icon-mahjong-bo']}
                src="/image/mahjong/Sou2.svg"
                alt=""
              />
              <img
                className={`${styles['icon-mahjong-bo']} d-none d-sm-block`}
                src="/image/mahjong/Sou3.svg"
                alt=""
              />
            </div>
          </div>
          <div
            className={`${styles['guide-box-bo']} ${styles['course-box-bo']} container-xl d-flex flex-column justify-content-center`}
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

              <div
                className={`${styles['text-more-bo']} d-flex justify-content-center align-items-center`}
              >
                <p className="h6 d-none d-sm-block">查看更多線上課程</p>
                <p className="h6 d-block d-sm-none">查看更多</p>
                <div className={styles['btn-more-mini']}>
                  <i className="fa-solid fa-arrow-right more-mini-icon"></i>
                </div>
              </div>
            </div>
            <div
              className={`${styles['course-card-box-bo']} d-flex justify-content-center align-items-center`}
            >
              <div
                className={`${styles['course-card-bo']} justify-content-center align-items-center`}
              >
                <div
                  className={`${styles['course-card-front-bo']} d-flex flex-column justify-content-end`}
                >
                  <div
                    className={`${styles['course-card-body-bo']} d-flex flex-column gap-3`}
                  >
                    <h5>麻將</h5>
                    <p>智慧與運氣的完美結合。</p>
                    <div
                      className={`${styles['course-more']} d-flex justify-content-end align-items-center`}
                    >
                      <i className="edit-icon"></i>
                    </div>
                  </div>
                </div>
                <div className={styles['course-card-back-bo']}></div>
              </div>

              <div
                className={`${styles['course-card-bo']} justify-content-center align-items-center`}
              >
                <div
                  className={`${styles['course-card-front-bo']} d-flex flex-column justify-content-end`}
                >
                  <div
                    className={`${styles['course-card-body-bo']} d-flex flex-column gap-3`}
                  >
                    <h5>西洋棋</h5>
                    <p>策略與智力的精彩對決。</p>
                    <div
                      className={`${styles['course-more']} d-flex justify-content-end align-items-center`}
                    >
                      <i className="edit-icon"></i>
                    </div>
                  </div>
                </div>
                <div className={styles['course-card-back-bo']}></div>
              </div>

              <div
                className={`${styles['course-card-bo']} justify-content-center align-items-center`}
              >
                <div
                  className={`${styles['course-card-front-bo']} d-flex flex-column justify-content-end`}
                >
                  <div
                    className={`${styles['course-card-body-bo']} d-flex flex-column gap-3`}
                  >
                    <h5>撲克牌</h5>
                    <p>簡單易學，挑戰無限。</p>
                    <div
                      className={`${styles['course-more']} d-flex justify-content-end align-items-center`}
                    >
                      <i className="edit-icon"></i>
                    </div>
                  </div>
                </div>
                <div className={styles['course-card-back-bo']}></div>
              </div>

              <div
                className={`${styles['course-card-bo']} justify-content-center align-items-center`}
              >
                <div
                  className={`${styles['course-card-front-bo']} d-flex flex-column justify-content-end`}
                >
                  <div
                    className={`${styles['course-card-body-bo']} d-flex flex-column gap-3`}
                  >
                    <h5>圍棋</h5>
                    <p>黑白交錯，古老智慧。</p>
                    <div
                      className={`${styles['course-more']} d-flex justify-content-end align-items-center`}
                    >
                      <i className="edit-icon"></i>
                    </div>
                  </div>
                </div>
                <div className={styles['course-card-back-bo']}></div>
              </div>

              <div
                className={`${styles['course-card-bo']} justify-content-center align-items-center`}
              >
                <div
                  className={`${styles['course-card-front-bo']} d-flex flex-column justify-content-end`}
                >
                  <div
                    className={`${styles['course-card-body-bo']} d-flex flex-column gap-3`}
                  >
                    <h5>將棋</h5>
                    <p>享受飛車角行的策略博弈。</p>
                    <div
                      className={`${styles['course-more']} d-flex justify-content-end align-items-center`}
                    >
                      <i className="edit-icon"></i>
                    </div>
                  </div>
                </div>
                <div className={styles['course-card-back-bo']}></div>
              </div>

              <div className="course-card-btn-bo d-block d-md-none d-flex gap-5">
                <i className="fa-solid fa-arrow-left btn-course-move-left-bo"></i>
                <i className="fa-solid fa-arrow-right btn-course-move-right-bo"></i>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
