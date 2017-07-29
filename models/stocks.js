'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  stocks: [String]
});

module.exports = mongoose.model('stocks', stockSchema);