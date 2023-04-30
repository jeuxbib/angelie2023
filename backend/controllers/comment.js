const db = require('../models');

exports.createPostComment = (req, res, next) => {
    db.Comment.create({
        userId: req.userId,
        postId: req.params.id,
        content: req.body.content,
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch((error) => res.status(400).json(error, 'Requête non autorisé'));
}

exports.deleteComment = (req, res, next) => {
  db.Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
        comment.destroy()
          .then(res.status(200).json({ message: "Votre commentaire est supprimé !" }))
          .catch((error) => res.status(400).json({ error }))
      })
    .catch((error) => res.status(500).json({ error }));
};