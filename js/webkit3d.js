funcs.shuffleCards = function () {
    pause = true;
    var trans = '0.2s linear';
    $('#deck > div.card')
        .css({'-webkit-transition': '-webkit-transform '+trans,
              '-moz-transition'   : '-moz-transform '+trans,
              'transition'        : 'transform '+trans
        });

    setTimeout(function() {
        var addRotates = function(index, value) {
            return value + ' rotateY(180deg) rotateX(0deg) rotateZ(0deg)';
        };
        $('#deck > div.card:not(.back)').css( '-webkit-transform', addRotates);
        $('#deck > div.card:not(.back)').css( '-moz-transform', addRotates);
        $('#deck > div.card:not(.back)').css( 'transform', addRotates);

        setTimeout(function() {
            $('#deck > div.card:not(.back)')
                .addClass('back')
            setTimeout(function() {
                var trans = '0.4s linear';
                var form = 'translate3d(0, 0, 0) rotateY(180deg) scale3d(0.8,0.8,0.8)';
                $('#deck > div.card')
                    .css({'-webkit-transition': '-webkit-transform '+trans,
                          '-moz-transition   ': '-moz-transform '+trans,
                          'transition        ': 'transform '+trans,
                          '-webkit-transform' : form,
                          '-moz-transform'    : form,
                          'transform'         : form
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
}

funcs.setDeckCardStyles = function (elm) {
    var rot = Math.floor(Math.random()*10)-5;
    var x   = Math.floor(Math.random()*5);
    var y   = Math.floor(Math.random()*5);

    var count = deck.length;

    var transition = ' 0.2s ease-in';
    var transform  = 'translate3d('+x+'px, '+y+'px, '+i*8+'px)'+
                     'scale3d(0.8, 0.8, 0.8)'+
                     'rotateY(180deg)'+
                     'rotateZ('+rot.toString()+'deg)';

    var deck_style = ''+
                     '-webkit-transition : -webkit-transform '+transition+';'+
                     '-moz-transition    : -moz-transform '+transition+';'+
                     'transition         : transform '+transition+';'+
                     '-webkit-transform  : '+ transform+';'+
                     '-moz-transform     : '+ transform+';'+
                     'transform          : '+ transform+';';

    elm.removeClass()
        .addClass('card')
        .addClass('back')
        .attr('style', deck_style);
}

funcs.animateDrawCard = function (c) {
    var rot = Math.floor(Math.random()*90)-45;
    var x   = Math.floor(Math.random()*50)+300;
    var y   = Math.floor(Math.random()*50);

    var count = decks['pakka'].length - deck.length;

    var transform = 'translate3d('+x+'px, '+y+'px, '+count*8+'px)'+
                    'scale3d(0.8, 0.8, 0.8)'+
                    'rotateY(0deg)'+
                    'rotateZ('+rot.toString()+'deg);';

    var style     = '-webkit-transform: '+transform+';'+
                    '-moz-transform: '+transform+';'+
                    'transform: '+transform+';';

    console.log(c);
    setTimeout(function() {

        c.addClass('animate');

        setTimeout(function() {
            c.removeClass('back');
            setTimeout(function() {
                c.attr('style', style).addClass('animate2');
                c.removeClass('animate', 'animate2');
            }, 200);
        }, 100)

    }, 1);
}

function animateDrawCard2d (c) {
    var rot = Math.floor(Math.random()*90)-45;
    var x   = Math.floor(Math.random()*50)+300;
    var y   = Math.floor(Math.random()*50);

    var style  = '-webkit-transform:rotate('+rot.toString()+'deg);'+
                    '-moz-transform:rotate('+rot.toString()+'deg);'+
                               'top:'+y+'px;'+
                              'left:'+x+'px;'+
                           'display:none';

    c.addClass('style')
        .animate({
            right: '200px'
        }, 400)
        .removeClass('back', 200); 
}
