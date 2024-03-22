const express = require("express");
const multer = require("multer");
const serviceController = require("../controllers/serviceController");
const authController = require("../controllers/authController");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

// upload images
const upload = multer({ dest: "public/img/services" });

exports.uploadImages = upload.fields([{ name: "images", maxCount: 4 }]);

exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) return next();
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/services/${filename}`);
      req.body.images.push(filename);
    })
  );

  next();
});

router
  .route("/")
  .get(serviceController.getAllServices)
  .post(
    authController.protect,
    serviceController.setUserId,
    serviceController.createService
  );

router
  .route("/:id")
  .get(serviceController.getService)
  .patch(serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = router;
