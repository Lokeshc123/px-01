const app = require("./app");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/database");
const cloudinary = require("cloudinary");
const exp = require("constants");
//Configure dotenv to use the .env file
dotenv.config({ path: "server/config/.env" });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});
//Connect to the database
connectDb();

const ___dirname = path.resolve();

app.use(express.static(path.join(___dirname, "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(___dirname, "client", "build", "index.html"))
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});