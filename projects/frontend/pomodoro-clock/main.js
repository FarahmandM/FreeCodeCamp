/*!
@author Farahmand Moslemi
*/

jQuery(document).ready(function($) {
  var sessionLen, breakLen, isSession, isPlaying, myInterval;

  var resetAll = function() {
    sessionLen = parseInt($('#session').val());
    breakLen = parseInt($('#break').val());
    isSession = true;
    isPlaying = false;
    myInterval = null;
    $('#bottomText').text('');
    $('#timer').removeClass('break');
    $('#topText').html('<i style="margin-top:-25px" class="fa fa-play fa-5x" aria-hidden="true"></i>');
    $('span#top').css('height', '50%');
    $('span#bottom').css('height', '0%');
  }

  resetAll();

  var secToString = function(t) {
    var h = ~~(t / 3600);
    var m = ~~((t - h * 3600) / 60);
    var s = (t - h * 3600 - m * 60);
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  };

  var checkPomodoro = function() {
    if(isSession) {
      var end = Date.now() + (60 * sessionLen * 1000);
      $('#topText').text(secToString(sessionLen * 60));
      myInterval = setInterval(function() {
        var $t = Math.round((end - Date.now()) / 1000);
        var $percentTop = Math.round(50 * $t / (sessionLen * 60));
        var $percentBottom = 50 - $percentTop;
        $('span#top').css('height', $percentTop + '%');
        $('span#bottom').css('height', $percentBottom + '%');
        if($t < 1) {
            $('#topText').text('');
            clearInterval(myInterval);
            isSession = !isSession;
            checkPomodoro();
        }
        $('#bottomText').text('Session');
        $('#timer').removeClass('break');
        $('#topText').text(secToString($t));
      }, 1000);
    } else {
      var end = Date.now() + (60 * breakLen * 1000);
      $('#topText').text(secToString(breakLen * 60));
      myInterval = setInterval(function() {
        var $t = Math.round((end - Date.now()) / 1000);
        var $percentTop = Math.round(50 * $t / (breakLen * 60));
        var $percentBottom = 50 - $percentTop;
        $('span#top').css('height', $percentTop + '%');
        $('span#bottom').css('height', $percentBottom + '%');
        if($t < 1) {
            $('#topText').text('');
            clearInterval(myInterval);
            isSession = !isSession;
            checkPomodoro();
        }
        $('#bottomText').text('Break');
        $('#timer').addClass('break');
        $('#topText').text(secToString($t));
      }, 1000);
    }
  }

  $('#form button').on('click' , function() {
    var $target = $(this).data('target');
    var $step = $(this).data('step');
    var $val = parseInt(eval($($target).val() + $step));
    if ($val < 1) $val = 1;
    $($target).val($val);
  });

  $('#form input').on('input change', function() {
    var $val = parseInt($(this).val());
    if ($val < 1 || isNaN($val)) $val = 1;
    $(this).val($val);
  });

  $('#timer').on('click', function() {
    if (isPlaying) {
      //isPlaying = false;
      $('#topText2').text('');
      $('span#bar').addClass('hidden');
      clearInterval(myInterval);
      resetAll();
    } else {
      $('#topText2').html('<i class="fa fa-stop fa-2x" aria-hidden="true"></i>');
      $('span#bar').removeClass('hidden');
      isPlaying = true;
      sessionLen = parseInt($('#session').val());
      breakLen = parseInt($('#break').val());
      checkPomodoro();
    }
  });
});