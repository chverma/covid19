function init () {
  readFiles(getUrlVars('dataType'));
}

function drawChart (datasets) {
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

function generateLabels (labels) {
  labels.sort();
  var ul = document.getElementById('slide-out');
  labels.forEach((item, i) => {
    var li = document.createElement('li');
    var label = document.createElement('label');
    label.classList.add('chk_department');
    var input = document.createElement('input');
    var span = document.createElement('span');
    span.innerHTML = item;
    input.setAttribute('type', 'checkbox');
    input.setAttribute('checked', 'checked');
    input.setAttribute('value', item);
    input.addEventListener('click', toggleDepartment);
    label.appendChild(input);
    label.appendChild(span);
    li.appendChild(label);
    ul.appendChild(li);
  });

  var elems = document.querySelectorAll('.sidenav');
  var options = {
    edge: 'left'
  };
  M.Sidenav.init(elems, options);
}
