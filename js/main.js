const STAGGER_DURATION = 7;
const PIN_DURATION = 3;
const TOTAL_DURATION = STAGGER_DURATION + PIN_DURATION;
let screenHeight;
let screenWidth;

function isMobile() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }
    else {
        return false;
    }
}

function spaceOutSections(n) {
    let spacers = document.getElementsByClassName("spacer");
    for (spacer of spacers) {
        spacer.style.height = spacer.clientHeight*n + 'px';
    }
}

$("#portrait").on("mouseenter click", function() {
    let portraitBorder = document.getElementById("portrait-border");

    let duration = 1.5;
    TweenMax.to(this, duration / 4, {y:-20, ease:Power1.easeOut});
    TweenMax.to(this, duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4});
    TweenMax.to(portraitBorder, duration / 4, {y:-20, ease:Power1.easeOut});
    TweenMax.to(portraitBorder, duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4});
    TweenMax.fromTo(portraitBorder, duration, {rotation: 0, ease:Expo.easeIn}, {rotation:360, ease:Back.easeOut});
});

$(".item-icon").on("mouseenter click", function() {
    let duration = 1;
    TweenMax.to(this, duration / 4, {y:-20, ease:Power1.easeOut});
    TweenMax.to(this, duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4});
    TweenMax.fromTo(this, 3/4 * duration, {rotation: 0}, {rotation:360, ease:Power3.easeOut});
});

$(function() {

    // ------------------------------------------------ General setup --------------=-------------------------------- //
    // Rocket doesn't shake on mobile, only on web
    let canHover = !(matchMedia('(hover: none)').matches);
    if (canHover) {
        $('.scroll-top').addClass('can-hover');
    }

    screenHeight = $(window).height();
    screenWidth = $(window).width();
    if (isMobile()) {
        let ratio = window.devicePixelRatio || 1;
        screenHeight = window.innerHeight || $(window).height();
        screenWidth = screen.width * ratio;

        // vh does not work in mobile, so height is set dynamicaly
        $('.spacer').height(screenHeight);
        $('section').height(screenHeight);
        $('.full').height(screenHeight);
    }
    else {
        $('.scroll-top').addClass('can-hover');
    }

    // ---------------------------------------------- Rocket scrolling ---------------------------------------------- //
    jQuery(window).scroll(function(){
        if ($(window).scrollTop() > screenHeight) {
            $(".scroll-top").fadeIn();
        }
        else {
            $(".scroll-top").fadeOut();
            $(".scroll-top").removeClass("scroll-top_hover");
        }
    });
    $(".scroll-top").click(function() {
        $(window.opera ? 'html' : 'html, body').animate({
            scrollTop: 0
        }, "slow");
    });

    // ------------------------------------------ Body content animations ------------------------------------------- //

    let controller = new ScrollMagic.Controller();

    // Fade in the frontpage on for loading
    TweenMax.fromTo(".front", 2, {autoAlpha: 0}, {autoAlpha: 1})

    let sections = document.getElementsByClassName("section");
    let sectionTweens = [];

    sectionTweens.push(TweenMax.staggerFromTo(sections[0].getElementsByClassName("staggerAnimate"), 1, {y: screenHeight*3/2}, {y: 0, ease: Back.easeOut.config(0.75)}, 0.5));
    for (let i = 1; i < sections.length - 1; i++) {
        sectionTweens.push(TweenMax.staggerFromTo(sections[i].getElementsByClassName("staggerAnimate"), 1, {y: screenHeight*3/2}, {y: 0, ease: Back.easeOut.config(0.75)}, 0.5));
    }
    sectionTweens.push(TweenMax.fromTo(sections[sections.length - 1].getElementsByClassName("staggerAnimate"), 1, {autoAlpha: 0}, {autoAlpha: 1}));

    spaceOutSections(TOTAL_DURATION); // Set up spaces in between sections to account for scrolling
    staggerDuration = STAGGER_DURATION * screenHeight;
    pinDuration = PIN_DURATION * screenHeight;
    
    let sceneOffset = 0;
    let sceneOffsets = []

    for (let i = 0; i < sections.length; i++) {
        new ScrollMagic.Scene({
                triggerElement: "#trigger", 
                offset: sceneOffset + sections[i].clientHeight/2, 
                duration: staggerDuration
            })
            .setPin(sections[i])
            .setTween(sectionTweens[i])
            .addIndicators({name: `animation${i + 1}`})
            .addTo(controller)

        sceneOffsets.push({ "stagger": sceneOffset })
        sceneOffset += staggerDuration;
        
        let actualPinDuration = pinDuration;
        if (i == sections.length - 1) {
            actualPinDuration = 0;
        }
        new ScrollMagic.Scene({
                triggerElement: "#trigger", offset: sceneOffset + sections[i].clientHeight/2, duration: actualPinDuration
            })
            .setPin(sections[i])
            .addIndicators({name: `pin${i + 1}`})
            .addTo(controller)

        sceneOffsets[i].pause = sceneOffset;

        sceneOffset += pinDuration;
        sceneOffset += screenHeight;
    }

    // -------------------------------------------- Plane bezier animation ------------------------------------------ //

    // planeWidth = document.getElementById("plane0").clientWidth;

    // let airplane0 = new TimelineMax()
    //     .add(TweenMax.set($("#plane0"), {x: -planeWidth, y: sections[0].clientHeight/2}))
    //     .add(TweenMax.to($("#plane0"), 2, {
    //         css:{
    //             bezier: {
    //                 curviness: 1.25,
    //                 autoRotate: true,
    //                 values: [
    //                         {x: screenWidth + planeWidth,	y: sections[0].clientHeight/2},
    //                     ]
    //             }
    //         }, 
    //         ease: Power1.easeInOut
    //     }));
    
    // new ScrollMagic.Scene({triggerElement: "#trigger", duration: 2200, offset: screenHeight + sceneOffsets[0].stagger })
    //     .setTween(airplane0)
    //     .addIndicators({name: "airplane1"})
    //     .addTo(controller);

    // document.getElementById("plane1").style.transform = "scaleX(-1)";
    // let airplane1 = new TimelineMax()
    //     .add(TweenMax.fromTo($("#plane1"), 2, {x: screenWidth + planeWidth,	y: sections[1].clientHeight/2}, {x: -planeWidth, y: sections[1].clientHeight/2}));
    
    // new ScrollMagic.Scene({triggerElement: "#trigger", duration: 3300, offset: screenHeight + sceneOffsets[1].stagger })
    //     .setTween(airplane1)
    //     .addIndicators({name: "airplane2"})
    //     .addTo(controller);
    
  });