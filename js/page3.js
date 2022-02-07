document.addEventListener("DOMContentLoaded", function(event) {
    let hasTouch;
    if ('ontouchstart' in document.documentElement) {
        document.documentElement.classList.add('touch');
        hasTouch = true;
    } else {
        document.documentElement.classList.add('no-touch');
        hasTouch = false;
    }

    let container = document.querySelectorAll(".scrolling_caroussel");

    if (!hasTouch) {
        container.forEach((el, i) => {
            if (el.scrollWidth - el.offsetWidth <= 0) el.style.overflowX = "hidden";
            el.addEventListener('wheel', function(e) {
                if (e.deltaY != 0) {
                    e.preventDefault();
                    el.scrollLeft += e.deltaY;
                }
            })
        })
    }
})