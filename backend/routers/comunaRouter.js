const express = require("express");
const comunaController = require("../controllers/comunaController");

const router = express.Router();

router.route("/").get(comunaController.getAllComunas);
router.route(":/id").get(comunaController.getComuna);

module.exports = router;
