;<div className={`${styles['party-list-col-bo']} d-flex flex-column`}>
  <div className="d-none d-md-block">
    <input
      type="checkbox"
      id="showDetailDesktop"
      className={styles['show-detail-desktop-bo']}
    />
    <label
      className={`${styles['list-col-head-desktop-bo']} d-none d-md-flex justify-content-around align-items-center text-center`}
      htmlFor="showDetailDesktop"
    >
      <h6>17465544</h6>
      <h6>麻將大師 板橋店</h6>
      <div className={`${styles['list-time-bo']} d-flex flex-column flex-row`}>
        <h6>2023 / 12 / 12</h6>
        <h6>10 : 00 - 13 : 00</h6>
      </div>
      <div
        className={`${styles['btn-cancel-bo']} btn h6 d-flex justify-content-center align-items-center gap-2`}
      >
        <FaBan />
        <div
          className={`${styles['btn-cancel-text-bo']} d-flex justify-content-center align-items-center text-center`}
        >
          <p>取消</p>
          <p>預訂</p>
        </div>
      </div>
      <h6>
        <FaChevronDown className={` ${styles['btn-detail-bo']}`} />
      </h6>
    </label>
    <div
      className={`${styles['list-col-desktop-body-bo']} flex-column flex-sm-row justify-content-between align-items-center gap-2`}
    >
      <ul className="d-flex flex-column justify-content-between align-items-start gap-1">
        <li
          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
        >
          <FaMapMarkerAlt className={`${styles['col-icon-bo']}`} />
          新北市板橋區松江街28號
        </li>
        <li
          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
        >
          <FaPhone className={`${styles['col-icon-bo']}`} />
          02-22222222
        </li>
        <li
          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
        >
          <FaShop className={`${styles['col-icon-bo']}`} />
          大廳 / 1桌
        </li>
        <li
          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
        >
          <FaMoneyBill className={`${styles['col-icon-bo']}`} />
          600
        </li>
      </ul>

      <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center gap-3">
        <button
          className={`${styles['btn-shop-detail']} btn p d-flex justify-content-center align-items-center`}
        >
          <FaMagnifyingGlass className={` ${styles['btn-icon-bo']}`} />
          <div
            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <p>店家</p>
            <p>詳情</p>
          </div>
        </button>
        <button
          className={`${styles['btn-shop-Contact']} btn p d-flex justify-content-center align-items-center`}
        >
          <FaCommentDots />
          <div
            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <p>聯絡</p>
            <p>店家</p>
          </div>
        </button>
        <button
          className={`${styles['btn-QR-code']} btn p d-flex justify-content-center align-items-center`}
        >
          <FaStar />
          <div
            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <p>評價</p>
            <p>店家</p>
          </div>
        </button>
      </div>
    </div>
  </div>

  <div className="d-block d-md-none">
    <input
      type="checkbox"
      id="showDetailMobile"
      className={styles['show-detail-mobile-bo']}
    />
    <label
      className={`${styles['list-col-head-mobile-bo']} d-flex d-md-none justify-content-between align-items-center text-center`}
      htmlFor="showDetailMobile"
    >
      <div className="d-flex flex-column justify-content-center align-items-start gap-2">
        <div className="d-flex justify-content-between w-100">
          <h6>17465544</h6>
        </div>
        <h6>麻將大師 板橋店</h6>
        <div
          className={`${styles['list-time-bo']} d-flex flex-row flex-lg-row`}
        >
          <h6>2023 / 12 / 12</h6>
          <h6>10 : 00 - 13 : 00</h6>
        </div>
      </div>
      <div></div>
      <div className="d-flex justify-content-center align-items-center gap-4">
        <div
          className={`${styles['btn-cancel-bo']} btn h6 d-flex justify-content-center align-items-center gap-2`}
        >
          <FaBan />
          <div
            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <p>取消</p>
            <p>預訂</p>
          </div>
        </div>
        <h6>
          <FaChevronDown className={` ${styles['btn-detail-bo']}`} />
        </h6>
      </div>
    </label>
    <div
      className={`${styles['list-col-body-bo']} flex-column flex-sm-row justify-content-between align-items-center gap-2`}
    >
      <ul className="d-flex flex-column justify-content-between align-items-start gap-1">
        <li
          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center text-start`}
        >
          <FaMapMarkerAlt className={`${styles['col-icon-bo']}`} />
          新北市板橋區松江街28號
        </li>
        <li
          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
        >
          <FaPhone className={`${styles['col-icon-bo']}`} />
          02-22222222
        </li>
        <li
          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
        >
          <FaShop className={`${styles['col-icon-bo']}`} />
          大廳 / 1桌
        </li>
        <li
          className={`${styles['list-text-bo']} p d-flex justify-content-center align-items-center`}
        >
          <FaMoneyBill className={`${styles['col-icon-bo']}`} />
          600
        </li>
      </ul>

      <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center gap-3">
        <button
          className={`${styles['btn-shop-detail']} btn p d-flex justify-content-center align-items-center`}
        >
          <FaMagnifyingGlass className={` ${styles['btn-icon-bo']}`} />
          <div
            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <p>店家</p>
            <p>詳情</p>
          </div>
        </button>
        <button
          className={`${styles['btn-shop-Contact']} btn p d-flex justify-content-center align-items-center`}
        >
          <FaCommentDots />
          <div
            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <p>聯絡</p>
            <p>店家</p>
          </div>
        </button>
        <button
          className={`${styles['btn-QR-code']} btn p d-flex justify-content-center align-items-center`}
        >
          <FaStar />
          <div
            className={`${styles['btn-text-bo']} d-flex justify-content-center align-items-center text-center`}
          >
            <p>評價</p>
            <p>店家</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
