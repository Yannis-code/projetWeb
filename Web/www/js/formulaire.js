const registerForm = document.getElementById("registration_form");
const loginForm = document.getElementById("LoginForm");

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
    "userpwd": "Veuillez entrer un mot de passe valide",
}

function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    // update the class for the input
    input.className = type ? "success" : "error";
    return type;
}

function resetInput(input) {
    const msg = input.parentNode.querySelector("small");
    msg.innerText = "";
    input.className = "";
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
    // Gérer le cas où la date indiqué est après la date du jour
    const currentDate = new Date();
    const currentDateNoTime = new Date(currentDate.toDateString());
    const InputDateNoTime = new Date(inputDate.toDateString());

    if ((currentDateNoTime.getTime() - InputDateNoTime.getTime()) / (24 * 60 * 60 * 1000) < 0) {
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
    const passwordRegex = /([0-9a-zA-Z]){8,}/;

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
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var birthdate = document.getElementById("birthdate");
    var useremail = document.getElementById("useremail");
    var username = document.getElementById("username");
    var userpwd = document.getElementById("userpwd");
    var validfirstname = validateCompletion(firstname, emptyError["firstname"]);
    var validlastname = validateCompletion(lastname, emptyError["lastname"]);
    var validbirthdate = validateDate(birthdate, emptyError["birthdate"], invalidError["birthdate"]);
    var validusername = validateUsername(username, emptyError["username"], invalidError["username"]);
    var validuseremail = validateuseremail(useremail, emptyError["useremail"], invalidError["useremail"]);
    var validuserpwd = validatePassword(userpwd, emptyError["userpwd"], invalidError["userpwd"]);
    // if valid, submit the form.
    if (validfirstname && validlastname && validbirthdate && validusername && validuseremail && validuserpwd) {
        event.preventDefault();
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
            document.getElementById("BadLogin").innerHTML = this.responseText;
        }
    };
    xhr.send(formData);
}