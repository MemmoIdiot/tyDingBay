import { Browser, launch, Page } from 'puppeteer';
import * as config from './../config.json';
import * as data from './data.json';
// Create an async closure, this way we can use await everywhere
export async function job() {
  // Create the browser instance. Pass an object to launch to configure the browser instance
  const browser: Browser = await launch(config);

  // Create a new page, and navigate to the example site when it's ready
  const page: Page = await browser.newPage();
  await page.goto('https://bulksell.ebay.it/ws/eBayISAPI.dll?SingleList&sellingMode=AddItem&cat1=261186&itemCondition=1000&forcetool=CUB');
  await page.screenshot({ path: 'outputs/firstPage.png' });

  // * titolo
  await page.type('#editpane_title', 'MAMMA MIA IL TITOLAZZO');

  //* condizioni
  await page.type('#editpane_condDesc', data.condition);

  // * descrizione
  await page.type('#v4-11txtEdit_st', data.description);

  // * formato inserzione (compralo subito)
  await page.select('#format', 'FixedPrice');

  // * prezzo 
  await page.type('#binPrice', data.price);

  // * acquirenti anonimi
  await page.click('#privateAuction');

  //* pagamento immediato
  await page.click('#immediatePayment');

  // * piego di libro ordinario
  data.fees.forEach(async (feesPrice, i) => {
    await page.select(`#shipService${i + 1}`, 'IT_PieghidiLibri');
    await page.type(`#shipFee${i + 1}`, feesPrice);
    if (i == 0) {
      await page.click('#service_add');
    }
  });


  await page.click('#localPickup');
  await page.type('#localPickupFee', data.localPickUp);

  await page.click('#actionbar > input');
  // await page.type('#Listing\.Item\.ItemSpecific\[Book\ Title\]', 'MAMMA MIA CHE AUTORAZZO')
  // 
  // // Take a screenshot of the page and save it into the root folder (saves on creating folders)
  // await page.screenshot({ path: 'outputs/example.png' });


  // Run code in the page context, here we return the viewing area and number of divs on the page

};
