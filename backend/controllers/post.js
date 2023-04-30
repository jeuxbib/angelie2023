const fs = require('fs');
const db = require('../models');

exports.createPost = (req, res, next) => {
    let imagePost = '';
    if (req.file) {
        imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    db.Post.create({
        userId: req.userId,
        description: req.body.description,
        image: imagePost,
    })
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch((error) => res.status(400).json(error, 'Requête non autorisé'));   
};

exports.getOnePost = (req, res, next) => {
    db.Post.findOne({ where: { id: req.params.id } })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
    db.Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [{
            model: db.User,
            attributes: { exclude: ['password']}
        }, {
            model: db.Comment,
            include: [{
                order: [["createdAt", "ASC"]],
                model: db.User,
                attributes: { exclude: ['password']}
            }]
        }, {
            model: db.Like,
            include: [{
                model: db.User
            }]
        }]
    })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const filename = post.image.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        post.destroy()
          .then(res.status(200).json({ message: "Votre publication est supprimé !" }))
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch((error) => res.status(500).json({ error }));
};