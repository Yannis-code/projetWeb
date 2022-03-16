/**
 * Lancement de la fonction de parallax dès que la page a fini de charger
 */
 document.addEventListener("DOMContentLoaded", function(event) {
    document.addEventListener("mousemove", parallax);
    const bg = document.querySelector("#bg");

    function parallax(e) {
        // Vitesse de déplacement des plans
        let speed = [0.0025, 0.0040, 0.0075, 0.0200];
        let depth = [];
        for (let i = 0; i < speed.length; i++) {
            depth[i] = `${50 - (e.clientX - window.innerWidth / 2) * speed[i]}% 
            ${50 - (e.clientY - window.innerHeight / 2) * speed[i]}%`;
        }
        bg.style.backgroundPosition = `${depth[3]}, ${depth[2]}, ${depth[1]}, ${depth[0]}`;
    }
})