"use strict";
const express = require("express");
const router = express.Router();
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const net = require("net");
const PORT = 9002;

app.set("port", process.env.PORT || 9003);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "catsw_admin/build")));

var corsOptions = {
  origin: "http://10.225.224.135:9002",
  optionsSuccessStatus: 200,
  methods: "GET, POST",
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

const options = {
  host: "10.225.224.135",
  port: 9002,
};

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(__dirname, "catsw_admin/build", "index.html"));
  }
});

app.use(express.static(path.join(__dirname, "catsw_admin/build")));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = router;
