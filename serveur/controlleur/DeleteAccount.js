const User = require('../modele/User');

exports.deleteAccount = async (req, res) => {
  const id = req.params.id;
  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findById(id);
    if (!user) return res.status(404).send("L'utilisateur n'a pas été trouvé.");
    // Suppression de l'utilisateur de la base de données
    await User.findByIdAndRemove(id);
    res.send("L'utilisateur a été supprimé avec succès.");

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
