const Comuna = require("../models/comunaModel");
const factory = require("../controllers/handlerFactory");

exports.getAllComunas = factory.getAll(Comuna);
exports.getComuna = factory.getOne(Comuna);
