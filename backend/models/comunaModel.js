const mongoose = require("mongoose");

const comunaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "La comuna debe tener un nombre"],
  },
  region: {
    type: mongoose.Schema.ObjectId,
    ref: Region,
    required: true,
  },
});

comunaSchema.index({ name: 1 });

const Comuna = mongoose.model("Comuna", comunaSchema);

module.exports = Comuna;
