const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173');await page.click('#new-game');
  await page.evaluate(()=>{game.s.money=14100;prefs.guide=false;prefs.hints=false;guideStep=0;bannerUntil=0;updateUi(true);});
  async function mapClick(x,y){const b=await page.locator('#game').boundingBox(),s=Math.min(b.width/1100,b.height/720);await page.mouse.click(b.x+(b.width-1100*s)/2+x*s,b.y+(b.height-720*s)/2+y*s);}
  const graves=await page.evaluate(()=>D.graves);
  for(const grave of graves){await mapClick(grave.x,grave.y-5);assert.equal(await page.locator('#villager-quantity').count(),1);assert.equal(await page.evaluate(()=>selectedGrave),grave.id);}
  const slider=page.locator('#villager-quantity');await slider.fill('5');
  assert.match(await page.locator('#villager-total').innerText(),/2,100 gold coins/);
  const identity=await slider.elementHandle();
  await slider.focus();await page.waitForTimeout(450);
  assert.ok(await identity.evaluate(el=>el.isConnected&&el===document.activeElement));
  const b=await page.locator('#buy-villagers').boundingBox();
  await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.waitForTimeout(450);await page.mouse.up();
  assert.deepEqual(await page.evaluate(()=>[game.s.money,game.s.villagers]),[12000,105]);
  await page.click('#buy-villagers');assert.deepEqual(await page.evaluate(()=>[game.s.money,game.s.villagers]),[9500,110]);
  await slider.fill('10');await page.click('#buy-villagers');
  assert.deepEqual(await page.evaluate(()=>[game.s.money,game.s.villagers]),[0,120]);
  assert.equal(await page.locator('#buy-villagers').isDisabled(),true);
  await page.reload();await page.click('#continue');assert.equal(await page.evaluate(()=>game.s.villagers),120);
  await mapClick(graves[0].x,graves[0].y-5);
  await page.evaluate(()=>{game.s.money=3000;game.s.active=true;game.s.queue=['skeleton'];game.s.spawnClock=100;updateUi(true);});
  await slider.fill('3');const before=await page.evaluate(()=>game.s.time);await page.waitForTimeout(350);assert.ok(await page.evaluate(()=>game.s.time)>before);
  await page.click('#buy-villagers');assert.deepEqual(await page.evaluate(()=>[game.s.money,game.s.villagers]),[0,123]);
  await page.click('#settings-button');await page.evaluate(()=>document.getElementById('buy-villagers').click());
  assert.equal(await page.evaluate(()=>game.s.villagers),123,'Settings prevents purchases');await page.click('#close-settings');
  await page.evaluate(()=>{game.s.money=300;updateUi(true);});assert.equal(await slider.inputValue(),'1');
  await page.setViewportSize({width:600,height:900});await page.screenshot({path:'grave-panel-preview.png',fullPage:true});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
  assert.deepEqual(errors,[]);console.log('Grave checks passed: seven graves, live pricing, stable slider and held clicks, repeat buys above 100, funds, saving, active waves, pause, small screen.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
