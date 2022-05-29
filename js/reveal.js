//  Code based on https://alvarotrigo.com/blog/css-animations-scroll/

let elementsToReveal;
let bottomOffset = 50;

function reveal() {

    let remaining = new Array();
    let wHeight = window.innerHeight;

    for (let i = 0, n = elementsToReveal.length, speed = 0; i < n; i++) {
        let elementTop = elementsToReveal[i].getBoundingClientRect().top;
        if (elementTop < wHeight - bottomOffset) {
            elementsToReveal[i].style.setProperty('--speed', (speed * 0.10 + 0.50) + 's');
            elementsToReveal[i].classList.add("active");
            speed++
        }
        else {
            remaining.push(elementsToReveal[i]);
        }
    }

    if (remaining.length != 0) elementsToReveal = remaining;
    else document.removeEventListener("scroll", reveal);
}
  
document.addEventListener("DOMContentLoaded", () => {
    elementsToReveal = document.querySelectorAll(".reveal");
})
document.addEventListener("scroll", reveal);