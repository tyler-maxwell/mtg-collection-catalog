const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardDeckSchema = new Schema({
  multiverseId: { type: Number },
  count: { type: Number, required: true },
  note: { type: String }
});

const CardDeck = mongoose.model("CardDeck", CardDeckSchema);

module.exports = CardDeck;
