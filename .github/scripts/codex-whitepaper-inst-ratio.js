const fs = require('fs');
const path = 'index.html';
let s = fs.readFileSync(path, 'utf8');

const oldDecl = "var sym=esc(r.symbol),name=esc(r.name),sector=esc(r.sector||'產業');var leader=leaderName(r);";
const newDecl = "var sym=esc(r.symbol),name=esc(r.name),sector=esc(r.sector||'產業');var leader=leaderName(r);var inst=typeof estimateInstitutionOwnership==='function'?estimateInstitutionOwnership(r):Math.max(25,Math.min(85,52+(r.weight>.15?8:0)+(r.pnlPct>0?4:-4)));";
s = s.replace(oldDecl, newDecl);

s = s.replace("目前部位占比 '+pct(r.weight)+'、損益率 '+pct(r.pnlPct)+'、位階 ", "目前部位占比 '+pct(r.weight)+'、推算機構持股比例 '+num(inst,1)+'%、損益率 '+pct(r.pnlPct)+'、位階 ");

s = s.replace("'<li><b>有哪些機構開始持倉：</b>'+holders+' 對本檔最重要的是", "'<li><b>有哪些機構開始持倉：</b>本檔推算機構持股比例約 '+num(inst,1)+'%。'+holders+' 對本檔最重要的是");

fs.writeFileSync(path, s);
