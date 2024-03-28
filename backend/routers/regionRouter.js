const express = require("express");
const regionController = require("../controllers/regionController");

const router = express.Router();

router.route("/").get(regionController.getAllRegions);
router.route("/:id").get(regionController.getRegion);

module.exports = router;
