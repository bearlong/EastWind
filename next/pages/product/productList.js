import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  FaFilter,
  FaSort,
  FaMagnifyingGlass,
  FaXmark,
  FaCheck,
  FaHeart,
  FaStar,
  FaPlus,
  FaMinus,
} from 'react-icons/fa6'
import styles from '@/styles/productList.module.scss'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// 測試測試
export default function ProductList() {
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    let newProducts, error
    const url = 'http://localhost:3005/api/products'
    newProducts = await fetch(url)
      .then((res) => res.json())
      .then((results) => {
        return results
      })
      .catch((err) => {
        error = err
        return undefined
      })
    if (error) {
      return
    }

    if (newProducts) {
      setProducts(newProducts)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    console.log(products) // 當 products 狀態改變時打印
  }, [products])

  return (
    <>
      <div className={styles['product-header-bl']}>
        <ul className={` d-flex ${styles['subBar-bl']} `}>
          <li>
            <div className={styles['subNav']} href="">
              <h6>預覽全部</h6>
            </div>
          </li>
          <li>
            <div className={styles['subNav']} href="">
              <h6>麻將牌</h6>
            </div>
            <div className={styles['subBarBody-bl']}>
              <div className="d-flex">
                <div>
                  <h6 className={styles['title']}>精選推薦</h6>
                  <ul>
                    <li>最新上架</li>
                    <li>活動促銷</li>
                    <li>評價最高</li>
                  </ul>
                </div>
                <div>
                  <h6 className={styles['title']}>品牌</h6>
                  <ul>
                    <li>東方不敗</li>
                    <li>商密特SUMMIT</li>
                    <li>麻將大俠</li>
                    <li>馬丘machill</li>
                  </ul>
                </div>
                <div>
                  <h6 className={styles['title']}>尺寸</h6>
                  <ul>
                    <li>33mm</li>
                    <li>34mm</li>
                    <li>36mm</li>
                  </ul>
                </div>
                <div>
                  <h6 className={styles['title']}>類別</h6>
                  <ul>
                    <li>電動麻將桌專用</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={styles['subNav']} href="">
              <h6>排尺</h6>
            </div>
            <div className={styles['subBarBody-bl']}>
              <div className="d-flex">
                <div>
                  <h6 className={styles['title']}>精選推薦</h6>
                  <ul>
                    <li>最新上架</li>
                    <li>活動促銷</li>
                    <li>評價最高</li>
                  </ul>
                </div>
                <div>
                  <h6 className={styles['title']}>品牌</h6>
                  <ul>
                    <li>東方不敗</li>
                    <li>雀王</li>
                    <li>商密特SUMMIT</li>
                    <li>長勝</li>
                    <li>麻將大俠</li>
                    <li>馬丘machill</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={styles['subNav']} href="">
              <h6>麻將桌</h6>
            </div>
            <div className={styles['subBarBody-bl']}>
              <div className="d-flex">
                <div>
                  <h6 className={styles['title']}>精選推薦</h6>
                  <ul>
                    <li>最新上架</li>
                    <li>活動促銷</li>
                    <li>評價最高</li>
                  </ul>
                </div>
                <div>
                  <h6 className={styles['title']}>品牌</h6>
                  <ul>
                    <li>東方不敗</li>
                    <li>雀王</li>
                    <li>商密特SUMMIT</li>
                    <li>長勝</li>
                    <li>麻將大俠</li>
                    <li>雀友</li>
                    <li>輝葉良品</li>
                  </ul>
                </div>
                <div>
                  <h6 className={styles['title']}>類別</h6>
                  <ul>
                    <li>餐桌款</li>
                    <li>摺疊款</li>
                    <li>套裝款</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={styles['subNav']} href="">
              <h6>周邊</h6>
            </div>
            <div
              className={`${styles['subBarBody-bl']} ${styles['rightBar-bl']}`}
            >
              <div className="d-flex">
                <div>
                  <h6 className={styles['title']}>精選推薦</h6>
                  <ul>
                    <li>最新上架</li>
                    <li>活動促銷</li>
                    <li>評價最高</li>
                  </ul>
                </div>
                <div>
                  <h6 className={styles['title']}>類別</h6>
                  <ul>
                    <li>籌碼</li>
                    <li>骰子</li>
                    <li>麻將周邊</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={styles['subNav']} href="">
              <h6>桌遊</h6>
            </div>
            <div
              className={`${styles['subBarBody-bl']} ${styles['rightBar-bl']}`}
            >
              <div className="d-flex">
                <div>
                  <h6 className={styles['title']}>精選推薦</h6>
                  <ul>
                    <li>最新上架</li>
                    <li>活動促銷</li>
                    <li>評價最高</li>
                  </ul>
                </div>
                <div>
                  <h6 className={styles['title']}>類別</h6>
                  <ul>
                    <li>台灣元素</li>
                    <li>策略</li>
                    <li>派對</li>
                    <li>RPG</li>
                    <li>家庭</li>
                    <li>親子</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <main>
        <div className={styles['topSection-bl']}>
          <h4 className={`${styles['topTitle']} mb-5`}>人氣商品</h4>
          <div className={`${styles['topList-bl']}`}>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              direction="horizontal"
              autoHeight={true}
              loop={false}
              breakpoints={{
                576: { slidesPerView: 2, spaceBetween: 30 },
                992: { slidesPerView: 3, spaceBetween: 30 },
                1200: { slidesPerView: 4, spaceBetween: 40 },
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <div className={`${styles['productCard']} swiper-slide`}>
                  <div className={styles['swiperImg']}>
                    <div className={styles['imgBox']}>
                      <div className={`${styles['top']}`}>1</div>
                      <Image
                        src="../../images/product/015.jpg"
                        width={280}
                        height={280}
                        alt=""
                      />
                    </div>
                    <div
                      className={`${styles['imgBox']} ${styles['secondImg']}`}
                    >
                      <Image
                        src="../../images/product/019.jpg"
                        width={280}
                        height={280}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles['cardBody']}>
                    <div className={styles['productName-bl']}>
                      <p>馬丘machill</p>
                      <p className={` ${styles['productDescription']}`}>
                        馬丘麻將【電動麻將桌用版】
                      </p>
                    </div>
                    <p>NT. 2,500</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles['productCard']} swiper-slide`}>
                  <div className={styles['swiperImg']}>
                    <div className={styles['imgBox']}>
                      <div className={`${styles['top']} ${styles['top2']}`}>
                        2
                      </div>
                      <Image
                        src="../../images/product/015.jpg"
                        width={280}
                        height={280}
                        alt=""
                      />
                    </div>
                    <div
                      className={`${styles['imgBox']} ${styles['secondImg']}`}
                    >
                      <Image
                        src="../../images/product/019.jpg"
                        width={280}
                        height={280}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles['cardBody']}>
                    <div className={styles['productName-bl']}>
                      <p>馬丘machill</p>
                      <p className={` ${styles['productDescription']}`}>
                        馬丘麻將【電動麻將桌用版】
                      </p>
                    </div>
                    <p>NT. 2,500</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles['productCard']} swiper-slide`}>
                  <div className={styles['swiperImg']}>
                    <div className={styles['imgBox']}>
                      <div className={`${styles['top']} ${styles['top3']}`}>
                        3
                      </div>
                      <Image
                        src="../../images/product/015.jpg"
                        width={280}
                        height={280}
                        alt=""
                      />
                    </div>
                    <div
                      className={`${styles['imgBox']} ${styles['secondImg']}`}
                    >
                      <Image
                        src="../../images/product/019.jpg"
                        width={280}
                        height={280}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles['cardBody']}>
                    <div className={styles['productName-bl']}>
                      <p>馬丘machill</p>
                      <p className={`${styles['productDescription']}`}>
                        馬丘麻將【電動麻將桌用版】
                      </p>
                    </div>
                    <p>NT. 2,500</p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles['productCard']} swiper-slide`}>
                  <div className={styles['swiperImg']}>
                    <div className={styles['imgBox']}>
                      <div className={`${styles['top']} ${styles['top4']}`}>
                        4
                      </div>
                      <Image
                        src="../../images/product/015.jpg"
                        width={280}
                        height={280}
                        alt=""
                      />
                    </div>
                    <div
                      className={`${styles['imgBox']} ${styles['secondImg']}`}
                    >
                      <Image
                        src="../../images/product/019.jpg"
                        width={280}
                        height={280}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles['cardBody']}>
                    <div className={styles['productName-bl']}>
                      <p>馬丘machill</p>
                      <p className={`${styles['productDescription']}`}>
                        馬丘麻將【電動麻將桌用版】
                      </p>
                    </div>
                    <p>NT. 2,500</p>
                  </div>
                  {/* </div> */}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className={styles['line']} />
        <div className={` mb-5`}>
          <div
            className={`${styles['productNavBar-bl']} d-flex justify-content-between mb-5`}
          >
            <p>215 件商品</p>
            <div
              className={` d-flex gap-5 justify-content-between align-items-center`}
            >
              <div
                className={`d-md-none ${styles['icon-bl']}`}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSearch-bl"
                aria-controls="offcanvasRight"
              >
                <FaMagnifyingGlass width={40} color="#b79347" />
              </div>
              <div
                className={`${styles['search']} ${styles['searchBar']} input-group input-group`}
              >
                <input type="text" className="form-control" />
                <span className="input-group-text" id="inputGroup-sizing">
                  <FaMagnifyingGlass width={40} color="#ffffff" />
                </span>
              </div>
              <div
                className={`${styles['icon-bl']}`}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasFliter-bl"
                aria-controls="offcanvasRight"
              >
                <FaFilter size={20} color="#b79347" />
              </div>
              <div
                className={`${styles['icon-bl']}`}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasOrder-bl"
                aria-controls="offcanvasRight"
              >
                <FaSort size={20} color="#b79347" />
              </div>
            </div>
          </div>
          <div className={styles['products-bl']}>
            {products.map((product) => {
              return (
                <div key={product.id} className={styles['productCard']}>
                  <div className={styles['imgBox']}>
                    <Image
                      src={`../../images/product/${product.img}`}
                      width={280}
                      height={280}
                      alt=""
                    />
                  </div>
                  <div className={`${styles['imgBox']} ${styles['secondImg']}`}>
                    <Image
                      src={`../../images/product/${product.img}`}
                      width={280}
                      height={280}
                      alt=""
                    />
                  </div>
                  <div className={styles['heart']}>
                    <FaHeart width={24} />
                  </div>
                  <div className={styles['cardBody']}>
                    <div className={styles['productName-bl']}>
                      <p>{product.brand_name}</p>
                      <p className={styles['productDescription']}>
                        {product.name}
                      </p>
                    </div>
                    <div
                      className={`${styles['star']} d-flex justify-content-center gap-1`}
                    >
                      <p>
                        4.7 <FaStar width={16} />
                      </p>
                    </div>
                    <p>NT. {product.price}</p>
                  </div>
                </div>
              )
            })}
            <div className={styles['productCard']}>
              <div className={styles['imgBox']}>
                <Image
                  src="../../images/product/015.jpg"
                  width={280}
                  height={280}
                  alt=""
                />
              </div>
              <div className={`${styles['imgBox']} ${styles['secondImg']}`}>
                <Image
                  src="../../images/product/019.jpg"
                  width={280}
                  height={280}
                  alt=""
                />
              </div>
              <div className={styles['heart']}>
                <FaHeart width={24} />
              </div>
              <div className={styles['cardBody']}>
                <div className={styles['productName-bl']}>
                  <p>馬丘machill</p>
                  <p className={styles['productDescription']}>
                    馬丘麻將【電動麻將桌用版】
                  </p>
                </div>
                <div
                  className={`${styles['star']} d-flex justify-content-center gap-1`}
                >
                  <p>
                    4.7 <FaStar width={16} />
                  </p>
                </div>
                <p>NT. 2,500</p>
              </div>
            </div>
            <div className={`${styles['productCard']} ${styles['boxHidden']} `}>
              <div className={styles['imgBox']}>
                <Image
                  src="../../images/product/015.jpg"
                  width={280}
                  height={280}
                  alt=""
                />
              </div>
              <div className={`${styles['imgBox']} ${styles['secondImg']}`}>
                <Image
                  src="../../images/product/019.jpg"
                  width={280}
                  height={280}
                  alt=""
                />
              </div>
              <div className={styles['heart']}>
                <FaHeart width={24} />
              </div>
              <div className={styles['cardBody']}>
                <div className={styles['productName-bl']}>
                  <p>馬丘machill</p>
                  <p className={styles['productDescription']}>
                    馬丘麻將【電動麻將桌用版】
                  </p>
                </div>
                <div
                  className={`${styles['star']} d-flex justify-content-center gap-1`}
                >
                  <p>
                    4.7 <FaStar width={16} />
                  </p>
                </div>
                <p>NT. 2,500</p>
              </div>
            </div>
          </div>
          <div className={styles['loadMore-bl']}>
            <p>24 / {products.length}</p>
            <div className="progress" role="progressbar">
              <div className="progress-bar" style={{ width: '50%' }} />
            </div>
            <div className={`${styles['btn-more']} d-flex`}>
              <p>查看更多</p>
              <i className={styles['edit-icon']} />
            </div>
          </div>
        </div>
        <div
          className={` offcanvas-pb offcanvas offcanvas-end`}
          tabIndex={-1}
          id="offcanvasOrder-bl"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <div
              className={`h5 offcanvas-title`}
              id="offcanvasRightLabel"
            ></div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <FaXmark width={25} />
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="orderBox-bl">
              <input type="radio" id={'0'} name="test" defaultValue={0} />
              <label
                className="d-flex justify-content-between align-items-center mb-5"
                htmlFor={'0'}
                defaultChecked
              >
                <h6>推薦</h6>
                <div className="check h6">
                  <FaCheck width={20} />
                </div>
              </label>
              <input type="radio" id={1} name="test" defaultValue={1} />
              <label
                className="d-flex justify-content-between align-items-center mb-5"
                htmlFor={1}
              >
                <h6>上架日期</h6>

                <div className="check h6">
                  <FaCheck width={20} />
                </div>
              </label>
              <input type="radio" id={2} name="test" defaultValue={2} />
              <label
                className="d-flex justify-content-between align-items-center mb-5"
                htmlFor={2}
              >
                <h6>評價由高到低</h6>
                <div className="check h6">
                  <FaCheck width={20} />
                </div>
              </label>
              <input type="radio" id={3} name="test" defaultValue={3} />
              <label
                className="d-flex justify-content-between align-items-center mb-5"
                htmlFor={3}
              >
                <h6>價格由高到低</h6>
                <div className="check h6">
                  <FaCheck width={20} />
                </div>
              </label>
              <input type="radio" id={4} name="test" defaultValue={4} />
              <label
                className="d-flex justify-content-between align-items-center mb-5"
                htmlFor={4}
              >
                <h6>價格由低到高</h6>
                <div className="check h6">
                  <FaCheck width={20} />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div
          className={` offcanvas-pb offcanvas offcanvas-end`}
          tabIndex={-1}
          id="offcanvasFliter-bl"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <div className={`h5 offcanvas-title`} id="offcanvasRightLabel" />
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <FaXmark width={20} />
            </button>
          </div>
          <div className="offcanvas-body  d-flex flex-column justify-content-between">
            <div>
              <div className={`filterBar-bl mb-3`}>
                <input
                  type="checkbox"
                  className="filterBarMain-bl"
                  id="filterBarCheck"
                />
                <label
                  className="d-flex justify-content-between mb-3"
                  htmlFor="filterBarCheck"
                >
                  <div className={` d-flex`}>
                    <h6>品牌</h6>
                    <div className={`chose ms-3 d-none`}>0</div>
                  </div>

                  <h6 className="plus">
                    <FaPlus />
                  </h6>
                  <h6 className="minus">
                    <FaMinus />
                  </h6>
                </label>
                <div className={`filterBarSub-bl mb-5`}>
                  <ul>
                    <li>馬丘machill</li>
                    <li>商密特SUMMIT</li>
                    <li>東方不敗</li>
                    <li>麻將大俠</li>
                  </ul>
                </div>
              </div>
              {/* <div className="filterBar-bl mb-5">
                <div className="filterBarMain-bl d-flex justify-content-between mb-3">
                  <div className="filterTitle d-flex">
                    <h6>類別</h6>
                    <div className="chose ms-3 d-none">0</div>
                  </div>
                  <span>
                    <h6>
                      <i className="fa-solid fa-plus plus-minus" />
                    </h6>
                  </span>
                </div>
                <div className="filterBarSub-bl mb-3">
                  <ul className="ul">
                    <li>電動麻將桌專用</li>
                  </ul>
                </div>
              </div>
              <div className="filterBar-bl mb-5">
                <div className="filterBarMain-bl d-flex justify-content-between mb-3">
                  <div className="filterTitle d-flex">
                    <h6>尺寸</h6>
                    <div className="chose ms-3 d-none">0</div>
                  </div>
                  <span>
                    <h6>
                      <i className="fa-solid fa-plus plus-minus" />
                    </h6>
                  </span>
                </div>
                <div className="filterBarSub-bl mb-3">
                  <ul className="ul">
                    <li>33mm</li>
                    <li>34mm</li>
                    <li>36mm</li>
                  </ul>
                </div>
              </div> */}
              <div className="d-flex justify-content-center align-items-center flex-column">
                <div className={styles['rangeBox-bl']}>
                  <input
                    type="range"
                    className="form-range max"
                    max={100}
                    min={0}
                    defaultValue={100}
                  />
                  <p>
                    max: <span>100</span>
                  </p>
                </div>
                <div className={styles['rangeBox-bl']}>
                  <input
                    type="range"
                    className="form-range min"
                    max={100}
                    min={0}
                    defaultValue={0}
                  />
                  <p>
                    min: <span>0</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="filterSearch-bl">
              <button className="btn btn-primary mb-3">查看 15 個結果</button>
              <button className="btn btn-light">重置</button>
            </div>
          </div>
        </div>
        <div
          className={` offcanvas-pb offcanvas offcanvas-end`}
          tabIndex={-1}
          id="offcanvasSearch-bl"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <div className={`h5 offcanvas-title`} id="offcanvasRightLabel" />
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <FaXmark width={20} />
            </button>
          </div>
          <div className="offcanvas-body  d-flex flex-column justify-content-between">
            <div className={`${styles['search']} input-group input-group`}>
              <input type="text" className="form-control" />
              <span className="input-group-text" id="inputGroup-sizing">
                <FaMagnifyingGlass width={40} color="#ffffff" />
              </span>
            </div>
          </div>
        </div>
      </main>
      <style jsx>
        {`
          main {
            max-width: 1440px;
            margin: auto;
            padding: 0 4rem;
          }

          .swiper {
            height: 500px;
          }
          .swiper-slide {
            display: flex;
            flex-direction: column;
          }

          .productCard {
            .imgBox {
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .cardBody {
              .productName-bl {
                p {
                  margin: 0;
                }
              }
            }
          }

          .btn-more {
            p {
              font-size: 1.4rem;
            }
          }
          .progress {
            width: 250px;
            --bs-progress-bar-bg: var(--primary);
          }
          @media (max-width: 992px) {
            main {
              padding: 0;
            }
          }
          .search {
            input {
              --bs-body-color: var(--bs-body-color);
            }
          }

          .offcanvas-pb {
            --bs-offcanvas-width: 25%;
          }

          .orderBox-bl {
            input[type='radio'] {
              display: none;
            }
          }
          .check {
            display: none;
            height: 2rem;
          }
          input[type='radio']:checked + label {
            .check {
              display: inline;
            }
          }

          .offcanvas {
            --bs-offcanvas-transition: 0.8s;
            .chose {
              display: inline-block;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              text-align: center;
              font-size: 1.6rem;
              background: var(--primary-dark);
              color: var(--white);
            }
            .btn-close {
              width: 2.5rem;
              height: 2.5rem;
              font-size: 2.5rem;
              color: var(--primary-dark);
              --bs-btn-close-bg: none;
            }
            .filterBar-bl {
              cursor: pointer;
            }
            .offcanvas-body {
              width: 60%;
              padding: 5rem 0;
              margin: auto;
            }
            .filterBarSub-bl {
              max-height: 0;
              overflow: hidden;
              transition: 0.5s;
            }

            .filterBarMain-bl {
              display: none;
            }
            .minus {
              display: none;
            }
            .filterBarMain-bl:checked + label .plus {
              display: none;
            }
            .filterBarMain-bl:checked + label .minus {
              display: inline-block;
            }

            .filterBarMain-bl:checked ~ .filterBarSub-bl {
              max-height: 300px;
            }
            ul {
              padding: 0;
              font-size: 1.6rem;
            }

            li:hover {
              color: var(--text-hover-color);
            }

            .liActive {
              color: var(--text-hover-color);
            }
          }

          .filterSearch-bl {
            .btn-primary {
              color: var(--white);
              background: var(--primary-dark);
              --bs-btn-border-color: var(--primary-dark);
              &:hover {
                background: var(--primary);
                --bs-btn-hover-border-color: var(--primary);
              }
            }
            button {
              width: 100%;
              font-size: 1.6rem;
            }
          }

          .orderBox-bl {
            input[type='radio'] {
              display: none;
            }
          }

          @media (max-width: 1400px) {
            .products-bl {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (max-width: 992px) {
            .product-header-bl {
              .subBar-bl {
                padding: 2rem 0;
              }
            }

            .products-bl {
              grid-template-columns: repeat(2, 1fr);
              padding: 0;
            }
            .offcanvas-pb {
              --bs-offcanvas-width: 100%;
            }
          }

          @media (max-width: 768px) {
            .productCard {
              width: 175px;

              .imgBox {
                width: 175px;
                height: 175px;
              }
              .heart {
                right: 15px;
                top: 15px;
              }
              .secondImg {
                left: 0;
              }
            }
            .searchBar {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}
