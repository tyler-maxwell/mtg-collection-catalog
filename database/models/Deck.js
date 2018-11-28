const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    built: { type: Boolean },
    cards: [{ type: Schema.Types.ObjectId, ref: "CardDeck" }],
    // sideboard: 
    // scratchpad:
    note: { type: String }
})

const Deck = mongoose.Schema("Deck", DeckSchema);

module.exports = Deck;