const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4173');
    await page.click('#new-game');
    assert.ok(await page.locator('#guide').isVisible());

    // A real click can span several screen updates. Keep the press held to
    // reproduce the old button being replaced before the mouse is released.
    const box = await page.locator('#skip-guide').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(450);
    await page.mouse.up();
    assert.equal(await page.locator('#guide').isVisible(), false, 'Skip Guide should dismiss the guide even across screen updates');
    assert.equal((await page.evaluate(() => inspectGame())).prefs.guideDone, true);

    // A new game must remember that the guide was skipped.
    await page.click('#settings-button');
    await page.click('#save-exit');
    await page.reload();
    await page.click('#new-game');
    await page.click('#confirm-new');
    assert.equal(await page.locator('#guide').isVisible(), false);

    // Guide text should still advance, and keyboard focus must survive updates.
    await page.evaluate(() => { guideStep = 2; updateUi(); });
    assert.match(await page.locator('#guide').innerText(), /Your first hero is ready/);
    await page.click('#start-wave');
    assert.match(await page.locator('#guide').innerText(), /Make your hero stronger/);
    await page.locator('#skip-guide').focus();
    await page.waitForTimeout(450);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'skip-guide');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#guide').isVisible(), false);
    assert.deepEqual(errors, []);
    console.log('Guide checks passed: held click, saved preference, advancing steps, and keyboard dismissal.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
