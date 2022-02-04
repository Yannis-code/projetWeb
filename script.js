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

/**
 * Lancement de la fonction de parallax dès que la page a fini de charger
 */
document.addEventListener("DOMContentLoaded", function(event) {
    document.addEventListener("mousemove", parallax);
    const bg = document.querySelector("#bg");

    function parallax(e) {
        // Vitesse de déplacement des plans
        let speed1 = 0.00125;
        let speed2 = 0.0025;
        let speed3 = 0.0075;
        let _w = window.innerWidth / 2;
        let _h = window.innerHeight / 2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * speed1}% ${50 - (_mouseY - _h) * speed1}%`;
        let _depth2 = `${50 - (_mouseX - _w) * speed2}% ${50 - (_mouseY - _h) * speed2}%`;
        let _depth3 = `${50 - (_mouseX - _w) * speed3}% ${50 - (_mouseY - _h) * speed3}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        bg.style.backgroundPosition = x;
    }
})


/* carroussel nul de pierre */

// Makeshift carousel function that gets invoked with the Index to start it off, then the callback increments the index to recursively invoke the same function. Works even in IE11!
var testimonialItems = document.querySelectorAll(".item label");
var timer;
function cycleTestimonials(index) {
   timer = setTimeout(function() {
    var evt;
    if (document.createEvent){
      //If browser = IE, then polyfill
      evt = document.createEvent('MouseEvent');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    } else {
      //If Browser = modern, then create new MouseEvent
      evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: 20
          });
    }
    var ele = "." + testimonialItems[index].className;
    var ele2 = document.querySelector(ele)
    ele2.dispatchEvent(evt);
    index++; // Increment the index
    if (index >= testimonialItems.length) {
      index = 0; // Set it back to `0` when it reaches `3`
    }
    cycleTestimonials(index); // recursively call `cycleTestimonials()`
    document.querySelector(".testimonials").addEventListener("click", function() {
      clearTimeout(timer); //stop the carousel when someone clicks on the div
    });
  }, 2000); //adjust scroll speed in miliseconds
}
//run the function
cycleTestimonials(0);
