const router = require('express').Router();
const cardDeckController = require('../../controllers/cardDeckController');

router
  .route('/')
  .get(cardDeckController.findAll)
  .post(cardDeckController.create);

router
  .route('/:id')
  .get(cardDeckController.findById)
  .put(cardDeckController.update)
  .delete(cardDeckController.remove);

module.exports = router;
