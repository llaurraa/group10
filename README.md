# 摸一摸占卜貓 🐱

一個互動式的貓咪占卜應用，使用 React + TypeScript + Vite 開發，整合 Google Gemini AI 提供智能占卜功能。

## 功能特點

- 🎮 互動式貓咪撫摸體驗
- 🔮 AI 驅動的智能占卜
- 🎨 精美的動畫效果
- 📱 響應式設計

## 技術棧

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI
- Lucide Icons

## 本地運行

### 前置需求

- Node.js (建議版本 18 或以上)
- npm 或 yarn

### 安裝步驟

1. **克隆專案**
   ```bash
   git clone <your-repo-url>
   cd group10
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **設置環境變數**

   複製 `.env.local.example` 並重命名為 `.env.local`：
   ```bash
   cp .env.local.example .env.local
   ```

   然後編輯 `.env.local` 文件，填入您的 Gemini API Key：
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

   > 💡 您可以在 [Google AI Studio](https://aistudio.google.com/apikey) 免費獲取 API Key

4. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

   應用將在 `http://localhost:3000` 運行

5. **建構生產版本**
   ```bash
   npm run build
   ```

6. **預覽生產版本**
   ```bash
   npm run preview
   ```

## 部署到 GitHub Pages

### 快速部署步驟

1. **推送代碼到 GitHub**
   ```bash
   git add .
   git commit -m "準備部署"
   git push origin main
   ```

2. **部署到 GitHub Pages**
   ```bash
   npm install
   npm run deploy
   ```

3. **啟用 GitHub Pages**

   前往您的 GitHub 儲存庫：
   - Settings → Pages
   - Source: 選擇 "Deploy from a branch"
   - Branch: 選擇 `gh-pages` / `(root)`
   - 點擊 "Save"

4. **訪問您的應用**

   部署完成後，應用將在以下網址運行：
   ```
   https://llaurraa.github.io/group10/
   ```

### 重要提示

本應用使用 Google Gemini AI，但 **API Key 不能在前端應用中安全使用**。目前的實現方式會在瀏覽器中暴露 API Key。

**建議的解決方案：**

1. **僅用於展示** - 如果只是展示 UI，可以暫時使用受限的 API Key
2. **添加後端服務** - 建議創建一個後端 API 來安全地調用 Gemini API
3. **使用環境變數** - 在本地開發時使用 `.env.local` 文件

### 本地開發注意事項

在本地運行時，創建 `.env.local` 文件：
```bash
cp .env.local.example .env.local
```

然後編輯 `.env.local`，添加您的 API Key。

### 疑難排解

**Q: 部署後頁面顯示空白？**

A: 請確認：
1. 在 vite.config.ts 中已設置正確的 `base: '/group10/'`
2. 在 Settings → Pages 中選擇了 `gh-pages` 分支
3. 等待 1-2 分鐘讓部署完成

**Q: 占卜功能不工作？**

A: 這是因為瀏覽器環境無法安全使用 API Key。建議：
1. 創建後端 API 服務
2. 或使用 Vercel/Netlify 等支援環境變數的部署平台

**Q: npm run deploy 失敗？**

A: 請確認：
1. 已運行 `npm install` 安裝所有依賴
2. Git 工作目錄是乾淨的（沒有未提交的更改）
3. 有推送到 GitHub 的權限

## 環境變數說明

| 變數名稱 | 說明 | 必填 |
|---------|------|------|
| `GEMINI_API_KEY` | Google Gemini API 金鑰 | 是 |

## 專案結構

```
group10/
├── components/          # React 元件
│   ├── CatLoaf.tsx     # 貓咪主體元件
│   ├── Environment.tsx # 環境背景元件
│   ├── Modal.tsx       # 彈窗元件
│   ├── PawEffect.tsx   # 爪印特效元件
│   └── ...             # 其他圖標元件
├── services/           # 服務層
│   └── geminiService.ts # Gemini AI 整合
├── App.tsx            # 主應用元件
├── index.tsx          # 應用入口
├── index.html         # HTML 模板
├── constants.ts       # 常數定義
├── types.ts           # TypeScript 類型定義
├── vite.config.ts     # Vite 配置
└── package.json       # 專案配置
```

## 常見問題

**Q: 為什麼占卜功能不工作？**

A: 請確認您已正確設置 `GEMINI_API_KEY` 環境變數，並且 API Key 有效。

**Q: 如何修改貓咪的互動方式？**

A: 您可以編輯 `components/CatLoaf.tsx` 和相關的常數文件來自訂互動邏輯。

## 授權

本專案僅供學習和研究使用。

## 聯絡方式

如有問題或建議，歡迎提交 Issue 或 Pull Request。
