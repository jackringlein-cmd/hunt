const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173');await page.click('#new-game');
  await page.evaluate(()=>{
   prefs.guide=false;guideStep=0;prefs.maxSpeed=5;speed=5;
   game.s.trees=[];game.s.money=1000;
   const h=game.addHero('knight',190,230);h.clock=100000;selected=h.id;
   game.s.active=true;game.s.queue=['skeleton'];game.s.spawnClock=100000;
   window.upgradeIncome=setInterval(()=>{const e=game.spawn('skeleton');game.hit(e,100);},45);
   updateUi(true);
  });
  async function heldClick(selector){const b=await page.locator(selector).evaluate(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height};});await page.mouse.move(b.x+b.w/2,b.y+b.h/2);await page.mouse.down();await page.waitForTimeout(500);await page.mouse.up();}
  await heldClick('[data-path="0"]');
  assert.equal(await page.locator('[data-buy="0"]').count(),1,'Upgrade details must open despite income refreshes at 5x');
  const buy=await page.locator('[data-buy="0"]').elementHandle();
  await page.evaluate(()=>updateUi(true));
  assert.ok(await buy.evaluate(el=>el.isConnected),'Forced HUD updates should preserve unchanged upgrade buttons');
  await heldClick('[data-buy="0"]');
  assert.deepEqual(await page.evaluate(()=>[game.s.heroes[0].u[0],game.s.heroes[0].spent]),[1,115]);
  assert.equal(await page.locator('[data-buy="0"]').count(),0,'Successful purchase closes details');
  await page.click('[data-path="0"]');
  await page.locator('[data-buy="0"]').focus();await page.waitForTimeout(450);
  assert.ok(await page.locator('[data-buy="0"]').evaluate(el=>document.activeElement===el));
  await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>game.s.heroes[0].u[0]),2);
  await page.evaluate(()=>{clearInterval(window.upgradeIncome);game.s.money=0;updateUi();});
  await page.click('[data-path="0"]');const locked=await page.locator('[data-buy="0"]').elementHandle();
  assert.equal(await page.locator('[data-buy="0"]').isDisabled(),true);
  await page.evaluate(()=>{game.s.money=150;updateUi();});
  assert.ok(await locked.evaluate(el=>el.isConnected));assert.equal(await page.locator('[data-buy="0"]').isDisabled(),false);
  await page.click('[data-buy="0"]');assert.equal(await page.evaluate(()=>game.s.money),0);
  await page.evaluate(()=>{game.s.money=100000;const main=game.s.heroes[0];main.u=[3,0,0,0];for(const level of [6,5,4]){let placed=false;for(let y=100;y<640&&!placed;y+=50)for(let x=50;x<980&&!placed;x+=50)if(game.canPlace(x,y)){const h=game.addHero('knight',x,y);h.u=[level,0,0,0];placed=true;}}updateUi();});
  assert.match(await page.locator('#sidebar').innerText(),/Limit reached: 3 Knights at level 4/);
  assert.equal(await page.locator('[data-path="0"]').count(),0);
  await page.evaluate(()=>{game.sell(game.s.heroes.find(h=>h.u[0]===6).id);updateUi();});
  assert.equal(await page.locator('[data-path="0"]').count(),1,'Selling refreshes available upgrade slots');
  assert.deepEqual(errors,[]);console.log('Upgrade checks passed: 5x income, held option and purchase clicks, forced refresh, keyboard focus, affordability, and exact purchase cost.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
