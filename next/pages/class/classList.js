import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

export default function ClassList() {
  const router = useRouter()
  const {} = router.query
  const [classes, setClasses] = useState([])
  const [pages, setPages] = useState()
  const [filter, setFilter] = useState()

  const getClasses = async () => {
    let newClasses, error
    .map((v, i) => {

    })
  }

  return (
    <>
  {/* container */}
  <div className="container desktop-list-aa">
    <div className="class-header-aa">
      <ul className="d-flex subBar-aa">
        <li>
          <a className="subNav" href="">
            <h6>西洋棋</h6>
          </a>
          <div className="subBarBody-aa d-none">
            <div className="d-flex">
              <div className="subBarDetail-aa">
                <h6 className="title">總覽</h6>
                <ul>
                  <li>
                    <a href="">啟蒙課程</a>
                  </li>
                  <li>
                    <a href="">基礎課程</a>
                  </li>
                  <li>
                    <a href="">進階課程</a>
                  </li>
                  <li>
                    <a href="">高階課程</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <a className="subNav" href="">
            <h6>麻將</h6>
          </a>
          <div className="subBarBody-aa d-none">
            <div className="d-flex">
              <div className="subBarDetail-aa">
                <h6 className="title">總覽</h6>
                <ul>
                  <li>
                    <a href="">啟蒙課程</a>
                  </li>
                  <li>
                    <a href="">基礎課程</a>
                  </li>
                  <li>
                    <a href="">進階課程</a>
                  </li>
                  <li>
                    <a href="">高階課程</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <a className="subNav" href="">
            <h6>圍棋</h6>
          </a>
          <div className="subBarBody-aa d-none">
            <div className="d-flex">
              <div className="subBarDetail-aa">
                <h6 className="title">總覽</h6>
                <ul>
                  <li>
                    <a href="">啟蒙課程</a>
                  </li>
                  <li>
                    <a href="">基礎課程</a>
                  </li>
                  <li>
                    <a href="">進階課程</a>
                  </li>
                  <li>
                    <a href="">高階課程</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <a className="subNav" href="">
            <h6>撲克</h6>
          </a>
          <div className="subBarBody-aa d-none">
            <div className="d-flex">
              <div className="subBarDetail-aa">
                <h6 className="title">總覽</h6>
                <ul>
                  <li>
                    <a href="">啟蒙課程</a>
                  </li>
                  <li>
                    <a href="">基礎課程</a>
                  </li>
                  <li>
                    <a href="">進階課程</a>
                  </li>
                  <li>
                    <a href="">高階課程</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <a className="subNav" href="">
            <h6>象棋</h6>
          </a>
          <div className="subBarBody-aa d-none">
            <div className="d-flex">
              <div className="subBarDetail-aa">
                <h6 className="title">總覽</h6>
                <ul>
                  <li>
                    <a href="">啟蒙課程</a>
                  </li>
                  <li>
                    <a href="">基礎課程</a>
                  </li>
                  <li>
                    <a href="">進階課程</a>
                  </li>
                  <li>
                    <a href="">高階課程</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div className="sec1-aa">
      <div className="text2-aa phohe-H1">課程排行</div>
      <div className="classCards-aa">
        <div className="classCard-aa">
          {/* <rank1-aa>
      1
    </rank1-aa> */}
          <div className="imgBox-aa">
            <img
              src="https://hahow-production.imgix.net/5fb4fc22563bc0262f9fb105?w=1000&sat=0&auto=format&s=f7cb3bd23dc48b1089edb34423906993"
              alt=""
            />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
      </div>
      <div className="line-aa">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={1298}
          height={4}
          viewBox="0 0 1298 4"
          fill="none"
        >
          <path
            d="M2 0H0V4H2V0ZM1296 4C1297.1 4 1298 3.10457 1298 2C1298 0.895431 1297.1 0 1296 0V4ZM2 4H1296V0H2V4Z"
            fill="url(#paint0_linear_2284_1232)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2284_1232"
              x1={649}
              y1={2}
              x2={649}
              y2={3}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DAA520" />
              <stop offset={1} stopColor="#745811" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="texth2-aa">所有課程 列表</div>
      <div className="text2-aa phohe-H1">西洋棋</div>
      <div className="classCards-aa">
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
      </div>
      <div className="btn-more d-flex">
        <p>查看更多</p>
        <i className="edit-icon" />
      </div>
      <div className="text2-aa phohe-H1">麻將</div>
      <div className="classCards-aa">
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
      </div>
      <div className="btn-more d-flex">
        <p>查看更多</p>
        <i className="edit-icon" />
      </div>
      <div className="text2-aa phohe-H1">圍棋</div>
      <div className="classCards-aa">
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
      </div>
      <div className="btn-more d-flex">
        <p>查看更多</p>
        <i className="edit-icon" />
      </div>
      <div className="text2-aa phohe-H1">撲克</div>
      <div className="classCards-aa">
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
      </div>
      <div className="btn-more d-flex">
        <p>查看更多</p>
        <i className="edit-icon" />
      </div>
      <div className="text2-aa phohe-H1">象棋</div>
      <div className="classCards-aa">
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
        <div className="classCard-aa">
          <div className="imgBox-aa">
            <img src="" alt="" />
          </div>
          <div className="cardBody-aa">
            <div className="className-aa">
              <p>西洋棋國手教你下西洋棋</p>
              <p className="classDescription-aa">劉業揚＆楊元翰</p>
            </div>
            <p>NT. 450</p>
          </div>
        </div>
      </div>
      <div className="btn-more d-flex">
        <p>查看更多</p>
        <i className="edit-icon" />
      </div>
    </div>
  </div>
</>

  )
}
