// const axios = require("axios");
// const SqlConceptPlan = require("../models/SqlConceptPlan");
// const protect = require("../middleware/authMiddleware");
// require("dotenv").config();

// const apiKey = process.env.OPENAI_API_KEY;

// // Function to generate an SQL Concept Plan
// async function generateSQLConceptPlan(userData) {
//   const prompt = `User Profile:
//   - Experience Level: ${userData.experienceLevel}
//   - Target Companies: ${userData.targetCompanies.join(", ")}
//   - Weaknesses: ${userData.weaknesses.join(", ")}

//   Based on this, generate a structured SQL preparation plan covering key concepts that need to be focused on. Include fundamental, intermediate, and advanced topics based on the user's experience level and weaknesses.`;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4",
//         messages: [
//           { role: "system", content: "You are an AI that generates SQL preparation plans based on user input." },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 500,
//       },
//       {
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
//       }
//     );

//     return response.data.choices[0]?.message?.content.trim() || "No response generated.";
//   } catch (error) {
//     console.error("Error generating SQL Concept Plan:", error.response?.data || error.message);
//     return null;
//   }
// }

// async function generateSqlConceptPlan(req, res) {
//   const userId = req.user.id;

//   try {
//     console.log("User ID:", userId);

//     // Check if an SQL Concept Plan already exists
//     let existingPlan = await SqlConceptPlan.findOne({ userId });

//     if (existingPlan) {
//       console.log("Existing SQL Concept Plan found:", existingPlan);
//       return res.status(200).json({ 
//         message: "SQL Concept Plan retrieved successfully", 
//         sqlConceptPlan: existingPlan.sqlConceptPlan 
//       });
//     }

//     // Get user input
//     const { experienceLevel, targetCompanies, weaknesses } = req.body;
//     console.log("Request Body:", req.body);

//     // Generate a new SQL Concept Plan
//     const sqlConceptPlan = await generateSQLConceptPlan({ experienceLevel, targetCompanies, weaknesses });

//     if (!sqlConceptPlan) {
//       return res.status(500).json({ message: "Error generating SQL Concept Plan" });
//     }

//     // Save the new SQL Concept Plan
//     const savedPlan = await SqlConceptPlan.findOneAndUpdate(
//       { userId },
//       {
//         $set: {
//           experienceLevel,
//           targetCompanies,
//           weaknesses,
//           sqlConceptPlan,
//         },
//       },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     console.log("Saved SQL Concept Plan:", savedPlan);

//     res.status(200).json({ message: "SQL Concept Plan generated successfully", sqlConceptPlan });

//   } catch (error) {
//     console.error("Error generating SQL Concept Plan:", error);
//     res.status(500).json({ message: "Error generating SQL Concept Plan", error: error.message });
//   }
// }

// async function getSqlConceptPlan(req, res) {
//   const userId = req.user.id;

//   try {
//     console.log("Fetching SQL Concept Plan for User ID:", userId);
//     const sqlConceptPlan = await SqlConceptPlan.findOne({ userId }).sort({ createdAt: -1 });

//     if (!sqlConceptPlan) {
//       return res.status(404).json({ message: "No SQL Concept Plan found. Please generate one first." });
//     }

//     res.status(200).json({ 
//       sqlConceptPlan: sqlConceptPlan.sqlConceptPlan,
//       experienceLevel: sqlConceptPlan.experienceLevel,
//       targetCompanies: sqlConceptPlan.targetCompanies,
//       weaknesses: sqlConceptPlan.weaknesses
//     });
//   } catch (error) {
//     console.error("Error retrieving SQL Concept Plan:", error);
//     res.status(500).json({ message: "Error retrieving SQL Concept Plan", error: error.message });
//   }
// }

// module.exports = { generateSqlConceptPlan, getSqlConceptPlan };


const axios = require("axios");
const SqlConceptPlan = require("../models/SqlConceptPlan");
const protect = require("../middleware/authMiddleware");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

