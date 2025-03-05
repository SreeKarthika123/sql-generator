const SqlPlan = require("../models/SQLPlan");

const generateSqlPlan = async (req, res) => {
    try {
        const { userId, sqlPlan, yearsOfExperience, ctcRange, targetCompanies, timeCommitment } = req.body;

        // Validate request body
        if (!userId || !sqlPlan || !yearsOfExperience || !ctcRange || !targetCompanies || !timeCommitment) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newPlan = new SqlPlan({
            userId,
            sqlPlan,
            yearsOfExperience,
            ctcRange,
            targetCompanies,
            timeCommitment
        });

        await newPlan.save();
        res.status(201).json({ message: "SQL Plan created successfully", newPlan });

    } catch (error) {
        console.error("Error generating SQL plan:", error);
        res.status(500).json({ error: error.message });
    }
};


// module.exports = {generateSqlPlan,  getSqlPlan, updateProgress};
module.exports={generateSqlPlan}