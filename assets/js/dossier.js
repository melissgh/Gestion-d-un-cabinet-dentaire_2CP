function validerFormajout() {
    // Récupération des valeurs des champs
    var nom = document.getElementById("nom").value.trim();
    var prenom = document.getElementById("prenom").value.trim();
    var age = document.getElementById("age").value.trim();
    var date_naissance = document.getElementById("date_naissance").value.trim();
    var tel = document.getElementById("tel").value.trim();
    var mail = document.getElementById("mail").value.trim();
    var nmr = document.getElementById("nmr").value.trim();
    const medicament = document.getElementById("médicament").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (nom === "" || prenom === "" || date_naissance === "" || tel === "" || mail === "" || nmr === "" || age === "" || medicament === "" || notes === "") {
        alert("Veuillez remplir tout les champs s'il vous plaît !");
        return false;
    }
    // Vérification de la longueur du nom et prénom
    if (nom.length < 2 || nom.length > 20 || prenom.length < 2 || prenom.length > 20) {
        alert("Le nom et prénom doivent avoir entre 2 et 20 caractères");
        return false;
    }

    // Vérification de l'âge
    if (isNaN(age) || age < 0 || age > 100) {
        alert("L'âge doit être un nombre entre 0 et 100");
        return false;
    }

    // Vérification du format de la date de naissance
    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!date_regex.test(date_naissance)) {
        alert("Le format de la date de naissance doit être jj/mm/aaaa");
        return false;
    }

    // Vérification du numéro de téléphone
    var tel_regex = /^(05|06|07)\d{8}$/;
    if (!tel_regex.test(tel)) {
        alert("Le numéro de téléphone doit commencer par 05, 06 ou 07 et contenir exactement 10 chiffres");
        return false;
    }

    // Vérification de l'adresse e-mail
    var mail_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mail_regex.test(mail)) {
        alert("Veuillez saisir une adresse e-mail valide");
        return false;
    }

    // Vérification du numéro d'ordre
    if (nmr.length == 0) {
        alert("Veuillez saisir un numéro d'ordre");
        return false;
    }
    alert("l'ordonnance est bien ajouter")
    // Si toutes les conditions sont remplies, le formulaire peut être soumis
    return true;
}

function validerFormucertificat() {
    // Récupérer les valeurs des champs
    let nom = document.getElementById('nom').value.trim();
    let prenom = document.getElementById('prenom').value.trim();
    let date = document.getElementById('date').value.trim();
    let age = parseInt(document.getElementById('age').value.trim());
    let notes = document.getElementById('notes').value.trim();

    // Vérifier si les champs sont remplis
    if (nom === '' || prenom === '' || date === '' || isNaN(age) || notes === '') {
        alert('Veuillez remplir tous les champs.');
        return false;
    }

    // Vérifier la longueur du nom et prénom
    if (nom.length < 2 || nom.length > 20 || prenom.length < 2 || prenom.length > 20) {
        alert('Le nom et le prénom doivent avoir entre 2 et 20 caractères.');
        return false;
    }

    // Vérifier l'âge
    if (age < 0 || age > 100) {
        alert('L\'âge doit être compris entre 0 et 100.');
        return false;
    }

    // Vérifier le format de la date 
    let dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
        alert('Le format de la date de naissance doit être jj/mm/aaaa.');
        return false;
    }



    return ("le certificat est bien ajouter ")
    // Tout est valide, on peut envoyer le formulaire
    return true;
}


function validerFormconsultation() {
    // Récupérer les valeurs des champs
    var date = document.getElementById("date").value;
    var motif = document.getElementById("motif").value;
    var notes = document.getElementById("notes").value;

    // Vérifier que la date est au format jj/mm/aaaa
    var dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegExp.test(date)) {
        alert("La date doit être au format jj/mm/aaaa.");
        return false;
    }

    // Vérifier que le champ motif est sélectionné
    if (motif === "" || notes === "" || date === "") {
        alert("Veuillez remplir tous les champs s'il vous plaît");
        return false;
    }
    alert("la consultation est bien ajouter")
    // Si toutes les validations sont passées, renvoyer true pour soumettre le formulaire
    return true;
}
