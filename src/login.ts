import { Browser, launch, Page } from 'puppeteer';

// Create an async closure, this way we can use await everywhere
(async () => {
    // Create the browser instance. Pass an object to launch to configure the browser instance
    const browser: Browser = await launch({
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        headless: false,
        args: [
            '--user-data-dir=C:\\Users\\Memmo\\AppData\\Local\\Google\\Chrome\\User Data'
        ]
    });

    // Create a new page, and navigate to the example site when it's ready
    const page: Page = await browser.newPage();
    await page.goto('https://bulksell.ebay.it/ws/eBayISAPI.dll?SingleList&sellingMode=AddItem&title=book&cat1=261186&itemCondition=1000&forcetool=CUB');

})();
