const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, default: "Engineering" },
    email: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Intern", internSchema);
