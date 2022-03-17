const body = document.querySelector("body");
const burger_icon = document.getElementById("topnav_hamburger_icon");
const menu = document.getElementById("topnav_responsive_menu");
const icon = document.getElementById("topnav_hamburger_icon");
const root = document.getElementById("root");
const navbar = document.getElementById("root");
const logform = document.getElementById("LoginForm");
const connection = document.querySelectorAll(".connection");
const overlay = document.getElementById("overlay");


burger_icon.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) {
        overlay.classList.add("overlay_visible");
        menu.classList.add("open");
        icon.classList.add("open");
        root.style.zIndex = "99";
        menu.style.zIndex = "100";
        icon.style.zIndex = "101";
        root.style.overflowY = "hidden";
    } else {
        overlay.classList.remove("overlay_visible");
        menu.classList.remove("open");
        icon.classList.remove("open");
        root.style.zIndex = "10";
        menu.style.zIndex = "10";
        icon.style.zIndex = "10";
        root.style.overflowY = "";
    }
})

if (connection != null) {
    connection.forEach(element => {
        element.addEventListener("click", (e) => {
            if (element.classList.contains("topnav_responsive_menu_a")) {
                menu.classList.remove("open");
                icon.classList.remove("open");
                root.style.zIndex = "10";
                menu.style.zIndex = "10";
                icon.style.zIndex = "10";
                root.style.overflowY = "";
            }
            if (!logform.classList.contains("appear")) {
                logform.classList.add("appear");
                overlay.classList.add("overlay_visible");
            }
        })
    });
}

overlay.addEventListener("click", (e) => {
    logform.classList.remove("appear");
    overlay.classList.remove("overlay_visible");
});

window.addEventListener('resize', function(event) {
    if (window.innerWidth > 768 && menu.classList.contains("open")) {
        overlay.classList.remove("overlay_visible");
        menu.classList.remove("open");
        icon.classList.remove("open");
        root.style.zIndex = "10";
        menu.style.zIndex = "10";
        icon.style.zIndex = "10";
        root.style.overflowY = "";
        body.style.backdropfilter = "none";
    }
}, true);