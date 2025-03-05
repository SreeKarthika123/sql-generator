const mongoose = require("mongoose");

const SqlConceptPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    experienceLevel: {
      type: String,
      enum: ["easy", "intermediate", "hard"],
      required: true,
    },
    targetCompanies: {
      type: [String],
      required: true,
    },
    weaknesses: {
      type: [String],
      required: true,
    },
    sqlConcepts: {
      type: [String], // List of SQL concepts to cover
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SqlConceptPlan", SqlConceptPlanSchema);
