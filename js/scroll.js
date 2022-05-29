let currentSlide = 0;
let slides;

function changeSlide (change) {
    if (change == -2) {
        currentSlide = 0;
    } else if (change == 2) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = Math.max(0, Math.min(currentSlide + change, slides.length - 1));
    }
    setSlide();
}

function setSlide () {
    slides.forEach((slide, index) => {
        if (index > currentSlide) {
            slide.style.top = '100vh';
        } else {
            slide.style.top = '0';
        }
    });
    setTimeout(reveal, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    slides = document.querySelectorAll('.slide');
    // Only enable slide system on non-touch devices
    if (!isTouchDevice()) {
        slides.forEach(slide => {
            slide.classList.add('slide-not-touch');
        });
        window.scrollTo(0,0);
    }
    setSlide();
})


// Disabling normal scrolling in PCs and implement user / slidesystem interactions

// Mouse scrolling
// Code based on https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
let lastScrolled = new Date().getTime();
let minDifferenceBetweenScrolls = 250;
function preventDefaultForWheel(e) {
    let t1 = new Date().getTime();
    if (t1 - lastScrolled > minDifferenceBetweenScrolls) {
        if (e.deltaY < 0) changeSlide(-1);
    if (e.deltaY > 0) changeSlide(1);
    }
    lastScrolled = t1;
    e.preventDefault();
}

// Key handling
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = {38: -1, 40: 1, 37: -1, 39: 1, 32: 1, 33: -1, 34: 1, 35: 2, 36: -2};
function keyScroll(e) {
    if (e.keyCode in keys) {
        changeSlide(keys[e.keyCode]);
        e.preventDefault();
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
window.addEventListener(wheelEvent, preventDefaultForWheel, wheelOpt); // modern desktop
window.addEventListener('keydown', keyScroll, false);

// Helper
// Credits: https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}