// Function to generate an SQL Concept Plan
async function generateSQLConceptPlan(userData) {
  if (!userData.experienceLevel || !userData.targetCompanies || !userData.weaknesses) {
    throw new Error("Missing required user data for SQL Concept Plan generation.");
  }

  const prompt = `User Profile:
  - Experience Level: ${userData.experienceLevel}
  - Target Companies: ${userData.targetCompanies.join(", ")}
  - Weaknesses: ${userData.weaknesses.join(", ")}

  Based on this, generate a structured SQL preparation plan covering key concepts that need to be focused on. Include fundamental, intermediate, and advanced topics based on the user's experience level and weaknesses.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an AI that generates SQL preparation plans based on user input." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      },
      {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      }
    );

    return response.data.choices?.[0]?.message?.content.trim() || "No response generated.";
  } catch (error) {
    console.error("Error generating SQL Concept Plan:", error.response?.data || error.message);
    return null;
  }
}

async function generateSqlConceptPlan(req, res) {
  const userId = req.user.id;
  try {
    console.log("User ID:", userId);
    console.log("Request Body:", req.body);

    const { experienceLevel, companies =[], weaknesses =[]} = req.body;
    const targetCompanies = companies; 

    if (!experienceLevel || !Array.isArray(targetCompanies) || !Array.isArray(weaknesses)) {
        console.error("Invalid input:", { experienceLevel, targetCompanies, weaknesses });
      return res.status(400).json({ message: "Invalid input data. Ensure experienceLevel, targetCompanies, and weaknesses are provided as expected." });
    }

    // Check if an SQL Concept Plan already exists
    let existingPlan = await SqlConceptPlan.findOne({ userId });
    let sqlConcepts;
    if (existingPlan) {
      console.log("Existing SQL Concept Plan found:", existingPlan);
      sqlConcepts = await generateSQLConceptPlan({ experienceLevel, targetCompanies, weaknesses });

      existingPlan.experienceLevel = experienceLevel;
  existingPlan.targetCompanies = targetCompanies;
  existingPlan.weaknesses = weaknesses;
  existingPlan.sqlConcepts = sqlConcepts;
  await existingPlan.save();
      return res.status(200).json({
        message: "SQL Concept Plan retrieved successfully",
        sqlConceptPlan: existingPlan.sqlConcepts,
      });
    }
    try {
        const sqlConceptPlan = await generateSQLConceptPlan({ experienceLevel, targetCompanies, weaknesses });
        console.log("Generated SQL Concept Plan:", sqlConceptPlan);
      } catch (error) {
        console.error("Error inside generateSQLConceptPlan():", error);
      }
      
    if (!sqlConceptPlan) {
      return res.status(500).json({ message: "Error generating SQL Concept Plan" });
    }

    // Save the new SQL Concept Plan
    const savedPlan = await SqlConceptPlan.findOneAndUpdate(
      { userId },
      {
        $set: { experienceLevel, targetCompanies, weaknesses, sqlConceptPlan },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("Saved SQL Concept Plan:", savedPlan);
    res.status(200).json({ message: "SQL Concept Plan generated successfully", sqlConceptPlan:existingPlan.sqlConceptPlan });
  } catch (error) {
    console.error("Error generating SQL Concept Plan:", error);
    res.status(500).json({ message: "Error generating SQL Concept Plan", error: error.message });
  }
}

async function getSqlConceptPlan(req, res) {
  const userId = req.user.id;
  try {
    console.log("Fetching SQL Concept Plan for User ID:", userId);
    const sqlConceptPlan = await SqlConceptPlan.findOne({ userId }).sort({ createdAt: -1 });

    if (!sqlConceptPlan) {
      return res.status(404).json({ message: "No SQL Concept Plan found. Please generate one first." });
    }

    res.status(200).json({
      sqlConceptPlan: sqlConceptPlan.sqlConcepts,
      experienceLevel: sqlConceptPlan.experienceLevel,
      targetCompanies: sqlConceptPlan.targetCompanies,
      weaknesses: sqlConceptPlan.weaknesses,
    });
  } catch (error) {
    console.error("Error retrieving SQL Concept Plan:", error);
    res.status(500).json({ message: "Error retrieving SQL Concept Plan", error: error.message });
  }
}

module.exports = { generateSqlConceptPlan, getSqlConceptPlan };
