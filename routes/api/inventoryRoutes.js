const router = require("express").Router();
const inventoryController = require("../../controllers/inventoryController");

router.route("/:id").put(inventoryController.submitBatch);

router.route("/:id/:page").get(inventoryController.findCardsByPage);

module.exports = router;
