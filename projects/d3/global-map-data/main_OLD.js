/*
 * @author: Farahmand Moslemi
*/
var $ = function (selectorStr) { return document.querySelector(selectorStr); };

var width = 1200;
var height = 600;

var app = $('#app');

var infoBox = document.createElement('div');
infoBox.setAttribute("id", "infoBox");
document.body.appendChild(infoBox);

var app = d3.select("#app")
  .style("width", width + "px")
  .style("height", height + "px")

var svg = app.append("svg")
  .attr("width", width)
  .attr("height", height);

var g = svg.append("g");

/* var canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
app.appendChild(canvas);
//var context = d3.select("canvas").node().getContext("2d");
var context = canvas.getContext("2d");
var path = d3.geo.path(d3.geo.orthographic(), context); */

d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (err, data) {
  if (err) {
    d3.select('#app').append('div').attr('class', 'error message').html('<strong>Error: </strong>World map data not found!');
    throw err;
    return false;
  }



  var geoJson = topojson.feature(data, data.objects.land); // data.objects.countries

  var projection = d3.geo.mercator()
    .scale(width / 2 / Math.PI)
  //.scale(width / 1 / Math.PI)
  //.rotate([0, 0]).center([0, 0]);
  //var projection = d3.geo.mercator()
  //.scale(100)
  //.translate([width / 2, height / 2]);

  /*
  var m0, d0;
  var drag = d3.behavior.drag()
    .on("dragstart", function () {
      var proj = projection.rotate();
      m0 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
      o0 = [-proj[0], -proj[1]];
    })
    .on("drag", function () {
      if (m0) {
        var m1 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY],
          o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
        projection.rotate([-o1[0], -o1[1]]);
      }

      // Update the map
      path = d3.geo.path().projection(projection);
      d3.selectAll("path").attr("d", path);
    }); */

  g.selectAll("path")
    .data(geoJson.features)
    .enter().append("path")
    .attr("d", d3.geo.path().projection(projection))

  g.datum({x: 0, y: 0}).call(d3.behavior.drag()
  //g.call(d3.behavior.zoom()
    .on("drag", function (d) {
    //.on("zoom", function (d) {
      console.log(d);
      /* var translate = d3.event.translate;
      var x = translate[0];
      var y = translate[1]; */
      projection.translate([d3.event.x, d3.event.y]);
      //projection.translate(d3.event.traslate);
      d3.select('path').attr("d", d3.geo.path().projection(projection))
      //d3.select('g').attr("transform", "translate(" + d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")")
      //d3.select('g').attr("transform", "translate(" + d3.event.translate.join(",") + ")")
      //d3.select('g').attr("transform", "translate(" + x + ", " + y + ")")
      //d3.select('g').attr("transform", "translate(" + d3.event.x + ", " + d3.event.y + ")")
      //d3.select('g').attr("transform", "translate(" + (d.x = d3.event.x) + ", " + (d.y = d3.event.y) + ")")
      //d3.select(this).attr("transform", "translate(" + (d.x = d3.event.x) + ", " + (d.y = d3.event.y) + ")")
      
      //d3.select('g').attr("transform", "translate(" + (d.x = d3.event.x) + ", " + (d.y = d3.event.y) + ")")
      
      //d3.select('g').attr("x", d3.event.x).attr("y", d3.event.y)
      //console.log(d3.event.translate)
      //console.log(d3.event)
      // console.log([d3.event.x, d3.event.y].projection(projection));
      //console.log(projection(d3.event.x, d3.event.y));
      //console.log(d.x, d.y);
      //console.log(d3.select('g').attr("x"))
      //d3.select('g').attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y)
    })
  );

  /* context.beginPath();
 path(topojson.mesh(data));
 context.stroke(); */
});


d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json', function (err, data) {
  if (err) {
    d3.select('#app').append('div').attr('class', 'error message').html('<strong>Error: </strong>Data file not found!');
    throw err;
    return false;
  }

  var features = data.features; // TODO
  // console.log(features);

  ;

  /* var svg = d3.select("#app").append("svg")
    .attr("width", width)
    .attr("height", height); */

  /* .on('mouseover', function (d) {
    var str = '<h2>' + d.country + '</h2>';
    infoBox.innerHTML = str;
    infoBox.style.left = ~~(d3.event.pageX + 20) + "px";
    infoBox.style.top = ~~(d3.event.pageY - infoBox.clientHeight / 2) + "px";
    infoBox.setAttribute('class', 'shown');
  }).on("mouseout", function () {
    infoBox.removeAttribute('class');
  }); */
});