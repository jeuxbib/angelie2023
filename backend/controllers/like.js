const db = require('../models');

exports.createPostLike = (req, res, next) => {
  const like = req.body.like
  db.Post.findOne({     
    where: { id: req.params.id },
  })
  if (like == true) {
    db.Like.create({
      postId: req.params.id, 
      userId: req.userId
    })
    .then((post) => {
      db.Post.update(
        { likes: post.likes + 1 },
        { where: { id: req.params.id } }
      )         
        .then(() => res.status(201).json({ message: 'Like ajouté !' }))
        .catch((error) => res.status(400).json(error, 'Requête non autorisé')) 
    })
    .catch((error) => res.status(500).json({ error }))
  }
  else if (like == false) {
    db.Like.destroy({ 
      where: { postId: req.params.id, userId: req.userId } 
    })
    .then((post) => {
      db.Post.update(
        { likes: post.likes - 1 },
        { where: { id: req.params.id } }
      )
        .then(() => res.status(201).json({ message: 'Like supprimé !' }))
        .catch((error) => res.status(400).json( error, 'Requête non autorisé' )) 
    })
    .catch((error) => res.status(500).json({ error }))
  }
}
