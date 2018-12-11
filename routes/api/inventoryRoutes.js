const router = require("express").Router();
const inventoryController = require("../../controllers/inventoryController");

router
  .route("/:id")
  .get(inventoryController.findAll)
  .put(inventoryController.submitBatch);

module.exports = router;
