// Returns info from ../json

const router = require("express").Router();
const cardInfoController = require("../../controllers/cardInfoController");

router.route("/name/:name").get(cardInfoController.findByName);


module.exports = router;
