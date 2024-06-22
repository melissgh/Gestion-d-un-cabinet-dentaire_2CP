function validerform() {
  // Récupération des valeurs saisies dans les champs
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("Prenom").value.trim();
  const dateNaissance = document.getElementById("Date de naissance").value.trim();
  const lieuNaissance = document.getElementById("Lieu de naissance").value.trim();
  const telephone = document.getElementById("numero").value.trim();
  const email = document.getElementById("email").value.trim();
  const psw = document.getElementById("psw").value.trim();
  const psw2 = document.getElementById("psw2").value.trim();

  // Vérification que tous les champs sont remplis
  if (!nom || !prenom || !dateNaissance || !lieuNaissance || !telephone || !email || !psw || !psw2) {
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
