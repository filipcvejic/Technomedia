const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specificationSchema = new Schema({
  type: {
    type: "String",
    required: true,
  },
  value: {
    type: "String",
    required: true,
  },
});

const Specification = mongoose.model("Specification", specificationSchema);

module.exports = Specification;
