const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("message", messageSchema);
