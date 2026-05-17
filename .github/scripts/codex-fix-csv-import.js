const fs = require('fs');
const path = 'index.html';
let s = fs.readFileSync(path, 'utf8');

s = s.replace('accept=".csv,text/csv,.txt"', 'accept=".csv,.CSV,.cvs,.CVS,text/csv,.txt,.TXT"');

const readFileFn = `async function readFile(f){
 const b=await f.arrayBuffer();
 const bytes=new Uint8Array(b);
 const tries=[];
 function push(enc){if(!tries.includes(enc))tries.push(enc)}
 if(bytes[0]===255&&bytes[1]===254)push("utf-16le");
 if(bytes[0]===254&&bytes[1]===255)push("utf-16be");
 if(bytes[0]===239&&bytes[1]===187&&bytes[2]===191)push("utf-8");
 ["utf-8","utf-16le","utf-16be","big5"].forEach(push);
 let best="",bestScore=-1;
 for(const enc of tries){
  try{
   let text=new TextDecoder(enc).decode(b).replace(/^\uFEFF/,"").replace(/\u0000/g,"");
   const table=parseCsv(text),hi=headRow(table);
   let score=hi>=0?1000-hi:0;
   score+=/代號|股票名稱|目前庫存|最新價|均價|現值|symbol|ticker/i.test(text)?80:0;
   score-=((text.match(/�/g)||[]).length*6);
   if(score>bestScore){bestScore=score;best=text}
   if(hi>=0)return text;
  }catch(e){}
 }
 return best;
}`;

s = s.replace(/async function readFile\(f\)\{[\s\S]*?\}els\.fileInput\.onclick=/, readFileFn + 'els.fileInput.onclick=');

const onchange = `els.fileInput.onchange=async e=>{const f=e.target.files[0];if(f){try{const text=await readFile(f);loadCsv(text);toast('已匯入：'+f.name)}catch(err){console.error(err);reset('CSV 檔案讀取失敗，請確認檔案不是空白或被 Excel 鎖住。')}}}`;
s = s.replace(/els\.fileInput\.onchange=async e=>\{[\s\S]*?\}\};\["dragenter","dragover"\]/, onchange + ';["dragenter","dragover"]');

const drop = `els.drop.addEventListener("drop",async e=>{const f=e.dataTransfer.files[0];if(f){try{const text=await readFile(f);loadCsv(text);toast('已匯入：'+f.name)}catch(err){console.error(err);reset('CSV 檔案讀取失敗，請確認檔案不是空白或被 Excel 鎖住。')}}})`;
s = s.replace(/els\.drop\.addEventListener\("drop",async e=>\{[\s\S]*?\}\}\);els\.askHolding/, drop + ';els.askHolding');

fs.writeFileSync(path, s);
