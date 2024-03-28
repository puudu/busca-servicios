const Region = require("../models/regionModel");
const factory = require("../controllers/handlerFactory");
const Comuna = require("../models/comunaModel");

exports.getAllRegions = factory.getAll(Region);
exports.getRegion = factory.getOne(Region);
