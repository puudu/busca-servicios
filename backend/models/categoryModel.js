const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El servicio debe tener un nombre"],
  },
});

categorySchema.index({ name: 1 });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
