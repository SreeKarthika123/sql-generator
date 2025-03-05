// const mongoose = require("mongoose");

// const sqlPlanSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   experienceLevel: String,
//   targetCompanies: String,
//   sqlWeaknesses: String,
//   plan: String,
// });

// module.exports = mongoose.model("SQLPlan", sqlPlanSchema);
const mongoose = require("mongoose");

const sqlPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    ctcRange: {
        type: String,
        required: true,
    },
    targetCompanies: {
        type: [String], // Array of company names
        required: true,
    },
    timeCommitment: {
        type: String,
        required: true,
    },
    sqlPlan: {
        type: String,  // The generated SQL plan text
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent model from being recompiled
const SqlPlan = mongoose.models.SqlPlan || mongoose.model("SqlPlan", sqlPlanSchema);

module.exports = SqlPlan;


