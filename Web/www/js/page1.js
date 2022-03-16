function showAside(hide = false) {
    var body = document.querySelector("body");
    var aside = document.getElementById("toc_container");
    var btn = document.getElementById("show_aside_button");
    if (aside.className === "" && !hide) {
        for (let index = 0; index < body.children.length; index++) {
            const el = body.children[index];
            if (el != btn && el != aside) {
                el.style.filter = "blur(2px)";
            }
        }
        aside.className = "open";
        btn.className = "open";
        btn.innerHTML = "&#8249;"
    } else {
        for (let index = 0; index < body.children.length; index++) {
            const el = body.children[index];
            if (el != btn && el != aside) {
                el.style.filter = "none";
            }
        }
        aside.className = "";
        btn.className = "";
        btn.innerHTML = "&#8250;"
    }
}

window.addEventListener('resize', function (event) {
    if (window.innerWidth > 768 && document.getElementById("toc_container").className != "") {
        showAside();
    }
    if (window.innerWidth > 768 && document.getElementById("topnav_responsive_menu").className != "") {
        showResponsiveMenu();
    }
}, true);