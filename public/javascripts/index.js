'use strict';

$(document).ready(function() {
  var socket = io();
  socket.on('greeting', function(msg) {
    console.log(msg);
  });

  var seriesOptions = [],
    seriesCounter = 0,
    names = ['MSFT', 'AAPL'];

  function createChart() {

    Highcharts.stockChart('myChart', {

      rangeSelector: {
        selected: 1
      },

      yAxis: {
        labels: {
          formatter: function () {
            return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormat: {
          month: '%Y-%m',
        }
      },

      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true
        }
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true
      },

      legend: {
        enabled: true,
        align: 'right',
        backgroundColor: '#FCFFC5',
        borderColor: 'black',
        borderWidth: 2,
        layout: 'vertical',
        verticalAlign: 'top',
        y: 100,
        shadow: true
      },

      title: {
        text: 'Stocks',
        align: 'center',
        style: {
          fontSize: '35px',
          fontFamily: 'Roboto'
        }
      },

      series: seriesOptions
    });
  }

  $.each(names, function (i, name) {

    $.getJSON('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + name + '&apikey=ANNU3ILLFHQQYRD1', function (data) {
      var dataset = [];

      for (var key in data['Time Series (Daily)']) {
        if (data['Time Series (Daily)'].hasOwnProperty(key)) {
          dataset.push([Date.parse(key), +data['Time Series (Daily)'][key]['1. open']]);
        }
      }

      dataset.reverse();
      seriesOptions[i] = {
        name: name,
        data: dataset
      };

      seriesCounter += 1;

      if (seriesCounter === names.length) {
        createChart();
      }
    });
  });
});