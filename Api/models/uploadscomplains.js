const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,

  },
});

module.exports = mongoose.model("complainspath", userSchema);
