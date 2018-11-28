const mongoose = require('mongoose');
const Schema = mongose.Schema;

const CardDeckSchema = new Schema({
    multiverseld: { type: Number },
    count: { type: Number, required: true },
    string: { type: String}
});

const CardDeck = mongoose.Model("CardDeck", CardDeckSchema);

module.exports = CardDeck;