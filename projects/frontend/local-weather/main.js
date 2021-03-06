/*!
Author: Farahmand Moslemi
*/

/* Skycons */
(function(q){var e,m;(function(){var y=q.requestAnimationFrame||q.webkitRequestAnimationFrame||q.mozRequestAnimationFrame||q.oRequestAnimationFrame||q.msRequestAnimationFrame,x=q.cancelAnimationFrame||q.webkitCancelAnimationFrame||q.mozCancelAnimationFrame||q.oCancelAnimationFrame||q.msCancelAnimationFrame;if(y&&x){e=function(A){var B={value:null};function z(){B.value=y(z);A()}z();return B};m=function(z){x(z.value)}}else{e=setInterval;m=clearInterval}}());var v=500,u=0.08,r=2*Math.PI,o=2/Math.sqrt(2);function h(A,z,C,B){A.beginPath();A.arc(z,C,B,0,r,false);A.fill()}function l(x,z,y,B,A){x.beginPath();x.moveTo(z,y);x.lineTo(B,A);x.stroke()}function w(E,D,A,z,y,x,B,G){var C=Math.cos(D*r),F=Math.sin(D*r);G-=B;h(E,A-F*y,z+C*x+G*0.5,B+(1-C*0.5)*G)}function f(E,D,A,z,y,x,C,F){var B;for(B=5;B--;){w(E,D+B/5,A,z,y,x,C,F)}}function i(G,F,z,x,A,H,y){F/=30000;var E=A*0.21,D=A*0.12,C=A*0.24,B=A*0.28;G.fillStyle=y;f(G,F,z,x,E,D,C,B);G.globalCompositeOperation="destination-out";f(G,F,z,x,E,D,C-H,B-H);G.globalCompositeOperation="source-over"}function d(J,I,A,y,B,K,z){I/=120000;var G=B*0.25-K*0.5,F=B*0.32+K*0.5,E=B*0.5-K*0.5,C,x,H,D;J.strokeStyle=z;J.lineWidth=K;J.lineCap="round";J.lineJoin="round";J.beginPath();J.arc(A,y,G,0,r,false);J.stroke();for(C=8;C--;){x=(I+C/8)*r;H=Math.cos(x);D=Math.sin(x);l(J,A+H*F,y+D*F,A+H*E,y+D*E)}}function c(G,F,A,y,B,H,z){F/=15000;var E=B*0.29-H*0.5,D=B*0.05,C=Math.cos(F*r),x=C*r/-16;G.strokeStyle=z;G.lineWidth=H;G.lineCap="round";G.lineJoin="round";A+=C*D;G.beginPath();G.arc(A,y,E,x+r/8,x+r*7/8,false);G.arc(A+Math.cos(x)*E*o,y+Math.sin(x)*E*o,E,x+r*5/8,x+r*3/8,true);G.closePath();G.stroke()}function b(L,K,C,A,D,M,B){K/=1350;var J=D*0.16,H=r*11/12,F=r*7/12,E,z,I,G;L.fillStyle=B;for(E=4;E--;){z=(K+E/4)%1;I=C+((E-1.5)/1.5)*(E===1||E===2?-1:1)*J;G=A+z*z*D;L.beginPath();L.moveTo(I,G-M*1.5);L.arc(I,G,M*0.75,H,F,false);L.fill()}}function t(J,I,C,A,D,K,B){I/=750;var H=D*0.1875,E,z,G,F;J.strokeStyle=B;J.lineWidth=K*0.5;J.lineCap="round";J.lineJoin="round";for(E=4;E--;){z=(I+E/4)%1;G=Math.floor(C+((E-1.5)/1.5)*(E===1||E===2?-1:1)*H)+0.5;F=A+z*D;l(J,G,F-K*1.5,G,F+K*1.5)}}function g(O,J,A,z,B,K,P){J/=3000;var T=B*0.16,R=K*0.75,I=J*r*0.7,D=Math.cos(I)*R,C=Math.sin(I)*R,H=I+r/3,N=Math.cos(H)*R,L=Math.sin(H)*R,G=I+r*2/3,U=Math.cos(G)*R,S=Math.sin(G)*R,Q,M,F,E;O.strokeStyle=P;O.lineWidth=K*0.5;O.lineCap="round";O.lineJoin="round";for(Q=4;Q--;){M=(J+Q/4)%1;F=A+Math.sin((M+Q/4)*r)*T;E=z+M*B;l(O,F-D,E-C,F+D,E+C);l(O,F-N,E-L,F+N,E+L);l(O,F-U,E-S,F+U,E+S)}}function a(G,F,z,x,A,H,y){F/=30000;var E=A*0.21,D=A*0.06,C=A*0.21,B=A*0.28;G.fillStyle=y;f(G,F,z,x,E,D,C,B);G.globalCompositeOperation="destination-out";f(G,F,z,x,E,D,C-H,B-H);G.globalCompositeOperation="source-over"}var p=[[-0.75,-0.18,-0.7219,-0.1527,-0.6971,-0.1225,-0.6739,-0.091,-0.6516,-0.0588,-0.6298,-0.0262,-0.6083,0.0065,-0.5868,0.0396,-0.5643,0.0731,-0.5372,0.1041,-0.5033,0.1259,-0.4662,0.1406,-0.4275,0.1493,-0.3881,0.153,-0.3487,0.1526,-0.3095,0.1488,-0.2708,0.1421,-0.2319,0.1342,-0.1943,0.1217,-0.16,0.1025,-0.129,0.0785,-0.1012,0.0509,-0.0764,0.0206,-0.0547,-0.012,-0.0378,-0.0472,-0.0324,-0.0857,-0.0389,-0.1241,-0.0546,-0.1599,-0.0814,-0.1876,-0.1193,-0.1964,-0.1582,-0.1935,-0.1931,-0.1769,-0.2157,-0.1453,-0.229,-0.1085,-0.2327,-0.0697,-0.224,-0.0317,-0.2064,0.0033,-0.1853,0.0362,-0.1613,0.0672,-0.135,0.0961,-0.1051,0.1213,-0.0706,0.1397,-0.0332,0.1512,0.0053,0.158,0.0442,0.1624,0.0833,0.1636,0.1224,0.1615,0.1613,0.1565,0.1999,0.15,0.2378,0.1402,0.2749,0.1279,0.3118,0.1147,0.3487,0.1015,0.3858,0.0892,0.4236,0.0787,0.4621,0.0715,0.5012,0.0702,0.5398,0.0766,0.5768,0.089,0.6123,0.1055,0.6466,0.1244,0.6805,0.144,0.7147,0.163,0.75,0.18],[-0.75,0,-0.7033,0.0195,-0.6569,0.0399,-0.6104,0.06,-0.5634,0.0789,-0.5155,0.0954,-0.4667,0.1089,-0.4174,0.1206,-0.3676,0.1299,-0.3174,0.1365,-0.2669,0.1398,-0.2162,0.1391,-0.1658,0.1347,-0.1157,0.1271,-0.0661,0.1169,-0.017,0.1046,0.0316,0.0903,0.0791,0.0728,0.1259,0.0534,0.1723,0.0331,0.2188,0.0129,0.2656,-0.0064,0.3122,-0.0263,0.3586,-0.0466,0.4052,-0.0665,0.4525,-0.0847,0.5007,-0.1002,0.5497,-0.113,0.5991,-0.124,0.6491,-0.1325,0.6994,-0.138,0.75,-0.14]],j=[{start:0.36,end:0.11},{start:0.56,end:0.16}];function s(K,J,I,G,A,L,z){var H=A/8,F=H/3,E=2*F,D=(J%1)*r,C=Math.cos(D),B=Math.sin(D);K.fillStyle=z;K.strokeStyle=z;K.lineWidth=L;K.lineCap="round";K.lineJoin="round";K.beginPath();K.arc(I,G,H,D,D+Math.PI,false);K.arc(I-F*C,G-F*B,E,D+Math.PI,D,false);K.arc(I+E*C,G+E*B,F,D+Math.PI,D,true);K.globalCompositeOperation="destination-out";K.fill();K.globalCompositeOperation="source-over";K.stroke()}function k(L,K,z,x,A,N,D,I,y){K/=2500;var M=p[D],J=(K+D-j[D].start)%I,G=(K+D-j[D].end)%I,E=(K+D)%I,H,F,C,B;L.strokeStyle=y;L.lineWidth=N;L.lineCap="round";L.lineJoin="round";if(J<1){L.beginPath();J*=M.length/2-1;H=Math.floor(J);J-=H;H*=2;H+=2;L.moveTo(z+(M[H-2]*(1-J)+M[H]*J)*A,x+(M[H-1]*(1-J)+M[H+1]*J)*A);if(G<1){G*=M.length/2-1;F=Math.floor(G);G-=F;F*=2;F+=2;for(B=H;B!==F;B+=2){L.lineTo(z+M[B]*A,x+M[B+1]*A)}L.lineTo(z+(M[F-2]*(1-G)+M[F]*G)*A,x+(M[F-1]*(1-G)+M[F+1]*G)*A)}else{for(B=H;B!==M.length;B+=2){L.lineTo(z+M[B]*A,x+M[B+1]*A)}}L.stroke()}else{if(G<1){L.beginPath();G*=M.length/2-1;F=Math.floor(G);G-=F;F*=2;F+=2;L.moveTo(z+M[0]*A,x+M[1]*A);for(B=2;B!==F;B+=2){L.lineTo(z+M[B]*A,x+M[B+1]*A)}L.lineTo(z+(M[F-2]*(1-G)+M[F]*G)*A,x+(M[F-1]*(1-G)+M[F+1]*G)*A);L.stroke()}}if(E<1){E*=M.length/2-1;C=Math.floor(E);E-=C;C*=2;C+=2;s(L,K,z+(M[C-2]*(1-E)+M[C]*E)*A,x+(M[C-1]*(1-E)+M[C+1]*E)*A,A,N,y)}}var n=function(x){this.list=[];this.interval=null;this.color=x&&x.color?x.color:"black";this.resizeClear=!!(x&&x.resizeClear)};n.CLEAR_DAY=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);d(y,A,x*0.5,C*0.5,B,B*u,z)};n.CLEAR_NIGHT=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);c(y,A,x*0.5,C*0.5,B,B*u,z)};n.PARTLY_CLOUDY_DAY=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);d(y,A,x*0.625,C*0.375,B*0.75,B*u,z);i(y,A,x*0.375,C*0.625,B*0.75,B*u,z)};n.PARTLY_CLOUDY_NIGHT=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);c(y,A,x*0.667,C*0.375,B*0.75,B*u,z);i(y,A,x*0.375,C*0.625,B*0.75,B*u,z)};n.CLOUDY=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);i(y,A,x*0.5,C*0.5,B,B*u,z)};n.RAIN=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);b(y,A,x*0.5,C*0.37,B*0.9,B*u,z);i(y,A,x*0.5,C*0.37,B*0.9,B*u,z)};n.SLEET=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);t(y,A,x*0.5,C*0.37,B*0.9,B*u,z);i(y,A,x*0.5,C*0.37,B*0.9,B*u,z)};n.SNOW=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);g(y,A,x*0.5,C*0.37,B*0.9,B*u,z);i(y,A,x*0.5,C*0.37,B*0.9,B*u,z)};n.WIND=function(y,A,z){var x=y.canvas.width,C=y.canvas.height,B=Math.min(x,C);k(y,A,x*0.5,C*0.5,B,B*u,0,2,z);k(y,A,x*0.5,C*0.5,B,B*u,1,2,z)};n.FOG=function(J,I,y){var H=J.canvas.width,A=J.canvas.height,K=Math.min(H,A),z=K*u;a(J,I,H*0.5,A*0.32,K*0.75,z,y);I/=5000;var G=Math.cos((I)*r)*K*0.02,F=Math.cos((I+0.25)*r)*K*0.02,E=Math.cos((I+0.5)*r)*K*0.02,D=Math.cos((I+0.75)*r)*K*0.02,x=A*0.936,C=Math.floor(x-z*0.5)+0.5,B=Math.floor(x-z*2.5)+0.5;J.strokeStyle=y;J.lineWidth=z;J.lineCap="round";J.lineJoin="round";l(J,G+H*0.2+z*0.5,C,F+H*0.8-z*0.5,C);l(J,E+H*0.2+z*0.5,B,D+H*0.8-z*0.5,B)};n.prototype={_determineDrawingFunction:function(x){if(typeof x==="string"){x=n[x.toUpperCase().replace(/-/g,"_")]||null}return x},add:function(y,x){var z;if(typeof y==="string"){y=document.getElementById(y)}if(y===null){return}x=this._determineDrawingFunction(x);if(typeof x!=="function"){return}z={element:y,context:y.getContext("2d"),drawing:x};this.list.push(z);this.draw(z,v)},set:function(z,x){var y;if(typeof z==="string"){z=document.getElementById(z)}for(y=this.list.length;y--;){if(this.list[y].element===z){this.list[y].drawing=this._determineDrawingFunction(x);this.draw(this.list[y],v);return}}this.add(z,x)},remove:function(y){var x;if(typeof y==="string"){y=document.getElementById(y)}for(x=this.list.length;x--;){if(this.list[x].element===y){this.list.splice(x,1);return}}},draw:function(z,y){var x=z.context.canvas;if(this.resizeClear){x.width=x.width}else{z.context.clearRect(0,0,x.width,x.height)}z.drawing(z.context,y,this.color)},play:function(){var x=this;this.pause();this.interval=e(function(){var y=Date.now(),z;for(z=x.list.length;z--;){x.draw(x.list[z],y)}},1000/60)},pause:function(){if(this.interval){m(this.interval);this.interval=null}}};q.Skycons=n}(this));
/* End of Skycons */

