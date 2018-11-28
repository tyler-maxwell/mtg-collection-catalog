const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardDeckSchema = new Schema({
  multiverseld: { type: Number },
  count: { type: Number, required: true },
  string: { type: String }
});

const CardDeck = mongoose.model("CardDeck", CardDeckSchema);

module.exports = CardDeck;
