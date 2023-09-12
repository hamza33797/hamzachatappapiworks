const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true,
    min: 13,
    max: 13,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  subtype: {
    type: String,
    required: true,

  },
  place_posting: {
    type: String,
    required: true,

  },
  unit: {
    type: String,
    required: true,

  },
  district: {
    type: String,
    required: true,

  },
  date: {
    type: String,
    required: true,

  },
  time: {
    type: String,
    required: true,

  },
  details: {
    type: String,
    required: true,

  },
});

module.exports = mongoose.model("usercomplains", userSchema);
