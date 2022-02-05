/**
 * Lancement de la fonction de parallax dès que la page a fini de charger
 */
document.addEventListener("DOMContentLoaded", function(event) {
    try {
        const bg = document.querySelector("#bg");
    } catch (error) {}
    document.addEventListener("mousemove", parallax);

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