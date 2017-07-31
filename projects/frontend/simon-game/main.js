/*
 * @author Farahmand Moslemi
 */
    
var s = [];
for (var i = 1; i <= 4; i++) {
    s.push(new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + i + '.mp3'));
}

jQuery(function($) {
    var $buttons = $('#buttons .btn'),
        b = [],
        //playingSound = false,
        playerTurn = false,
        mem = [],
        level = 1,
        ans = [],
        stopExecutions = false,
        myTimeout;
    
    var isOn = function() {
        return $('#power').is(':checked');
    }

    for (var i = 0; i < 4; i++) {
        b.push('#buttons .btn#b' + i);
    }

    var isPlaying = function(){
        var result = true;
        for(var i = 0; i < 4; i++) {
            result = result && s[i].currentTime > 0 && !s[i].paused && !s[i].ended && s[i].readyState > 2;
        }
        return result;
    }
   
    var playSound = function(i, cbf = function() {}) {
        clearTimeout(myTimeout);
        if(i === undefined || !isOn() || isPlaying()) {
            console.error('Cannot play sound #' + i + ' because already a sound is playing!');
            return;
        }
        if(i === undefined || !isOn()) return;
        $(b[i]).addClass('pressed');
        s[i].play();

        var t = setTimeout(function() {
            clearTimeout(t);

            $(b[i]).removeClass('pressed');
            s[i].pause();
            s[i].currentTime = 0;
            cbf();
        }, 550); // It's better to set greater than maximum of sounds' duration.
    }

    var executeFunctions = function(arr, timeout = 600) {
        if(stopExecutions) return;
        clearTimeout(myTimeout);
        //playerTurn = false;
        if (!isOn()) return;
        //$['playSound'](mem[0]);
        if (arr.length === 1 && !playerTurn) {
            playSound(arr[0], function() {
                playerTurn = true;
                ans = [];
                checkAns();
            });
        } else {
            //eval('playSound(' + arr[0] + ')');
            playSound(arr[0]);
        }
        
        if(arr.length > 1) {
            setTimeout(function() {
                executeFunctions(arr.slice(1), timeout);
            }, timeout);
        }
    }

    $buttons.on('click', function(e) {
        //console.log(playerTurn);
        if(isPlaying() || !playerTurn) return;
        //if(!playerTurn) return;
        clearTimeout(myTimeout);
        myTimeout = null;
        var i = this.id[1];
        playSound(i);
        ans.push(parseInt(i));
        //console.log(ans);
        if (ans[ans.length - 1] == mem[ans.length - 1]) {
            if(ans.length === level) {
                if(level === 20) {
                    setScreen('**');
                    ans = [];
                    playerTurn = false;
                    setTimeout(function() {
                        level = 1;
                        generateRandomMem();
                        setScreen(level);
                        executeFunctions(getSubMem());
                    }, 2000);
                    return;
                }
                level++;
                setTimeout(function() {
                    setScreen(level);
                    playerTurn = false;
                    ans = [];
                    executeFunctions(getSubMem());
                }, 1000);
            } else {
                playerTurn = true;
                checkAns();
            }
        } else {
            if ($('#strict').is(':checked')) {
                level = 1;
                generateRandomMem();
            }
            ans = [];
            playerTurn = false;
            setScreen('NO');
            setTimeout(function() {
                setScreen(level);
                executeFunctions(getSubMem());
            }, 1000);
        }
    });

    var checkAns = function() {
        myTimeout = setTimeout(function() {
            clearTimeout(myTimeout);
            myTimeout = null;
            if ($('#strict').is(':checked')) {
                level = 1;
            }
            playerTurn = false;
            ans = [];
            setScreen('NO');
            setTimeout(function() {
                setScreen(level);
                //playerTurn = false;
                executeFunctions(getSubMem());
            }, 1000);
        }, 5000);
    }

    $('#start').on('click', function(){
        //if (isOn() && !isPlaying()) {
        if (isOn()) {
            stopExecutions = true;
            clearTimeout(myTimeout);
            myTimeout = null;
            setTimeout(function() {
                level = 1;
                setScreen(level);
                stopExecutions = false;
                generateRandomMem();
                executeFunctions(getSubMem());
            }, 1000);
        }
    });

    var generateRandomMem = function() {
        mem = [];
        for(var i = 0; i < 20; i++) {
            mem.push(~~(Math.random() * 4));
        }
    }

    var getSubMem = function() {
        return mem.slice(0, level);
    }
    
    var init = function() {
        generateRandomMem();
        playerTurn = false;
        executeFunctions(getSubMem());
    }

    var loadingTry = 0;
    var checkSoundsLoaded = function() {
        var timeout = 50;
        if (s[0].readyState > 3 && s[1].readyState > 3 && s[2].readyState > 3 && s[3].readyState > 3) { // || == 4
            $('#loading').fadeOut(400, function(){
                $('#wrapper').fadeIn(400, function(){
                    init();
                });
            });
        } else {
            if(++loadingTry * timeout > 60000) {
                alert('Too long to load sounds. Please check you network connection and try again!');
                $('#loading').hide();
                return;
            }
            //console.log('Loading time: ' + (++loadingTry * timeout) + 'ms');
            setTimeout(function() {
                checkSoundsLoaded();
            }, timeout);
        }
    }
    checkSoundsLoaded();
    //s[2].oncanplay = function() {console.log(/*this.readyState + ', ' +*/ this.duration + 's');}

    var setScreen = function(txt) {
        if(typeof txt === 'number') {
            if (txt < 10) {
                txt = "0" + txt;
            }
        }
        $('#screen span').fadeOut(75, function(){
            $(this).text(txt).fadeIn(75);
        });
    }

    $('#powerWrapper .switch input').on('click', function() {
        level = 1;
        clearTimeout(myTimeout);
        myTimeout = null;
        if(isOn()) {
            stopExecutions = false;
            $('#strict').prop('disabled', false).prop('checked', false);
            $('#start').prop('disabled', false);
            setScreen('ON');
        } else {
            stopExecutions = true;
            $('#strict').prop('disabled', 'true').prop('checked', false);
            $('#start').prop('disabled', true);
            setScreen('');
        }
    });
});