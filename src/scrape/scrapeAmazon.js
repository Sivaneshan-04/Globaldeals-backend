const puppeteer = require('puppeteer');
const Data = require('../models/data.model');


async function scrapeAmazon(url,cate) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const amazonUrl = 'https://www.amazon.in/s?k=laptops'; 
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  const products = await page.evaluate(() => {
    const data = [];
    const productElements = document.querySelectorAll('.s-main-slot .s-result-item');

    productElements.forEach((product) => {
      const title = product.querySelector('.a-size-medium.a-color-base.a-text-normal')?.innerText || null;
      let price = product.querySelector('.a-price .a-offscreen')?.innerText || null;
      const rating = product.querySelector('.a-icon-alt')?.innerText || null;
      const url = product.querySelector('h2 a')?.href || null;
      const category = 'laptops';
      const offer = product.querySelector('.a-row .a-letter-space + span')?.innerText || null; 
      const recentPurchase = product.querySelector('.a-row.a-size-base span.a-size-base.a-color-secondary')?.innerText || null;
      const imageUrl = product.querySelector('.s-image')?.src || null;
      const totalBuyers = product.querySelector('.a-row span')?.nextElementSibling?.innerText || null; 
      const originalPrice = product.querySelector('.a-text-price .a-offscreen')?.innerText || null;

      if (title && price && rating && url && category && offer && imageUrl && originalPrice) {
        const reviews = rating.split(' ')[0];
        const discount = offer.split(' ')[0].replace('(','').replace(')','').replace('%','');
        price = price.replace('₹', '');
        data.push({
          title,
          price,
          reviews,
          url,
          category:cate,
          discount,
          recentPurchase,
          imageUrl,
          totalBuyers,
          originalPrice,
          shop: 'Amazon'
        });
      }
    });

    
    return data;
  });
  

  await Data.insertMany(products);

  await browser.close();
  return products;
}

module.exports = scrapeAmazon;