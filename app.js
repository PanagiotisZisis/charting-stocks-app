'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Stocks = require('./models/stocks');
require('dotenv').config();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(process.env.MONGO_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.get('/', (req, res) => {
  // socket.io
  io.on('connection', socket => {
    socket.on('newStocks', data => {
      const updatedDoc = { stocks: data };
      Stocks.update({}, updatedDoc, err => {
        if (err) throw err;
        io.emit('newChart', updatedDoc.stocks);
      });
    });
  });

  Stocks.find({}, (err, docs) => {
    if (err) throw err;
    res.render('index', { stocks: JSON.stringify(docs[0].stocks) });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('app is listening at port 3000...');
});