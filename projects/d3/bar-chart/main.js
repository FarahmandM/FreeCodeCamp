/*
 * @author: Farahmand Moslemi
*/
var $ = function (selectorStr) {
  return document.querySelector(selectorStr);
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var infoBox = document.createElement('div');
infoBox.setAttribute("id", "infoBox");
document.body.appendChild(infoBox);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function (err, data) {
  if (err) {
    //console.log(err);
    d3.select('#app').append('div').attr('class', 'error message').html('<strong>Error: </strong>' + err.responseText);
    return false;
  }
  //var description = data.description.split('\n').join('<br />');
  var description = data.description.split('\n');
  description = description.map(function (item) {
    // var part = item.split(':');
    // return '<strong>' + part[0] + ':</strong> ' + part.slice(1).join(':');
    return item = item.replace(/^([\sa-zA-Z]+:)/, '<strong>$1</strong>');
  });
  description = description.join('<br />');
  var descElem = $('#description');
  descElem.setAttribute('class', 'info message')
  descElem.innerHTML = description;

  data = data.data.map(function (item) {
    return [new Date(item[0]), +item[1]];
  });
  //console.log(data);

  var draw = function () {
    infoBox.style.left = 0;
    infoBox.style.top = 0
    var appElem = $('#app');
    appElem.innerHTML = '';
    var outerWidth = appElem.clientWidth;
    var outerHeight = ~~(600 * outerWidth / 1600);
    var xAxisLabelText = "Date (Year)";
    var yAxisLabelText = "Gross Domestic Product, USA (Billion)";
    var axisLabelOffset = 50;
    var margin = { top: 20, right: 20, bottom: 15 + axisLabelOffset, left: 75 + axisLabelOffset };

    var innerWidth = outerWidth - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top - margin.bottom;

    var xTicks;
    if (outerWidth > 3000) xTicks = 1;
    else if (outerWidth > 1600) xTicks = 2;
    else if (outerWidth > 900) xTicks = 4;
    else if (outerWidth > 750) xTicks = 5;
    else if (outerWidth > 650) xTicks = 6;
    else if (outerWidth > 550) xTicks = 8;
    else if (outerWidth > 450) xTicks = 10;
    else xTicks = 15;

    var yTicks = Math.ceil(40 / xTicks);

    var svg = d3.select("#app").append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight);
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxisG = g.append("g")
      .attr("transform", "translate(0," + innerHeight + ")")
      .attr("class", "axis");
    var xAxisLabel = xAxisG.append("text")
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + (innerWidth / 2) + "," + axisLabelOffset + ")")
      .attr("class", "label")
      .text(xAxisLabelText);
    var yAxisG = g.append("g")
      .attr("class", "axis");
    var yAxisLabel = yAxisG.append("text")
      .style("text-anchor", "middle")
      .attr("transform", "rotate(-90) translate(" + -(margin.top - axisLabelOffset + innerHeight / 2 + 20) + "," + -(margin.left - axisLabelOffset + 10) + ")")
      .attr("class", "label")
      .style('font-size', Math.ceil(45 / xTicks) + 'px')
      .text(yAxisLabelText);

    var xScale = d3.time.scale().range([0, innerWidth]).domain(d3.extent(data, function (d) { return d[0]; }));
    var yScale = d3.scale.linear().range([innerHeight, 0]).domain([0, d3.max(data, function (d) { return d[1]; })]);

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
      .outerTickSize(0)
      .ticks(d3.time.years, xTicks);
    xAxisG.call(xAxis);

    var yAxis = d3.svg.axis().scale(yScale).orient("left")
      .outerTickSize(0)
      .ticks(yTicks)
      .tickFormat(d3.format(","));
    yAxisG.call(yAxis);

    var bars = g.selectAll("rect").data(data);
    bars.enter().append("rect")
      .attr('class', 'bar')
      .attr("x", function (d) { return xScale(d[0]); })
      .attr("y", function (d) { return yScale(d[1]); })
      .attr("width", Math.ceil(innerWidth / data.length))
      .attr("height", function (d) { return innerHeight - yScale(d[1]); });

    d3.selectAll('.bar')
      .on('mouseover', function (data, index) {
        var str = '<h2>' + d3.format("$,.2f")(data[1]) + ' Billion</h2>' + data[0].getFullYear() + ' - ' + monthNames[data[0].getMonth()];
        infoBox.innerHTML = str;
        infoBox.style.left = Math.min(~~(d3.event.pageX - infoBox.clientWidth / 2), ~~(window.innerWidth - infoBox.clientWidth - 10)) + "px";
        infoBox.style.top = ~~(d3.event.pageY - 60) + "px";
        infoBox.setAttribute('class', 'shown');
      }).on("mouseout", function () {
        infoBox.removeAttribute('class');
      });
  }

  draw();

  if (window.attachEvent) {
    window.attachEvent('onresize', draw);
  }
  else if (window.addEventListener) {
    window.addEventListener('resize', draw);
  }
});