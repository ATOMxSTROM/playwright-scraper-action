const { chromium } = require('playwright');

async function scrapePage(url) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
        cells
            .map(cell => parseFloat(cell.innerText))
            .filter(val => !isNaN(val))
    );

    await browser.close();

    return numbers.reduce((a, b) => a + b, 0);
}

(async () => {
    const urls = [
        "PASTE_SEED_20_URL",
        "PASTE_SEED_21_URL",
        "PASTE_SEED_22_URL",
        "PASTE_SEED_23_URL"
    ];

    let total = 0;

    for (const url of urls) {
        const sum = await scrapePage(url);
        total += sum;
    }

    console.log("TOTAL SUM:", total);
})();
