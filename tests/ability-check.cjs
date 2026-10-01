const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
 const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'msedge'});
 try {
  const page = await browser.newPage({viewport:{width:1440,height:960}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173');
  await page.click('#new-game');
  await page.evaluate(()=>{
   guideStep=0;prefs.guide=false;game.s.trees=[];game.s.money=100000;
   const knight=game.addHero('knight',190,230);knight.u=[0,6,0,0];knight.clock=100;
   const mage=game.addHero('mage',535,250);mage.u=[6,0,0,0];mage.clock=100;
   game.s.active=true;game.s.queue=['skeleton'];game.s.spawnClock=100;
   const enemy=game.spawn('giant');enemy.p=220;Object.assign(enemy,E.position(220));enemy.speed=0;
   updateUi(true);
  });
  const immediate=page.locator('[data-ability]').filter({hasText:'A Thousand Cuts'});
  const original=await immediate.elementHandle();
  const box=await immediate.evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
  await page.mouse.down();await page.waitForTimeout(500);await page.mouse.up();
  assert.ok(await page.evaluate(()=>game.s.heroes[0].cooldown>0),'A held click should activate the ability across UI refreshes');
  assert.ok(await original.evaluate(el=>el.isConnected),'Cooldown updates must preserve the button');
  assert.equal(await immediate.isDisabled(),true);
  const targeted=page.locator('[data-ability]').filter({hasText:'Meteor Shower'});
  await targeted.focus();await page.waitForTimeout(400);
  assert.equal(await targeted.evaluate(el=>document.activeElement===el),true,'Keyboard focus survives refreshes');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(()=>aiming),await targeted.getAttribute('data-ability').then(Number));
  const canvas=await page.locator('#game').boundingBox(),scale=Math.min(canvas.width/1100,canvas.height/720);
  await page.mouse.click(canvas.x+(canvas.width-1100*scale)/2+575*scale,canvas.y+(canvas.height-720*scale)/2+160*scale);
  assert.ok(await page.evaluate(()=>game.s.zones.some(z=>z.kind==='meteor')),'Targeted ability activates on map click');
  assert.equal(await page.evaluate(()=>aiming),null);
  assert.equal(await page.locator('[data-ability]').count(),4,'Each tier-six hero has two buttons');
  const primaryWait=await page.evaluate(()=>game.s.heroes[0].cooldown);
  await page.locator('[data-ability]').filter({hasText:'Swift Footwork'}).click();
  assert.ok(await page.evaluate(()=>game.s.heroes[0].secondaryCooldown>0));
  assert.ok(await page.evaluate(()=>game.s.heroes[0].cooldown)<=primaryWait,'Secondary does not reset primary cooldown');
  await page.locator('[data-ability]').filter({hasText:'Inferno Burst'}).click();
  assert.equal(await page.evaluate(()=>aimingSlot),'secondary');
  await page.mouse.click(canvas.x+(canvas.width-1100*scale)/2+575*scale,canvas.y+(canvas.height-720*scale)/2+160*scale);
  assert.ok(await page.evaluate(()=>game.s.heroes[1].secondaryCooldown>0));
  await page.evaluate(()=>{game.s.heroes[1].u[0]=4;updateUi(true);});
  assert.equal(await page.locator('[data-ability]').filter({hasText:'Inferno Burst'}).count(),0);
  assert.match(await targeted.innerText(),/T4/);
  await page.evaluate(()=>{game.s.heroes[0].cooldown=0;game.s.active=false;updateUi(true);});
  assert.equal(await immediate.isDisabled(),true,'Abilities stay unavailable between waves');
  await page.evaluate(()=>{game.s.active=true;updateUi(true);});
  assert.equal(await immediate.isDisabled(),false,'Abilities become available when a wave starts');
  await page.evaluate(()=>{game.sell(game.s.heroes[1].id);updateUi(true);});
  assert.equal(await targeted.count(),0,'Sold heroes lose their ability button');
  assert.deepEqual(errors,[]);
  console.log('Ability checks passed: held click, stable cooldown button, keyboard targeting, map activation, wave state, and selling.');
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
