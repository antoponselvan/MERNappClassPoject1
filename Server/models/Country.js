const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
  name: { type: String, required: true },
  flag: String,
});

module.exports = mongoose.model("Country", countrySchema);
