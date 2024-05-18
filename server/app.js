const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const orders = require("./routes/orderRoutes");
const fileUpload = require("express-fileupload");
const display = require("./routes/displayRoutes");
const category = require("./routes/categoryRoutes");
app.use(errorMiddleware);
app.use(fileUpload());
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", orders);
app.use("/api/v1", display);
app.use("/api/v1", category);

module.exports = app;
