const fs = require('fs');
const path = 'index.html';
let s = fs.readFileSync(path, 'utf8');

const css = `
/* codex-deep-whitepaper-20260517 */
.industry-note{min-width:460px;max-width:760px;padding:12px 14px;margin-top:10px;border:1px solid rgba(36,151,255,.24);border-radius:8px;background:linear-gradient(180deg,#f8fbff,#fff);line-height:1.72;color:#1d2f3a}
.industry-note h4{margin:0 0 8px;color:#09213c;font-size:16px}.industry-note p{margin:0 0 10px}.industry-note ol{margin:8px 0 0;padding-left:20px}.industry-note li{margin:0 0 12px}.industry-note b{color:#071b34}.research-links{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 10px}.research-links a{display:inline-flex;align-items:center;min-height:26px;padding:0 9px;border:1px solid rgba(24,60,74,.24);border-radius:999px;background:#eef5ff;color:#123f68;text-decoration:none;font-size:12px;font-weight:800}
`;
if (!s.includes('codex-deep-whitepaper-20260517')) s = s.replace('</style>', css + '</style>');

s = s.replace('<th>持有邏輯</th><th>產業分析</th>', '<th>產業分析</th>');
s = s.replace('<th>持有邏輯</th></tr>', '</tr>');
s = s.replaceAll('colspan="14"', 'colspan="13"');
s = s.replace("colspan=\"14\"", "colspan=\"13\"");
s = s.replace("els.tableBody.innerHTML='<tr><td colspan=\"14\">尚無資料</td></tr>';", "els.tableBody.innerHTML='<tr><td colspan=\"13\">尚無資料</td></tr>';");

const tableFn = `function table(){els.tableBody.innerHTML=state.analyzed.map((r,i)=>{const paper=state.industryPapers[r.symbol]||"";return '<tr><td><span class="badge '+r.tone+'">'+esc(r.status)+'</span></td><td>'+esc(r.symbol)+'</td><td>'+esc(r.name)+'</td><td>'+esc(r.sector)+'</td><td class="num">'+num(r.shares)+'</td><td class="num">'+num(r.avgCost,2)+'</td><td class="num">'+num(r.price,2)+'</td><td class="num">'+money(r.value)+'</td><td class="num">'+pct(r.weight)+'</td><td class="num">'+money(r.pnl)+'</td><td class="num">'+pct(r.pnlPct)+'</td><td>'+esc(r.level)+'</td><td><button class="industry-btn" onclick="analyzeIndustry('+i+')">深入研究</button>'+(paper?'<div class="industry-note">'+paper+'</div>':'')+'</td></tr>'}).join("")}`;
s = s.replace(/function table\(\)\{[\s\S]*?\}function visuals\(\)/, tableFn + 'function visuals()');

