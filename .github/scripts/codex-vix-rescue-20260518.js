const fs = require('fs');
const https = require('https');
const vm = require('vm');

const file = 'index.html';

function get(url, timeout = 9000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Codex VIX Rescue' } }, res => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => res.statusCode >= 200 && res.statusCode < 300 ? resolve(data) : reject(new Error('HTTP ' + res.statusCode)));
    });
    req.setTimeout(timeout, () => { req.destroy(new Error('timeout')); });
    req.on('error', reject);
  });
}

async function latestVix() {
  const sources = [
    async () => {
      const text = await get('https://query1.finance.yahoo.com/v8/finance/chart/%5EVIX?range=1d&interval=1m&_=codex' + Date.now());
      const data = JSON.parse(text);
      const result = data.chart && data.chart.result && data.chart.result[0];
      const closes = (result && result.indicators && result.indicators.quote && result.indicators.quote[0] && result.indicators.quote[0].close) || [];
      const last = closes.slice().reverse().find(n => Number.isFinite(Number(n)));
      return Number((result && result.meta && result.meta.regularMarketPrice) || last);
    },
    async () => {
      const text = await get('https://cdn.cboe.com/api/global/delayed_quotes/charts/historical/_VIX.json?_=' + Date.now());
      const data = JSON.parse(text);
      const rows = Array.isArray(data.data) ? data.data : [];
      const last = rows.slice().reverse().find(r => Number.isFinite(Number(r.close)));
      return Number(last && last.close);
    }
  ];
  for (const source of sources) {
    try {
      const value = await source();
      if (Number.isFinite(value) && value > 0) return value;
    } catch (error) {}
  }
  return 0;
}

(async () => {
  let s = fs.readFileSync(file, 'utf8');
  const fallbackValue = await latestVix();
  const fallbackStamp = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false });
  const fallbackSource = fallbackValue ? `部署備援 ${fallbackStamp}` : '備援模式';
  const fallbackNumber = fallbackValue ? fallbackValue.toFixed(2) : '18.00';

  const fn = `async function fetchVixOnce(){var box=document.querySelector("#vixTicker"),val=document.querySelector("#vixValue"),time=document.querySelector("#vixTime");if(!box||!val||!time)return null;time.textContent="快速抓取";var fallbackValue=${fallbackNumber},fallbackSource=${JSON.stringify(fallbackSource)};function apply(v,src){v=Number(v);if(!Number.isFinite(v)||v<=0)throw new Error("bad vix");state.lastVix={value:v,time:new Date(),source:src};val.textContent=v.toFixed(2);time.textContent=src;box.classList.toggle("hot",v>=25);box.classList.toggle("calm",v<18);return state.lastVix}function timeout(ms){return new Promise(function(_,rej){setTimeout(function(){rej(new Error("timeout"))},ms)})}async function yahooProxy(){var u="https://api.allorigins.win/raw?url="+encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/%5EVIX?range=1d&interval=1m&_="+Date.now());var r=await Promise.race([fetch(u,{cache:"no-store"}),timeout(5200)]);if(!r.ok)throw new Error("status");var d=await r.json();var x=d.chart&&d.chart.result&&d.chart.result[0];var q=(x&&x.indicators&&x.indicators.quote&&x.indicators.quote[0]&&x.indicators.quote[0].close)||[];var last=[].concat(q).reverse().find(function(n){return Number.isFinite(Number(n))});return apply((x&&x.meta&&x.meta.regularMarketPrice)||last,"Yahoo 最新")}async function cboeProxy(){var u="https://api.allorigins.win/raw?url="+encodeURIComponent("https://cdn.cboe.com/api/global/delayed_quotes/charts/historical/_VIX.json?_="+Date.now());var r=await Promise.race([fetch(u,{cache:"no-store"}),timeout(6200)]);if(!r.ok)throw new Error("status");var d=await r.json();var rows=Array.isArray(d.data)?d.data:[];var last=rows.slice().reverse().find(function(x){return Number.isFinite(Number(x.close))});return apply(last&&last.close,"Cboe 最新")}try{return await Promise.any([yahooProxy(),cboeProxy()])}catch(e){return apply(fallbackValue,fallbackSource)}}`;

  if (!/async function fetchVixOnce\(\)\{[\s\S]*?function vixText\(\)/.test(s)) throw new Error('fetchVixOnce block not found');
  s = s.replace(/async function fetchVixOnce\(\)\{[\s\S]*?function vixText\(\)/, fn + 'function vixText()');
  s = s.replace(/function vixText\(\)\{[^}]*\}/, 'function vixText(){return state.lastVix?"VIX "+num(state.lastVix.value,2)+"（"+(state.lastVix.source||"本次生成時抓取")+"）":"VIX 使用部署備援值作為市場風險溫度"}');

  if (s.includes('val.textContent="重試"') || s.includes('請再按生成')) throw new Error('retry state still present');
  fs.writeFileSync(file, s);
  const html = fs.readFileSync(file, 'utf8');
  const script = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
  new vm.Script(script, { filename: 'index.inline.js' });
  console.log('VIX rescue applied. fallback=' + fallbackNumber + ' source=' + fallbackSource);
})();
