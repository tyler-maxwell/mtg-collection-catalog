const db = require("../database/models");
const allSets = require("../json");

module.exports = {
  create: function(req, res) {
    // ******************************************
    // req.body: {
    //  cards: [
    //    {
    //      name: string
    //      ownedCount: num
    //      wishCount: num
    //    }
    //  ]
    // }
    // ******************************************

    if (req.body.cards && req.body.cards.length > 0) {
      // Get user
      db.User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
          res.json(err);
        } else if (user) {
          // ******************************************
          // Sorted storage for cards from req.body.cards
          const badCards = [];
          const newCards = [];
          // ******************************************
          // Check each card in req.body.cards
          req.body.cards.forEach(card => {
            // ******************************************
            // Storage for card info on matching card names
            const foundCardInfo = [];
            // ******************************************
            // Search card info
            allSets.forEach(set => {
              set.cards.forEach(cardInfo => {
                // Verify validity of each card
                if (card.name.toLowerCase() === cardInfo.name.toLowerCase()) {
                  // Store only multiverseId and releaseDate
                  const foundCard = {
                    multiverseId: cardInfo.multiverseId,
                    releaseDate: new Date(cardInfo.set.releaseDate) // Only used to get the latest edition of card if card does not already exist in user's inventory
                  };
                  // Store all editions of card info
                  foundCardInfo.push(foundCard);
                }
              });
            });
            // Store bad cards
            if (foundCardInfo.length === 0) {
              badCards.push(card);
            } else {
              let cardExists = false;
              // Check if card is already in user's inventory (DOES NOT check for multiple editions in inventory)
              for (let i = 0; i < user.inventory.length; i++) {
                for (let j = 0; j < foundCardInfo.length; j++) {
                  if (
                    user.inventory[i].multiverseId ===
                    foundCardInfo[j].multiverseId
                  ) {
                    cardExists = true;
                    // Update user.inventory[i] to have the new count values for card
                    user.inventory[i].ownedCount =
                      user.inventory[i].ownedCount + card.ownedCount;
                    user.inventory[i].wishCount =
                      user.inventory[i].wishCount + card.wishCount;
                  }
                  if (cardExists) {
                    break;
                  }
                }
                if (cardExists) {
                  break;
                }
              }
              if (!cardExists) {
                // Sort foundCardInfo by date
                foundCardInfo.sort(function(a, b) {
                  const keyA = a.releaseDate;
                  const keyB = b.releaseDate;
                  if (keyA < keyB) return -1;
                  if (keyA > keyB) return 1;
                  return 0;
                });
                // Store new cards
                const newCard = {
                  multiverseId:
                    foundCardInfo[foundCardInfo.length - 1].multiverseId,
                  ownedCount: card.ownedCount,
                  wishCount: card.wishCount
                };
                newCards.push(newCard);
              }
            }
          }); // req.body.cards.forEach() exit
          // ******************************************
          // existing cards in user.inventory has been updated
          // now new cards need to be added to user.inventory
          // then db needs to be contacted to update user (or cardInv) with this user.inventory
          // bad cards need to be sent back to client with updated inventory
          // ******************************************
        } else {
          res.json("user not found");
        }
      });
    }

    // db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }
};
