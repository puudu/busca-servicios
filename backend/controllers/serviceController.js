const Service = require("../models/serviceModel");
const factory = require("../controllers/handlerFactory");

exports.setUserId = (req, res, next) => {
  console.log(req.body);
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllServices = factory.getAll(Service);
exports.getService = factory.getOne(Service);
exports.createService = factory.createOne(Service);
exports.updateService = factory.updateOne(Service);
exports.deleteService = factory.deleteOne(Service);
