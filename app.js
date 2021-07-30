const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const port = 2021;
const base_url = "http://localhost:"+port+"/";

app.set('base_url', base_url);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cors());

mongoose.connect("mongodb://localhost:27017/project1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.once("open", () => console.log("Connected to mongoDB!"));

const route = require("./routes");
console.log("Routes initializing");
app.use("/", route);
app.listen(port, () => {
  console.log(`Example app listening at `+base_url)
})

module.exports = app;
