// Chụp màn: node tools/shot.js <đường dẫn tuyệt đối tới dist/prototype-test.html> <id màn>[@cuộn] ...  → ảnh trong prototype-src/shots/
const { chromium } = require('playwright');
const OUT=process.env.OUT||require('path').join(__dirname,'..','shots');require('fs').mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
const errs=[];p.on('pageerror',x=>errs.push(String(x).slice(0,300)));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
const ph=()=>p.locator('.pt-phone');
for(const [s,sc] of process.argv.slice(3).map(x=>x.split('@'))){await p.click('#pt-jump-in');await p.click('#pt-opt-'+s);await p.waitForTimeout(150);
 if(sc)await p.evaluate(y=>{document.querySelector('.pt-phone .ph-body').scrollTop=+y},sc);await p.waitForTimeout(80);
 await ph().screenshot({path:require('path').join(OUT,'hd_'+s+(sc||'')+'.png')});console.log(s,await p.$$eval('.qd-list > li',a=>a.length));}
console.log('errs',errs);await b.close();})();
