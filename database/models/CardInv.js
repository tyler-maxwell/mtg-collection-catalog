const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardInvSchema = new Schema({
  multiverseId: { type: Number, required: true },
  ownedCount: { type: Number, required: true },
  wishCount: { type: Number, required: true },
  needCount: { type: Number, required: true, default: 0 }
});

const CardInv = mongoose.model("CardInv", CardInvSchema);

module.exports = CardInv;
