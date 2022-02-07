document.addEventListener("DOMContentLoaded", function(event) {
    let container = document.querySelectorAll(".scrolling_caroussel");
    let progressBar = document.querySelectorAll(".progressBar");

    container.forEach((el, i) => {
        el.addEventListener('wheel', function(e) {
            if (e.deltaY != 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
            let scroll = el.scrollLeft;
            width = el.scrollWidth - el.offsetWidth,
                scrolled = scroll / width * 100;
            if (scrolled > 100) scrolled = 100;
            progressBar[i].style.width = scrolled + "%";
        })
    })
})