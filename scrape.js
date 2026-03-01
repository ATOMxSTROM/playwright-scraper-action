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
        "https://sanand0.github.io/tdsdata/js_table/?seed=20",
        "https://sanand0.github.io/tdsdata/js_table/?seed=21",
        "https://sanand0.github.io/tdsdata/js_table/?seed=22",
        "https://sanand0.github.io/tdsdata/js_table/?seed=23", "https://sanand0.github.io/tdsdata/js_table/?seed=24" , "https://sanand0.github.io/tdsdata/js_table/?seed=25", 
        "https://sanand0.github.io/tdsdata/js_table/?seed=26", "https://sanand0.github.io/tdsdata/js_table/?seed=27", "https://sanand0.github.io/tdsdata/js_table/?seed=28",
        "https://sanand0.github.io/tdsdata/js_table/?seed=29"
    ];

    let total = 0;

    for (const url of urls) {
        const sum = await scrapePage(url);
        total += sum;
    }

    console.log("TOTAL SUM:", total);
})();
