
const axios = require("axios");
const SqlPlan = require("../models/SQLPlan");
const protect = require("../middleware/authMiddleware"); // Protect routes
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

// Function to generate an SQL plan
async function generateSQLPlan(userData) {
  const prompt = `User Profile:
  - Years of Experience: ${userData.yearsOfExperience}
  - CTC Range: ${userData.ctcRange}
  - Target Companies: ${userData.targetCompanies.join(", ")}
  - Time Commitment: ${userData.timeCommitment}

  Based on this, generate a custom SQL practice plan with 15 SQL practice questions.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an AI that generates SQL practice plans." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      },
      {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      }
    );

    return response.data.choices[0]?.message?.content.trim() || "No response generated.";
  } catch (error) {
    console.error("Error generating SQL plan:", error.response?.data || error.message);
    return null;
  }
}

// async function generateSqlPlan(req, res) {
//   const userId = req.user.id;

//   try {
//     console.log("User ID:", userId);

//     // Check if an SQL Plan already exists
//     let existingPlan = await SqlPlan.findOne({ userId });

//     if (existingPlan) {
//       console.log("Existing SQL Plan found:", existingPlan);
//       return res.status(200).json({ 
//         message: "SQL Plan retrieved successfully", 
//         sqlPlan: existingPlan.sqlPlan 
//       });
//     }

//     // If no plan exists, only then require user input
//     const { yearsOfExperience, ctcRange, targetCompanies, timeCommitment } = req.body;
    
//     // Generate a new SQL Plan
//     const sqlPlan = await generateSQLPlan({ yearsOfExperience, ctcRange, targetCompanies, timeCommitment });

//     if (!sqlPlan) {
//       return res.status(500).json({ message: "Error generating SQL plan" });
//     }

//     // Save the new SQL Plan
//     const savedPlan = await SqlPlan.findOneAndUpdate(
//       { userId },
//       {
//         $set: {
//           yearsOfExperience,
//           ctcRange,
//           targetCompanies,
//           timeCommitment,
//           sqlPlan,
//         },
//       },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     console.log("Saved SQL Plan:", savedPlan);

//     res.status(200).json({ message: "SQL Plan generated successfully", sqlPlan });

//   } catch (error) {
//     console.error("Error generating SQL plan:", error);
//     res.status(500).json({ message: "Error generating SQL plan", error: error.message });
//   }
// }

async function generateSqlPlan(req, res) {
  const userId = req.user.id;
  const { yearsOfExperience, ctcRange, targetCompanies, timeCommitment } = req.body;

  try {
    console.log("User ID:", userId);

    // Check if an SQL Plan with the same details already exists
    let existingPlan = await SqlPlan.findOne({
      userId
      // yearsOfExperience,
      // ctcRange,
      // targetCompanies,
      // timeCommitment,
    });

    if (existingPlan) {
      console.log("Matching SQL Plan found:", existingPlan);
      return res.status(200).json({
        message: "SQL Plan retrieved successfully",
        sqlPlan: existingPlan.sqlPlan,
        // completedQuestions: existingPlan.completedQuestions,
      });
    }
    // const questionsArray = sqlPlan.split("\n").filter((q) => q.trim() !== "");

    // Generate a new SQL Plan
    const sqlPlan = await generateSQLPlan({ yearsOfExperience, ctcRange, targetCompanies, timeCommitment });

    if (!sqlPlan) {
      return res.status(500).json({ message: "Error generating SQL plan" });
    }

    // Save the new SQL Plan
    const savedPlan = await SqlPlan.findOneAndUpdate(
      { userId },
      {
        $set: {
          yearsOfExperience,
          ctcRange,
          targetCompanies,
          timeCommitment,
          sqlPlan,
          // completedQuestions: {},
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("Saved SQL Plan:", savedPlan);

    // res.status(200).json({ message: "SQL Plan generated successfully", sqlPlan });
    res.status(200).json({ message: "Saved SQL Plan", sqlPlan});
  }catch(error){
    console.error("Error generating SQL plan:", error);
    res.status(500).json({ message: "Error generating SQL plan", error: error.message });
  }
}
// }
// async function updateProgress(req, res) {
//   const userId = req.user.id;
//   const { question, completed } = req.body;

//   try {
//     let sqlPlan = await SqlPlan.findOne({ userId });

//     if (!sqlPlan) {
//       return res.status(404).json({ message: "SQL Plan not found" });
//     }

//     // Update the completion status of the question
//     sqlPlan.completedQuestions.set(question, completed);
//     await sqlPlan.save();

//     res.status(200).json({ message: "Progress updated successfully", completedQuestions: sqlPlan.completedQuestions });

//   } catch (error) {
//     console.error("Error updating progress:", error);
//     res.status(500).json({ message: "Error updating progress", error: error.message });
//   }


// Generate and Store SQL Plan
// async function generateSqlPlan(req, res) {
//   const { yearsOfExperience, ctcRange, targetCompanies, timeCommitment } = req.body;
//   const userId = req.user.id;

//   try {
//     console.log("User ID:", userId);
//     let existingPlan = await SqlPlan.findOne({ userId });

//     if (existingPlan) {
//       console.log("Existing SQL Plan found:", existingPlan);
//       return res.status(200).json({ message: "SQL Plan retrieved successfully", sqlPlan: existingPlan.sqlPlan });
//     }
//     // Generate SQL Plan
//     const sqlPlan = await generateSQLPlan({ yearsOfExperience, ctcRange, targetCompanies, timeCommitment });

//     if (!sqlPlan) {
//       return res.status(500).json({ message: "Error generating SQL plan" });
//     }
//     const savedPlan = await SqlPlan.findOneAndUpdate(
//       { userId }, // Find existing SQL plan for user
//       {
//         $set: {
//           yearsOfExperience,
//           ctcRange,
//           targetCompanies,
//           timeCommitment,
//           sqlPlan,
//         },
//       },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );
    // const savedPlan = await SqlPlan.findOneAndUpdate(
    //   { userId }, // Find existing SQL plan for user
    //   { yearsOfExperience, ctcRange, targetCompanies, timeCommitment, sqlPlan },
    //   { upsert: true, new: true, setDefaultsOnInsert: true }
    // );
//     console.log("Saved SQL Plan:", savedPlan);
//     // // Save in MongoDB
//     // const savedPlan = new SqlPlan({ userId,  yearsOfExperience, ctcRange, targetCompanies, timeCommitment,sqlPlan });
//     // await savedPlan.save();

//     res.status(200).json({ message: "SQL Plan generated successfully", sqlPlan });
//   } catch (error) {
//     console.error("Error generating SQL plan:", error);
//     res.status(500).json({ message: "Error generating SQL plan", error: error.message });
//   }
// }

// Retrieve SQL Plan
// async function getSqlPlan(req, res) {
//   const userId = req.user.id;

//   try {
//     console.log("Fetching SQL Plan for User ID:", userId);
//     const sqlPlan = await SqlPlan.findOne({ userId }).sort({ createdAt: -1 });

//     if (!sqlPlan) {
//       return res.status(404).json({ message: "No SQL plan found. Please generate one first." });
//     }

//     res.status(200).json({ sqlPlan: sqlPlan.sqlPlan });
//   } catch (error) {
//     console.error("Error retrieving SQL plan:", error);
//     res.status(500).json({ message: "Error retrieving SQL plan", error: error.message });
//   }
// }
async function getSqlPlan(req, res) {
  const userId = req.user.id;

  try {
    console.log("Fetching SQL Plan for User ID:", userId);
    const sqlPlan = await SqlPlan.findOne({ userId }).sort({ createdAt: -1 });

    if (!sqlPlan) {
      return res.status(404).json({ message: "No SQL plan found. Please generate one first." });
    }

    res.status(200).json({ 
      sqlPlan: sqlPlan.sqlPlan,
      yearsOfExperience: sqlPlan.yearsOfExperience,
      ctcRange: sqlPlan.ctcRange,
      targetCompanies: sqlPlan.targetCompanies,
      timeCommitment: sqlPlan.timeCommitment
    });
  } catch (error) {
    console.error("Error retrieving SQL plan:", error);
    res.status(500).json({ message: "Error retrieving SQL plan", error: error.message });
  }
}

module.exports = { generateSqlPlan, getSqlPlan };
