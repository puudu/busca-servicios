const fs = require("fs");
const mongoose = require("mongoose");
const Comuna = require("../models/comunaModel"); // Importa tu modelo de Comuna
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
// Conexión a la base de datos MongoDB
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection succesful"));

// Lee el archivo JSON
const comunas = JSON.parse(fs.readFileSync("comunas.json", "utf8"));
console.log(comunas);

const importData = async () => {
  try {
    await Comuna.create(comunas, { validateBeforeSave: true });
    console.log("Comunas insertadas");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importData();
