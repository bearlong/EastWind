function partypage() {
  return (
    <html
    key="1"
    lang="en"
  >
    <head>
      <title>
        PartRoom
      </title>
      <meta charSet="utf-8" />
      <meta
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
        name="viewport"
      />
      <link
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        rel="stylesheet"
      />
      <link
        href="public/Normalize.css"
        rel="stylesheet"
      />
      <link
        href="/public/public.css"
        rel="stylesheet"
      />
      <link
        href="gw-css.css"
        rel="stylesheet"
      />
      <link
        crossOrigin="anonymous"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
        referrerPolicy="no-referrer"
        rel="stylesheet"
      />
    </head>
    <body>
      <header>
      </header>
      <main>
        <div className="container">
    <BreadCrumb/>

          {/* <nav
            aria-label="breadcrumb"
            className="BC-gw"
          >
            <ol className="breadcrumb p">
              <li className="breadcrumb-item">
                <a href="#">
                  全台棋牌室
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">
                  參團
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">
                  北區
                </a>
              </li>
              <li
                aria-current="page"
                className="breadcrumb-item active"
              >
                麻將大師板橋一店
              </li>
            </ol>
          </nav> */}
          
          <div className="gw-page">
            <div className="leftArea g-3">
              <div className="leftNav">
                <nav>
                  <ul className="nav nav-fill">
                    <li className="nav-item">
                      <a
                        aria-current="page"
                        className="nav-active h6"
                        href="#party"
                      >
                        揪團
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="h6"
                        href="#roomInfo"
                      >
                        店家資訊{' '}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="h6"
                        href="#photo"
                      >
                        相片
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="h6"
                        href="#toKnow"
                      >
                        注意事項
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div
                className="gw-infoCard g-3"
                id="party"
              >
                <h6>
                  桌號：MGM8555412DF
                </h6>
                <h6>
                  開團時間：2024/07/20 (sat) 18:00-22:00
                </h6>
                <p>
                  台麻十六張
                </p>
                <div className="rulesBox d-flex justify-content-start gap-2">
                  <p>
                    特殊規則:
                  </p>
                  <p>
                    八仙過海
                  </p>
                  <p>
                    明槓自摸
                  </p>
                  <p>
                    換三張
                  </p>
                  <p>
                    不靠牌
                  </p>
                </div>
              </div>
              <div
                className="gw-infoCard"
                id="roomInfo"
              >
                <div className="roomCard mb-3">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="gw-logoArea">
                        <img
                          alt="..."
                          className="img-fluid rounded-start"
                          src="/img/Mahjong-masters-logo-transparent-horizontal-300x176.png"
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="room-rate d-flex gap-5">
                          <div className="star">
                            <i className="fa-solid fa-star faSz red" />
                            <i className="fa-solid fa-star faSz red" />
                            <i className="fa-solid fa-star faSz red" />
                            <i className="fa-solid fa-star faSz red" />
                            <i className="fa-solid fa-star faSz" />
                          </div>
                          <div className="gap-5">
                            <i className="fa-regular fa-heart faSz mx-2" />
                            <i className="fa-solid fa-thumbs-up faSz" />
                          </div>
                        </div>
                        <div className="card-title">
                          <h3 className="card-title">
                            麻將大師板橋一店
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="roomAd">
                  <div className="roomAdInfo mb-3">
                    <div className="row">
                      <div>
                        <div className="card-body">
                          <div className="gw-infoBox">
                            <div className="left">
                              <div className="gw-address">
                                <p>
                                  22047, 新北市板橋區松江街28號
                                </p>
                              </div>
                              <div>
                                <p>
                                  電話: 02-26885588
                                </p>
                              </div>
                            </div>
                            <div className="right">
                              <div className="gw-mapImg">
                                <img
                                  alt="mapimg"
                                  className="img-fluid rounded-start"
                                  src="/img/Google_Maps_icon_(2015-2020).svg.png"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="time d-flex align-items-center">
                            <div className="p">
                              <a
                                aria-controls="collapseExample"
                                aria-expanded="false"
                                className=""
                                data-bs-toggle="collapse"
                                href="#collapseExample"
                                role="button"
                              >
                                週四: 8:00-22:00
                                <i className="fa-solid fa-caret-down" />
                              </a>
                              <div
                                className="collapse"
                                id="collapseExample"
                              >
                                <div className="p">
                                  周一:8:00到22:00
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="serverBox d-flex justify-content-between my-3">
                  <span className="pill p">
                    禁菸環境
                  </span>
                  <span className="pill p">
                    過山車麻將桌
                  </span>
                  <span className="pill p">
                    代訂鹹酥雞
                  </span>
                  <span className="pill p">
                    免費飲料點心
                  </span>
                </div>
                <div className="roomInfo">
                  <div className="gw-bb">
                    <h6>
                      店家簡介
                    </h6>
                  </div>
                  <div className="">
                    <p>
                      麻將大師是只欠東風精選店家，場地均提供免費飲料與無限網路，同時提供熟食簡餐多樣選擇。
                    </p>
                    <p>
                      麻將大師所有場館均使用東方不敗過山車電動麻將桌，給您最好的硬體享受，另有麻將包廂，給您安靜隱私的遊玩環境，數量有限，儘速預定。
                    </p>
                    <p>
                      全館嚴格禁菸，定時清潔。
                    </p>
                  </div>
                </div>
                <div className="roomInfo">
                  <div className="gw-bb my-3">
                    <h6>
                      費用
                    </h6>
                  </div>
                  <p>
                    大廳:100/hr
                  </p>
                  <p>
                    包廂:200/hr
                  </p>
                </div>
              </div>
              <div
                className="imgArea gw-infoCard mb-3"
                id="photo"
              >
                <h5 className="gw-bb">
                  相片
                </h5>
                <div className="d-flex justify-content-between">
                  <div className="mainImg">
                    <img
                      alt=""
                      src="/img/store_img-1.jpeg"
                    />
                  </div>
                  <div className="sideImg">
                    <div className="smallImg">
                      <img
                        alt=""
                        src="/img/store_img-2.jpeg"
                        srcSet=""
                        width="80"
                      />
                    </div>
                    <div className="smallImg">
                      <img
                        alt=""
                        src="/img/store_img-3.jpeg"
                        srcSet=""
                        width="80"
                      />
                    </div>
                    <div className="smallImg">
                      <img
                        alt=""
                        src="/img/store_img-4.jpeg"
                        srcSet=""
                        width="80"
                      />
                    </div>
                    <div className="smallImg">
                      <img
                        alt=""
                        src="/img/store_img-1.jpeg"
                        srcSet=""
                        width="80"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="toKnow"
                id="toKnow"
              >
                <div className="card text-dark bg-light mb-3">
                  <div className="card-header">
                    <h6>
                      注意事項
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      <ol>
                        <li>
                          請勿遲到，確定好地址與自身時間。
                        </li>
                        <li>
                          競技遊戲有輸有贏，文明語言，拒絕任何形式之暴力行為。
                        </li>
                        <li>
                          請參閱桌主之規則，遵守規則，若有爭議以平台合約做最終解釋。
                        </li>
                        <li>
                          嚴禁賭博之行為，檢舉專線：02-2222-2222。
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightArea g-3">
              <div className="partyPayers">
                <nav className="rightNav">
                  <ul className="nav">
                    <li className="nav-item">
                      <a
                        aria-current="page"
                        className="active"
                        href="#party"
                      >
                        <h6>
                          揪團等候區
                        </h6>
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="playerCard gap-3 bg-light">
                  <div className="playerImg">
                    <img
                      alt=""
                      className="img-fluid"
                      src="/img/001.JPG"
                    />
                  </div>
                  <div className="cardBody">
                    <h5>
                      name
                    </h5>
                    <p>
                      vicchen
                    </p>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn btn-primary btn-lg p"
                    type="button"
                  >
                    加入/離開
                  </button>
                  <button
                    className="btn btn-danger btn-lg p"
                    type="button"
                  >
                    解散
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
      </footer>
      <script
        crossOrigin="anonymous"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      />
      <script
        crossOrigin="anonymous"
        integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      />
    </body>
  </html>
  );
}

export default partypage;