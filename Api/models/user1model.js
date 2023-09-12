const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true,
    min: 13,
    max: 13,
    unique: true,
  },
  phoneno: {
    type: String,
    required: true,
    unique: true,
    max: 11,
  },
  password: {
    type: String,
    required: true,
    max: 11,
  },
  cnic_pic1: {
    type: String,
    required: true,
    default: "",
  },
  cnic_pic2: {
    type: String,
    required: true,
    default: "",
  },
});

module.exports = mongoose.model("user", userSchema);
