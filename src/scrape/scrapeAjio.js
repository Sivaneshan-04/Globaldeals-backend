// const puppeteer = require('puppeteer');

// async function scrapeAjio() {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   const ajioUrl = 'https://www.ajio.com/men-jackets-coats/c/830216010';
//   await page.goto(ajioUrl, { waitUntil: 'networkidle2' });

//   const products = await page.evaluate(() => {
//     const data = [];
//     const productElements = document.querySelectorAll('div.item');

//     const productList = Array.from(productElements).map(product => {
//       const title = product.querySelector('.nameCls')?.innerText || null;
//       const price = product.querySelector('.price strong')?.innerText || null;
//       const rating = product.querySelector('._1N0OO')?.innerText || null;
//       const url = product.querySelector('a.rilrtl-products-list__link')?.href || null;
//       const category = 'Dress'; 
//       const offer = product.querySelector('.discount')?.innerText || null;
//       const recentPurchase = product.querySelector('.offer-pricess')?.innerText || null;
//       const imageUrl = product.querySelector('.rilrtl-lazy-img  .rilrtl-lazy-img-loaded')?.src || null;
//       const totalBuyers = product.querySelector('._2QgMK p:last-child')?.innerText.split('|')[1].trim() || null;

//       if(title && price && rating && url && category && offer && recentPurchase && imageUrl && totalBuyers){


//       }
 
//       return { title, price, rating, url, category, offer, recentPurchase, imageUrl, totalBuyers };
//     });

//     return productList;
//   });

//   await browser.close();
//   return products.slice(0, 30);
// }

// scrapeAjio().then(products => {
//   console.log(products);
//   console.log(products.length);
// }).catch(error => {
//   console.error('Error scraping AJIO:', error);
// });
const puppeteer = require('puppeteer');
const Data = require('../models/data.model');

async function scrapeAjio(url,cate) {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // const ajioUrl = 'https://www.ajio.com/men-shirts/c/830216013';
  await page.goto(url, { waitUntil: 'networkidle2' });

  const products = await page.evaluate(() => {
    const data = [];
    const productElements = document.querySelectorAll('.rilrtl-products-list__item');

    productElements.forEach((product) => {
      const title = product.querySelector('.nameCls')?.innerText || null;
      let price = product.querySelector('.price strong')?.innerText || null;
      const rating = product.querySelector('._1N0OO')?.innerText || null;
      const url = product.querySelector('.rilrtl-products-list__link')?.href || null;
      const offer = product.querySelector('.discount')?.innerText || null;
      const imageUrl = product.querySelector('.imgHolder img')?.src || null;
      let totalBuyers = product.querySelector('._2QgMK p[aria-label]')?.innerText || null;
      const originalPrice = product.querySelector('.orginal-price')?.innerText || null;
      if (title && price && rating && url && offer && imageUrl && originalPrice) {
        const reviews = rating;
        price = price.replace('₹', '');
        const discount = offer.split(' ')[1].replace('(', '').replace(')', '').replace('%', '');
        totalBuyers = totalBuyers.replace('|', '').trim();

        data.push({
          title,
          price,
          reviews,
          url,
          discount,
          category:cate,
          imageUrl,
          totalBuyers,
          originalPrice,
          shop: 'Ajio'
        });
      }
    });

    return data;
  });

  await Data.insertMany(products);

  await browser.close();
  return products;
}

// scrapeAjio().then(prod => {
//   console.log(prod)
//   console.log(prod.length)
// })
// .catch(err => {
//   console.log(err)
// })

module.exports = scrapeAjio;
