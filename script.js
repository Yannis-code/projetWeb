/**
 * Fonction de l'affichage du "burger menu"
 */
function showResponsiveMenu() {
    var menu = document.getElementById("topnav_responsive_menu");
    var icon = document.getElementById("topnav_hamburger_icon");
    var root = document.getElementById("root");
    if (menu.className === "") {
        menu.className = "open";
        icon.className = "open";
        root.style.overflowY = "hidden";
    } else {
        menu.className = "";
        icon.className = "";
        root.style.overflowY = "";
    }
}


/* carroussel nul de pierre */

// Makeshift carousel function that gets invoked with the Index to start it off, then the callback increments the index to recursively invoke the same function. Works even in IE11!
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
