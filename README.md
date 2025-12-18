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

本專案使用 **GitHub Actions** 自動部署。每次推送到 `main` 分支時，會自動觸發建構和部署流程。

### 🚀 自動部署設置步驟

#### 1. **設置 GitHub Pages**

前往您的 GitHub 儲存庫設置：
```
https://github.com/llaurraa/group10/settings/pages
```

配置如下：
- **Source**: 選擇 `GitHub Actions`
- 點擊 **Save**

#### 2. **設置 API Key（可選）**

如果您想要占卜功能正常運作，需要添加 Gemini API Key：

前往：
```
https://github.com/llaurraa/group10/settings/secrets/actions
```

步驟：
- 點擊 **New repository secret**
- **Name**: `GEMINI_API_KEY`
- **Value**: 您的 [Gemini API Key](https://aistudio.google.com/apikey)
- 點擊 **Add secret**

> ⚠️ **安全提示**：即使使用 GitHub Secrets，API Key 仍會在建構時被嵌入前端代碼中，因此仍然不完全安全。建議僅用於展示或使用受限的 API Key。

#### 3. **推送代碼觸發部署**

```bash
git add .
git commit -m "更新內容"
git push origin main
```

#### 4. **查看部署狀態**

前往 Actions 頁面查看部署進度：
```
https://github.com/llaurraa/group10/actions
```

部署成功後，訪問您的應用：
```
https://llaurraa.github.io/group10/
```

---

### 📝 工作流程說明

GitHub Actions 會自動執行以下步驟：

1. ✅ 檢出代碼
2. ✅ 設置 Node.js 環境
3. ✅ 安裝依賴 (`npm ci`)
4. ✅ 建構專案 (`npm run build`)
5. ✅ 上傳建構產物
6. ✅ 部署到 GitHub Pages

配置文件位於：[.github/workflows/deploy.yml](.github/workflows/deploy.yml)

---

### 🔧 本地開發

在本地運行時，創建 `.env.local` 文件：
```bash
cp .env.local.example .env.local
```

然後編輯 `.env.local`，添加您的 API Key：
```
GEMINI_API_KEY=your_actual_api_key_here
```

---

### ❓ 疑難排解

**Q: 部署後頁面顯示空白？**

A: 檢查以下項目：
1. ✅ 在 [vite.config.ts:8](vite.config.ts#L8) 中已設置 `base: '/group10/'`
2. ✅ 在 Settings → Pages 中選擇了 `GitHub Actions` 作為來源
3. ✅ 等待部署完成（查看 Actions 頁面）
4. ✅ 清除瀏覽器快取並重新整理

**Q: Actions 部署失敗？**

A: 檢查 Actions 日誌：
1. 前往 [Actions 頁面](https://github.com/llaurraa/group10/actions)
2. 點擊失敗的工作流程查看錯誤訊息
3. 常見問題：
   - 依賴安裝失敗 → 檢查 package.json
   - 建構失敗 → 檢查 TypeScript 錯誤
   - 權限問題 → 確認 Settings → Pages → Source 設為 `GitHub Actions`

**Q: 占卜功能不工作？**

A: 兩個可能原因：
1. 未設置 `GEMINI_API_KEY` secret
2. API Key 在前端暴露的安全限制

**建議方案**：
- 🎯 **僅展示 UI** - 不設置 API Key，展示介面即可
- 🔐 **使用後端** - 建立 API 服務來安全調用 Gemini
- ☁️ **使用 Vercel/Netlify** - 支援環境變數的無伺服器部署

**Q: 如何手動部署？**

A: 如果不想使用 GitHub Actions，可以手動部署：
```bash
npm install
npm run deploy
```

然後在 Settings → Pages 中選擇 `gh-pages` 分支。

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
