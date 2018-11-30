const router = require('express').Router();
const userRoutes = require('./users');
const cardDeckRoutes = require('./cardDeckRoute');
const cardInvRoutes = require('./cardInvRoute');
const deckRoutes = require('./deckRoute');

router.use('/users', userRoutes);
router.use('/card-decks', cardDeckRoutes);
router.use('/card-inv', cardInvRoutes);
router.use('/deck', deckRoutes);

module.exports = router;
