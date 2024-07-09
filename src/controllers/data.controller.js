const Data = require('../models/data.model');

const fetchAllData = async (req, res) => {
  const page = req.params.page || 1;
  try {
    const data = await Data.find()
      .limit(20)
      .skip((page - 1) * 20);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchCount = async (req, res) => {
  try {
    const count = await Data.count();
    console.log(count);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchTopDeals = async (req, res) => {
  try {
    const data = await Data.find().sort({ discount: -1 }).limit(6);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const data = await Data.find({ category });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchByFilter = async (req, res) => {
  const filter = req.params.category;

  // Split the string by '&' to get individual key-value pairs
  const queryParams = filter.split('&');

  // Initialize an object to store the extracted values
  const params = {};

  // Iterate over each key-value pair and extract the values
  queryParams.forEach((param) => {
    const [key, value] = param.split('=');
    params[key] = value;
  });

  // Extract the values
  const filt = params['filt'];
  const comp = params['comp'];
  const page = params['page'];

  console.log('filt:', filt);
  console.log('comp:', comp);
  console.log('page:', page);

  try {
      let count = await Data.count();
    if(filt === 'Most' && comp === 'All'){
      const data = await Data.find().sort({totalBuyers:-1})
      .limit(20)
      .skip((page - 1) * 20);
      res.status(200).json({data,count});
    }else if(comp !=='All' && filt === 'Most'){
      const data = await Data.find({shop:comp}).sort({totalBuyers:-1})
      .limit(20)
      .skip((page - 1) * 20);
      count = await Data.count({shop:comp});
        res.status(200).json({data,count});
    }

    else if (comp === 'All' && filt === 'Price'){
        const data = await Data.find().sort({ price: 1 })
        .limit(20)
        .skip((page - 1) * 20);
        res.status(200).json({data,count});
    }
    else if(comp !== 'All' && filt === 'Price'){
      const data = await Data.find({shop:comp}).sort({ price: 1 })
      .limit(20)
      .skip((page - 1) * 20);
      count = await Data.count({shop:comp});
      res.status(200).json({data,count});
    }

    else if (comp === 'All' && filt === 'Rating'){
      const data = await Data.find().sort({ reviews: -1 })
      .limit(20)
      .skip((page - 1) * 20);
      res.status(200).json({data,count});
    }

    else if(comp !== 'All' && filt === 'Rating'){
      const data = await Data.find({shop:comp}).sort({ reviews: -1 })
      .limit(20)
      .skip((page - 1) * 20);
      count = await Data.count({shop:comp});
      res.status(200).json({data,count});

    }
    else if(comp === 'All' && filt === 'offer'){
      const data = await Data.find().sort({ discount: -1 })
      .limit(20)
      .skip((page - 1) * 20);
      res.status(200).json({data,count});
    }
    else if(comp !== 'All' && filt === 'offer'){
      const data = await Data.find({shop:comp}).sort({ discount: -1 })
      .limit(20)
      .skip((page - 1) * 20);
      count = await Data.count({shop:comp});
      res.status(200).json({data,count});
    }
    else{
        res.status(404).json({message:'Invalid Filter'});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchAllData,
  fetchCount,
  fetchTopDeals,
  fetchByCategory,
  fetchByFilter,
};
