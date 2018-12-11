const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardInvSchema = new Schema({
  multiverseId: { type: Number },
  ownedCount: { type: Number, required: true },
  wishCount: { type: Number, required: true },
  needCount: { type: Number, required: true }
});

const CardInv = mongoose.model("CardInv", CardInvSchema);

module.exports = CardInv;
