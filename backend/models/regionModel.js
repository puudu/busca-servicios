const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "La región debe tener un nombre"],
  },
});

regionSchema.index({ name: 1 });

const Region = mongoose.model("Region", regionSchema);

module.exports = Region;
