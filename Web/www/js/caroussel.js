document.addEventListener("DOMContentLoaded", function(event) {
    let hasTouch;
    if ('ontouchstart' in document.documentElement) {
        document.documentElement.classList.add('touch');
        hasTouch = true;
    } else {
        document.documentElement.classList.add('no-touch');
        hasTouch = false;
    }
    
    let container = document.querySelectorAll(".scrolling_caroussel_container");
    let div = document.querySelectorAll(".scrolling_caroussel");
    
    container.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            if (e.target.classList.contains("caroussel_button_next")) {
                let scroll = div[i].scrollWidth/div[i].childElementCount
                div[i].scrollBy({left: scroll, behavior: 'smooth'})
            }
            else if (e.target.classList.contains("caroussel_button_prev")) {
                let scroll = -div[i].scrollWidth/div[i].childElementCount
                div[i].scrollBy({left: scroll, behavior: 'smooth'})
            }
        })
    })
})