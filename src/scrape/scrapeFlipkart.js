const puppeteer = require('puppeteer');
const Data = require('../models/data.model');


async function scrapeFlipkart(url,cate) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  

  // const flipkartUrl = 'https://www.flipkart.com/toys/remote-control-toys/pr?sid=mgl,56m&otracker=nmenu_sub_Baby%20%26%20Kids_0_Remote%20Control%20Toys';
  const flipkartUrl = 'https://www.flipkart.com/mobiles-accessories/pr?sid=tyy&otracker=categorytree';
  await page.goto(url, { waitUntil: 'networkidle2' });

  const products = await page.evaluate(() => {
    const data = [];
    const productElements = document.querySelectorAll('div[data-tkid]');

    
    productElements.forEach((product) => {
      const title = product.querySelector('.wjcEIp')?.innerText || null;
      let price = product.querySelector('.hl05eU .Nx9bqj')?.innerText || null;
      const rating = product.querySelector('.XQDdHH')?.innerText || null;
      const url = product.querySelector('a.VJA3rP')?.href || null;
      const category = 'Mobile_Accessaries'; 
      const offer = product.querySelector('.UkUFwK span')?.innerText || null;
      const imageUrl = product.querySelector('img.DByuf4')?.src || null;
      let totalBuyers = product.querySelector('.Wphh3N')?.innerText || null;
      const originalPrice = product.querySelector('.yRaY8j')?.innerText || null;

      if (title && price && rating && url && category && offer && imageUrl&& originalPrice ) {
        const reviews = rating.split(' ')[0];
        const discount = offer.split(' ')[0].replace('(','').replace(')','').replace('%','');
        totalBuyers = totalBuyers.replace('(','').replace(')','')
        price = price.replace('₹', '');

        data.push({
          title,
          price,
          reviews,
          url,
          category:cate,
          discount,
          imageUrl,
          totalBuyers,
          originalPrice,
          shop: 'Flipkart'
        });
      }
    });

    
    return data;
  });
  

  await Data.insertMany(products);

  await browser.close();
  return products;
}

// scrapeFlipkart().then(prod=>{
//   console.log(prod)
// })
// .catch(err=>{
//   console.log(err)
// })
module.exports = scrapeFlipkart;