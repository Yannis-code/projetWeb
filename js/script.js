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

function showAside() {
    var aside = document.getElementById("toc_container");
    var btn = document.getElementById("hamburger_icon");
    if (aside.className === "") {
        aside.className = "open";
        btn.className = "open";
        btn.innerHTML = "&#8249;"
    } else {
        aside.className = "";
        btn.className = "";
        btn.innerHTML = "&#8250;"
    }
}