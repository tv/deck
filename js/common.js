var deck;
var pause = false;

var funcs = {
    'setDeckCardStyles': function(elm) {
        elm
        .removeClass()
        .addClass('card')
        .addClass('back');
    }, 
    'animateDrawCard': function(elm){
        var count = decks['pakka'].length - deck.length;
        elm.css({'position': 'absolute', 'left': '400px', 'z-index': count}).removeClass('back');
        return;
    },
    'shuffleCards': function(){
        $('#deck > div.card').css({'left':null, 'z-index':null});
        generateNewDeck();
        drawDeck();
    }
};

var decks = {'pakka': ["heart A", "heart 2", "heart 3", "heart 4", "heart 5", "heart 6", "heart 7", "heart 8", "heart 9", "heart 10", "heart J", "heart Q", "heart K", "spade A", "spade 2", "spade 3", "spade 4", "spade 5", "spade 6", "spade 7", "spade 8", "spade 9", "spade 10", "spade J", "spade Q", "spade K", "diam A", "diam 2", "diam 3", "diam 4", "diam 5", "diam 6", "diam 7", "diam 8", "diam 9", "diam 10", "diam J", "diam Q", "diam K", "club A", "club 2", "club 3", "club 4", "club 5", "club 6", "club 7", "club 8", "club 9", "club 10", "club J", "club Q", "club K"],
            'pakka2': ["heart A", "club A", 'diam A', 'spade A']};
    
function generateNewDeck() {
    deck = new Array();
    for (var i = 0; i < decks['pakka'].length; i++) {
        deck.push(decks['pakka'][i]);
    };
    deck.sort(function() {return 0.5 - Math.random()})
    saveDeck();
    updateCount();
}

function drawDeck () {
    $('#deck > div.card').empty()

    for (var i = 0; i < deck.length; i++) {
        if ($('#deck > div.card').eq(i).length == 0) {
            elm = $('<div></div>');
            $('#deck').append(elm);
            funcs.setDeckCardStyles(elm);
        } else {
            elm = $('#deck > div.card').eq(i)
            funcs.setDeckCardStyles(elm);
        }


    };
}

function drawNextCard() {
    if (pause) {
        return;
    }

    if (deck.length == 0) {
        funcs.shuffleCards();
    }

    var b = deck.pop();
    if(typeof(b) !== "string") {
        setTimeout(drawNextCard, 100);
        return;
    }
    var a = b.split(" ");
    var c = $('#deck .card').eq(deck.length);

    var col = 'red';
    if (a[0] == 'spade' || a[0] == 'club') {
        col = 'black';
    }

    c.append(
            $('<div></div>')
                .addClass('upperCorner')
                .append($('<div></div>')
                    .addClass('number')
                    .css('color', col)
                    .text(a[1])
                )
                .append($('<div></div>')
                    .addClass('suit')
                    .css('color', col)
                    .html('&'+a[0]+'s;')
                )
        )
        .append(
            $('<div></div>')
                .addClass('lowerCorner')
                .append($('<div></div>')
                    .addClass('number')
                    .css('color', col)
                    .text(a[1])
                )
                .append($('<div></div>')
                    .addClass('suit')
                    .css('color', col)
                    .html('&'+a[0]+'s;')
                )
        );            

    updateCount();
    funcs.animateDrawCard(c);
    saveDeck();
}

function initButtons () {
    $('.card').live('click', drawNextCard);
    $('.card').live('touchstart', drawNextCard);
    
    $('#reset').click(funcs.shuffleCards);
    $('#reset').bind('touchstart', funcs.shuffleCards);
    $(document).keyup(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if(key == '32' || key == '40') {
            drawNextCard();
        }
    });
}

function saveDeck () {
    localStorage.setItem("deck", JSON.stringify(deck));
}

function updateCount () {
    $('#count').text(deck.length+" / "+decks['pakka'].length);
}

function initDeck () {
    if(localStorage.getItem("deck") == null || localStorage.getItem("deck") == undefined) {
        localStorage.removeItem("deck");
        generateNewDeck();

    } else {
        try {
            deck = JSON.parse(localStorage.getItem("deck"));
        } catch (err) {
            localStorage.removeItem("deck")
            generateNewDeck();
        }
    }
    
    drawDeck();
    drawNextCard();
}

$(document).ready(function() {
    if (!Modernizr.localstorage) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
        return false;
    }
    
    if (Modernizr.canvas) {
        $.getScript('./js/canvas.js');
    }


    if (Modernizr.csstransforms3d) {
        console.log('ASD! true');
        $('head')
            .append(
                $('<link />')
                    .attr({'rel': 'stylesheet', 'href': './css/webkit3d.css', 
                           'type': 'text/css', 'media': 'screen', 'charset': 'utf-8'})
            )
        $.getScript('./js/webkit3d.js', function() {
            initDeck();
            initButtons();
        });
    } else {
        console.log('ASD! false');
        initDeck();
        initButtons();
    }
});
