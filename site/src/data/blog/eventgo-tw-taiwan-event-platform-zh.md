---
author: Luff
type: post
pubDatetime: 2026-03-27T12:00:00+08:00
modDatetime: 2026-03-27T12:00:00+08:00
title: "EventGo — 我為台灣打造的活動探索平台"
featured: true
draft: false
categories:
  - Project
tags:
  - EventGo
  - 活動探索
  - Elasticsearch
  - AI 搜尋
  - Side Project
description: "EventGo (eventgo.tw) 是一個整合全台活動資訊的探索平台，結合混合式搜尋引擎、AI 聊天推薦、地圖與日曆瀏覽。這是我從零開始打造它的故事。"
ogImage: ../../assets/images/eventgo/og-cover.png
---

> *「台灣每個週末都有上千場活動在各個角落綻放，然後悄悄消逝。我想建造一張網，把它們全部接住。」*

---

<figure>
  <img
    src="../../assets/images/eventgo/festival-sunset.png"
    alt="台灣戶外音樂祭的落日場景，天燈緩緩升空，群眾舉手歡呼"
  />
  <figcaption class="text-center">
    音樂祭、展覽、市集、講座——台灣的活動散落在數十個平台上，從來沒有一個地方能一次找到它們。
  </figcaption>
</figure>

## 一個沒人在解決的問題

如果你曾經在某個週六早上打開手機，想找點事做，你一定知道那種挫折感。

活動資訊散落在 Facebook 社團、政府入口網站、售票平台、還有各種社區佈告欄。你要不是靠運氣撞見，就是錯過。打開 Google 搜尋「台北週末活動」，出來的結果永遠是兩年前的部落格文章。

我一直在問自己：為什麼沒有一個地方，能讓我搜尋到**所有正在發生的活動**？

問了很久沒人回答，所以我自己建了一個。

