/*!
Author: Farahmand Moslemi
*/

var quotes = [
  {
    "quote": "I do not fear computers. I fear the lack of them.",
    "author": "Isaac Asimov"
  },
  {
    "quote": "Computers themselves, and software yet to be developed, will revolutionize the way we learn.",
    "author": "Steve Jobs"
  },
  {
    "quote": "The three chief virtues of a programmer are: Laziness, Impatience and Hubris.",
    "author": "Larry Wall"
  },
  {
    "quote": "Compared even to the development of the phone or TV, the Web developed very quickly.",
    "author": "Tim Berners-Lee"
  },
  {
    "quote": "I have a website because it's an interesting tool, very - and quite unexpectedly - useful for my work. It's become an archive and a fairly complete on-line portfolio, as well as offering an opportunity to write a little.",
    "author": "John Howe"
  },
  {
    "quote": "The word &#10075;code&#10076; turns out to be a really important word for my book, &#10075;The Information.&#10076; The genetic code is just one example. We talk now about coders, coding. Computer guys are coders. The stuff they write is code.",
    "author": "James Gleick"
  },
  {
    "quote": "Many jobs at Google require math, computing, and coding skills, so if your good grades truly reflect skills in those areas that you can apply, it would be an advantage. But Google has its eyes on much more.",
    "author": "Thomas Friedman"
  },
];

var n = quotes.length;
var prev = 0;
var i = 0;

window.onload = function() {

  var displayQuote = function() {
    while (i == prev) {
      i = ~~(Math.random() * n);
    }
    prev = i;
    
    document.querySelector("#quote").innerHTML = quotes[i].quote;
    document.querySelector("#author").innerHTML = quotes[i].author;
    document.querySelector("#tweet").href = "https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=" + encodeURI('"' + quotes[i].quote + '"' + " " + quotes[i].author);
  }
  displayQuote();
  
  document.getElementById('generate').addEventListener("click", displayQuote);
}
