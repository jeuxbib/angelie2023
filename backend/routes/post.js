// Importation express
const express = require('express');
const router = express.Router();

// Importation du fichier controllers post, comment et like
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like')
// Importation multer et auth
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

//routes
router.post('/',auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:id/comment', auth, commentCtrl.createPostComment);

router.post('/:id/like', auth, likeCtrl.createPostLike)

module.exports = router;