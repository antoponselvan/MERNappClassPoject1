const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema({
  name: { type: String, required: true },
  celebrated: { type: Boolean, default: false },
  description: { type: String, default: "Best holiday ever!" },
  likes: { type: Number, default: 0 },
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
});

module.exports = mongoose.model("Holiday", holidaySchema);