[**EventGo**](https://eventgo.tw/) 是一個全端活動探索平台。它從全台各大來源聚合活動資訊，讓你用[智慧搜尋](https://eventgo.tw/search)、互動地圖、[日曆檢視](https://eventgo.tw/search?view=calendar)，甚至 [AI 聊天機器人](https://eventgo.tw/chat)來找到你想參加的活動。

---

## EventGo 做了什麼不一樣的事

### 混合式搜尋：不只是關鍵字比對

大部分活動平台的搜尋功能，本質上就是 `Ctrl+F`。你打「音樂」，它就把所有標題有「音樂」兩個字的東西丟給你。但人搜尋的方式不是這樣的——你心裡想的可能是「這週末有沒有戶外的、輕鬆的、免費的活動」。

EventGo 採用**混合式搜尋架構**：

- **30% BM25 文字比對** — 精準匹配關鍵字
- **70% 向量語意搜尋** — 理解搜尋的意圖，不只是字面意思

<figure>
  <img
    src="../../assets/images/eventgo/glass-cube.png"
    alt="一個折射光線的玻璃立方體，象徵多面向的搜尋引擎架構"
  />
  <figcaption class="text-center">
    混合式搜尋結合了傳統文字匹配的精確性與向量嵌入的語意理解能力。
  </figcaption>
</figure>

背後的技術細節：
- **Elasticsearch 9** 搭配 ICU 中文分詞，正確處理繁體中文斷詞
- **Qwen3 嵌入模型**（4096 維 Matryoshka 向量），在獨立 GPU 工作站上運行
- **Redis 快取**，24 小時 TTL，重複查詢回應時間 < 1ms
- **智慧排序**，考慮時間衰減與地理位置

當你搜尋「週末台北免費展覽」，EventGo 不只是找到標題包含這些字的活動——它理解你在找什麼*體驗*。

### 三種瀏覽方式

每個人探索活動的方式不同。EventGo 提供三種檢視：

- [**列表模式**](https://eventgo.tw/search) — 經典搜尋結果，支援類別、城市、日期、價格篩選
- **地圖模式** — Leaflet.js 互動地圖，直覺地看到活動在哪裡
- [**日曆模式**](https://eventgo.tw/search?view=calendar) — 月曆排版，一眼掌握整週行程

### AI 聊天推薦

EventGo 的 [AI 聊天機器人](https://eventgo.tw/chat)不是通用問答機器人。它直接連接即時活動資料庫，能理解像是「我週末要帶女朋友出去，想找浪漫一點的免費活動，最好在台北」這樣的自然語言。

它會搜尋、篩選，然後給你策劃過的推薦清單——附上連結、時間、地點，可以直接點進去看。

<figure>
  <img
    src="../../assets/images/eventgo/cyber-city.png"
    alt="賽博龐克風格的未來城市，代表 EventGo 背後的 AI 技術"
  />
  <figcaption class="text-center">
    AI 聊天機器人直接連結搜尋引擎——每一個推薦都來自真實的、即時的活動資料。
  </figcaption>
</figure>

---

## 技術架構

| 層級 | 技術棧 |
|------|--------|
| **前端** | Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS |
| **後端** | Hono + Node.js + TypeScript |
| **搜尋** | Elasticsearch 9（混合 BM25 + kNN） |
| **嵌入模型** | Qwen3 8B，透過 Ollama 在 GPU 工作站運行 |
| **AI 聊天** | 多模型代理，支援工具呼叫 |
| **資料層** | PostgreSQL + Redis + RabbitMQ |
| **反向代理** | Caddy 2，自動 HTTPS |
| **SSR** | 完整的伺服器端渲染，SEO 優化 |

整個平台跑在自架的伺服器上——沒有雲端帳單，沒有供應商鎖定。每一個元件都是我可以自己除錯、調校、擴展的。

---

## 目前的成果

截至 2026 年 3 月：

- **4,000+** 場活動已索引並可搜尋
- [**76** 個自動發現的主題分類](https://eventgo.tw/explore)（透過 k-means 分群 + LLM 命名）
- **亞秒級**搜尋回應（快取查詢 < 1ms）
- **4,476** 個頁面已被 Google Search Console 發現

---

## 打造 EventGo 教會我的事

<figure>
  <img
    src="../../assets/images/eventgo/music-festival.png"
    alt="音樂祭現場，群眾高舉雙手，天燈飄向山巒背景的天空"
  />
  <figcaption class="text-center">
    打造 EventGo 讓我學到：搜尋引擎最難的部分不是演算法，而是理解人真正想找的是什麼。
  </figcaption>
</figure>

**中文 NLP 很難。** 繁體中文的斷詞和英文完全不同。沒有 ICU 分詞器，Elasticsearch 會把整個句子當成一個 token。要讓搜尋品質到位，你需要理解語言學，不只是工程。

**混合搜尋值得那份複雜度。** 純向量搜尋會「幻覺」出不相關的結果。純 BM25 會漏掉語意相近的內容。30/70 的混合比例是在真實用戶查詢上調了好幾週才找到的——效果非常好。

**自架是一種超能力。** 當你掌控整個技術棧，你的迭代速度就是你的思考速度。沒有等待部署、沒有意外帳單、沒有黑箱抽象層。代價是維運負擔——但對一個獨立開發者來說，學習本身就是目的。

**先上線，再完美。** EventGo 最初只是一個週末的 hack。第一版沒有向量搜尋、沒有聊天、沒有地圖。每一個功能都是因為真正的使用者（通常是我自己）需要它才加上的。最好的架構是會演化的架構。

---

## 來試試看

<figure>
  <img
    src="../../assets/images/eventgo/cherry-blossom.png"
    alt="夢幻的櫻花隧道，一個女孩在花瓣中旋轉起舞，象徵台灣季節性活動的魔力"
  />
  <figcaption class="text-center">
    櫻花季、音樂祭、夜市、藝術展——不管你在找什麼，EventGo 幫你找到。
  </figcaption>
</figure>

**[eventgo.tw](https://eventgo.tw/)** — 探索正在台灣發生的活動。

不管你是在地人想找週末計畫、旅行者想探索這座島嶼，還是單純相信「最好的事情發生在你出現的時候」——EventGo 是為你打造的。

---

*用偏執的細節追求、不合理的熬夜時數、以及一個信念建造而成：台灣的活動生態值得更好的工具。*

*— Luff*
