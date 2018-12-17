const router = require("express").Router();
const userRoutes = require("./users");
const inventoryRoutes = require("./inventoryRoutes");
const cardDeckRoutes = require("./cardDeckRoute");
const cardInvRoutes = require("./cardInvRoute");
const deckRoutes = require("./deckRoute");
const cardInfoRoutes = require("./cardInfoRoute");

router.use("/users", userRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/card-decks", cardDeckRoutes);
router.use("/card-inv", cardInvRoutes);
router.use("/deck", deckRoutes);
router.use("/card-info", cardInfoRoutes);

module.exports = router;
