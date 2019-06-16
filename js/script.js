/*
 * Copyright (c) 2019. Anarchybre
 */

var colors = new Array(
    [62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]);

var step = 0;

//color table indices
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.005;


function addButtonListeners(){

    console.log('[A] Add button listener');

    var controlArrows = document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-left');
    var controlTop = document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-right-top');
    var controlLeft = document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-right-left');
    var controlRight = document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-right-right');
    var controlBottom = document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-right-bottom');

    controlLeft.addEventListener('mouseout', function(e) {
        e.currentTarget.setAttribute('fill', '#222222');
    });
    controlLeft.addEventListener('mouseover', function(e) {
        e.currentTarget.setAttribute('fill', '#3c77db');
    });
    controlRight.addEventListener('mouseout', function(e) {
        e.currentTarget.setAttribute('fill', '#222222');
    });
    controlRight.addEventListener('mouseover', function(e) {
        e.currentTarget.setAttribute('fill', '#D04242');
    });
    controlTop.addEventListener('mouseout', function(e) {
        e.currentTarget.setAttribute('fill', '#222222');
    });
    controlTop.addEventListener('mouseover', function(e) {
        e.currentTarget.setAttribute('fill', '#ECDB33');
    });
    controlBottom.addEventListener('mouseout', function(e) {
        e.currentTarget.setAttribute('fill', '#222222');
    });
    controlBottom.addEventListener('mouseover', function(e) {
        e.currentTarget.setAttribute('fill', '#5dc21e');
    });

    controlArrows.addEventListener('mouseout', function(e) {
        e.currentTarget.setAttribute('fill', '#222222');
    });
    controlArrows.addEventListener('mouseover', function(e) {
        e.currentTarget.setAttribute('fill', '#555555');
    });
}

function updateGradient(){

    //console.log('[A] Update Gradient');

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = 'rgb('+r1+','+g1+','+b1+')';

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = 'rgb('+r2+','+g2+','+b2+')';

    var color3 = 'rgb(' + (255 - r1) + ', ' + (255 - g1) + ', ' + (255 - b1) + ')';
    var color4 = 'rgb(' + (255 - r2) + ', ' + (255 - g2) + ', ' + (255 - b2) + ')';

    document.querySelector('#logo').getSVGDocument().getElementById('svg-color-1').setAttribute('style', 'stop-color:'+color1);
    document.querySelector('#logo').getSVGDocument().getElementById('svg-color-2').setAttribute('style', 'stop-color:'+color2);
    document.querySelector('#logo').getSVGDocument().getElementById('svg-color-3').setAttribute('style', 'stop-color:'+color1);
    document.querySelector('#logo').getSVGDocument().getElementById('svg-color-4').setAttribute('style', 'stop-color:'+color2);

    document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-left').setAttribute('stroke', color1);
    document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-right-left').setAttribute('stroke', color1);
    document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-right-right').setAttribute('stroke', color1);
    document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-right-top').setAttribute('stroke', color1);
    document.querySelector('#logo').getSVGDocument().getElementById('anarchybre-control-right-bottom').setAttribute('stroke', color1);

    document.body.setAttribute('style', 'background:'+color1);
    //console.log('-- Update gradient to  : '+color1);

    step += gradientSpeed;

    if ( step >= 1 )
    {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}

// Execute zepto callback when the page is ready
Zepto(function($){

    /* TODO : NEED TO CLEAN THIS SHIT */

    console.log('[A] Ready to Zepto!');
    setTimeout(function(){

        console.log('[A][STEP] Step 0.5s');
        document.getElementById("container").setAttribute('style', 'border-top-right-radius: 100px;');
        setInterval(updateGradient,30);
        setTimeout(function(){

            console.log('[A][STEP] Step 1s');
            document.getElementById("container").setAttribute('style', 'border-top-right-radius: 100px; border-bottom-left-radius: 100px;');
            setTimeout(function(){

                console.log('[A][STEP] Step 1.5s');
                document.getElementById("container").setAttribute('style', 'border-top-right-radius: 100px; border-bottom-left-radius: 100px; border-top-left-radius: 100px;');
                setTimeout(function(){

                    console.log('[A][STEP] Step 2s');
                    document.getElementById("container").setAttribute('style', 'border-top-right-radius: 100px; border-bottom-left-radius: 100px; border-top-left-radius: 100px; border-bottom-right-radius: 100px;');
                    setTimeout(function(){

                        console.log('[A][STEP] Step 4s');
                        document.getElementById("loader").className='fade';
                        setTimeout(function(){

                            console.log('[A][STEP] Step 5.2s');
                            document.getElementById("logo").className='visible';

                            addButtonListeners();
                        }, 1200);
                    }, 2000);
                }, 500);
            }, 500);
        }, 500);
    }, 500);

});
