const SqlPlan = require("../models/SqlPlan");
const axios = require("axios");

// Generate SQL Prep Kit
const generateSqlKit = async (req, res) => {
    try {
        const { experience, ctc, companies, timeCommitment } = req.body;

        // Fetch SQL questions based on user inputs (Mock API Call)
        const { data } = await axios.get("https://interviewtayari.com/interviewRepo");

        const filteredQuestions = data.questions
            .filter(q => q.category === "Problem Solving")
            .slice(0, 15); // Select 15 questions

        const sqlPlan = await SqlPlan.create({ user: req.user.id, questions: filteredQuestions });

        res.json(sqlPlan);
    } catch (error) {
        res.status(500).json({ message: "Error generating SQL Kit", error: error.message });
    }
};

module.exports = { generateSqlKit };
