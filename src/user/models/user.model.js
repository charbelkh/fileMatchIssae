const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  name: String,
  password: String,
  address: String,
  verified: {
    type: Boolean,
    default: true
  }
});
module.exports = mongoose.model("User", userModel);