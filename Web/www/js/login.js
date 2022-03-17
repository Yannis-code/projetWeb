const loginForm = document.getElementById("LoginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    login();
});

const login = () => {
    try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP"); // Essayer IE 
    } catch (e) // Echec, utiliser l'objet standard 
    {
        xhr = new XMLHttpRequest();
    }
    var formData = new FormData(loginForm);

    xhr.open("POST", "htbin/login.py");
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("login_output").innerHTML = this.responseText;
        }
    };
    xhr.send(formData);
}