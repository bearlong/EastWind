import React from 'react'
// import styles from '@/styles/orderList.module.css'
// import styles from '@/styles/orderList.module.scss'

export default function OrderList() {
  return (
    <>
      <div className="menber-info-box-bo">
        <div className="orderListTitle-bl">
          <ul className="d-flex justify-content-between align-items-center px-0 px-md-5">
            <li className="li h6 active">待出貨</li>
            <li className="li h6">待收貨</li>
            <li className="li h6">已完成</li>
            <li className="li h6">已取消</li>
            <li className="li h6">退貨/款</li>
          </ul>
        </div>
        <div className="orderList-bl">
          <div className="orderCard-bl">
            <div className="cardTitle-bl">
              <p>2024/07/10 訂單編號: 20240710ZZBLBO74</p>
            </div>
            <div className="cardBody-bl d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div className="orderInfo-bl d-flex justify-content-between">
                <div className="imgGroup-bl d-flex flex-column justify-content-around">
                  <div className="imgBox me-3">
                    <img
                      className="img"
                      src="./images/product/023.webp"
                      alt=""
                    />
                  </div>
                  <div className="imgBox d-none d-md-grid mt-4 h6">+3</div>
                </div>
                <div className="orderContent-bl flex-grow-1 d-flex flex-column justify-content-around">
                  <p>
                    狀態:
                    <span>
                      {' '}
                      <i className="span fa-solid fa-circle me-1" />
                      待出貨
                    </span>
                  </p>
                  <p>寄送: 320桃園市中壢區新生路二段421號</p>
                  <p>付款方式: 信用卡</p>
                  <div className="d-flex d-md-inline justify-content-between align-items-center">
                    <p>總價: NT.10,000</p>
                    <span className="span d-inline d-md-none p">
                      {' '}
                      共 4 樣商品
                    </span>
                  </div>
                </div>
              </div>
              <div className="btnGroup-bl d-flex flex-md-column justify-content-around justify-content-md-between">
                <button
                  type="button"
                  className="orderBtn-bl d-md-grid p mb-0 mb-md-3"
                >
                  再買一次
                </button>
                <button type="button" className="orderBtn-bl d-md-grid p">
                  查看訂單細節
                </button>
              </div>
            </div>
          </div>
          <div className="orderCard-bl">
            <div className="cardTitle-bl">
              <p>2024/07/10 訂單編號: 20240710ZZBLBO74</p>
            </div>
            <div className="cardBody-bl d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div className="orderInfo-bl d-flex justify-content-between">
                <div className="imgGroup-bl d-flex flex-column justify-content-around">
                  <div className="imgBox me-3">
                    <img
                      className="img"
                      src="./images/product/023.webp"
                      alt=""
                    />
                  </div>
                </div>
                <div className="orderContent-bl flex-grow-1 d-flex flex-column justify-content-around">
                  <p>
                    狀態:
                    <span>
                      {' '}
                      <i className="span fa-solid fa-circle me-1" />
                      待出貨
                    </span>
                  </p>
                  <p className="">寄送: 320桃園市中壢區新生路二段421號</p>
                  <p>付款方式: 信用卡</p>
                  <div className="d-flex d-md-inline justify-content-between align-items-center">
                    <p>總價: NT.10,000</p>
                    <span className="span d-inline d-md-none p">
                      {' '}
                      共 1 樣商品
                    </span>
                  </div>
                </div>
              </div>
              <div className="btnGroup-bl d-flex flex-md-column justify-content-around justify-content-md-between">
                <button
                  type="button"
                  className="orderBtn-bl d-md-grid p mb-0 mb-md-3"
                >
                  再買一次
                </button>
                <button type="button" className="orderBtn-bl d-md-grid p">
                  查看訂單細節
                </button>
              </div>
            </div>
          </div>
          <div className="orderCard-bl">
            <div className="cardTitle-bl">
              <p>2024/07/10 訂單編號: 20240710ZZBLBO74</p>
            </div>
            <div className="cardBody-bl d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div className="orderInfo-bl d-flex justify-content-between">
                <div className="imgGroup-bl d-flex flex-column justify-content-around">
                  <div className="imgBox me-3">
                    <img
                      className="img"
                      src="./images/product/023.webp"
                      alt=""
                    />
                  </div>
                  <div className="imgBox d-none d-md-grid mt-4 h6">+3</div>
                </div>
                <div className="orderContent-bl flex-grow-1 d-flex flex-column justify-content-around">
                  <p>
                    狀態:
                    <span>
                      {' '}
                      <i className="span fa-solid fa-circle me-1" />
                      待出貨
                    </span>
                  </p>
                  <p>寄送: 320桃園市中壢區新生路二段421號</p>
                  <p>付款方式: 信用卡</p>
                  <div className="d-flex d-md-inline justify-content-between align-items-center">
                    <p>總價: NT.10,000</p>
                    <span className="span d-inline d-md-none p">
                      {' '}
                      共 4 樣商品
                    </span>
                  </div>
                </div>
              </div>
              <div className="btnGroup-bl d-flex flex-md-column justify-content-around justify-content-md-between">
                <button
                  type="button"
                  className="orderBtn-bl d-md-grid p mb-0 mb-md-3"
                >
                  再買一次
                </button>
                <button type="button" className="orderBtn-bl d-md-grid p">
                  查看訂單細節
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          main {
            width: 100%;
            padding: 6.4rem;
          }

          .menber-info-box-bo {
            width: 100%;
            border: 2px solid var(--primary);
            background: var(--form-bg);
            .orderListTitle-bl {
              text-align: center;
              color: var(--primary);
              li {
                width: 100%;
                height: 5rem;
                border-bottom: 2px solid var(--primary);

                display: grid;
                align-items: center;
                justify-content: center;
                &:hover {
                  border-bottom: 5px solid var(--primary);
                }
              }
              .active {
                border-bottom: 5px solid var(--primary);
              }
            }
            .orderList-bl {
              padding: 2.4rem 4.8rem;

              .cardTitle-bl {
                padding: 1rem 2.4rem;
                background: var(--form-bg-dark);
              }
              .cardBody-bl {
                padding: 2.4rem 2.4rem;

                .orderInfo-bl {
                  height: 18rem;
                  max-width: 45rem;
                  span {
                    color: var(--primary);
                  }
                }

                .imgBox {
                  width: 80px;
                  height: 80px;
                  background: var(--form-bg-dark);
                  display: grid;
                  align-items: center;
                  justify-content: center;
                  color: var(--text-hover-color);
                  .img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
                .orderBtn-bl {
                  width: 13rem;
                  height: 2.4em;
                  background: var(--primary);
                  color: var(--bg-text-color);
                  border: 1px solid var(--primary);
                  border-radius: 5px;
                  display: grid;
                  align-items: center;
                  justify-content: center;

                  &:hover {
                    background: var(--primary-dark);
                  }
                }
              }
            }
          }

          @media (max-width: 768px) {
            main {
              padding: 0;
            }
            .menber-info-box-bo {
              .orderList-bl {
                padding: 2.4rem 0;
                .cardBody-bl {
                  .orderInfo-bl {
                    height: 13rem;
                    max-width: 100%;
                    .span {
                      color: var(--primary);
                    }
                  }
                }
              }
            }
          }
        `}
      </style>
    </>
  )
}
