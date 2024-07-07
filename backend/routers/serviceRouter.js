const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Service = require("../models/serviceModel");
const serviceController = require("../controllers/serviceController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/services");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Obtener todos
router
  .route("/")
  .get(async (req, res) => {
    try {
      // Filtro
      let filter = {};
      if (req.query.category) {
        filter["category"] = req.query.category;
      }
      if (req.query.location_region) {
        filter["location.region"] = req.query.location_region;
      }
      if (req.query.location_comuna) {
        filter["location.comuna"] = req.query.location_comuna;
      }
      if (req.query.user) {
        filter["user"] = req.query.user;
      }

      console.log(filter);

      // Consulta
      let query = Service.find(filter)
        .populate("category", "name")
        .populate("location.comuna", "name")
        .populate("location.region", "name")
        .populate("user", "fullname username photo");

      // Orden
      if (req.query.sort) {
        const sortBy = req.query.sortBy;
        query = query.sort(sortBy);
      }

      // Paginacion
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      const services = await query;
      const results = await Service.countDocuments(filter);
      const totalPages = Math.ceil(results / limit);

      res.json({
        status: "success",
        totalPages: totalPages,
        currentPage: page,
        results: results,
        data: services,
      });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  })

  .post(serviceController.setUserId, async (req, res) => {
    const service = new Service({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      schedule: req.body.schedule,
      images: req.body.images,
      ratingsAverage: req.body.ratingsAverage,
      ratingsQuantity: req.body.ratingsQuantity,
      category: req.body.category,
      onsiteService: req.body.onsiteService,
      remoteService: req.body.remoteService,
      homeService: req.body.homeService,
      contact: req.body.contact,
      user: req.body.user,
    });

    try {
      const newService = await service.save();
      res.status(201).json({ status: "success", data: newService });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  });

// subir un array de imagenes
router.post("/upload-images", upload.array("images", 6), (req, res) => {
  const files = req.files.map((file) => file.path);
  res.send(files);
});

// eliminar imagen
router.delete("/:id/images/:filename", async (req, res) => {
  const { id, filename } = req.params;
  try {
    const service = await Service.findById(id);

    if (!service)
      return res
        .status(404)
        .json({ status: "error", message: "Servicio no encontrado" });

    const imageIndex = service.images.indexOf(filename);

    if (imageIndex === -1)
      return res
        .status(404)
        .json({ status: "error", message: "Imagen no encontrada" });

    service.images.splice(imageIndex, 1);
    await service.save();

    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "img",
      "services",
      filename
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo: ", err);
        return res
          .status(500)
          .json({ message: "Error al eliminar el archivo." });
      }
    });

    res.json({ status: "success", data: service });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const service = await Service.findById(req.params.id)
        .populate("category", "name")
        .populate("location.comuna", "name")
        .populate("location.region", "name")
        .populate("user", "fullname username photo");

      if (!service) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }
      res.json({ status: "success", data: service });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json({ status: "success", data: service });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Service.findByIdAndDelete(req.params.id);
      res.status(204).json({ status: "success" });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  });

module.exports = router;
