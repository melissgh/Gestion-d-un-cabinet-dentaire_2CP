$("#ajouter_fiche").submit(function (event) {
  alert("Les donnees sont inseres avec succes");
})
$("#index_fiche").submit(function (event) {
  alert("Les donnees sont inseres avec succes");
})

$("#modifier_fiche").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n['name']] = n['value']
  })

  var request = {
    "url": `http://localhost:3000/api/fiches_medicales/${data.id}`,
    "method": "PUT",
    "data": data
  }
  $.ajax(request).done(function (response) {
    alert("les donnees sont modifiees avec succes");
  })
})

//Suppression

$ondelete = $("table tbody td a.delete");
$ondelete.click(function () {
  var id = $(this).attr("data-id")

  var request = {
    "url": `http://localhost:3000/api/fiches_medicales/${id}`,
    "method": "DELETE"
  }
  if (confirm("Voulez vous vraiment supprimer cette fiche ?")) {
    $.ajax(request).done(function (response) {
      alert("les donnees sont supprimes avec succes");
      location.reload();
    })
  }

})
//supprimer user 
$ondelete = $("table tbody td a.delete3");
$ondelete.click(function () {
  var id = $(this).attr("data-id")

  var request = {
    "url": `http://localhost:3000/delete/${id}`,
    "method": "DELETE"
  }
  if (confirm("Voulez vous vraiment supprimer cet utilisateur ?")) {
    $.ajax(request).done(function (response) {
      alert("les donnees sont supprimes avec succes");
      location.reload();
    })
  }

})
//supp consu 
$ondelete = $("table tbody td a.delete2");
$ondelete.click(function () {
  var id = $(this).attr("data-id")

  var request = {
    "url": `http://localhost:3000/consultation/${id}`,
    "method": "DELETE"
  }
  if (confirm("Voulez vous vraiment supprimer cette consultation ?")) {
    $.ajax(request).done(function (response) {
      alert("les donnees sont supprimes avec succes");
      location.reload();
    })
  }

})

$ondelete = $("table tbody td a.delete1");
$ondelete.click(function () {
  var id = $(this).attr("data-id")

  var request = {
    "url": `http://localhost:3000/dossier/${id}`,
    "method": "DELETE"
  }
  if (confirm("Voulez vous vraiment supprimer ce dossier ?")) {
    $.ajax(request).done(function (response) {
      alert("les donnees sont supprimes avec succes");
      location.reload();
    })
  }

})


function validerFormulaire() {
  // Récupération des valeurs des champs
  let nom = document.getElementById("nom").value.trim();
  let prenom = document.getElementById("prenom").value.trim();
  let email = document.getElementById("email").value.trim();
  let telephone = document.getElementById("telephone").value.trim();
  let date_naissance = document.getElementById("date_naissance").value.trim();

  // Vérification des champs obligatoires
  if (nom === "" || prenom === "" || email === "" || telephone === "" || date_naissance === "") {
    alert("Veuillez remplir tous les champs obligatoires.");
    return false;
  }

  // Vérification de la longueur du nom et du prénom
  if (nom.length < 2 || nom.length > 20 || prenom.length < 2 || prenom.length > 20) {
    alert("Le nom et le prénom doivent avoir une taille entre 2 et 20 caractères.");
    return false;
  }

  // Vérification du format de l'email
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Veuillez saisir une adresse email valide.");
    return false;
  }

  // Vérification du format du numéro de téléphone
  let telephoneRegex = /^(05|06|07)\d{8}$/;
  if (!telephoneRegex.test(telephone)) {
    alert("Le numéro de téléphone doit avoir exactement 10 chiffres et commencer par 05, 06 ou 07.");
    return false;
  }

  // Vérification du format de la date de naissance
  let dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (!dateRegex.test(date_naissance)) {
    alert("Veuillez saisir une date de naissance au format jj/mm/aaaa.");
    return false;
  }

  // Si tous les champs sont valides, afficher un message de félicitation
  alert("La Fiche patient est bien ajoutée !");
  return true;
}

function toggleDropdown() {
  var x = document.getElementById('rdv2');
  if (x.style.display === "none") {
    x.style.display = "block";
  }
  else {
    x.style.display = "none";

  }
}
// valider le formulaire de changement de mot de passe pour l'assistante 
function validateFormulaire() {
  var ancienPsw = document.getElementById("ancienpsw").value;
  var nouveauPsw = document.getElementById("nouveaupsw").value;
  var confNouveauPsw = document.getElementById("confnouveaupsw").value;
  if (nouveauPsw === "" || confNouveauPsw === "" || ancienPsw === "") {
    alert("veuillez remplir tout les champs ");
    return false;
  }
  if (nouveauPsw.length < 8) {
    alert("le mot de passe doit avoir ou moins 8 caractères ");
    return false;
  }
  if (nouveauPsw !== confNouveauPsw) {
    alert("Les nouveaux mots de passe ne correspondent pas.");
    return false;
  }

  if (ancienPsw === nouveauPsw) {
    alert("Le nouveau mot de passe doit être différent de l'ancien.");
    return false;
  }

  alert("Le mot de passe a été changé avec succès !");
  return true;
}

