const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No document found with ID(${req.params.id})`, 404)
      );
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the new documento to the client
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(`No document found with ID(${req.params.id})`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // Filtrar campos vacíos
    const filteredBody = {};

    // Filtrar campos vacíos en la ubicación
    if (req.body.location) {
      filteredBody.location = {};
      Object.keys(req.body.location).forEach((key) => {
        if (req.body.location[key] !== "") {
          filteredBody.location[key] = req.body.location[key];
        }
      });
    }

    // Filtrar campos vacíos en el contacto
    if (req.body.contact) {
      filteredBody.contact = {};
      Object.keys(req.body.contact).forEach((key) => {
        if (req.body.contact[key] !== "") {
          filteredBody.contact[key] = req.body.contact[key];
        }
      });
    }

    // Otros campos que no son objetos
    Object.keys(req.body).forEach((key) => {
      if (key !== "location" && key !== "contact" && req.body[key] !== "") {
        filteredBody[key] = req.body[key];
      }
    });

    console.log(filteredBody);

    const newDoc = await Model.create(filteredBody);

    res.status(201).json({
      status: "success",
      data: newDoc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (request, response, next) => {
    let query = Model.findById(request.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No document found with ID(${request.params.id})`, 404)
      );
    }

    response.status(200).json({ status: "success", data: { data: doc } });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields();
    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });

exports.getAllPaginate = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    console.log(features.query);

    // Total de paginas
    const queryObj = { ...features.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const totalResults = await Model.countDocuments(queryObj);
    const resultsPerPage = 10;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    res.status(200).json({
      status: "success",
      results: doc.length,
      totalPages: totalPages,
      data: doc,
    });
  });
