const router = require('express').Router();
const deckController = require('../../controllers/deckController');

router
  .route('/')
  .get(deckController.findAll)
  .post(deckController.create);

router
  .route('/:id')
  .get(deckController.findAll)
  .put(deckController.update)
  .delete(deckController.remove);

module.exports = router;
