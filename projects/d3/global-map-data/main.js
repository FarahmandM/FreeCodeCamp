/*
 * @author: Farahmand Moslemi
*/
var $ = function (selectorStr) { return document.querySelector(selectorStr); };

// Mass of meteorites is in `gram`

var width = 1200;
var height = 660;
var massScale;

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

var projection = d3.geo.mercator()
  .scale(width / 2 / Math.PI)
var path = d3.geo.path().projection(projection);

svg.call(d3.behavior.zoom()
  .translate(projection.translate())
  .scale(projection.scale())
  .on("zoom", draw)
);

d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function (err, worldData) {
  if (err) {
    d3.select('#app').append('div').attr('class', 'error message').html('<strong>Error: </strong>World map data not found!');
    throw err;
    return false;
  }

  d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json', function (err2, data) {
    if (err2) {
      d3.select('#app').append('div').attr('class', 'error message').html('<strong>Error: </strong>Data file not found!');
      throw err2;
      return false;
    }

    var geoJson = topojson.feature(worldData, worldData.objects.land); // worldData.objects.countries

    g.selectAll("path")
      .data(geoJson.features)
      .enter().append("path")

    // Some data has no `geometry` and / or has `mass: null`, so I filter them out:
    var data = data.features.filter(function (item) {
      return 'geometry' in item && item.geometry !== null && item.properties.mass !== null;
    });
    data.sort(function (a, b) { return b.properties.mass - a.properties.mass });

    massScale = d3.scale.pow().exponent(1 / 3)
      .domain(d3.extent(data, function (d) { return +d.properties.mass; })) // mass is a string
      .range([1, Math.ceil(Math.min(width, height) / 16)]);

    g.selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("r", function (d) { return massScale((d.properties.mass === null) ? 1 : d.properties.mass) })
      .on('mouseover', function (d) {
        var props = d.properties;
        var date = new Date(props.year);
        var str = '<h2>' + props.name + '</h2>';
        str += '<hr />';
        str += '<table>';
        str += '<tr><td>Mass: </td><td>' + d3.format('s')(props.mass) + 'g' + '</td></tr>';
        str += '<tr><td>Latitude: </td><td>' + props.reclat + '</td></tr>';
        str += '<tr><td>Longitude: </td><td>' + props.reclong + '</td></tr>';
        str += '<tr><td>Year: </td><td>' + (new Date(props.year)).getFullYear() + '</td></tr>';
        str += '<tr><td>Fall: </td><td>' + props.fall + '</td></tr>';
        str += '<tr><td>Class: </td><td>' + props.recclass + '</td></tr>';
        str += '<tr><td>Name Type: </td><td>' + props.nametype + '</td></tr>';
        str += '</table>';
        infoBox.innerHTML = str;
        infoBox.style.left = Math.min(~~(d3.event.pageX + 20), ~~(window.innerWidth - infoBox.clientWidth - 10)) + "px";
        infoBox.style.top = ~~(d3.event.pageY - infoBox.clientHeight / 2) + "px";
        infoBox.setAttribute('class', 'shown');
      }).on("mouseout", function () {
        infoBox.removeAttribute('class');
      });

    draw();
  });
});

function draw() {
  //console.log(projection.scale());
  if (d3.event) {
    projection
      .translate(d3.event.translate)
      .scale(d3.event.scale);
  }
  g.selectAll("path").attr("d", path);

  g.selectAll("circle")
    //.attr("r", function (d) { return massScale((d.properties.mass === null) ? 1 : d.properties.mass) })
    .attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
    .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
}

/* 
// test
(function () {
  //var testScale =  d3.scale.pow().exponent(0.5).domain([0, 1000]).range([0, 20]);
  //var testScale =  d3.scale.sqrt().domain([0, 100]).range([0, 1]);
  //var testScale =  d3.scale.pow().exponent(1 / 3).domain([0, 100]).range([0, 1]);
  var testScale = d3.scale.pow().exponent(1 / 3).domain([0, 1000]).range([0, 1000]);
  var m1 = 100, m2 = 800;
  console.log('m1 = ' + m1 + '\nm2 = ' + m2 + '\nr1 = ' + testScale(m1) + '\nr2 = ', testScale(m2)); // (r1 / r2) = (m1 / m2) ^ (1 / 3) // OK eg. if m1 = 0.125 * m2 => r1 / r2 = 0.5
  console.log('m1 / m2 = ' + m1 / m2 + '\nr1 / r2 = ' + testScale(m1) / testScale(m2));
})();
*/