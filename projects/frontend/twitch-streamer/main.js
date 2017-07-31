/*
 * @author: Farahmand Moslemi
*/
var usernames = ["freecodecamp", "brunofin", " comster404", "ESL_SC2", "OgamingSC2", "cretetion", "test_channel", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var generateAlert = function(message, type = "info", closeBtn = true) { // success | info | warning | danger
  html = '<div class="alert alert-' + type + ' alert-dismissible fade in" role="alert">';
  if (closeBtn) {
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  }
  html += message + '</div>';
  
  return html;
}

var offlineUsernames = [];

var generateDataHtml = function(url, logoUrl, name, game = "Offline") {
  var offline = game.toLowerCase() === "offline";
  logoUrl = logoUrl == null ? "https://dummyimage.com/64x64/ddd/000000.jpg&text=" + name : logoUrl;
  return '<a href="' + url + '" title="' + name + '" class="item ' + (offline ? '' : 'online') + '" rel="nofollow" target="_blank"><div><div><img src="' + logoUrl + '" alt="' + name + '"></div><div>' + name + '</div><div>' + game + '</div></div></a><div class="sep"></div>';
}

jQuery(document).ready(function($) {
  var usernames2 = [];
  usernames.forEach(function(username) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + encodeURI($.trim(username)) + "?callback=?").done(function(data) {
      usernames2.push(username);
      
      if(data.error != null) {
        $("#messages").append(generateAlert(data.error + ": " + data.message, "danger"));
        return;
      }
      if(data.stream !== null) {
        $('#result').append(generateDataHtml(data.stream.channel.url, data.stream.channel.logo, data.stream.channel.display_name, data.stream.game + ': ' + data.stream.channel.status));
      } else {
        offlineUsernames.push(username);
      }

      if(usernames.length  === usernames2.length) {
        offlineUsernames.forEach(function(username) {
          $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + encodeURI($.trim(username)) + "?callback=?").done(function(data) {
            if(data.error != null) {
              $("#messages").append(generateAlert(data.error + ": " + data.message, "danger"));
              return;
            }
            if(data.stream !== null) {
              $('#result').append(generateDataHtml(data.url, data.logo, data.display_name));
            } else {
              offlineUsernames.push(username);
            }
          }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            $("#messages").append(generateAlert(err, "danger"));
          });
        });
      }
      
    }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      $("#messages").append(generateAlert(err, "danger"));
    });
  });
  
  $('#actions .btn').on('click', function() {
    var $this = $(this);
    $('#actions .btn').each(function() {
      if ($(this).text() === $this.text()) {
        $(this).addClass('btn-primary');
      } else  {
        $(this).removeClass('btn-primary');
      }
    });
    switch($this.text()) {
      case "All":
        $('a.item').show();
        break;
      case "Online":
        $('a.item:not(.online)').hide();
        $('a.item.online').show();
        break;
      case "Offline":
        $('a.item:not(.online)').show();
        $('a.item.online').hide();
        break;
    }
  });
  
});
