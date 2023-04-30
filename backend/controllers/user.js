const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
          .then(hash => {
            db.User.create({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              avatar: '',
          })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));     
};

exports.login = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              username: user.username,
              token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' })
            });
          })
          .catch(error => res.status(500).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch ((error) => res.status(401).json({ error }))
};

exports.updateUser = (req, res, next) => {
  const userObject = req.file ? {
    avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body
  };
  console.log(userObject),
  db.User.update( userObject,
    { where: { id: req.params.id } })
    .then(() => res.status(200).json( userObject ))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.avatar.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        user.destroy()
          .then(res.status(200).json({ message: "Votre profil est supprimé !" }))
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch((error) => res.status(500).json({ error }));
};