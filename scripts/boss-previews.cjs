const fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:4173');
 const sheets=await page.evaluate(()=>{
  const out={};for(const type of ['giant','dragon']){
   const scale=type==='giant'?1.9:2.2;
   const sheet=document.createElement('canvas');sheet.width=960;sheet.height=570;const c=sheet.getContext('2d');
   c.fillStyle='#f5e8c7';c.fillRect(0,0,960,570);c.fillStyle='#302817';c.font='bold 23px sans-serif';c.fillText(type==='giant'?'BONE GIANT — CYCLOPS SKELETON':'BONE DRAGON — DRAGON SKELETON',24,32);c.font='14px sans-serif';c.fillText('Six animation frames • drawn at the same scale as the game canvas',24,56);
   const unique=new Set();for(let i=0;i<6;i++){
    const x=i%3*320,y=76+Math.floor(i/3)*245;
    c.strokeStyle='#d4c39a';c.strokeRect(x+6,y+4,308,233);
    c.save();c.translate(x+157,y+191);c.scale(scale,scale);BossArt.draw(c,type,(i*Math.PI/3+.2)/4);c.restore();
    c.fillStyle='#69583c';c.font='13px sans-serif';c.fillText('Frame '+(i+1),x+18,y+222);
    const test=document.createElement('canvas');test.width=320;test.height=245;const tc=test.getContext('2d');tc.translate(157,191);tc.scale(scale,scale);BossArt.draw(tc,type,(i*Math.PI/3+.2)/4);unique.add(test.toDataURL());
   }
   if(unique.size!==6)throw Error('Animation frames not distinct: '+type);
   out[type]=sheet.toDataURL();
   const a=document.createElement('canvas');a.width=320;a.height=245;const ac=a.getContext('2d');ac.translate(157,191);ac.scale(scale,scale);BossArt.draw(ac,type,0,true);const frozen=a.toDataURL();ac.clearRect(-100,-100,200,200);BossArt.draw(ac,type,9,true);if(a.toDataURL()!==frozen)throw Error('Frozen animation moves');
  }return out;
 });
 for(const [type,url]of Object.entries(sheets))fs.writeFileSync(type+'-sprite-sheet.png',Buffer.from(url.split(',')[1],'base64'));
 await page.click('#new-game');
 const map=await page.evaluate(()=>{guideStep=0;paused=true;game.s.trees=[];game.s.money=10000;game.addHero('archer',190,230);game.addHero('knight',530,260);const g=game.spawn('giant');g.x=385;g.y=350;g.p=200;const d=game.spawn('dragon');d.x=760;d.y=370;d.p=400;sceneTime=.3;draw();return canvas.toDataURL();});
 fs.writeFileSync('bosses-in-game-size.png',Buffer.from(map.split(',')[1],'base64'));
 if(errors.length)throw Error(errors.join('\n'));console.log('PASS: 12 distinct frames; frozen bosses stay still; both bosses render on the map. Previews exported.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
