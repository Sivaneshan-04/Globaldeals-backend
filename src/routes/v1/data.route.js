const express = require('express');

const router = express.Router();

const dataController = require('../../controllers/data.controller');

router.get('/products/:page', dataController.fetchAllData);
router.get('/count', dataController.fetchCount);
router.get('/filter/type/:category', dataController.fetchByCategory);
router.get('/filter/:category', dataController.fetchByFilter);
router.get('/top-deals', dataController.fetchTopDeals);

module.exports = router;