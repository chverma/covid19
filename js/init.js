function init() {
  readFiles(getUrlVars('dataType'));
}

function drawChart(datasets) {
  var config = {
    type: 'line',
    data: {
      datasets: datasets
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Persones contagiades acumulades per departament de salut'
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
                  displayFormats: {
                      quarter: 'DD MM'
                  }
                },
          distribution: 'series',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Data'
          },
          ticks: {
            major: {
              fontStyle: 'bold',
              fontColor: '#FF0000'
            }
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Casos'
          }
        }]
      }
    }
  };

  var ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);
  window.myLine.update();
}
