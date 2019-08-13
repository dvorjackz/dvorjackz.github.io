$(function() {

    var ratio = window.devicePixelRatio || 1;
    var screenHeight = $(window).height();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        screenHeight = screen.height * ratio;
    }
    var screenWidth = $(window).width();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        screenWidth = screen.width * ratio;
    }

    // Set up scroll magic
    var controller = new ScrollMagic.Controller();

    // Fade in the frontpage on startup
    var tween0 = TweenMax.fromTo("#front", 2, {autoAlpha: 0}, {autoAlpha: 1})

    // (FRAMEWORK)
    section1Height = document.getElementById("section1").clientHeight;
    section2Height = document.getElementById("section2").clientHeight;
    section3Height = document.getElementById("section3").clientHeight;
    section4Height = document.getElementById("section4").clientHeight;
    console.log(section3Height)

    // (FRAMEWORK) The animations for each profile section (start y's start at 3/2 and increment by 1 for each section, e.g. 3/2, 5/2, 7/2 ...)
    var tween1 = TweenMax.staggerFromTo(".staggerAnimate1", 1, {y: screenHeight*3/2}, {y: 0, ease: Back.easeOut.config(0.75)}, 0.5);
    var tween2 = TweenMax.staggerFromTo(".staggerAnimate2", 1, {y: screenHeight*5/2}, {y: 0, ease: Back.easeOut.config(0.75)}, 0.5);
    var tween3 = TweenMax.staggerFromTo(".staggerAnimate3", 1, {y: screenHeight*7/2}, {y: 0, ease: Back.easeOut.config(0.75)}, 0.5);
    var tween4 = TweenMax.staggerFromTo(".staggerAnimate4", 1, {y: screenHeight*9/2}, {y: 0, ease: Back.easeOut.config(0.75)}, 0.5);

    // (FRAMEWORK) Each scene's duration is twice the screen height, so each ensuing scene must be offset by two screen's more than the previous scene
    // The formula for each offset cycle is 2 full screens for duration + 1 full screen to offset each successive trigger = 3 full screens
    sceneOffset = 0;
    var scene1 = new ScrollMagic.Scene({triggerElement: "#trigger1", offset: sceneOffset + section1Height/2, duration: screenHeight*2})
        .setPin("#section1")
        .setTween(tween1)
        .addIndicators({name: "staggering1"}) // add indicators (requires plugin)
        .addTo(controller);
    sceneOffset += screenHeight*3;
    var scene2 = new ScrollMagic.Scene({triggerElement: "#trigger2", offset: sceneOffset + section2Height/2, duration: screenHeight*2})
        .setPin("#section2")
        .setTween(tween2)
        .addIndicators({name: "staggering2"}) // add indicators (requires plugin)
        .addTo(controller);
    sceneOffset += screenHeight*3;
    var scene3 = new ScrollMagic.Scene({triggerElement: "#trigger3", offset: sceneOffset + section3Height/2, duration: screenHeight*2})
        .setPin("#section3")
        .setTween(tween3)
        .addIndicators({name: "staggering3"}) // add indicators (requires plugin)
        .addTo(controller);
    sceneOffset += screenHeight*3;
    var scene4 = new ScrollMagic.Scene({triggerElement: "#trigger4", offset: sceneOffset + section4Height/2, duration: screenHeight*2})
        .setPin("#section4")
        .setTween(tween4)
        .addIndicators({name: "staggering4"}) // add indicators (requires plugin)
        .addTo(controller);

    // ------------------------------ Plane bezier animation (broken on mobile) ------------------------------ //

    // // Plane starting position (out of view to the left of the view)
    // planeWidth = document.getElementById("plane").clientWidth;
    // document.getElementById("target").style.left = (-planeWidth).toString() + "px";
    //
    // var flightpath = {
    //     entry : {
    //         curviness: 1.25,
    //         autoRotate: true,
    //         values: [
    //                 {x: 100,	y: -20},
    //                 {x: 300,	y: 10}
    //             ]
    //     },
    //     looping : {
    //         curviness: 1.25,
    //         autoRotate: true,
    //         values: [
    //                 {x: 510,	y: 60},
    //                 {x: 620,	y: -60},
    //                 {x: 500,	y: -100},
    //                 {x: 380,	y: 20},
    //                 {x: 500,	y: 60},
    //                 {x: 580,	y: 20},
    //                 {x: 620,	y: 15}
    //             ]
    //     },
    //     leave : {
    //         curviness: 1.25,
    //         autoRotate: true,
    //         values: [
    //                 {x: 660,	y: 20},
    //                 {x: 800,	y: 130},
    //                 {x: $(window).width() + 300,	y: -100},
    //             ]
    //     }
    // };
    //
    // // create tween
    // var tween = new TimelineMax()
    //     .add(TweenMax.to($("#plane"), 1.2, {css:{bezier:flightpath.entry}, ease:Power1.easeInOut}))
    //     .add(TweenMax.to($("#plane"), 2, {css:{bezier:flightpath.looping}, ease:Power1.easeInOut}))
    //     .add(TweenMax.to($("#plane"), 1, {css:{bezier:flightpath.leave}, ease:Power1.easeInOut}));
    //
    // // build scene
    // var scene0 = new ScrollMagic.Scene({triggerElement: "#trigger0", triggerHook: "onEnter", duration: 1000, offset: 100})
    //     .setTween(tween)
    //     .addIndicators({name: "airplane"}) // add indicators (requires plugin)
    //     .addTo(controller);
    
  });