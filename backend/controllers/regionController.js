const Region = require("../models/comunaModel");
const factory = require("../controllers/handlerFactory");

exports.getAllRegions = factory.getAll(Region);
exports.getRegion = factory.getOne(Region);
