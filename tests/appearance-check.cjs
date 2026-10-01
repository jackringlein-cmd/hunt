const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:4173');
  const result=await page.evaluate(()=>{
   const combinations=[];for(let a=0;a<=6;a++)for(let b=0;b<=6;b++)for(let c=0;c<=6;c++)for(let d=0;d<=6;d++){const u=[a,b,c,d];if(u.filter(x=>x>0).length<=2&&u.filter(x=>x>2).length<=1)combinations.push(u);}
   const results=[];const canvas=document.createElement('canvas');canvas.width=160;canvas.height=160;const ctx=canvas.getContext('2d');
   for(const type of Object.keys(GameData.heroes)){const seen=new Map(),duplicates=[];for(const u of combinations){ctx.clearRect(0,0,160,160);CartoonArt.hero(ctx,{type,id:0,x:80,y:110,u},{time:1});const pixels=canvas.toDataURL();if(seen.has(pixels))duplicates.push([seen.get(pixels),u]);seen.set(pixels,u);}results.push({type,total:combinations.length,unique:seen.size,duplicates});}return results;
  });
  for(const r of result){assert.equal(r.unique,r.total,JSON.stringify(r));console.log(`${r.type}: ${r.unique} distinct appearances, no duplicates.`);}
  await page.click('#new-game');await page.evaluate(()=>{guideStep=0;game.s.trees=[];game.s.money=100000;const h=game.addHero('knight',190,230);selected=h.id;updateUi(true);});
  const before=await page.locator('.selected-head img').getAttribute('src');await page.click('[data-path="0"]');await page.click('[data-buy="0"]');const after=await page.locator('.selected-head img').getAttribute('src');assert.notEqual(before,after);
  await page.evaluate(()=>{game.upgrade(selected,2);updateUi(true);});const mixed=await page.locator('.selected-head img').getAttribute('src');assert.notEqual(after,mixed);await page.screenshot({path:'upgrades-preview.png'});
  // Review a contact sheet of high-level main paths and their secondary upgrades.
  await page.evaluate(()=>{const sheet=document.createElement('canvas');sheet.id='appearance-sheet';sheet.width=1000;sheet.height=800;const ctx=sheet.getContext('2d');ctx.fillStyle='#f5e8c7';ctx.fillRect(0,0,1000,800);Object.keys(GameData.heroes).forEach((type,row)=>{for(let p=0;p<4;p++){const u=[0,0,0,0];u[p]=6;u[(p+1)%4]=2;ctx.save();ctx.translate(p*250+110,row*160+112);ctx.scale(1.1,1.1);CartoonArt.hero(ctx,{type,id:0,x:0,y:0,u},{time:1});ctx.restore();ctx.fillStyle='#302817';ctx.font='13px sans-serif';ctx.textAlign='center';ctx.fillText(type+' '+u.join('/'),p*250+110,row*160+151);}});sheet.style.cssText='position:fixed;left:0;top:0;z-index:1000;width:1000px;height:800px';document.body.appendChild(sheet);});
  await page.locator('#appearance-sheet').screenshot({path:'appearance-sheet-preview.png'});assert.deepEqual(errors,[]);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
