const express = require("express");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const Review = require("../models/reviewModel");

const router = express.Router();

router.route("/").get(async (res, req) => {
  try {
    const docs = await Review.find();
    res.json({ status: "success", data: docs });
  } catch (err) {
    res.status(500).json({ status: "success", message: err.message });
  }
});

// router.use(restrictTo('admin'));

router.post("/", reviewController.setServiceUserIds, async (req, res) => {
  const doc = new Review({
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
  .get(async (req, res) => {
    try {
      const doc = await Review.findById(req.params.id);
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
      const doc = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json({ status: "success", data: doc });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await Review.findByIdAndDelete(req.params.id);
      res.status(204).json({ status: "success" });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  });

module.exports = router;
