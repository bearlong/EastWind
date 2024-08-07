# EastWind

萬事俱備，只欠東風

![image](https://github.com/user-attachments/assets/ffee3d42-bdfa-4811-81c4-a446117cfbbe)

請大家嚴格遵守 upload 規範<br/> 請大家嚴格遵守 upload 規範<br/>

<h3>**在上傳前update你的版本極度重要**</h3><br/>
協作流程<br/>

git checkout "自己的分支" -> 到自己的分支下做事<br/> 做到一段落要上傳的流程為
:<br/> git commit -m "更新内容" -> <br/> git checkout dev (跳至 dev 分支) -> git
pull origin dev(拉雲端 dev 下來確認為最新檔案)　-><br/> git checkout "自己的分支
" (回到自己的分支) -> git merge dev(合併 dev 檔案至 A，有衝突解衝突) -><br/> git
push origin "自己的分支"(備份"自己的分支"檔案至雲端) -><br/> git checkout dev (
跳至 dev 分支) -> git merge "自己的分支"(合併整合好的"自己的分支"到 dev 分支)
-><br/> git push origin dev(上傳 dev 檔案)<br/> **git checkout A** 最後要再記得
切回 A 開發!!!重要!!!<br/>

Commit — git pull origin dev — 有衝突解衝突 — 再 pull origin dev — 最後再 push
origin dev<br/> <br/> Commit 內容: mm/dd 簡要描述更新的內容<br/> 先對本地 commit
版本<br/> pull 更新遠程版本至本地<br/> 推送本地版本致遠程<br/>

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

任務清單 <br/>

**會員系統+主視覺**-柏羽 !!

- [ ] 首頁
- [ ] footer
- [ ] header
- [ ] 登入/註冊
- [ ] 會員中心-個人資訊
- [ ] 會員中心-訂桌紀錄
- [ ] 會員中心-揪團紀錄
- [ ] 會員中心-我的最愛
- [ ] 會員中心-優惠券

**電商平台**-正龍

- [ ] 商品列表
- [ ] 商品詳細
- [ ] 購物車
- [ ] 付款流程
- [ ] 會員中心-訂單

**線上課程**-昱喆

- [ ] 課程列表
- [ ] 課程詳細
- [ ] 上傳課程
- [ ] 會員中心-課程
- [ ] 觀看課程\*\*
- [ ] 觀看課程\*\*

**訂桌/揪團**-功吾

- [ ] 棋牌室首頁
- [ ] 訂桌/揪團列表
- [ ] GOOGLE MAP API\*\*
- [ ] GOOGLE MAP API\*\*
- [ ] 訂桌詳細
- [ ] 揪團詳細

**企業會員後台**--祖泓

- [ ] 企業會員登入註冊
- [ ] 企業會員資訊、修改
- [ ] POS 機畫面
- [ ] 客服中心\*\*
- [ ] 數據分析\*\*
- [ ] POS 機畫面
- [ ] 客服中心\*\*
- [ ] 數據分析\*\*

<br/>
<br/>
08/07 初始化專案!
