'use strict';

const express = require('express');
const router = express.Router();
const Stocks = require('../models/stocks');

router.get('/', (req, res) => {
  Stocks.find({}, (err, doc) => {
    if (err) throw err;
    if (!doc) {
      // initialize doc
    }
    console.log(doc);
    res.render('index', { stocks: JSON.stringify(doc[0].stocks) });
  });
});

module.exports = router;