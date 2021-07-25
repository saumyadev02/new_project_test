const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  custom: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  createOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("customer", customerSchema);
