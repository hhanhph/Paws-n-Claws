"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", messageSchema);