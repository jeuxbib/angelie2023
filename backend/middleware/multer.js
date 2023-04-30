// Importation de multer
const multer = require('multer');

// Objet pour résoudre l'extension de fichier appropriée
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/tiff': 'tiff',
    'image/bmp': 'bmp'
};

// Création d'un objet de configuration pour multer
const storage = multer.diskStorage({
    // Fonction indiquant à multer d'enregistrer les fichiers dans le dossier images
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Fonction indiquant à multer qu'elle nom de fichier utiliser
    filename: (req, file, callback) => {
        // Modification du nom du fichier
        const name = file.originalname.split(' ').join('_');
        // Créer extension du fichier 
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportation de notre middleware multer complétement configuré
module.exports = multer({ storage: storage }).single('image');