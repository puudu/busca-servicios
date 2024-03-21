const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El servicio debe tener un título"],
  },
  description: {
    type: String,
    required: [true, "El servicio debe tener una descripción"],
  },
  location: {
    type: String,
    required: false,
  },
  schedule: {
    type: String,
    required: false,
  },
  gallery: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "La valoración debe ser mayor a 1"],
    max: [5, "La valoración debe ser menor o igual a 5"],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

serviceSchema.index({ ratingsAverage: -1 });

serviceSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "service",
  localField: "_id",
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
