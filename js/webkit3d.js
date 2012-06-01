/*jshint laxcomma:true */
funcs.shuffleCards = function () {
    pause = true;
    var trans = '0.2s linear';
    $('#deck > div.card')
        .css({
            '-webkit-transition': '-webkit-transform '+trans
          , '-moz-transition'   : '-moz-transform '+trans
          , 'transition'        : 'transform '+trans
        });

    setTimeout(function() {
        var addRotates = function(index, value) {
            return value + ' rotateY(180deg) rotateX(0deg) rotateZ(0deg)';
        };
        $('#deck > div.card:not(.back)').css({
            '-webkit-transform': addRotates
          , '-moz-transform': addRotates
          , 'transform': addRotates
        });

        setTimeout(function() {
            $('#deck > div.card:not(.back)')
                .addClass('back');

            setTimeout(function() {
                var trans = '0.4s linear';
                var form = [
                    'translate3d(0, 0, 0)'
                  , 'rotateY(180deg)'
                  , 'scale3d(0.8,0.8,0.8)'
                ].join(' ');

                $('#deck > div.card').css({
                    '-webkit-transition': '-webkit-transform '+trans
                  , '-moz-transition'   : '-moz-transform '+trans
                  , 'transition'        : 'transform '+trans
                  , '-webkit-transform' : form
                  , '-moz-transform'    : form
                  , 'transform'         : form
                });

                setTimeout(function() {
                    generateNewDeck();
                    drawDeck();
                    setTimeout(function () {
                        pause = false;
                    }, 500);
                }, 200);
            }, 400);
        }, 90);
    }, 1);
};

funcs.setDeckCardStyles = function (elm) {
    var rot = Math.floor(Math.random()*10)-5;
    var x   = Math.floor(Math.random()*5);
    var y   = Math.floor(Math.random()*5);

    var count = deck.length;

    var transition = ' 0.2s ease-in';
    var transform  = [
        'translate3d('+x+'px, '+y+'px, '+(i*8)+'px)'
      , 'scale3d(0.8, 0.8, 0.8)'
      , 'rotateY(180deg)'
      , 'rotateZ('+rot.toString()+'deg)'
    ].join(" ");

    var style = {
        '-webkit-transition' : '-webkit-transform '+transition
      , '-webkit-transform'  : transform
      , '-moz-transition'    : '-moz-transform '+transition
      , '-moz-transform'     : transform
      , transition           : 'transform '+transition
      , transform            : transform
      , 'z-index': 2
    };

    elm.removeClass()
        .addClass('card')
        .addClass('back')
        .css(style);
};

funcs.animateDrawCard = function (c) {
    var selected = 'pakka'
      , count = decks[selected].length - deck.length
      , rot = Math.floor(Math.random()*90)-45
      , x   = Math.floor(Math.random()*50)+300
      , y   = Math.floor(Math.random()*50)
      , z   = count*8;


    pause = true;
    var transform = [
        'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)'
      , 'scale3d(0.8, 0.8, 0.8)'
      , 'rotateY(0deg)'
      , 'rotateZ('+rot.toString()+'deg)'
    ].join(' ');

    var style = {
        '-webkit-transform': transform
      , '-moz-transform': transform
      , 'transform:': transform
      , 'z-index': count
    };

    c.addClass('animate')
        .delay(100)
        .queue(function(next) {
            $(this).removeClass('back');
            next();
        })
        .delay(200)
        .queue(function(next) {
            $(this).css(style).addClass('animate2');
            pause = false;
            next();
        })
        .delay(100)
        .queue(function(next) {
            $(this).removeClass('animate animate2');
            next();
        });
};
