// Importation sécurité password-validator
const passwordValidator = require('password-validator');

// Création du schéma
const schema = new passwordValidator();

// Propriété de condition pour la validation du mot de passe
schema
.is().min(8)                                    // Longueur min 8 caractére
.is().max(100)                                  // Longueur Max 100 caractére
.has().uppercase()                              // Doit avoir des lettres majuscules
.has().lowercase()                              // Doit avoir des lettres minuscules
.has().digits(2)                                // Doit comporter au moins 2 chiffres
.has().not().spaces()                           // Ne doit pas avoir d’espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Mettre ces valeurs sur liste noire

// Vérification qualité du mot de passe
module.exports = (req, res, next) => {
    if (!schema.validate(req.body.password)) {
        return (res.status(400)
        .json({ message: 'Le mot de passe doit contenir 8 caractére min et 25 max, des majuscules et minuscule, au moins 2 chiffres et sans espaces' }))
    } else {
        next();
    }
}