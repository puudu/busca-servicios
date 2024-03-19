const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// CONNECT TO DB
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {}).then(() => console.log("DB connection succesful"));

// START SERVER
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  const fullMessage = err.message;
  const errmsgStart = fullMessage.indexOf("errmsg:") + 8; // Find errmsg inside message
  const errmsgStop = fullMessage.indexOf(",", errmsgStart); // Find first comma after that
  const errmsgLen = errmsgStop - errmsgStart;
  const errorText = fullMessage.substr(errmsgStart, errmsgLen);
  console.log(err.name);
  console.log(errorText);
  console.log("UNHANDLED REJECTION! Shutting down!");
  server.close(() => {
    process.exit(1);
  });
});
