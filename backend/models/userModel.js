const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true }, // In production, this should be hashed
  sqlPlan: { type: String },
  yearsOfExperience: { type: Number, required: true },
  ctcRange: { type: String, required: true },
  targetCompanies: [{ type: String }],
  timeCommitment: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
