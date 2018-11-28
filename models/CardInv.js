const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardInvSchema = new Schema({
    multiverseld: { type: Number },
    ownedCount: { type: Number, required: true },
    wishCount: { type: Number, required: true },
    neededCount: { type: Number, required: true },
})

const CardInv = mongoose.Model("CardInv", CardInvSchema);

module.exports = CardInv;