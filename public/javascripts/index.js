'use strict';

$(document).ready(function() {
  var socket = io();
  socket.on('greeting', function(msg) {
    console.log(msg);
  });

  var stockNames = ['MSFT', 'AMZN', 'GOOG', 'FB'];
  var stocks = [];

  stockNames.forEach(function(stock) {
    stocks[stock] = [];
  });

  stockNames.forEach(function(stock) {
    $.ajax({
      type: 'GET',
      url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + stock + '&apikey=ANNU3ILLFHQQYRD1',
      success: function(data) {
        $.each(data['Time Series (Daily)'], function(key, value) {
          stocks[stock].push({ Date: key, Price: value['4. close']});
        });
      }
    });
  });
  console.log(stocks);

  /*var ctx = $('#myChart');
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Charting the Stock Market',
        data: stockPrices,
        backgroundColor: colors
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });*/
});