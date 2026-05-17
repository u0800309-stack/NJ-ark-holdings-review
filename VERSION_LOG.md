## 2026-05-17 - normal-holdings-pie-chart
- Changed: 持股占比圖改回一般圓餅圖，移除 3D 甜甜圈、中心洞與厚度層。
- Preserved: CSV import behavior, manual 方舟複盤 generation, 3D holdings building chart, target-price tools, and 10-section review output.

## 2026-05-17 - donut-reference-mode
- Fixed: 持股占比圓餅圖 adjusted toward the provided reference mode: fuller top surface, visible lower extrusion, stronger slice glow, deeper center hole, and blue sci-fi base ring.
- Preserved: CSV import behavior, manual 方舟複盤 generation, 3D holdings building chart, target-price tools, and 10-section review output.

## 2026-05-17 - thicker-3d-donut-pie
- Fixed: 持股占比圓餅圖 now has a thicker 3D donut body with a lower extrusion layer, stronger center-hole shadow, and glowing base.
- Preserved: CSV import behavior, manual 方舟複盤 generation, 3D holdings building chart, target-price tools, and 10-section review output.

## 2026-05-17 - precise-hud-fit-and-3d-donut
- Fixed: 重大持股 3D 結構圖 now scales the whole city stage inside the card instead of overflowing.
- Fixed: 持股占比圓餅圖 now uses a tilted, thicker neon 3D donut treatment closer to the reference.
- Preserved: CSV import behavior, manual 方舟複盤 generation, target-price tools, and 10-section review output.

## 2026-05-17 - direct-reference-hud-visual-match
- Scope: Pushed 持股占比圓餅圖 and 重大持股 3D 結構圖 closer to the provided dark-blue neon HUD reference.
- Details: Added angular HUD frames, title glow bars, stronger 3D donut depth, neon legend rows, city-grid background, building badges, glowing bases, and sharper tower labels.
- Preserved: CSV import behavior, manual 方舟複盤 generation, holdings table, target-price tools, and 10-section review output.

## 2026-05-17 - hud-holdings-and-manual-review-generation
- Scope: Changed CSV import so it only imports and refreshes holdings visuals; full 方舟複盤 now generates only after pressing 生成方舟複盤.
- Scope: Replaced the blank pre-review area with 複盤重點整理 cards.
- Scope: Restyled 持股占比圓餅圖 and 重大持股 3D 結構圖 into a dark neon HUD style similar to the provided reference.
- Preserved: CSV parsing, holdings table, target-price collection, and 10-section review output.

## 2026-05-17 - reference-style-holdings-visuals
- Scope: Restyled 持股占比圓餅圖 into a large white-card donut chart with right-side separated legend.
- Scope: Restyled 重大持股 3D 結構圖 into four glass building towers with base, roof, window grid, blue stage, and rotation animation.
- Preserved: CSV import, 方舟複盤 10 sections, 智慧工具 target-price collection and analysis.

## 2026-05-17 - smart-layout-rotating-building-3d
- Scope: Fixed the 智慧工具 layout so target-price tables no longer squeeze the Q&A card.
- Scope: Reworked 重大持股 3D 結構圖 into an animated rotating building-style city model.
- Preserved: CSV import, 方舟複盤 10 sections, 持股明細 pie chart, 智慧工具 target-price collection and analysis.

# Version Log

## 2026-05-17 - restored-charts-and-latest-targets

- Commit: `9b968572fa39f837e63a2f8416222015cc029f0e`
- Scope: Restore `方舟複盤`, `持股明細`, `智慧工具` with the missing visual structure and latest target-price collection.
- Fixed: CSV import for broker columns including `代號`, `股票名稱`, `最新價`, `目前庫存`, `均價`, `可用庫存`, `庫存成本`, `現值`, `含息報酬率`.
- Restored: holdings pie chart and `重大持股 3D 結構圖` inside `持股明細`.
- Fixed: `蒐集並分析` now clears stale target data and fetches latest public StockAnalysis analyst ratings each time.
- Verified: sample CSV imports, 10 review sections render, holdings charts render, and GEV target collection returns current public target rows.
- Recovery note: to restore this version later, reset `main/index.html` to commit `9b968572fa39f837e63a2f8416222015cc029f0e`.

## 2026-05-17 - full-smart-tools-before-history-review

- Commit: `c3655d680578ca32c432eb4cb8ebec57ca486e3c`
- Scope: Restore the latest functional state before the request `幫我做一個歷史複盤績效回顧`.
- Restored: `方舟複盤`, `持股明細`, `智慧工具`.
- Smart tools included: smart Q&A, target price consensus and AI judgment, portfolio stress test, voice review reading, position diagnostics, and rebalance priority.
- Removed from public page: `歷史績效` / history review page.
- Recovery note: to restore this version later, reset `main/index.html` to commit `c3655d680578ca32c432eb4cb8ebec57ca486e3c`.

## 2026-05-17 - pre-517-complete-feature-restore

- Commit: `73f1fdcadfa73bc5abc3620465608dfbed2b0156`
- Scope: Restore the pre-5/17 complete feature set requested by the user.
- Restored: `方舟複盤`, `持股明細`, `歷史績效`, `智慧工具`, `複盤指令`.
- Included tools: CSV import, target price consensus, portfolio stress test, voice review reading, local history snapshots.
- Recovery note: to restore this version later, reset `main` to commit `73f1fdcadfa73bc5abc3620465608dfbed2b0156`.

## 2026-05-17 - restore-core-tools

- Commit: `44adc0a9d7dcda0c599801d91d0d88a86263821a`
- Scope: Restore the core public site features after the layout regression.
- Restored: `方舟複盤`, `持股明細`, `智慧工具`, `複盤指令`.
- Removed from public page: the previously added 3D flowchart block that damaged the layout.
- Recovery note: to restore this version later, reset `main` to commit `44adc0a9d7dcda0c599801d91d0d88a86263821a`.

## 2026-05-17 - safe-base-restore

- Commit: `a4b9d81b4d32023374d7311e16723d99f098adf7`
- Scope: Restored repository to the safe base after a broken simplified overwrite and removed temporary chunk file.
- Recovery note: use this only if you want the original basic page before the restored smart tools.
