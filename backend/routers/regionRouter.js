const express = require("express");
const authController = require("../controllers/authController");

const Region = require("../models/regionModel");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const docs = await Region.find();
    res.json({ status: "success", data: docs });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.route(":/id").get(async (req, res) => {
  try {
    const doc = await Region.findById(req.params.id);
    if (!doc) {
      return res
        .status(404)
        .json({ status: "error", message: "Region no encontrada" });
    }
    res.json({ status: "success", data: doc });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.use(authController.restrictTo("admin"));

router.post("/", async (req, res) => {
  const doc = new Region({
    name: req.body.name,
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
  .patch(async (req, res) => {
    try {
      const doc = await Region.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json({ status: "success", data: doc });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Region.findByIdAndDelete(req.params.id);
      res.status(204).json({ status: "success" });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  });

module.exports = router;
