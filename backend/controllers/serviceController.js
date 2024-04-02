const Service = require("../models/serviceModel");
const factory = require("../controllers/handlerFactory");

exports.setUserId = (req, res, next) => {
  // if (!req.body.user) req.body.user = req.user.id;
  req.body.user = process.env.DEFAULT_USER_ID;
  next();
};

exports.getAllServices = factory.getAllPaginate(Service);
exports.getService = factory.getOne(Service);
exports.createService = factory.createOne(Service);
exports.updateService = factory.updateOne(Service);
exports.deleteService = factory.deleteOne(Service);
