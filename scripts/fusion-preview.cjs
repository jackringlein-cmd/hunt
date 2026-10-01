const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const root=path.resolve(__dirname,'..'),out=path.join(root,'fusion-preview');fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:960},recordVideo:{dir:out,size:{width:1440,height:960}}});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173');await page.click('#new-game');
  await page.evaluate(()=>{
   prefs.guide=false;prefs.hints=false;prefs.auto=false;guideStep=0;speed=1;game.s.trees=[];game.s.money=1000;
   const h=game.addHero('knight',550,390);h.clock=100000;
   game.s.wave=20;game.s.active=true;game.s.queue=[];game.s.nextWave=null;
   const e=game.spawn('fusion',false,E.nearest(650,395).p);e.speed=0;window.previewFusion=e.id;
   const label=document.createElement('div');label.id='preview-caption';label.style='position:fixed;left:24px;top:98px;padding:12px 18px;background:#f6efda;color:#221b17;border:2px solid #574932;border-radius:8px;font:bold 19px Georgia;z-index:20;pointer-events:none';label.textContent='Actual game size: Knight (left) and Fusion Skeleton (right)';document.body.append(label);
   $('wave-banner').classList.remove('visible');bannerUntil=0;updateUi(true);
  });
  await page.waitForTimeout(1400);await page.screenshot({path:path.join(out,'in-game-size.png')});
  // A large portrait is also rendered from the exact same animated game artwork.
  const portrait=await page.evaluate(()=>{const canvas=document.createElement('canvas');canvas.width=720;canvas.height=720;const c=canvas.getContext('2d');c.fillStyle='#f4eddc';c.fillRect(0,0,720,720);c.translate(360,655);c.scale(4.3,4.3);FusionArt.draw(c,{type:'fusion',x:0,y:0,p:0,id:1,hp:270,maxHp:270,effects:[]},0);return canvas.toDataURL();});
  fs.writeFileSync(path.join(out,'fusion-portrait.png'),Buffer.from(portrait.split(',')[1],'base64'));
  await page.evaluate(()=>{$('preview-caption').textContent='Chamber bursting open…';game.hit(game.s.enemies.find(e=>e.id===window.previewFusion),10000);});
  await page.waitForTimeout(600);assert.equal(await page.evaluate(()=>game.s.fusionBursts.length),1);await page.screenshot({path:path.join(out,'chamber-burst.png')});
  await page.waitForFunction(()=>game.s.enemies.filter(e=>e.type==='tiny').length===50,{},{timeout:2500});
  assert.equal(await page.evaluate(()=>new Set(game.s.enemies.map(e=>e.swarmId)).size),5);
  await page.evaluate(()=>$('preview-caption').textContent='Five swarms released — 10 Tiny Skeletons in each swarm');
  await page.screenshot({path:path.join(out,'five-swarms.png')});await page.waitForTimeout(2500);
  assert.deepEqual(errors,[]);const video=page.video();await context.close();await video.saveAs(path.join(out,'fusion-death-demo.webm'));
  fs.writeFileSync(path.join(out,'watch-demo.html'),'<!doctype html><meta charset="utf-8"><title>Fusion Skeleton preview</title><style>body{background:#eee5cd;color:#272014;font:18px Georgia;margin:24px}video{width:100%;max-width:1440px}img{max-width:100%}</style><h1>Fusion Skeleton</h1><p>Actual game size, chamber-burst death animation, and five swarms of ten Tiny Skeletons.</p><video src="fusion-death-demo.webm" controls autoplay loop muted></video><h2>In-game size</h2><img src="in-game-size.png" alt="Fusion Skeleton beside a Knight">');
  console.log('Fusion preview and video saved. Verified 50 children in five swarms with no browser errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
