const mongoose = require("mongoose");
const validator = require("validator");

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
    calle: {
      type: String,
      required: false,
    },
    comuna: {
      type: mongoose.Schema.ObjectId,
      ref: "Comuna",
      required: false,
    },
    region: {
      type: mongoose.Schema.ObjectId,
      ref: "Region",
      required: false,
    },
  },
  schedule: {
    type: String,
    required: false,
  },
  images: [String],
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "El servicio debe estar asociado a un usuario"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "La reseña debe estar asociado a una categoria"],
  },
  contact: {
    email: {
      type: String,
      required: false,
      validate: [validator.isEmail, "Por favor, proporciona un email valido"],
    },
    phone: {
      type: String,
      required: false,
      validate: [
        validator.isMobilePhone,
        "Por favor, proporciona un número valido",
      ],
    },
    whatsapp: {
      type: String,
      required: false,
      validate: [
        validator.isMobilePhone,
        "Por favor, proporciona un número valido",
      ],
    },
    urlWeb: {
      type: String,
      required: false,
      validate: [validator.isURL, "Por favor, ingresa un enlace valido"],
    },
    urlPortfolio: {
      type: String,
      required: false,
      validate: [validator.isURL, "Por favor, ingresa un enlace valido"],
    },
    urlIntagram: {
      type: String,
      required: false,
      validate: [validator.isURL, "Por favor, ingresa un enlace valido"],
    },
    urlFacebook: {
      type: String,
      required: false,
      validate: [validator.isURL, "Por favor, ingresa un enlace valido"],
    },
    urlX: {
      type: String,
      required: false,
      validate: [validator.isURL, "Por favor, ingresa un enlace valido"],
    },
    urlTiktok: {
      type: String,
      required: false,
      validate: [validator.isURL, "Por favor, ingresa un enlace valido"],
    },
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
