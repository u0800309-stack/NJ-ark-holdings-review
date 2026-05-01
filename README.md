# 方舟持股複盤台

這是一個可直接部署到 GitHub Pages 的純前端持股複盤工具。

## 功能

- 匯入或拖放持股 CSV
- 輸入現金、風控水位、單一持股上限
- 輸入時事 / 總經 / 大盤脈絡
- 依照 10 段「方舟複盤」架構輸出分析
- 產出持股明細、部位佔比、損益、位階與調節建議

## CSV 欄位

建議欄位：

```csv
symbol,name,sector,shares,avgCost,price,thesis,level
```

也支援常見中文欄名：代號、名稱、產業、股數、均價、現價、邏輯、位階。

## 部署到 GitHub Pages

1. 建立 GitHub repository。
2. 上傳 `index.html`、`README.md`、`.nojekyll`。
3. 到 `Settings` → `Pages`。
4. Source 選 `Deploy from a branch`。
5. Branch 選 `main`，資料夾選 `/root`。
6. 儲存後等待 GitHub 產生網址。

## 注意

本工具用於投資複盤與風險檢查，不構成任何買賣建議。實際操作仍需依照個人風險承受度與最新資訊判斷。
