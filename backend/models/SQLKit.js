const mongoose = require("mongoose");

const SQLKitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sqlQuestions: [{ title: String, company: String, difficulty: String }],
});

module.exports = mongoose.model("SQLKit", SQLKitSchema);
