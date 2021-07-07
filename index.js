const { chromium } = require('playwright');
const { secrets } = require('./settings');

(async () => {
    const browserOptions = {
        headless: false,
        slowMo: 1000
    };

    const browser = await chromium.launch(browserOptions);
    const page = await browser.newPage();

    await page.goto('https://twitter.com/');
    await page.click('text=Log in');
    await page.fill('input[name="session[username_or_email]"]', secrets.twitterUsername);
    await page.press('input[name="session[username_or_email]"]', 'Tab');
    await page.fill('input[name="session[password]"]', secrets.twitterPassword);
    await page.click('[data-testid="LoginForm_Login_Button"]')

    await page.click('[data-testid="tweetTextarea_0"] >> :nth-match(div, 3)');
    await page.fill(
        '[data-testid="tweetTextarea_0"] >> :nth-match(div, 3)', 
        'This tweet was posted through Playwright #uitesting #nodejs #programming #javascript #webdevelopment');
    await page.press('[data-testid="tweetTextarea_0"]', 'Escape');
    await page.click('[data-testid="tweetButtonInline"]');

    await page.screenshot({ path: `twitter.png`});
    await browser.close();
})();