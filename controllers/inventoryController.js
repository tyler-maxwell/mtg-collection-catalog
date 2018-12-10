const db = require("../database/models");
const allSets = require("../json");

module.exports = {
  create: function(req, res) {
    // req.body: {
    //  cards: [
    //    {
    //      name: string
    //      ownedCount: num
    //      wishCount: num
    //      needCount: num
    //    }
    //  ]
    // }

    req.body.cards.forEach(card => {
      allSets.forEach(set => {
        set.cards.forEach(cardInfo => {});
      });
    });

    // db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }
};
