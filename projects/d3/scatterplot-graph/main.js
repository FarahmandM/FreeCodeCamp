/*
 * @author: Farahmand Moslemi
*/
var $ = function (selectorStr) {
  return document.querySelector(selectorStr);
}

var infoBox = document.createElement('div');
infoBox.setAttribute("id", "infoBox");
document.body.appendChild(infoBox);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', function (err, data) {
  if (err) {
    //console.log(err);
    d3.select('#app').append('div').attr('class', 'error message').html('<strong>Error: </strong>Data file not found!');
    return false;
  }

  var firstPlaceSeconds = d3.min(data, function (d) { return d.Seconds; });
  data = data.map(function (item) {
    //return [item.Seconds - firstPlaceSeconds, item.Place, item.Name, item.Nationality, item.Year, item.Time];
    return {
      seconds: item.Seconds - firstPlaceSeconds,
      place: item.Place,
      name: item.Name,
      nationality: item.Nationality,
      year: item.Year,
      time: item.Time,
      doping: item.Doping,
      url: item.URL
    };
  });

  var xName = 'seconds';
  var yName = 'place';
  //console.log(data);

  var draw = function () {
    infoBox.style.left = 0;
    infoBox.style.top = 0
    var appElem = $('#app');
    appElem.innerHTML = '';
    var outerWidth = appElem.clientWidth;
    var outerHeight = ~~(outerWidth / 2);
    var xAxisLabelText = "Minutes Behind Fastest Time";
    var yAxisLabelText = "Ranking";
    var axisLabelOffset = 50;
    var margin = { top: 20, right: 20, bottom: 15 + axisLabelOffset, left: 20 + axisLabelOffset };
    var padding = { top: 30, right: 100, bottom: 0, left: 20 };

    var innerWidth = outerWidth - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top - margin.bottom;

    //console.log(outerWidth);
    var xTicks;
    if (outerWidth > 3000) xTicks = 50;
    else if (outerWidth > 2000) xTicks = 40;
    else if (outerWidth > 1600) xTicks = 25;
    else if (outerWidth > 900) xTicks = 16;
    else if (outerWidth > 750) xTicks = 10;
    else if (outerWidth > 650) xTicks = 8;
    else if (outerWidth > 550) xTicks = 6;
    else if (outerWidth > 450) xTicks = 4;
    else xTicks = 2;

    var yTicks = Math.ceil(xTicks);

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
      .attr("transform", "rotate(-90) translate(" + -(2 * margin.top - axisLabelOffset + innerHeight / 2) + "," + -(margin.left - axisLabelOffset + margin.right) + ")")
      .attr("class", "label")
      //.style('font-size', Math.ceil(45 / xTicks) + 'px')
      .text(yAxisLabelText);

    var xScale = d3.scale.linear().range([0 + padding.left, innerWidth - ~~(xTicks / 20 * padding.right)]).domain(d3.extent(data, function (d) { return d[xName]; }).reverse());
    var yScale = d3.scale.linear().range([innerHeight - padding.top, 0 + padding.bottom]).domain(d3.extent(data, function (d) { return d[yName]; }).reverse());


    var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
      .ticks(xTicks)
      .tickFormat(function (time) {
        var minutes = ~~(time / 60);
        var seconds = time - minutes * 60;
        return minutes + ":" + (seconds < 10 ? '0' + seconds : seconds);
      });
    xAxisG.call(xAxis);

    var yAxis = d3.svg.axis().scale(yScale).orient("left")
      .ticks(yTicks)
      .tickFormat(d3.format(","));
    yAxisG.call(yAxis);

    var radius = Math.ceil(xTicks / 5);
    var textFontSize = Math.ceil(xTicks / 1.2) + 'px';

    g.selectAll("circle").data(data).enter().append("circle")
      .attr("class", function (d) { return 'circle' + (d.doping === '' ? '' : ' doping'); })
      .attr("r", radius)
      .attr("cx", function (d) { return xScale(d[xName]); })
      .attr("cy", function (d) { return yScale(d[yName]); })
      .on('mouseover', function (data, index) {
        var str = data.name + ': ' + data.nationality + '<br />';
        str += 'Year: ' + data.year + ', Time: ' + data.time;
        str += data.doping === "" ? '' : '<br />' + data.doping;
        infoBox.innerHTML = str;
        infoBox.style.left = Math.min(~~(d3.event.pageX), ~~(window.innerWidth - infoBox.clientWidth - 10)) + "px";
        infoBox.style.top = ~~(d3.event.pageY + 2 * radius) + "px";
        infoBox.setAttribute('class', 'shown');
      }).on("mouseout", function () {
        infoBox.removeAttribute('class');
      });

    var textG = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    textG.selectAll("text").data(data).enter().append("text")
      .text(function (d) { return d.name; })
      .attr("class", function (d) { return 'name' + (d.doping === '' ? '' : ' doping'); })
      .attr("x", function (d) { return xScale(d[xName]); })
      .attr("y", function (d) { return yScale(d[yName]); })
      .style("font-size", textFontSize)
      .attr("transform", "translate(" + 2 * radius + ", " + Math.ceil(xTicks / 3.5) + ")");

    var helpG = g.append("g")
      .attr("transform", "translate(" + ~~(2 * innerWidth / 3) + "," + ~~(2 * innerHeight / 3) + ")");

    helpG.append("circle")
      .attr("class", "circle")
      .attr("r", radius)
      .attr("cx", "0")
      .attr("cy", Math.ceil(-radius / 2))

    helpG.append("circle")
      .attr("class", "circle doping")
      .attr("r", radius)
      .attr("cx", "0")
      .attr("cy", Math.ceil(xTicks - radius / 2))

    helpG.append("text")
      .attr("class", "name")
      .text("No doping allegations")
      .style("font-size", textFontSize)
      .attr("transform", "translate(" + 2 * radius + ", " + Math.ceil(0.2 * xTicks) + ")")

    helpG.append("text")
      .attr("class", "name doping")
      .text("Riders with doping allegations")
      .style("font-size", textFontSize)
      .attr("transform", "translate(" + 2 * radius + ", " + Math.ceil(1.2 * xTicks) + ")")
  }

  draw();

  if (window.attachEvent) {
    window.attachEvent('onresize', draw);
  }
  else if (window.addEventListener) {
    window.addEventListener('resize', draw);
  }
});