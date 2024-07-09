const puppeteer = require('puppeteer');

async function scrapeTataCliq() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const tataCliqUrl = 'https://www.tatacliq.com/watches/c-msh15/page-1?q=:isDiscountedPrice:category:MSH15:inStockFlag:true:brand:MBH15E00576:brand:MBH15W00077:brand:MBH15E01399:brand:MBH12E01399:brand:MBH15B13148:brand:MBH15A00052';
  await page.goto(tataCliqUrl, { waitUntil: 'networkidle2' });

  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll('.Grid__element');
    const productList = Array.from(productElements).map(product => {
      const title = product.querySelector('.ProductDescription__description')?.innerText.trim() || 'N/A';
      const price = product.querySelector('.ProductDescription__priceHolder h3')?.innerText.trim() || 'N/A';
      const ratingElement = product.querySelector('.StarRating__starRatingHigh');
      const rating = ratingElement ? ratingElement.innerText.trim() : 'N/A';
      const url = product.querySelector('.ProductModule__aTag')?.href || 'N/A';
      const category = 'Watch';
      const offerElement = product.querySelector('.ProductDescription__newDiscountPercent');
      const offer = offerElement ? offerElement.innerText.trim() : 'N/A';
      const totalBuyersElement = product.querySelector('.ProductInfo__totalNoOfReviews');
      const totalBuyers = totalBuyersElement ? totalBuyersElement.innerText.replace(/[()]/g, '') : 'N/A';
      const imageUrl = product.querySelector('.Image__actual')?.src || 'N/A';

      return { title, price, rating, url, category, offer, totalBuyers, imageUrl };
    });

    return productList;
  });

  await browser.close();
  return products;
}

scrapeTataCliq().then(products => {
  console.log(products);
}).catch(error => {
  console.error('Error scraping Tata Cliq:', error);
});
