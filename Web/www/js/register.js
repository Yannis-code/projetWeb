const registerForm = document.getElementById("registration_form");
const toggleButton = document.querySelector(".toggleRegisterLogin");
const formContainer = document.querySelector(".form_container");

const EMAIL_INVALID = "Veuillez entrer un email valide (exemple@gmail.com)";
const emptyError = {
    "lastname": "Veuillez entrer un nom",
    "firstname": "Veuillez entrer un prénom",
    "birthdate": "Veuillez entrer une date de naissance",
    "username": "Veuillez entrer un identifiant de compte",
    "useremail": "Veuillez entrer un email",
    "userpwd": "Veuillez entrer un mot de passe",
}

const invalidError = {
    "birthdate": "Veuillez entrer une date de naissance valide (jj/mm/aaaa)",
    "username": "Veuillez entrer un identifiant de compte valide (minimum 6 caractères)",
    "useremail": "Veuillez entrer un email valide (ex: exemple@gmail.com)",
    "userpwd": "Veuillez entrer un mot de passe valide,\n(min: 8 caractère, 1 majuscule, 1 minuscule, 1 chiffre)",
}

function showMessage(input, message, type) {
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    input.className = type ? "success" : "error";
    return type;
}

function resetInput(input) {
    const msg = input.parentNode.querySelector("small");
    msg.innerText = "";
    input.className = "";
    return true;
}

function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}

function validateCompletion(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    }
    return showSuccess(input);
}

function validateuseremail(input, requiredMsg, invalidMsg) {
    const useremail = input.value.trim();
    const useremailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (useremail === "") {
        return showError(input, requiredMsg);
    }
    if (!useremail.match(useremailRegex)) {
        return showError(input, invalidMsg);
    }
    return showSuccess(input);
}

function validateDate(input, requiredMsg, invalidMsg) {
    const dateString = input.value.trim();
    const dateRegex = /^[0-9]{2,2}[/][0-9]{2,2}[/][0-9]{4,4}$/;
    if (dateString === "") {
        return resetInput(input);
    }
    if (!dateString.match(dateRegex)) {
        return showError(input, invalidMsg);
    }
    const inputDateArray = dateString.split("/");
    const inputDate = new Date(Date.UTC(inputDateArray[2], inputDateArray[1] - 1, inputDateArray[0]));
    if (inputDate.getFullYear() != parseInt(inputDateArray[2]) || inputDate.getMonth() != parseInt(inputDateArray[1] - 1) || inputDate.getDate() != parseInt(inputDateArray[0])) {
        return showError(input, invalidMsg);
    }

    const currentDate = new Date();
    const currentDateNoTime = new Date(currentDate.toDateString());
    const InputDateNoTime = new Date(inputDate.toDateString());

    if (currentDateNoTime.getTime() - InputDateNoTime.getTime() < 0) {
        return showError(input, "La date renseignée doit être passée");
    }
    return showSuccess(input);
}

function validateUsername(input, requiredMsg, invalidMsg) {
    const username = input.value.trim();

    if (username === "") {
        return showError(input, requiredMsg);
    }
    if (username.length < 6) {
        return showError(input, invalidMsg);
    }
    return showSuccess(input);
}

function validatePassword(input, requiredMsg, invalidMsg) {
    const password = input.value.trim();
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    if (password === "") {
        return showError(input, requiredMsg);
    }
    if (!password.match(passwordRegex)) {
        return showError(input, invalidMsg);
    }
    return showSuccess(input);
}

registerForm.addEventListener("input", function(event) {
    event.preventDefault();
    var target = event.target.id;
    if (target === "lastname" || target === "firstname") {
        validateCompletion(event.target, emptyError[target]);
    } else {
        switch (target) {
            case "birthdate":
                validateDate(event.target, emptyError["birthdate"], invalidError["birthdate"]);
                break;
            case "username":
                validateUsername(event.target, emptyError["username"], invalidError["username"]);
                break;
            case "useremail":
                validateuseremail(event.target, emptyError["useremail"], invalidError["useremail"]);
                break;
            case "userpwd":
                validatePassword(event.target, emptyError["userpwd"], invalidError["userpwd"]);
                break;
            default:
                break;
        }
    }
});

registerForm.addEventListener("submit", function(event) {
    // stop form submission
    event.preventDefault();
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const birthdate = document.getElementById("birthdate");
    const useremail = document.getElementById("useremail");
    const username = document.getElementById("username");
    const userpwd = document.getElementById("userpwd");
    const validfirstname = validateCompletion(firstname, emptyError["firstname"]);
    const validlastname = validateCompletion(lastname, emptyError["lastname"]);
    const validbirthdate = validateDate(birthdate, emptyError["birthdate"], invalidError["birthdate"]);
    const validusername = validateUsername(username, emptyError["username"], invalidError["username"]);
    const validuseremail = validateuseremail(useremail, emptyError["useremail"], invalidError["useremail"]);
    const validuserpwd = validatePassword(userpwd, emptyError["userpwd"], invalidError["userpwd"]);
    // if valid, submit the form.
    if (validfirstname && validlastname && validbirthdate && validusername && validuseremail && validuserpwd) {
        register();
    }
});

const register = () => {
    try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP"); // Essayer IE 
    } catch (e) // Echec, utiliser l'objet standard 
    {
        xhr = new XMLHttpRequest();
    }
    var formData = new FormData(registerForm);

    xhr.open("POST", "htbin/register.py");
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("form_output").innerHTML = "Inscription Réussie";
        }
    };
    xhr.send(formData);
}

let container = document.querySelectorAll(".scrolling_caroussel_container");
let div = document.querySelectorAll(".scrolling_caroussel");

container.forEach((el, i) => {
    el.addEventListener("click", (e) => {
        if (e.target.classList.contains("toggleRegisterLogin") && e.target.innerHTML === "Se connecter") {
            let scroll = div[i].scrollWidth / div[i].childElementCount
            div[i].scrollBy({ left: scroll, behavior: 'smooth' })
        } else if (e.target.classList.contains("toggleRegisterLogin") && e.target.innerHTML === "S'inscrire") {
            let scroll = -div[i].scrollWidth / div[i].childElementCount
            div[i].scrollBy({ left: scroll, behavior: 'smooth' })
        }
    })
})

var showuserpwd = document.getElementById("showuserpwd");
var password = document.getElementById("userpwd");

showuserpwd.addEventListener("click", (e) => {
    if (password.type === "password") {
        password.type = "text";
        showuserpwd.checked = true;
    } else {
        password.type = "password";
        showuserpwd.checked = false;
    }
})