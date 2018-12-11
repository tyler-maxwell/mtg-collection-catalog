const router = require("express").Router();
const inventoryController = require("../../controllers/inventoryController");

router.route("/:id").put(inventoryController.submitBatch);

module.exports = router;
