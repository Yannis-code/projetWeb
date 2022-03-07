// show a message with a type of the input
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

function validateEmail(input, requiredMsg, invalidMsg) {
    const email = input.value.trim();
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "") {
        return showError(input, requiredMsg);
    }
    if (!email.match(emailRegex)) {
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
    const dt = dateString.split("/");
    const date = new Date(dt[2], dt[1] - 1, dt[0]);
    if (date.getFullYear() != parseInt(dt[2]) || date.getMonth() != parseInt(dt[1] - 1) || date.getDate() != parseInt(dt[0])) {
        return showError(input, invalidMsg);
    }
    // Gérer le cas où la date indiqué est après la date du jour
    var d = new Date(Date.now())
    console.log(Date.UTC(dt[2], dt[1] - 1, dt[0]))
    console.log(d.getUTCDate())
    console.log(date.getUTCDate())
    if (!(date < Date.now())) {
        return showError(input, invalidMsg);
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

const form = document.querySelector("#registration_form");

const EMAIL_INVALID = "Veuillez entrer un email valide (exemple@gmail.com)";
const emptyError = {
    "name": "Veuillez entrer un nom",
    "prenom": "Veuillez entrer un prénom",
    "bday": "Veuillez entrer une date de naissance",
    "user_id": "Veuillez entrer un identifiant de compte",
    "email": "Veuillez entrer un email",
    "mdp": "Veuillez entrer un mot de passe",
}

const invalidError = {
    "bday": "Veuillez entrer une date de naissance valide (jj/mm/aaaa)",
    "user_id": "Veuillez entrer un identifiant de compte valide (minimum 6 caractères)",
    "email": "Veuillez entrer un email valide (ex: exemple@gmail.com)",
    "mdp": "Veuillez entrer un mot de passe valide",
}

form.addEventListener("input", function(event) {
    event.preventDefault();
    var target = event.target.id;
    if (target === "name" || target === "prenom") {
        validateCompletion(event.target, emptyError[target]);
    } else {
        switch (target) {
            case "bday":
                validateDate(event.target, emptyError["bday"], invalidError["bday"]);
                break;
            case "user_id":
                validateUsername(event.target, emptyError["user_id"], invalidError["user_id"]);
                break;
            case "email":
                validateEmail(event.target, emptyError["email"], invalidError["email"]);
                break;
            case "mdp":
                validatePassword(event.target, emptyError["mdp"], invalidError["mdp"]);
                break;
            default:
                break;
        }
    }
});

form.addEventListener("submit", function(event) {
    // stop form submission
    event.preventDefault();
    var prenom = document.getElementById("prenom");
    var name = document.getElementById("name");
    var bday = document.getElementById("bday");
    var email = document.getElementById("email");
    var user_id = document.getElementById("user_id");
    var mdp = document.getElementById("mdp");
    var validPrenom = validateCompletion(prenom, emptyError["prenom"]);
    var validName = validateCompletion(name, emptyError["name"]);
    var validBday = validateDate(bday, emptyError["bday"], invalidError["bday"]);
    var validUser_id = validateUsername(user_id, emptyError["user_id"], invalidError["user_id"]);
    var validEmail = validateEmail(email, emptyError["email"], invalidError["email"]);
    var validMdp = validatePassword(mdp, emptyError["mdp"], invalidError["mdp"]);
    // if valid, submit the form.
    if (validPrenom && validName && validBday && validUser_id && validEmail && validMdp) {
        alert("Demo only. No form was posted.");
    }
});