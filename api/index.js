var createError = require("http-errors");
var cors = require("cors");
var http = require("http");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var port = process.env.port || 4000;

var indexRouter = require("./routes/index");

var app = express();
require("./Config/database").databaseconnection();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://mern-todo-black.vercel.app"],
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

var server = http.createServer(app);
server.listen(port, () => {
  console.log(`server listning on ${port}`);
});