var tempC;
var tempF;

var displayTemp = function(unit = "C") {
  var t;
  var u;
  switch(unit) {
    case "F":
      t = tempF;
      h = 'F<a href="javascript: displayTemp(\'C\');" title="Convert to C"><sup>&harr;C</sup></a>';
      break;
    case "C":
    default:
      t = tempC;
      h = 'C<a href="javascript: displayTemp(\'F\');" title="Convert to F"><sup>&harr;F</sup></a>';
  }
  $("#temp").html(t);
  $("#unit").html(h);
}

var makeCircle = function() {
  var w = $('#weather').outerWidth();
  var h = $('#weather').outerHeight();
  if( w > h) {
    $('#weather').outerHeight(w);
  } else {
    $('#weather').outerWidth(h);
  }
}

jQuery(document).ready(function($) {
  makeCircle();
  $.getJSON("https://freegeoip.net/json/").done(function(data) {
    if (!data.ip) {
      $("#city").html('<span class="error">Error</span>');
      return;
    }
    var city = data.city;
    var country = data.country_name;
    
    var location;
    location = city.length > 0 ? city + ", " : "";
    location += country.length > 0 ? country : "";
    
    var lat = data.latitude;
    var lon = data.longitude;
    //var tz = data.time_zone;
    
    $("#city").html(location);
    $("#temp").html('<div class="loading"><div></div><div></div><div></div><div></div></div>');
    makeCircle();
    
    $.getJSON("https://api.darksky.net/forecast/47affe9b" + $('#footer > p').data("dd").split("").reverse().join("") + window.atob("OWIxMGY0ZWUxM2Q0Mw==") + "/" + lat + "," + lon + "?callback=?").done(function(d) {
      var weather = d.currently;
      var temp = weather.temperature;
      tempF = Math.round(temp);
      tempC = Math.round((temp - 32) * 5 / 9);
      
      var icon = weather.icon.toUpperCase().replace(/\-/g,"_");
      
      var skycons = new Skycons({"color": "#333"});
      skycons.add("wi", Skycons[icon]);
      skycons.play();
      
      $('#weatherIcon').prop('title', weather.summary);
      
      displayTemp("C");
      makeCircle();
    }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      $("#tempWrapper").html('<span class="error">' + err + '</span>');
    });
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    $("#city").html('<span class="error">' + err + '</span>');
  });
});
