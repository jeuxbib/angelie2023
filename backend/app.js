// Importation Express
const express = require('express');
const app = express();

// Importation module helmet pour sécurisé les en-têtes HTTP
const helmet = require('helmet');
app.use(helmet());

// Importation module node pour le chemin image
const path = require('path');

// Importation routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//Connexion base de donnée + 'sequelize': mappage objet-relationnel (ORM)
const db = require('./models');
try {
    console.log('Connexion à MySQL réussi !');
} catch (error) {
    console.error('Connexion à MySQL échouée !', error);
}
db.sequelize.sync();

// CORS, système de sécurité qui bloque les appels HTTP entre des serveurs différents ce qui empêche les requêtes malveillantes d'accéder à des resources sensibles
const cors = require ('cors')
const corsOptions = {
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// CORS, pour autoriser les images
app.use((req, res, next) => {
    res.removeHeader('Cross-Origin-Resource-Policy');
    next();
});

// Analyse le corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gére les ressources images de façon statique d'une requête vers le dossier Images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Chemin d'accés à nos routes utilisateur, post et commentaire
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;