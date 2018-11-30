const router = require('express').Router();
const cardInvController = require('../../controllers/cardInvController');

router
  .route('/')
  .get(cardInvController.findAll)
  .post(cardInvController.create);

router
  .route('/:id')
  .get(cardInvController.findById)
  .put(cardInvController.update)
  .delete(cardInvController.remove);

module.exports = router;
