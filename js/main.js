$(function() {

    var delay = -100;

    var ratio = window.devicePixelRatio || 1;
    var screenHeight = $(window).height();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        screenHeight = screen.height * ratio;
    }
    console.log(screenHeight);
    var screenWidth = $(window).width();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        screenWidth = screen.width * ratio;
    }

    // Plane starting position (out of view to the left of the view)
    planeWidth = document.getElementById("plane").clientWidth;
    document.getElementById("target").style.left = (-planeWidth).toString() + "px";

    // Set vertical position of work experience section
    var frontDivHeight = document.getElementById('front').clientHeight;
    document.getElementById("trigger1").style.top += (frontDivHeight/2 + delay).toString() + "px";

    var controller = new ScrollMagic.Controller();

    var tween = TweenMax.staggerFromTo(".staggerAnimate", 1, {y: screenHeight*3/2}, {y: 0, ease: Back.easeOut.config(1)}, 0.5);

    console.log(screenHeight/3);

	var scene1 = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: screenHeight/3})
        .setTween(tween)
        .addIndicators({name: "staggering"}) // add indicators (requires plugin)
        .addTo(controller);
  
    // var flightpath = {
    //     looping : {
    //         curviness: 1.25,
    //         autoRotate: true,
    //         values: [
    //                 // {x: 510,	y: 60},
    //                 // {x: 620,	y: -60},
    //                 // {x: 500,	y: -100},
    //                 // {x: 380,	y: 20},
    //                 // {x: 500,	y: 60},
    //                 // {x: 580,	y: 20},
    //                 // {x: 620,	y: 15}
    //                 {x: screenWidth/2 - 200, y: 100},
    //                 {x: screenWidth/2 + 250, y: -30},
    //                 {x: screenWidth/2 - 200, y: -60},
    //                 {x: screenWidth/2 + 150, y: -20},
    //                 {x: screenWidth*3/2 + planeWidth, y: 600},
    //             ]
    //     }
    // };

    var flightpath = {
        entry : {
            curviness: 1.25,
            autoRotate: true,
            values: [
                    {x: 100,	y: -20},
                    {x: 300,	y: 10}
                ]
        },
        looping : {
            curviness: 1.25,
            autoRotate: true,
            values: [
                    {x: 510,	y: 60},
                    {x: 620,	y: -60},
                    {x: 500,	y: -100},
                    {x: 380,	y: 20},
                    {x: 500,	y: 60},
                    {x: 580,	y: 20},
                    {x: 620,	y: 15}
                ]
        },
        leave : {
            curviness: 1.25,
            autoRotate: true,
            values: [
                    {x: 660,	y: 20},
                    {x: 800,	y: 130},
                    {x: $(window).width() + 300,	y: -100},
                ]
        }
    };

    // create tween
    var tween = new TimelineMax()
        .add(TweenMax.to($("#plane"), 1.2, {css:{bezier:flightpath.entry}, ease:Power1.easeInOut}))
        .add(TweenMax.to($("#plane"), 2, {css:{bezier:flightpath.looping}, ease:Power1.easeInOut}))
        .add(TweenMax.to($("#plane"), 1, {css:{bezier:flightpath.leave}, ease:Power1.easeInOut}));

    // build scene
    var scene0 = new ScrollMagic.Scene({triggerElement: "#trigger0", triggerHook: "onEnter", duration: 1000, offset: 100})
        .setTween(tween)
        .addIndicators({name: "airplane"}) // add indicators (requires plugin)
        .addTo(controller);
    
  });