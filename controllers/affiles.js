const Adherent = require('../models/adherent');
const fs = require('fs');
const { roles } = require('../role')
exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action"
        });
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route"
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
exports.createAdherent = (req, res, next) => {
    const adherentObject = JSON.parse(req.body.adherent);
    
    const adherent = new Adherent({
      ...adherentObject,
      ficheUrl: `${req.file.url}`
    });
    adherent.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneAdherent = (req, res, next) => {
  Adherent.findOne({
    _id: req.params.id
  }).then(
    (adherent) => {
      res.status(200).json(adherent);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyAdherent = (req, res, next) => {
    const adherentObject = req.file ?
      {
        ...JSON.parse(req.body.adherent),
        ficheUrl: `${req.file.url}`
      } : { ...req.body };
    Adherent.updateOne({ _id: req.params.id }, { ...adherentObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteAdherent = (req, res, next) => {
    Adherent.findOne({ _id: req.params.id })
      .then(adherent => {
        const filename = adherent.ficheUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Adherent.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getAllAffiles = (req, res, next) => {
  Adherent.find().then(
    (adherents) => {
      res.status(200).json(adherents);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};