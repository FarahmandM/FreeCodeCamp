/*!
@author Farahmand Moslemi
*/

jQuery(document).ready(function($) {
  var setScreen = function(val) {
		screen = $.trim(val);
		if((screen.replace(/[\.-]/, '')).length > 8) {
			clearAll();
			screen = "Error";
		}
    $('#screen').text(screen.toUpperCase());
  }
  
  var getScreen = function() {
    return $.trim($('#screen').text());
  }
  
  var getAns = function() {
    return ans;
  }
  
  var setAns = function(v) {
    ans = v;
  }
  
  var clearAll = function() {
		screen = "0";
    setScreen(screen);
    setAns(0);
    key = "";
    op = "";    
  }
  
  var check = function() {
		if(screen === "0" && key === "-") {
			screen = "-";
			setScreen(screen);
			return;
		}
		var tmp = "";
    if (op === '') {
			tmp = parseFloat(eval(getScreen())).toPrecision(6);
		} else {
			tmp = parseFloat(eval(ans + " " + op + " " + getScreen())).toPrecision(6);
		}
		tmp = tmp.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/(\d*)\.0+$/, '$1');
		console.log(tmp);
		setAns(tmp);
  }

	var ans, screen, key, op;
	clearAll();
  
  $('#keys td').on('click', function() {
    key = $(this).data('val') + "";
		screen = getScreen();
		if(!screen.match(/^[-]?\d+\.?\d*$/) && key !== "ac") {
			//clearAll();
			return;
		}
		var hasDecimal = !(screen.indexOf('.') === -1);
    switch(key) {
      case 'ac':
        clearAll();
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
				if (hasDecimal) {
					screen = (screen + key).replace(/^(\-)?0*\.(\d*)/, '$1' + '0.' + '$2');
				} else {
					screen = (screen + key).replace(/^(\-)?0(\d*)/, '$1$2');
				}
        setScreen(screen);
        break;
      case '.':
				if (hasDecimal) return;
				screen += key;
        setScreen(screen);
        break;
			case '+':
      case '-':
      case '*':
      case '/':
				check();
				//console.log("ans = " + ans + ", op = " + op);
				//setScreen(ans);
				op = key;
        setScreen("0");
				break;
			case '=':
				check();
				//setAns(eval(ans + " " + op + " " + getScreen()));
				op = '';
        setScreen(ans);
				break;
    }
  });
});