const deepFn = `function leaderName(r){var x=(r.symbol+' '+r.name).toUpperCase();var m={GEV:'Scott Strazik',TSM:'C. C. Wei',TSLA:'Elon Musk',AMAT:'Gary Dickerson',ASML:'Christophe Fouquet',AAPL:'Tim Cook',NVDA:'Jensen Huang',MSFT:'Satya Nadella',META:'Mark Zuckerberg',GOOGL:'Sundar Pichai',GOOG:'Sundar Pichai',LIN:'Sanjiv Lamba'};return m[r.symbol]||'需以公司 IR 最新資料確認'}
function researchUrl(q){return 'https://www.google.com/search?q='+encodeURIComponent(q)}
function industryWhitepaper(r){
 var sym=esc(r.symbol),name=esc(r.name),sector=esc(r.sector||'產業');var leader=leaderName(r);
 var ai=/AI|半導體|SEMICONDUCTOR|TECH|電子|AMAT|ASML|TSM|NVDA/i.test(r.symbol+' '+r.name+' '+r.sector);
 var energy=/GEV|能源|電力|電網|VERNOVA|LINDE|LIN/i.test(r.symbol+' '+r.name+' '+r.sector);
 var world=energy?'全球巨頭正在把 AI 用電、電網升級、再生能源與燃氣備援視為下一輪基礎建設，若公司能卡位電力設備、服務合約與能源轉型資本支出，長期需求有利。':ai?'全球巨頭正在把 AI 算力、先進製程、資料中心與自動化投資列為核心戰略，若公司供應鏈位置不可替代，將受益於長週期資本支出。':'全球巨頭願景要看是否與公司產品線形成結構性需求，而不是只看短期題材；若公司能被大型客戶預算列為核心支出，才算真正有利。';
 var tax='參議院稅改政策需重點追蹤三件事：企業資本支出抵減、研發費用攤銷/即時費用化、清潔能源或製造業稅額抵減。若政策鼓勵美國本土製造、電網投資、研發抵稅或加速折舊，通常有利於重資本、科技製造與能源設備鏈；若提高企業最低稅負或削弱補貼，則會壓縮估值與自由現金流。';
 var holders='機構持倉不能只看名字，要看方向。請優先查 13F、Nasdaq/WhaleWisdom/Fintel 與公司股東頁，觀察 BlackRock、Vanguard、State Street、Capital Group、Fidelity、T. Rowe Price、主要主權基金與退休基金是否連續兩季增持。若新進機構多、增持集中在長線基金，籌碼品質較佳；若主要是短線量化或避險基金，訊號較弱。';
 var leaderView=leader==='需以公司 IR 最新資料確認'?'此標的領導人物需以公司 IR 與最新年報確認。評估重點不是名氣，而是資本配置紀律、併購整合能力、研發投入、毛利率防守、危機溝通與是否能把願景轉成現金流。':'目前可優先追蹤領導人物 '+esc(leader)+'。判斷他能否好好帶領，重點看是否能穩定交付財測、控制成本、維持技術/產品路線、處理政策與供應鏈壓力，並把長期願景轉成自由現金流。';
 return '<h4>《產業策略白皮書》'+sym+' '+name+'</h4>'+
 '<div class="research-links"><a target="_blank" href="'+researchUrl(r.symbol+' institutional holders 13F latest')+'">機構持倉</a><a target="_blank" href="'+researchUrl(r.symbol+' CEO leadership investor relations')+'">領導人物</a><a target="_blank" href="'+researchUrl(r.symbol+' Senate tax bill impact')+'">稅改影響</a><a target="_blank" href="'+researchUrl(r.symbol+' industry outlook 2026')+'">產業展望</a></div>'+
 '<p><b>研究結論：</b>目前部位占比 '+pct(r.weight)+'、損益率 '+pct(r.pnlPct)+'、位階 '+esc(r.level)+'。這份白皮書把「題材是否有利」拆成需求、政策、籌碼與領導力四條線，避免只因股價上漲就把故事合理化。</p><ol>'+
 '<li><b>世界巨頭願景有沒有利於：</b>'+world+' 研究時要對照大型客戶資本支出、供應鏈訂單能見度與公司是否具備定價權；若只是搭上口號但沒有訂單、毛利率或現金流改善，利多要打折。</li>'+
 '<li><b>參議院稅改政策有沒有利於：</b>'+tax+' 對 '+name+' 要看政策最後是否落到 '+sector+' 的實際扣抵、補貼或稅負變化，不能只看新聞標題。</li>'+
 '<li><b>有哪些機構開始持倉：</b>'+holders+' 對本檔最重要的是「新進 + 加碼 + 長線資金」三者是否同時出現；若只有被動 ETF 持有，代表籌碼穩定但主動看多訊號不足。</li>'+
 '<li><b>領導人物是誰、會不會好好帶領：</b>'+leaderView+' 若管理層能連續完成承諾、提高營運槓桿、避免過度舉債，才是值得提高估值的領導力。</li>'+
 '<li><b>基本面與財報深挖：</b>近三年要檢查營收是否只靠景氣循環，毛利率是否有結構性提升，營業現金流是否高於帳面獲利，負債與利息費用是否侵蝕自由現金流。若成長來自一次性漲價或補庫存，應降低長期假設。</li>'+
 '<li><b>產業趨勢與未來潛力：</b>判斷總潛在市場是否擴大、技術變革是否提高進入門檻、政策是否形成順風，以及產品線能否從單一需求延展到平台型收入。若公司同時具備客戶黏著度、售後服務收入與規模經濟，未來潛力較可靠。</li>'+
 '<li><b>策略風險與應對：</b>主要風險包括政策反轉、利率壓縮估值、客戶砍單、技術替代、競爭者降價、匯率與地緣政治。操作上應設定單一持股上限、目標價區間、財報檢核點與跌破論點時的減碼條件。</li></ol>'
}
async function analyzeIndustry(i){var r=state.analyzed[i];if(!r)return;state.industryPapers[r.symbol]='<p><b>研究中：</b>正在建立 '+esc(r.symbol)+' 深入產業白皮書。</p>';table();state.industryPapers[r.symbol]=industryWhitepaper(r);table();toast(r.symbol+' 深入產業白皮書已生成。')}`;

if (s.includes('function leaderName(r)')) {
  s = s.replace(/function leaderName\(r\)[\s\S]*?async function analyzeIndustry\(i\)\{[\s\S]*?\}\n?document\.querySelectorAll/, deepFn + '\ndocument.querySelectorAll');
} else if (s.includes('function industryWhitepaper(r)')) {
  s = s.replace(/function industryWhitepaper\(r\)[\s\S]*?function analyzeIndustry\(i\)\{[\s\S]*?\}\n?document\.querySelectorAll/, deepFn + '\ndocument.querySelectorAll');
} else {
  s = s.replace('document.querySelectorAll(".tab").forEach', deepFn + '\ndocument.querySelectorAll(".tab").forEach');
}

fs.writeFileSync(path, s);
