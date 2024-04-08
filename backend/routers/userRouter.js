const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const User = require("../models/userModel");

const upload = multer({ dest: "public/img/users" });
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);
router.patch("/updateMyPassword", authController.updatePassword);

// router.use(restrictTo('admin'));

// router.route("/").get(userController.getAllUsers);
// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

router.route("/").get(async (req, res) => {
  try {
    const docs = await User.find();
    res.json({ status: "success", data: docs });
  } catch (err) {
    res.status(500).json({ status: "success", message: err.message });
  }
});

// router.use(restrictTo('admin'));

router
  .route(":/id")
  .get(async (req, res) => {
    try {
      const doc = await User.findById(req.params.id);
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
      const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json({ status: "success", data: doc });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(204).json({ status: "success" });
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  });

module.exports = router;
