// Importation express
const express = require('express');
const router = express.Router();

// Importation du fichier controllers User
const userCtrl = require('../controllers/user');
// Importation password-validator, auth et multer
const password = require('../middleware/password');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

// routes
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getUser)
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;