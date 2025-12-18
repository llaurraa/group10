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

1. **安裝 gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **修改 package.json**

   添加以下內容到 `package.json`：
   ```json
   {
     "homepage": "https://<your-username>.github.io/<your-repo-name>",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **修改 vite.config.ts**

   添加 base 路徑：
   ```typescript
   export default defineConfig({
     base: '/<your-repo-name>/',
     // ... 其他配置
   })
   ```

4. **部署**
   ```bash
   npm run deploy
   ```

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
