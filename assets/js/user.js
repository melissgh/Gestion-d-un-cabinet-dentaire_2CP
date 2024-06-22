function pswconfirmation() {
    const old_password = document.getElementById("old_password").value;
    const new_password = document.getElementById("new_password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const error = document.getElementById("error");

    if (old_password === "" || new_password === "" || confirm_password === "") {
        alert("Veuillez remplir tout les champs ");
        return false;
    } if (old_password === new_password) {
        alert("Le nouveau mot de passe doit être différent de l'ancien");
        return false;
    } if (new_password.length < 8) {
        alert("Le nouveau mot de passe doit avoir au moins 8 caractères");
        return false;
    } if (new_password !== confirm_password) {
        alert("Le nouveau mot de passe et sa confirmation doivent être identiques ");
        return false;
    }

    alert("Le mot de passe a été modifié avec succès");
    return true;
}


function emailconfirmation() {
    // Récupérer les champs du formulaire
    const oldEmailInput = document.getElementById("old_email");
    const newEmailInput = document.getElementById("new_email");
    const confirmEmailInput = document.getElementById("confirm_email");


    // Récupérer les valeurs des champs
    const oldEmail = oldEmailInput.value.trim();
    const newEmail = newEmailInput.value.trim();
    const confirmEmail = confirmEmailInput.value.trim();

    // Valider que tous les champs sont remplis
    if (!oldEmail || !newEmail || !confirmEmail) {
        alert("Veuillez remplir tous les champs");
        return false;
    }

    // Valider que les nouvelles adresses e-mail sont valides
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail) || !emailRegex.test(confirmEmail)) {
        alert("Veuillez entrer une adresse e-mail valide");
        return false;
    }

    // Valider que les nouvelles adresses e-mail sont différentes de l'ancienne
    if (oldEmail === newEmail) {
        alert("La nouvelle adresse e-mail doit être différente de l'ancienne");
        return false;
    }

    // Valider que les nouvelles adresses e-mail sont identiques
    if (newEmail !== confirmEmail) {
        alert("La nouvelle adresse e-mail et la confirmation doivent être identiques");
        return false;
    }

    // Si toutes les validations ont réussi, afficher le message de succès
    alert("L'e-mail a été modifié avec succès !");
    return true;
}