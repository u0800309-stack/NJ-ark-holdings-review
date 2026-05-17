const fs = require('fs');
const path = 'index.html';
let s = fs.readFileSync(path, 'utf8');

const fn = `async function fetchVixOnce(){
 var box=document.querySelector("#vixTicker"),val=document.querySelector("#vixValue"),time=document.querySelector("#vixTime");
 if(!box||!val||!time)return null;
 time.textContent="抓取最新";
 async function getJson(url){var r=await fetch(url,{cache:"no-store"});if(!r.ok)throw new Error("bad status");return await r.json()}
 async function getText(url){var r=await fetch(url,{cache:"no-store"});if(!r.ok)throw new Error("bad status");return await r.text()}
 function apply(v,src){v=Number(v);if(!Number.isFinite(v)||v<=0)throw new Error("bad vix");state.lastVix={value:v,time:new Date(),source:src};val.textContent=v.toFixed(2);time.textContent=src;box.classList.toggle("hot",v>=25);box.classList.toggle("calm",v<18);return state.lastVix}
 try{
  var y="https://query1.finance.yahoo.com/v8/finance/chart/%5EVIX?range=1d&interval=1m&corsDomain=finance.yahoo.com&_="+Date.now();
  var d=await getJson(y);var r=d.chart&&d.chart.result&&d.chart.result[0];var q=(r&&r.indicators&&r.indicators.quote&&r.indicators.quote[0]&&r.indicators.quote[0].close)||[];
  var last=[].concat(q).reverse().find(function(x){return Number.isFinite(Number(x))});
  return apply((r&&r.meta&&r.meta.regularMarketPrice)||last,"Yahoo 即時");
 }catch(e1){try{
  var y2="https://api.allorigins.win/raw?url="+encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/%5EVIX?range=1d&interval=1m&_="+Date.now());
  var d2=await getJson(y2);var r2=d2.chart&&d2.chart.result&&d2.chart.result[0];var q2=(r2&&r2.indicators&&r2.indicators.quote&&r2.indicators.quote[0]&&r2.indicators.quote[0].close)||[];
  var last2=[].concat(q2).reverse().find(function(x){return Number.isFinite(Number(x))});
  return apply((r2&&r2.meta&&r2.meta.regularMarketPrice)||last2,"Yahoo 最新");
 }catch(e2){try{
  var st="https://api.allorigins.win/raw?url="+encodeURIComponent("https://stooq.com/q/l/?s=%5Evix&f=sd2t2ohlcv&h&e=csv&_="+Date.now());
  var txt=await getText(st);var lines=txt.trim().split(/\n/);var cols=(lines[1]||"").split(',');
  return apply(cols[6]||cols[3]||cols[4],"Stooq 最新");
 }catch(e3){
  state.lastVix=null;val.textContent="重試";time.textContent="請再按生成";box.classList.remove("hot","calm");return null;
 }}}
}`;

if (!s.includes('id="vixTicker"')) {
  const vix = '<div class="vix-ticker" id="vixTicker"><span>VIX</span><strong id="vixValue">--</strong><small id="vixTime">按複盤更新</small></div>';
  s = s.replace('<button class="btn" id="loadSample">載入範例</button>', '<button class="btn" id="loadSample">載入範例</button>' + vix);
}
if (!s.includes('[hidden]{display:none!important}')) s = s.replace('</style>', '[hidden]{display:none!important}</style>');
if (s.includes('async function fetchVixOnce()')) {
  s = s.replace(/async function fetchVixOnce\(\)\{[\s\S]*?function vixText\(\)/, fn + '\nfunction vixText()');
} else {
  s = s.replace('document.querySelectorAll(".tab").forEach', fn + '\ndocument.querySelectorAll(".tab").forEach');
}
s = s.replace('els.runReview.onclick=generate;', 'els.runReview.onclick=async()=>{await fetchVixOnce();generate();};');
fs.writeFileSync(path, s);
