const db = require('../database/models');

module.exports = {
  findAll: function(req, res) {
    db.CardDeck.find(req.query)
      .sort({ multiverseld: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.CardDeck.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.CardDeck.create(req.body)
      .then(dbModel => req.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.CardDeck.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.CardDeck.findOneAndRemove({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
