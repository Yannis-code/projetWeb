/* carroussel nul de pierre */

var testimonialItems, time;
var carouselDelay = 5000;
document.addEventListener("DOMContentLoaded", function(event) {
    testimonialItems = document.querySelectorAll(".radio_team");
    time = setTimeout(() => autoCaroussel(0), carouselDelay);
    pauseCaroussel();
})

function autoCaroussel(index) {
    testimonialItems[index].checked = false;
    index = (index + 1) % testimonialItems.length;
    testimonialItems[index].checked = true;
    time = setTimeout(() => autoCaroussel(index), carouselDelay);
    pauseCaroussel();
}

function pauseCaroussel() {
    document.getElementById("carousel_container").addEventListener("click", () => {
        clearTimeout(time);
        for (let i = 0; i < testimonialItems.length; i++) {
            if (testimonialItems[i].checked == true) {
                index = i;
            }
        }
        time = setTimeout(() => autoCaroussel(index), carouselDelay);
    })
}