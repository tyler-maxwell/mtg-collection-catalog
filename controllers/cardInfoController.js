// Returns info from ../json
const allSets = require("../json");

module.exports = {
  findByName: function(req, res) {
    const foundCards = [];
    allSets.forEach(set => {
      set.cards.forEach(card => {
        if (card.name.toLowerCase().includes(req.params.name)) {
          foundCards.push(card);
        }
      });
    });
    res.json(foundCards);
  },
  findById: function(req, res) {}
};
