// Kiểm tra: mở từng màn trong danh sách 'Đi tới màn' – node tools/test_jump.js <đường dẫn tuyệt đối tới dist/prototype-test.html>
// Kết quả đúng: visited <số màn> empty [] errors []
const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:Number(process.argv[3]||1280),height:900}})).newPage();
const errs=[];p.on('pageerror',x=>errs.push(String(x).slice(0,200)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,200))});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
const now=()=>p.$eval('.pt-now b',e=>e.textContent);
const inp='#pt-jump-in';
await p.click(inp);await p.waitForTimeout(100);
console.log('open on click:',await p.$eval(inp,e=>e.getAttribute('aria-expanded')),'options',await p.$$eval('[role=option]',a=>a.length));
await p.fill(inp,'lich');await p.waitForTimeout(100);
console.log('filter "lich":',await p.$$eval('[role=option]',a=>a.map(x=>x.textContent)));
await p.keyboard.press('ArrowDown');await p.keyboard.press('Enter');await p.waitForTimeout(150);
console.log('enter ->',await now(),'| expanded',await p.$eval(inp,e=>e.getAttribute('aria-expanded')),'| value',JSON.stringify(await p.$eval(inp,e=>e.value)));
await p.fill(inp,'thong bao');await p.waitForTimeout(100);
console.log('filter "thong bao":',await p.$$eval('[role=option]',a=>a.map(x=>x.textContent)));
await p.click('[role=option] >> text=Thông báo >> nth=0');await p.waitForTimeout(150);console.log('click ->',await now());
await p.fill(inp,'zzz');await p.waitForTimeout(80);console.log('no match:',await p.$eval('.pt-jump-list',e=>e.textContent),'| live:',await p.$eval('.pt-sr',e=>e.textContent));
await p.keyboard.press('Escape');console.log('esc expanded',await p.$eval(inp,e=>e.getAttribute('aria-expanded')));
await p.keyboard.press('Escape');console.log('esc2 value',JSON.stringify(await p.$eval(inp,e=>e.value)));
// open via toggle, screenshot
await p.click('.pt-jump-tg');await p.waitForTimeout(150);
console.log('toggle open, active=',await p.$eval(inp,e=>e.getAttribute('aria-activedescendant')),'selected=',await p.$eval('[role=option][aria-selected=true]',e=>e.textContent));

await p.click('.pt-jump-tg');
// visit all screens via combobox
const ids=await p.evaluate(()=>[].concat.apply([],GROUPS2.map(g=>g[1])));const bad=[];
for(const s of ids){await p.click(inp);await p.waitForTimeout(20);await p.click('#'+('pt-opt-'+s.replace(/[^a-zA-Z0-9-]/g,'-')));await p.waitForTimeout(40);
 const r=await p.evaluate(()=>({t:document.querySelector('.pt-phone').innerText.length,now:document.querySelector('.pt-now b').textContent}));if(r.t<20&&!/chào/.test(r.now))bad.push(r.now);}
console.log('visited',ids.length,'empty',bad,'errors',errs);await b.close();})();
