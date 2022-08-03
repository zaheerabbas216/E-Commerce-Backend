const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  role: {
    type: String,
  },
  userId: {
    type: String,
  },
  email: {
    type: String,
  },
  category: {
    type: String,
  },
  desc: {
    type: String,
  },
  // pending, rejected, accepted
  reqestStatus: {
    type: String,
    default: "pending",
  },
  // true, false
  requestAction: {
    type: Boolean,
    default: false,
  },
});

//export
const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
