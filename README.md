# EastWind

萬事俱備，只欠東風

![image](https://github.com/user-attachments/assets/ffee3d42-bdfa-4811-81c4-a446117cfbbe)

請大家嚴格遵守 upload 規範<br/> 請大家嚴格遵守 upload 規範<br/>

<h3>**在上傳前update你的版本極度重要**</h3><br/>
協作流程<br/>

git checkout "自己的分支" -> 到自己的分支下做事<br/>

做到一段落要上傳的流程為: <br/>
git commit -m "更新内容" -> <br/>
git checkout dev (跳至 dev 分支) -> <br/>
git pull origin dev (拉雲端 dev 下來確認為最新檔案)　-><br/>
git checkout "自己的分支" (回到自己的分支) -><br/>
git merge dev (合併 dev 檔案至 A，有衝突解衝突) -><br/>
git push origin "自己的分支" (備份 "自己的分支" 檔案至雲端) -><br/>
git checkout dev (跳至 dev 分支) -><br/>  
git merge "自己的分支" (合併整合好的 "自己的分支" 到 dev 分支) -><br/>
git push origin dev (上傳 dev 檔案)<br/>

**git checkout "自己的分支"** 最後要再記得 切回 "自己的分支" 開發!!!重要!!!<br/>

<h3>**在上傳前update你的版本極度重要**</h3><br/>
<br/>
每個人都建立自己的分支做事，定期Pull&Push到dev更新進度<br/>
<br/>
若有更新Main分支會Line通知大家**通知後務必優先Pull Main到最新進度**
<br/>
命名約定：對分支、提交信息和標籤進行一致的命名約定，讓每個團隊成員都清楚地知道每個分支的目的和內容。<br/>
EX: Commit  mm/dd 簡要描述更新的內容<br/>
標題：簡明扼要地描述變更的內容。<br/>
描述：詳細說明變更的背景、目的、和實現方法，並列出任何需要注意的事項或相關問題。<br/>
<br/>
定期同步：所有成員應定期從主分支拉取最新更新，以減少衝突的發生。<br/>
<br/>
<br/>

# Project Team Members and Responsibilities

## 陳功吳 (組長) - [d123469@gmail.com](mailto:d123469@gmail.com)

- **頁面切版**: 棋牌室入口頁面、揪團/訂桌列表及詳細、參團列表及詳細
- **React 程式開發**: 揪團/訂桌列表及詳細、參團列表及詳細、棋牌室收藏
- **Node.js 資料庫串接**: 會員資料、棋牌室資料、派對資料、收藏資料
- **Figma**: 棋牌室入口頁面、揪團/訂桌列表及詳細、參團列表及詳細
- **建立 MySQL 資料庫**: 棋牌室資料表、棋牌室服務資料表、派對資料表、派對規則資料表
- **企劃書撰寫**: 棋牌室相關頁面介紹
- **視覺設計**: Logo 設計

## 沈正龍 (技術長) - [a86774546@gmail.com](mailto:a86774546@gmail.com)

- **頁面 RWD 切版**: 商品列表及詳細、購物車、付款頁面、會員中心訂單列表及詳細
- **React 程式開發**: 商品列表及詳細、商品篩選與排序、推薦商品、評論系統、商品收藏、課程收藏(協作)、購物車、會員中心訂單列表及詳細、數據分析 Chart API 串接、出貨狀況更改、客服中心頁面
- **RESTful API 路由設計**: 購物車、收藏
- **Node.js 資料庫串接**: 會員資料、商品資料、優惠券資料、評論資料、收藏資料、購物車資料、訂單資料、websocket 使用、綠界 API 串接、LinePayAPI 串接、7-11 店到店 API 串接
- **Figma**: 商品列表及詳細、購物車、付款頁面、會員中心訂單列表及詳細
- **建立 MySQL 資料庫**: 商品相關資料表、評論資料表、收藏資料表、訂單資料表
- **企劃書撰寫**: 品牌介紹、動機與目的、使用者分析、網站建置、商品相關頁面介紹、購物車付款流程相關頁面介紹、官方後台頁面介紹
- **視覺設計**: 首頁鼠標翻牌動畫

## 顏柏羽 - [z82529371@gmail.com](mailto:z82529371@gmail.com)

- **頁面 RWD 切版**: 首頁、Footer、Header、登入、忘記密碼、重設密碼、註冊、會員中心側邊欄、會員資料、會員資料修改、訂桌紀錄、揪團紀錄、我的最愛、優惠券
- **React 程式開發**: 
    首頁 (動態呈現)、Header (動態呈現),
    登入登出 (多元登入整合 - 帳號密碼、Google、LINE),
    忘記密碼 (需信箱驗證)、註冊 (需信箱驗證),
    會員資料檢視、會員資料修改 (表單驗證、更改信箱驗證、照片變更、信用卡新增刪除),
    訂桌紀錄 (多狀態檢視、搜尋、排序、取消訂桌郵件通知、連結店家詳情),
    揪團紀錄 (多身分與多狀態檢視、搜尋、排序、連結揪團詳情與店家詳情),
    我的最愛 (多類型檢視、刪除最愛、搜尋、連結各最愛詳情),
    優惠劵 (多狀態檢視、代碼領取、點擊領取、新會員自動發放)
- **RESTful API 路由設計**: 首頁、會員登入登出、第三方登入 (Google、LINE)、忘記密碼、註冊、會員資料修改、訂桌紀錄、揪團紀錄、我的最愛、優惠劵
- **Node.js 資料庫串接**: 會員資料、第三方會員資料 (Google、Line)、商品資料、商品品牌資料、優惠券資料、會員已領取優惠劵資料、棋牌室資料、棋牌室桌子資料、棋牌室照片資料、揪團資料、課程資料、課程類別資料、訂桌資料、
    信用卡資料、我的最愛資料
- **Figma**: 首頁、Footer、Header、會員資料、會員資料修改、訂桌紀錄、揪團紀錄、我的最愛、優惠劵、登入、忘記密碼、重設密碼、註冊、會員中心側邊欄
- **建立 MySQL 資料庫**: 會員資料表、棋牌室資料表、棋牌室照片資料表、棋牌室桌子資料表、優惠券資料表、會員已領取優惠劵資料表、我的最愛資料表、信用卡資料表
- **企劃書撰寫**: 首頁及共同介面介紹、會員中心介紹
- **視覺設計**: 主視覺統籌、設計色彩及字體規則、Loading 動畫製作

## 王昱喆 - [20yzwang@gmail.com](mailto:20yzwang@gmail.com)

- **頁面切版**: 課程列表及詳細
- **React 程式開發**: 課程列表及詳細、課程收藏
- **Node.js 資料庫串接**: 會員資料、課程資料
- **Figma**: 課程列表及詳細
- **建立 MySQL 資料庫**: 課程資料表
- **企劃書撰寫**: 課程相關頁面介紹

<br/>
<br/>
08/07 初始化專案!
