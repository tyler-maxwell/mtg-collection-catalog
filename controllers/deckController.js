const db = require('../database/models');

module.exports = {
  findAll: function(req, res) {
    db.Deck.find()
      .sort({ name: 1 })
      .populate('cards')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Deck.findById(req.params.id)
      .populate('cards')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Deck.create(req.body)
      .populate('cards')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Deck.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Deck.findOneAndRemove({ _id: req.params.id }, req.body)
      .then(dbModels => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
