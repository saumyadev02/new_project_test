const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const port = 2021;
const base_url = "http://localhost:"+port+"/";

const log = require('simple-node-logger').createSimpleLogger('project.log');

app.set('base_url', base_url);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cors());

app.post("/test_check", async (req, res) => {
  obj = {
    status: "success",
    message: "check test",
    };
res.json(obj);
});

app.get("/test_check_get", async (req, res) => {
  obj = {
    status: "success get",
    message: "check test",
    };
    log.info('simple log file=======>>>>>>>', obj);
res.json(obj);
});

// mongoose.connect("mongodb://localhost:27017/project1", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

mongoose.connect('mongodb+srv://saumya:saumya@123@cluster0.hujie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
