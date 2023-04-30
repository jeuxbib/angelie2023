// Importation jsonwebtoken pour le token d'authentification
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Récupération du token dans le headers authorisation de la requête
        const token = req.headers.authorization.split(' ')[1];
        // Vérification pour décoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // On récupére l'id utilisateur du token
        const userId = decodedToken.userId;
        req.userId = userId;
        // Vérification que l'id utilisateur corresponde au token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};