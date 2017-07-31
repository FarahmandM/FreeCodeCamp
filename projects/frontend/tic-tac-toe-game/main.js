/*
 * @author Farahmand Moslemi
 */

// http://blog.andrewray.me/how-to-clone-a-nested-array-in-javascript/
function arrayClone(arr) {
  var i, copy;
  if(Array.isArray(arr)) {
    copy = arr.slice(0);
    for(i = 0; i < copy.length; i++) {
      copy[i] = arrayClone(copy[i]);
    }
    return copy;
  } else if(typeof arr === 'object') {
    throw 'Cannot clone array containing an object!';
  } else {
    return arr;
  }
}

jQuery(function($) {
    var p = [], c = [], pScore = 0, cScore = 0, pSign = '', cSign = '', turn, gameStopped, winState;
    var snd = new Audio('data:audio/mp3;base64,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blNGo070av1aURgEQAICoe1///KreqrsLCywzfw3tbeq3Kz/K3zU3SL7xek6t0tU0TcterVzpvx1w/Pttf////////////x/3/97TSK01/8ccfbTKysvOzrzFzMcXKxdNOU8dTbO7mSMmu6ceJAAROAP8GR////////+2rG1ysdaSu9ZlYWKVzCVFIdqDkMY5dndnLZW///////1rTelj/vt+Z2XWdHm1Wyl9k0BuTlgO8r0Lh7vSgB/hEAYy///+ytdmdkoVWQ7E7yupisRjJlVHdLlZpc3//OUZPMRbg0g7+0gAJHT0kAfwBAB/////3+z90KzPY5E+1EXa7+StFQiog2Lbe3fx3NPKB5Jxlc+t6AH+EIBjL///vV92QplItKq5+aMKmgbcFxVawqeHGD3//1r3vBV5Qm5GySugzAKK2B8QrkEuQ8uLFQM2TGFmoaMAG+DIBlj//+31ytZFU5wxTIOwRLncwx0dSUVTLs51LOf//////7fR001o/lrtX32d3uxW5HnRqmd1UlVVTTXecEVqllMejWGcAf4RB6YYVI4fOIkUYRjMgMnyToEKYF6v//////5KVgSNEtwmfMtc7qkx1mO//NkRPsIsckiD1ACXpAhwkQeoAS8rNPd34U692W3TXpeqHyBbbRK1QcAAB/hEQRgRZg4C4imX0m////////////1rTRitKqkR1Uy0XmaR1u/0lRF6Eb/////0/6tpkqdpa9rtRjPfO9HIptCEXYSfPbkq0iNRHTRRTKUQctTlccAbYMj/////////2vRFpZb//N0ZPAJEh0gD1ACXg+sOkQeAEWwu1O6K8+tTLkSGkOxA7sR6mb//////8mrJa9nZ/oyNbZ1p0IRjUMdCs7t2q7PuY5LAsTcy3kuj3IFYqhZdpBZBYBXE4nECAK9GZuEY8SMGWDgf2zMBhkA0yaw8uSDh7/PTwU8NAWBIjxE+8JwE3JYVzI+SJj8LQO8SkSsRhkklt+PYgjnKy8PCkuir+SBWUymSCJR//N0ZPsLAh0i/6oIABIj6kAfQBABU6K2SV/yXMDYuEuXT5KHP//+t01IMndBaP////u1nqbuqz//////22ddWmmqy2SYvFXJ4ZoZhaLBoKxIICAACv1ma42RBjDnAgX9s0AoVCMEmsPQChgdym68IuKgcBNJUd3hcAt5LCRMj5dMfgtgn4XEL+IwgkktvxxEEYMikkPCpdlfy4Vm5TJBZYp0Vskr/l9A//OkRO0Reeszjc00EKKj4mr9mmgk2NC+ifLhz///rdNTIJ3QTR////92Vfau+z/////6/1s9aHRVu9SKCZcVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MUZOEAAAH+AOAAAAAAA/wBwAAAVVVV');

    const winStates = [
        [0, 1, 2],          //     0 | 1 | 2
        [3, 4, 5],          //    ---+---+---
        [6, 7, 8],          //     3 | 4 | 5
        [0, 3, 6],          //    ---+---+---
        [1, 4, 7],          //     6 | 7 | 8
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    var gameOver = function(msg) {
        addMessage('Your score: ' + pScore);
        addMessage('Computer\'s score: ' + cScore);
        $('#dialog').html('<div id="gameOver" class="question">' + (msg != null ? msg + ' ' : '') + '<br>Would you like to <span class="answer" data-ans="c">CONTINUE</span> or <span class="answer" data-ans="r">RESET</span>?</div>');
        resetGame();
        hideThenShow('#board', '#dialog');

        $('#gameOver .answer').on('click', function() {
            var $ans = $(this).data('ans');
            if($ans === 'c' || $ans === 'r' ) {
                if($ans === 'r') {
                    pScore = 0;
                    cScore = 0;
                    addMessage('Your score: ' + pScore);
                    addMessage('Computer\'s score: ' + cScore);
                }
                init();
            }
        });
    }

    var resetGame = function(full = false) {
        $('#board').hide();
        $('#board table').find('td').removeClass('filled xTurn oTurn winBlock').text('');

        p = [];
        c = [];
        gameStopped = false;

        if (full) {
            pScore = 0;
            cScore = 0;
            pSign = '';
            cSign = '';
            $('#messages').html('');
        }
    }

    var updateScores = function() {
        $('#pScore').text(pScore);
        $('#cScore').text(cScore);
    }

    var addMessage = function(msg) {
        $('#messages').append($('<div class="message">' + msg + '<br></div>')).animate({scrollTop: $('#messages').prop("scrollHeight")}, 600);
    }

    var findThird = function(arr) {
        var states = arrayClone(winStates);
        for (var i = 0, wLen = states.length; i < wLen; i++) {
            var state = states[i];
            for (var j = 0, aLen = arr.length; j < aLen; j++) {
                var item = arr[j];
                var idx = state.indexOf(item);
                if(idx !== -1) {
                    state.splice(idx, 1);
                }
                if(state.length === 1 && p.indexOf(state[0]) === -1 && c.indexOf(state[0]) === -1) {
                    return state[0];
                }
            }
        }
        return -1;
    }

    var isWinner = function(arr) {
        var states = arrayClone(winStates);
        for (var i = 0, wLen = states.length; i < wLen; i++) {
            var state = states[i];
            for (var j = 0, aLen = arr.length; j < aLen; j++) {
                var item = arr[j];
                var idx = state.indexOf(item);
                if(idx !== -1) {
                    state.splice(idx, 1);
                }
                if(state.length === 0) {
                    winState = winStates[i];
                    return true;
                }
            }
        }
        return false;
    }

    var computerMove = function() {
        var arr = p.slice(0);
        arr = arr.concat(c);

        var ans;
        ans = findThird(c);
        if(ans !== -1) return ans;

        ans = findThird(p);
        if(ans !== -1) return ans;

        if(arr.indexOf(4) === -1) return 4;

        var corners = [0, 2, 6, 8];
        var emptyCorners = [];
        corners.forEach(function(item) {
            if (arr.indexOf(item) === -1) emptyCorners.push(item);
        });
        if (emptyCorners.length > 0) return emptyCorners[~~(Math.random() * emptyCorners.length)];

        var edges = [1, 3, 5, 7];
        var emptyEdges = [];
        edges.forEach(function(item) {
            if (arr.indexOf(item) === -1) emptyEdges.push(item);
        });
        if (emptyEdges.length > 0) return emptyEdges[~~(Math.random() * emptyEdges.length)];

    }
    
    var getPlayer = function(t = turn) {
        return t === 0 ? 'You' : 'Computer';
    }

    var getSign = function(t = turn) {
        return t === 0 ? pSign : cSign;
    }

    var getTurnChar = function(t = turn) {
        return t === 0 ? 'p' : 'c';
    }

    var hideThenShow = function(elemToHide, elemToShow = elemToHide, cbf = function() {}, speed = 600) {
        $(elemToHide).fadeOut(speed, function(){
            cbf();
            $(elemToShow).fadeIn(speed);
        });
    }

    var play = function() {
        var $i = $(this).data('i');
        if (getTurnChar() === 'c') $i = -1;
        if($i === undefined || gameStopped) return;
        if (p.indexOf($i) !== -1 || c.indexOf($i) !== -1) return;
        if (getTurnChar() === 'p') {
            p.push($i);
            $(this).text(pSign).addClass('filled');
            snd.play();
            if (isWinner(p)) {
                gameStopped = true;
                $('#board table td').removeClass('xTurn oTurn').addClass('filled');
                $('#board table td[data-i="' + winState[0] + '"], #board table td[data-i="' + winState[1] + '"], #board table td[data-i="' + winState[2] + '"]').addClass('winBlock');
                pScore++;
                $('#pScore').text(pScore);
                addMessage("You win!");
                setTimeout(function() {
                    gameOver("You win!");
                }, 2000);
                return;
            }
            turn = Math.abs(turn - 1);
            $('#board table td').removeClass('xTurn oTurn');
            addMessage("Computer's turn...");
            $('#board table td').off();
            play();
        } else {
            $i = computerMove();
            c.push($i);
            setTimeout(function() {
                $('#board table td[data-i="' + $i + '"]').text(cSign).addClass('filled');
                snd.play();
                $('#board table td').on('click', play);
                if (isWinner(c)) {
                    gameStopped = true;
                    $('#board table td').removeClass('xTurn oTurn').addClass('filled');
                    $('#board table td[data-i="' + winState[0] + '"], #board table td[data-i="' + winState[1] + '"], #board table td[data-i="' + winState[2] + '"]').addClass('winBlock');
                    cScore++;
                    $('#cScore').text(cScore);
                    addMessage("You lost!");
                    setTimeout(function() {
                        gameOver("You lost!");
                    }, 2000);
                    return;
                }
                //addMessage("Your turn...");
            }, 400);
            turn = Math.abs(turn - 1);
            addMessage("Your turn...");
            $('#board table td:not(.filled)').addClass(getSign().toLowerCase() + 'Turn');
            $('#board table td.filled').removeClass('xTurn oTurn');
        }

        if(p.length + c.length > 8) {
            gameStopped = true;
            addMessage("It's a draw!");
            gameOver("It's a draw!");
            return;
        }
    }

    $('#resetAll').on('click', function() {
        hideThenShow('#board', '#dialog');
        resetGame(true);
        init();
    });

    $('#board table td').on('click', play);

    var init = function() {
        resetGame();
        updateScores();
        $('#dialog').html('<div id="xoQuestion" class="question">Would you like to be <span class="answer" data-sign="X">X</span> or <span class="answer" data-sign="O">O</span>?</div>');
        //hideThenShow('#board', '#dialog', resetGame);

        $('#xoQuestion .answer').on('click', function() {
            var $sign = $(this).data('sign');
            if($sign === 'X' || $sign === 'O' ) {
                $(this).off();
                addMessage("You selected '" + $sign + "'!");
                pSign = $sign;                
                cSign = pSign === 'X' ? 'O' : 'X';
                resetGame();
                hideThenShow('#dialog', '#board');
                //hideThenShow('#dialog', '#board', resetGame);
                turn = ~~(Math.random() * 2);
                addMessage(getPlayer(turn) + " will start.");
                if(turn === 0) $('#board table td').addClass(getSign().toLowerCase() + 'Turn');
                play();
            }
        });
    }

    init();
});
