document.addEventListener('DOMContentLoaded', () => {

    let elements = document.querySelectorAll('.image-row');
    elements.forEach((element) => {

        let children = element.childNodes;
        children.forEach((child) => {

            child.addEventListener('mouseover', () => {
                child.classList.add(`flex-grow-${child.dataset.expanded}`);
                children.forEach((neighbor) => {
                    if (neighbor != child && neighbor.nodeType == Node.ELEMENT_NODE) neighbor.classList.add(`flex-grow-1`);
                });
            });

            child.addEventListener('mouseout', () => {
                child.classList.remove(`flex-grow-${child.dataset.expanded}`);
                children.forEach((neighbor) => {
                    if (neighbor != child && neighbor.nodeType == Node.ELEMENT_NODE) neighbor.classList.remove(`flex-grow-1`);
                });
            });
        })
    })
})