/*
 * @author: Farahmand Moslemi
*/
var $ = function (selectorStr) { return document.querySelector(selectorStr); };
//d3.selection.prototype.raise = function() { return this.each(function() { this.parentNode.appendChild(this); }); };

var infoBox = document.createElement('div');
infoBox.setAttribute("id", "infoBox");
document.body.appendChild(infoBox);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', function (err, data) {
  if (err) {
    //console.log(err);
    d3.select('#app').append('div').attr('class', 'error message').html('<strong>Error: </strong>Data file not found!');
    return false;
  }

  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var colors = ['#000099', '#0000cc', '#0000ff', '#00b4ff', '#00fff4', '#00ffa8', '#3eff00', '#fffa00', '#ffbe00', '#ff5a00', '#ff0000', '#cc0000'];

  var baseTemperature = data.baseTemperature;
  data = data.monthlyVariance;

  data = data.map(function(item) {
    item.temp = baseTemperature + item.variance;
    return item;
  });

  var minTemp = d3.min(data, function (d) { return d.temp })
  var maxTemp = d3.max(data, function (d) { return d.temp })
  // console.log(minTemp);
  // console.log(maxTemp);

  var xName = 'year';
  var yName = 'month';
  //console.log(data);

  var app = $('#app');
  app.innerHTML = '';
  var outerWidth = 1200;
  var outerHeight = 600;
  var xAxisLabelText = "Year";
  var yAxisLabelText = "Month";
  var axisLabelOffset = 50;
  var helpOffset = 50;
  var margin = { top: 60, right: 20, bottom: 15 + axisLabelOffset + helpOffset, left: 80 + axisLabelOffset };

  var innerWidth = outerWidth - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top - margin.bottom;

  var xDomain = d3.extent(data, function (d) { return d[xName]; });
  var yDomain = [12, 1];
  var colorDomain = d3.extent(data, function (d) { return d.temp; });

  var rectWidth = Math.ceil(innerWidth / (xDomain[1] - xDomain[0] + 1));
  var rectHeight = Math.ceil(innerHeight / (12 - 1));
  //var rectHeight = innerHeight / (12 - 1);

  var helpRectWidth = Math.ceil(innerWidth / colors.length / 1.1);
  var helpRectHeight = 20;

  var xTicks = 20;

  var yTicks = yTicks; //Math.ceil(xTicks);

  var svg = d3.select("#app").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight);
  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxisG = g.append("g")
    .attr("transform", "translate(" + ~~(rectWidth / 2) + "," + innerHeight + ")")
    .attr("class", "axis x");
  var xAxisLabel = xAxisG.append("text")
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + (innerWidth / 2) + "," + axisLabelOffset + ")")
    .attr("class", "label")
    .text(xAxisLabelText);
  var yAxisG = g.append("g")
    .attr("class", "axis y")
    .attr("transform", "translate(0," + -rectHeight / 2 + ")")
  var yAxisLabel = yAxisG.append("text")
    .style("text-anchor", "middle")
    .attr("transform", "rotate(-90) translate(" + -(2 * margin.top - axisLabelOffset + innerHeight / 2 - rectHeight) + "," + -(margin.left - axisLabelOffset + margin.right) + ")")
    .attr("class", "label")
    .text(yAxisLabelText);

  var xScale = d3.scale.linear().range([0, innerWidth]).domain(xDomain);
  var yScale = d3.scale.linear().range([innerHeight, 0]).domain(yDomain);
  var colorScale = d3.scale.quantile()
    .domain(colorDomain)
    .range(colors);
  // console.log(colorScale.quantiles());

  var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
    .outerTickSize(0)
    .ticks(xTicks)
    .tickFormat(d3.format('d'))
  xAxisG.call(xAxis);

  var yAxis = d3.svg.axis().scale(yScale).orient("left")
    .ticks(yTicks)
    .tickFormat(function (d) {
      return monthNames[d - 1];
    });
  yAxisG.call(yAxis);

  var helpG = svg.append("g")
    .attr("transform", "translate(" + ~~(outerWidth - innerWidth - margin.right + (innerWidth - helpRectWidth * colors.length) / 2) + "," + (margin.top + innerHeight + axisLabelOffset + 10) + ")")
    .attr("class", "help");

  var quantiles = colorScale.quantiles();

  var help = helpG.selectAll('.help')
    .data([quantiles[0] - 1].concat(quantiles)).enter()

  help.append("rect")
    .attr("x", function (d, i) { return helpRectWidth * i; })
    .attr("y", 10)
    .attr("width", helpRectWidth)
    .attr("height", helpRectHeight)
    .style("fill", function (d, i) { return colors[i]; });

  help.append("text")
    .attr("x", function (d, i) { return helpRectWidth * (i); })
    .attr("y", helpRectHeight)
    .attr("dy", "25")
    .attr("text-anchor", "middle")
    .text(function (d, i) { return i === 0 ? d3.format('.3f')(minTemp) : d3.format('.3f')(d) }) //≤≥

  helpG.append("text")
    .attr("x", helpRectWidth * colors.length)
    .attr("y", helpRectHeight)
    .attr("dy", "25")
    .attr("text-anchor", "middle")
    .text(d3.format('.3f')(maxTemp) + " °C") //≤≥

  g.selectAll("rect").data(data).enter().append("rect")
    .attr("class", "rect")
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .attr("x", function (d) { return xScale(d[xName]); })
    .attr("y", function (d) { return yScale(d[yName]) - rectHeight; })
    .style("fill", function(d) { return colorScale(d.temp); })
    .on('mouseover', function (data, index) {
      //var sel = d3.select(this);
      //sel.raise(); // raised defined and commented at the top of this file
      var str = '<h2>' + data.year + ' - ' + monthNames[data.month - 1] + '</h2>';
      str += '<h3>' + d3.format('.3f')(data.temp) + ' °C</h3>';
      str += d3.format('.3f')(data.variance) + ' °C';
      infoBox.innerHTML = str;
      infoBox.style.left = ~~(d3.event.pageX + 20) + "px";
      infoBox.style.top = ~~(d3.event.pageY - infoBox.clientHeight / 2) + "px";
      infoBox.setAttribute('class', 'shown');
    }).on("mouseout", function () {
      infoBox.removeAttribute('class');
    });
});