const cron = require('node-cron');
const scrapeAmazon = require('../scrape/scrapeAmazon');
const scrapeFlipkart = require('../scrape/scrapeFlipkart')
const scrapeAjio = require('../scrape/scrapeAjio');
const Data = require('../models/data.model');

// Schedule cron job to run every day at 00:00 (midnight)
var task = cron.schedule('0 0 * * *', async () => {
  console.log('Running daily scraping job...');

  await Data.deleteMany({}); // Clear existing data
  const resp = await scrapeAmazon('https://www.amazon.in/s?k=laptops','Laptops');
  const resp2 = await scrapeFlipkart('https://www.flipkart.com/mobiles-accessories/pr?sid=tyy&otracker=categorytree','Mobile_Accessories');
  const resp3 = await scrapeAjio('https://www.ajio.com/men-shirts/c/830216013','Shirts');
  const resp4 = await scrapeAjio('https://www.ajio.com/men-jackets-coats/c/830216010','Jackets');


console.log('Scraping job completed:', resp);
});

module.exports = task;