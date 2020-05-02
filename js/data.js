var datasets = [];
var checkedDepts = [];
function readFiles(dataType) {
  var apiAddress = 'data/all.json';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      parseResponse(xhttp.responseText, dataType);
    }
  };
  xhttp.open('GET', apiAddress, true);
  xhttp.send();
}

function parseResponse (responseText, dataType) {
  var allJSON = JSON.parse(responseText);
  var color = Chart.helpers.color;
  var cities = [];

  for (var key in allJSON) {
    var datasetElem = {};
    // Remove depts.
    var label = key.replace('DEPARTAMENT DE SALUT DE', '')
      .replace('DEPARTAMENT DE SALUT D\'', '')
      .replace('DEPARTAMENT DE SALUT ', '').trim();
    if (!cities.includes(label)) {
      cities.push(label);
    }
    datasetElem.label = label;
    datasetElem.fill = false;

    // Check dataType
    if (dataType === 'accum') {
      datasetElem.data = allJSON[key];
    } else if (dataType === 'increment') {
      var newPoints = [];
      var auxElem;
      allJSON[key].forEach(function (elem, indx) {
        if (indx === 0) {
          newPoints.push(elem);
          auxElem = elem;
        } else {
          newPoints.push({ x: elem.x, y: elem.y - auxElem.y });
          auxElem = elem;
        }
      });
      newPoints.splice(0, 1);
      datasetElem.data = newPoints;
    }

    var colorElem = getRandomColor();
    // var colorElem = window.chartColors.red;
    datasetElem.backgroundColor = color(colorElem).alpha(0.5).rgbString();
    datasetElem.borderColor = colorElem;
    datasets.push(datasetElem);
  }

  // Draw chart
  drawChart(datasets);

  // Generate labels
  generateLabels(cities);
  checkedDepts = cities;
}

function getRandomColor () {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getUrlVars (whichVar) {
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars[whichVar] ? vars[whichVar] : 'accum';
}

function getCheckedDepartments () {
  var elems = document.getElementsByClassName('chk_department');
  var depts = [];
  for (var i = 0; i < elems.length; i++) {
    if (elems[i].childNodes[0].checked) {
      depts.push(elems[i].childNodes[0].value);
    }
  }
  return depts;
}

function checkDept (dept) {
  return checkedDepts.includes(dept.label);
}

function toggleDepartment () {
  checkedDepts = getCheckedDepartments();
  drawChart(datasets.filter(checkDept));
}
