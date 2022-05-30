// Inspired on https://stackoverflow.com/questions/52766477/animate-a-div-to-full-screen-from-its-position
document.addEventListener('DOMContentLoaded', () => {
    let images = document.querySelectorAll('.image');
    images.forEach((image) => {
        image.onclick = () => {
            enterFullscreen(image);
            console.log('clicked');
        };
    });
});

function enterFullscreen (element) {
    let info = element.getBoundingClientRect();

    let newElement = document.createElement('div');
    newElement.onclick = () => exitFullscreen(newElement, element);

    newElement.style = `
        position: fixed;
        left: ${info.left};
        top: ${info.top};
        width: ${info.width};
        height: ${info.height};
        background-image: ${window.getComputedStyle(element).backgroundImage};
        background-position: center;
        background-size: cover;
        z-index: 1001;
        border-radius: 5px;
        transition: all .5s ease;
    `;
    document.body.append(newElement);

    newElement.style = `
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-image: ${window.getComputedStyle(element).backgroundImage};
        background-position: center;
        background-size: cover;
        z-index: 1001;
        transition: all .5s ease;
    `;
}

async function exitFullscreen (element, original) {
    let offset = original.getBoundingClientRect();

    element.style = `
        position: fixed;
        left: ${offset.left};
        top: ${offset.top};
        width: ${offset.width};
        height: ${offset.height};
        background-image: ${window.getComputedStyle(element).backgroundImage};
        background-position: center;
        background-size: cover;
        z-index: 1001;
        border-radius: 20px;
        transition: all .5s ease;
    `;

    setTimeout(() => element.remove(), 500);
}