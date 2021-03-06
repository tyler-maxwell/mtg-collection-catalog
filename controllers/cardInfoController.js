// Returns info from ../json
const allSets = require("../json");

module.exports = {
  findByName: function(req, res) {
    const foundCards = [];
    const cardNames = [];
    allSets.forEach(set => {
      set.cards.forEach(card => {
        if (card.name.toLowerCase().includes(req.params.name.toLowerCase())) {
          if (!cardNames.includes(card.name) && card.multiverseId) {
            cardNames.push(card.name);
            card.set = {};
            card.set.code = set.code;
            card.set.mtgoCode = set.mtgoCode;
            card.set.name = set.name;
            card.set.type = set.type;
            card.set.releaseDate = set.releaseDate;
            card.set.baseSetSize = set.baseSetSize;
            card.set.totalSetSize = set.totalSetSize;
            foundCards.push(card);
          }
        }
      });
    });
    res.json(foundCards);
  },
  findById: function(req, res) {}
};
