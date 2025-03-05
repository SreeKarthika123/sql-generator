const express = require("express");
const protect = require("../middleware/authMiddleware");
const Progress = require("../models/Progress");

const router = express.Router();

// Save completed questions
router.post("/save", protect, async (req, res) => {
    try {
        const { questionId } = req.body;
        const userId = req.user;

        let progress = await Progress.findOne({ userId });
        if (!progress) {
            progress = new Progress({ userId, completedQuestions: [questionId] });
        } else {
            if (!progress.completedQuestions.includes(questionId)) {
                progress.completedQuestions.push(questionId);
            }
        }

        await progress.save();
        res.json({ message: "Progress saved" });
    } catch (error) {
        res.status(500).json({ message: "Error saving progress", error: error.message });
    }
});

module.exports = router;