// valider le formliare d'ajout d'une assistante
function validateForm() {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const date_naissance = document.getElementById("date_naissance").value.trim();
  const tel = document.getElementById("tel").value.trim();
  const mail = document.getElementById("mail").value.trim();
  const mdp = document.getElementById("mdp").value.trim();
  const mdp2 = document.getElementById("mdp2").value.trim();

  // Vérification des champs vides
  if (nom === "" || prenom === "" || date_naissance === "" || tel === "" || mail === "" || mdp === "" || mdp2 === "") {
    alert("Veuillez remplir tout les champs s'il vous plaît !");
    return false;
  }

  // Vérification de la longueur du nom et du prénom
  if (nom.length < 2 || nom.length > 20 || prenom.length < 2 || prenom.length > 20) {
    alert("Le nom et le prénom doivent contenir entre 2 et 20 caractères");
    return false;
  }

  // Vérification du format de la date de naissance
  const date_regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!date_regex.test(date_naissance)) {
    alert("Le format de la date de naissance doit être jj/mm/aaaa");
    return false;
  }

  // Vérification du numéro de téléphone
  const tel_regex = /^(05|06|07)\d{8}$/;
  if (!tel_regex.test(tel)) {
    alert("Le numéro de téléphone doit commencer par 05, 06 ou 07 et contenir 10 chiffres");
    return false;
  }

  // Vérification du format de l'email
  const mail_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  if (!mail_regex.test(mail)) {
    alert("Le format de l'email est invalide");
    return false;
  }
  if (mdp.length < 8) {
    alert("le mot de passe dooit contenir oumoion 8 caractères");
    return false;
  }

  // Vérification que les deux mots de passe sont identiques
  if (mdp !== mdp2) {
    alert("Les mots de passe ne sont pas identiques");
    return false;
  }
  alert("l'utilisateur est ajoutz avec succès")
  return true; // Validation réussie
}
function validerform() {
  // Récupération des valeurs saisies dans les champs
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("Prenom").value.trim();
  const dateNaissance = document.getElementById("Date de naissance").value.trim();
  const lieuNaissance = document.getElementById("Lieu de naissance").value.trim();
  const telephone = document.getElementById("numero").value.trim();
  const sexe = document.getElementById("sexe").value.trim();
  const email = document.getElementById("email").value.trim();
  const psw = document.getElementById("psw").value.trim();
  const psw2 = document.getElementById("psw2").value.trim();

  // Vérification que tous les champs sont remplis
  if (!nom || !prenom || !dateNaissance || !lieuNaissance || !telephone || !email || !psw || !psw2 || !sexe) {
    alert("Veuillez remplir tous les champs.");
    return false;
  }

  // Vérification de la longueur du nom et du prénom
  if (nom.length < 2 || nom.length > 20 || prenom.length < 2 || prenom.length > 20) {
    alert("Le nom et le prénom doivent avoir entre 2 et 20 caractères.");
    return false;
  }

  // Vérification du format de la date de naissance
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(dateNaissance)) {
    alert("Le format de la date de naissance doit être jj/mm/aaaa.");
    return false;
  }

  // Vérification du numéro de téléphone
  const telRegex = /^(05|06|07)\d{8}$/;
  if (!telRegex.test(telephone)) {
    alert("Le numéro de téléphone doit commencer par 05, 06 ou 07 et contenir 10 chiffres.");
    return false;
  }

  // Vérification de la correspondance des deux mots de passe
  if (psw !== psw2) {
    alert("Les deux mots de passe ne correspondent pas.");
    return false;
  }

  // Vérification de la longueur du mot de passe
  if (psw.length < 8) {
    alert("Le mot de passe doit contenir au moins 8 caractères.");
    return false;
  }

  // Vérification du format de l'email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Le format de l'email est invalide.");
    return false;
  }

  // Si toutes les validations ont été passées, le formulaire est valide
  alert("Bienvenu, vous êtes inscrit dans notre cabinet , veuillez vous connecter pour prendre un rendez-vous  !");
  return true;
}

