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

function generateLabels(labels) {
  labels.sort();
  var ul = document.getElementById('slide-out');
  labels.forEach((item, i) => {
    var li = document.createElement('li');
    var a = document.createElement('a');
    //var i = document.createElement('i');
    //i.innerHTML = "cloud";
    //i.classList.add("material-icons");
    //i.classList.add("left");
    a.classList.add("waves-effect");
    a.classList.add("waves-light");
    a.classList.add("btn-small");
    //a.appendChild(i);
    a.innerHTML = item;
    li.appendChild(a);
    ul.appendChild(li);
  });

  var elems = document.querySelectorAll('.sidenav');
  var options = {
    edge: 'left',
  }
  var instances = M.Sidenav.init(elems, options);
}
