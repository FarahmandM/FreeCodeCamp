/*
 * @author: Farahmand Moslemi
*/
var $ = function (selectorStr) { return document.querySelector(selectorStr); };

var infoBox = document.createElement('div');
infoBox.setAttribute("id", "infoBox");
document.body.appendChild(infoBox);

blankImgSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAgFAAEACAgAOw==';
/* var testImage = document.createElement('div');
testImage.setAttribute('src', blankImgSrc)
testImage.setAttribute('class', 'flag flag-' + 'ir');
$('h1').appendChild(testImage); */

d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function (err, data) {
  if (err) {
    d3.select('#app').append('div').attr('class', 'error message').html('<strong>Error: </strong>Data file not found!');
    throw err;
    return false;
  }

  var nodes = data.nodes; // nodes.length is 168
  var links = data.links; // range of target & source [0, 167]
  // console.log(nodes);
  // console.log(links);

  var app = $('#app');
  app.innerHTML = '';

  var width = 1000; // 1000 | 600 | 1000
  var height = 1000; // 600 | 600 | 1000

  d3.select("#app")
    .style("width", width + "px")
    .style("height", height + "px");

  d3.select("#app").append("div").attr("id", "flags");

  var svg = d3.select("#app").append("svg")
    .attr("width", width)
    .attr("height", height);

  var force = d3.layout.force()
    .size([width, height])
    .nodes(nodes)
    .links(links)
    .gravity(0.05)
    .distance(40) // 40 | 100 | 40
    .charge(-80) // -35 | -20 | -80
    .start()
    .on("tick", function () {
      //node.attr("transform", function(d) { return "translate(" + (d.x - 8) + "," + (d.y - 5) + ")"; });
      node
        .style("left", function (d) {
          var left = d.x - 8;
          if (left < 0) left = 0;
          else if (left + 16 > width) left = width - 16;
          return left + "px";
        })
        .style("top", function (d) {
          var top = d.y - 5;
          if (top < 0) top = 0;
          else if (top + 11 > height) top = height - 11;
          return top + "px";
        });

      link.attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    });

  var node = d3.select("#app").select("#flags").selectAll(".node").data(nodes).enter().append('img')
    // node.append("image")
    // .attr("xlink:href", blankImgSrc)
    .attr("src", blankImgSrc)
    .attr("class", function (d) { return 'flag flag-' + d.code })
    .attr("alt", function (d) { return d.country })
    .attr("width", "16")
    .attr("height", "11")
    .call(force.drag)
    .on('mouseover', function (d) {
      var str = '<h2>' + d.country + '</h2>';
      infoBox.innerHTML = str;
      infoBox.style.left = ~~(d3.event.pageX + 20) + "px";
      infoBox.style.top = ~~(d3.event.pageY - infoBox.clientHeight / 2) + "px";
      infoBox.setAttribute('class', 'shown');
    }).on("mouseout", function () {
      infoBox.removeAttribute('class');
    });

  var link = svg.selectAll(".link").data(links).enter().append("line")
    .attr("class", "link");
});