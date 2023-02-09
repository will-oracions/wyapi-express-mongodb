const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  // title: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // link: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
