const db = require("../database/models");
const allSets = require("../json");

module.exports = {
  findCardsByPage: function(req, res) {
    const cardsPerPage = 25;
    const response = {
      hasInventory: false
    };
    db.User.findById(req.params.id)
      .populate({ path: "inventory", options: { sort: { name: 1 } } })
      .then(user => {
        if (user.inventory) {
          response.hasInventory = true;
          response.page = req.params.page;
          response.totalPages = Math.ceil(user.inventory.length / cardsPerPage);
          const index = (req.params.page - 1) * cardsPerPage;
          response.cards = user.inventory
            .slice(index, index + cardsPerPage)
            .map(card => {
              let updatedCard;
              let infoFound = false;
              for (let i = 0; i < allSets.length; i++) {
                const set = allSets[i];
                for (let j = 0; j < set.cards.length; j++) {
                  const cardInfo = set.cards[j];
                  if (card.multiverseId === cardInfo.multiverseId) {
                    infoFound = true;
                    updatedCard = {
                      ...card._doc,
                      info: {
                        ...cardInfo
                      }
                    };
                  }
                  if (infoFound) break;
                }
                if (infoFound) break;
              }
              return updatedCard;
            });
        }
        res.json(response);
      })
      .catch(err => {
        response.err = err;
        res.json(response);
      });
  },
  submitBatch: function(req, res) {
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
      db.User.findById(req.params.id)
        .populate("inventory")
        .then(user => {
          if (user) {
            // ******************************************
            // Returned object if successful
            const batchResponse = {
              badCards: []
            };
            // ******************************************
            // Sorted storage for cards from req.body.cards
            const badCards = batchResponse.badCards;
            const existingCards = [];
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
                      name: cardInfo.name,
                      releaseDate: new Date(set.releaseDate) // Only used to get the latest edition of card if card does not already exist in user's inventory
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
                      // Create and push existing card to existingCards array
                      existingCard = {
                        id: user.inventory[i]._id,
                        ownedCount:
                          user.inventory[i].ownedCount +
                          parseInt(card.ownedCount),
                        wishCount:
                          user.inventory[i].wishCount + parseInt(card.wishCount)
                      };
                      existingCards.push(existingCard);
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
                  const newCard = {};
                  // Check for multiverseId in descending date order
                  for (let i = foundCardInfo.length - 1; i >= 0; i--) {
                    if (foundCardInfo[i].multiverseId) {
                      newCard.multiverseId = foundCardInfo[i].multiverseId;
                      newCard.name = foundCardInfo[i].name;
                      newCard.ownedCount = card.ownedCount;
                      newCard.wishCount = card.wishCount;
                    }
                  }
                  // Store new cards and/or bad cards
                  let isEmpty = true;
                  for (var key in newCard) {
                    if (newCard.hasOwnProperty(key)) {
                      isEmpty = false;
                    }
                  }
                  if (isEmpty) {
                    badCards.push(card);
                  } else {
                    newCards.push(newCard);
                  }
                }
              }
            }); // req.body.cards.forEach() exit
            const entries = [];
            // Create bulk commands for updating existing cards
            existingCards.forEach(existingCard => {
              const entry = {
                updateOne: {
                  filter: { _id: existingCard.id },
                  update: {
                    ownedCount: existingCard.ownedCount,
                    wishCount: existingCard.wishCount
                  }
                }
              };
              entries.push(entry);
            });
            // Create bulk commands for creating new cards
            newCards.forEach(newCard => {
              const entry = {
                insertOne: {
                  document: {
                    multiverseId: newCard.multiverseId,
                    name: newCard.name,
                    ownedCount: newCard.ownedCount,
                    wishCount: newCard.wishCount
                  }
                }
              };
              entries.push(entry);
            });
            db.CardInv.bulkWrite(entries).then(BulkWriteResult => {
              console.log(BulkWriteResult);
              // if new cards were added push them to user's inventory
              for (var key in BulkWriteResult.insertedIds) {
                // skip loop if the property is from prototype
                if (!BulkWriteResult.insertedIds.hasOwnProperty(key)) continue;
                db.User.findOneAndUpdate(
                  {
                    _id: req.params.id
                  },
                  {
                    $push: { inventory: BulkWriteResult.insertedIds[key] }
                  },
                  { new: true }
                ).then(updatedUser => {
                  res.json(batchResponse);
                });
              }
              res.json(batchResponse);
            });
          } else {
            res.json("user not found");
          }
        })
        .catch(err => res.json(err));
    }
  }
};
