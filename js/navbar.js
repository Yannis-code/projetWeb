/**
 * Fonction de l'affichage du "burger menu"
 */
function showResponsiveMenu() {
    var body = document.querySelector("body");
    var menu = document.getElementById("topnav_responsive_menu");
    var icon = document.getElementById("topnav_hamburger_icon");
    var root = document.getElementById("root");
    if (menu.className === "") {
        for (let index = 0; index < body.children.length; index++) {
            const el = body.children[index];
            if (el != root) {
                el.style.filter = "blur(2px)";
            }
        }
        menu.className = "open";
        icon.className = "open";
        root.style.overflowY = "hidden";
        body.style.backdropfilter = "blur(2px)";
    } else {
        for (let index = 0; index < body.children.length; index++) {
            const el = body.children[index];
            if (el != root) {
                el.style.filter = "none";
            }
        }
        menu.className = "";
        icon.className = "";
        root.style.overflowY = "";
        body.style.backdropfilter = "none";
    }
}