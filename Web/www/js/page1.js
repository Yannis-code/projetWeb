const aside = document.getElementById("toc_container");
const btn = document.getElementById("show_aside_button");
const asideLinks = document.querySelectorAll("#toc_container a");

asideLinks.forEach(element => {
    element.addEventListener("click", (e) => {
        if (aside.classList.contains("open")) {
            overlay.classList.remove("overlay_visible");
            aside.classList.remove("open");
            btn.classList.remove("open");
            aside.style.zIndex = "10";
            btn.style.zIndex = "10";
            btn.innerHTML = "&#8250;"
        }
    })
});

btn.addEventListener("click", (e) => {
    if (!aside.classList.contains("open")) {
        overlay.classList.add("overlay_visible");
        aside.classList.add("open");
        btn.classList.add("open");
        aside.style.zIndex = "100";
        btn.style.zIndex = "100";
        btn.innerHTML = "&#8249;"
    } else {
        overlay.classList.remove("overlay_visible");
        aside.classList.remove("open");
        btn.classList.remove("open");
        aside.style.zIndex = "10";
        btn.style.zIndex = "10";
        btn.innerHTML = "&#8250;"
    }
})

overlay.addEventListener("click", (e) => {
    if (aside.classList.contains("open")) {
        overlay.classList.remove("overlay_visible");
        aside.classList.remove("open");
        btn.classList.remove("open");
        aside.style.zIndex = "10";
        btn.style.zIndex = "10";
        btn.innerHTML = "&#8250;"
    }
});

window.addEventListener('resize', function (event) {
    if (window.innerWidth > 768 && aside.classList.contains("open")) {
        overlay.classList.remove("overlay_visible");
        aside.classList.remove("open");
        btn.classList.remove("open");
        aside.style.zIndex = "10";
        btn.style.zIndex = "10";
        btn.innerHTML = "&#8250;"
    }
}, true);