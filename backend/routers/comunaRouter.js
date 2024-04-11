const express = require("express");
const authController = require("../controllers/authController");

const Comuna = require("../models/comunaModel");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    let filter = {};
    if (req.query.region) {
      filter["region"] = req.query.region;
    }
    
    const docs = await Comuna.find(filter);
    res.json({ status: "success", data: docs });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// router.use(restrictTo('admin'));

router.post("/", async (req, res) => {
  const doc = new Comuna({
    name: req.body.name,
    region: req.body.region,
  });

  try {
    const newDoc = await doc.save();
    res.status(201).json({ status: "success", data: newDoc });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

router
  .route(":/id")
  .get(async (req, res) => {
    try {
      const doc = await Comuna.findById(req.params.id);
      if (!doc) {
        return res
          .status(404)
          .json({ status: "error", message: "Categoria no encontrada" });
      }
      res.json({ status: "success", data: doc });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const doc = await Comuna.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json({ status: "success", data: doc });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Comuna.findByIdAndDelete(req.params.id);
      res.status(204).json({ status: "success" });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  });

module.exports = router;
