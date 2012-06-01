var elm = $('<canvas width="190" height="290"></canvas>')[0]
var graphics = elm.getContext('2d');
var theme = ["#10222B","#95AB63","#BDD684","#E2F0D6","#F6FFE0"];
for (var j=0; j < 50; j++) {
    var x = Math.random() * 200;
    var y = Math.random() * 300;
    var size = (Math.random() * 100) + 20;
    var num_circles = (Math.random() * 10) + 2;
    for (var i = size; i > 0; i-= (size/num_circles)) {
        graphics.fillStyle = theme[ (Math.random() * 5 >> 0)];
        graphics.beginPath();
        graphics.arc(x, y, i * .5, 0, Math.PI*2, true); 
        graphics.closePath();
        graphics.fill();
    }
};

$('head').append(
    $('<style></style>')
        .attr({'type': 'text/css', 'media': 'screen'})
        .append('.card.back { background:url('+ elm.toDataURL("image/png")+') white no-repeat 5px 5px;}')
)