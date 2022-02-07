var spaceHolder, horizontal, container, sticky;

document.addEventListener("DOMContentLoaded", function(event) {
    spaceHolder = document.querySelectorAll('.space-holder');
    horizontal = document.querySelectorAll('.horizontal');
    container = document.querySelectorAll('.container');
    sticky = document.querySelectorAll('.sticky');

    container.forEach(function(current, i) {
        spaceHolder[i].style.height = `${calcDynamicHeight(horizontal[i])}px`;
        window.addEventListener('scroll', () => {
            horizontal[i].style.transform = `translateX(-${sticky[i].offsetTop}px)`;
        });
        window.addEventListener('resize', () => {
            spaceHolder[i].style.height = `${calcDynamicHeight(horizontal[i])}px`;
        });
    });
})

function calcDynamicHeight(ref) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const objectWidth = ref.scrollWidth;
    return objectWidth - vw + vh + 150;
}