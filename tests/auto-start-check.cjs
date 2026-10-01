const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173');await page.click('#new-game');
  await page.evaluate(()=>{prefs.auto=true;prefs.guide=false;guideStep=0;updateUi(true);});
  await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>game.s.wave),0,'First wave waits for player');
  for(const rate of [1,5]){
   const result=await page.evaluate(async rate=>{
    speed=rate;game.s.wave=2;game.s.active=true;game.s.enemies=[];game.s.queue=[];game.s.pending=[];game.s.nextWave=null;game.events=[];
    window.transitionScenes=[];const original=audio.setScene.bind(audio);audio.setScene=scene=>{transitionScenes.push(scene);original(scene);};
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    audio.setScene=original;return{wave:game.s.wave,active:game.s.active,scenes:transitionScenes};
   },rate);
   assert.equal(result.wave,3,'Next round begins within two animation frames');assert.equal(result.active,true);assert.ok(!result.scenes.includes('menu'),'No preparation-music flicker');
  }
  await page.evaluate(()=>{game.s.queue=[];game.s.pending=[];game.s.enemies=[];const e=game.spawn('giant');e.speed=0;});
  await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>game.s.wave),3,'Living enemy prevents transition');
  await page.click('#settings-button');
  await page.evaluate(()=>{game.s.active=false;game.s.enemies=[];game.prepare();});await page.waitForTimeout(100);
  assert.equal(await page.evaluate(()=>game.s.wave),3,'Settings blocks auto-start');
  await page.uncheck('#auto-setting');await page.click('#close-settings');await page.waitForTimeout(100);
  assert.equal(await page.evaluate(()=>game.s.wave),3,'Manual mode waits');
  await page.click('#settings-button');await page.check('#auto-setting');await page.click('#close-settings');
  await page.waitForFunction(()=>game.s.wave===4,{},{timeout:1000});
  await page.evaluate(()=>{game.s.active=false;game.s.queue=[];game.s.enemies=[];game.prepare();storePrefs();saveGame();});
  await page.reload();await page.click('#continue');await page.waitForFunction(()=>game.s.active,{},{timeout:1000});
  await page.evaluate(()=>{game.s.wave=100;game.s.active=true;game.s.queue=[];game.s.enemies=[];game.s.pending=[];game.s.won=false;game.s.endless=false;game.events=[];});
  await page.waitForSelector('#keep-playing');await page.waitForTimeout(100);
  assert.equal(await page.evaluate(()=>game.s.wave),100,'Victory awaits explicit endless choice');
  await page.click('#keep-playing');await page.waitForFunction(()=>game.s.wave===101,{},{timeout:1000});
  await page.evaluate(()=>{game.s.lost=true;game.s.active=false;});await page.waitForTimeout(100);
  assert.equal(await page.evaluate(()=>game.s.wave),101,'Defeat prevents auto-start');
  assert.deepEqual(errors,[]);console.log('Auto-start checks passed: immediate 1x/5x transitions, continuous music, live enemies, pause, toggle, load, victory/endless, and defeat.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
