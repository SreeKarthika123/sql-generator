
// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const SQLPlan = require("../models/SQLPlan");
// const protect = require("../middleware/authMiddleware"); // Optional authentication middleware

// router.post("/generate-sql-plan", async (req, res) => {
//   const { experienceLevel, targetCompanies, sqlWeaknesses } = req.body;

//   // Check if OpenAI API key is set
//   if (!process.env.OPENAI_API_KEY) {
//     return res.status(500).json({ message: "Missing OpenAI API Key in .env" });
//   }

//   // Validate inputs
//   if (!experienceLevel || !targetCompanies || !sqlWeaknesses) {
//     return res.status(400).json({ message: "All fields are required!" });
//   }

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/completions",
//       {
//         model: "gpt-4",
//         prompt: `Generate an SQL interview plan for a ${experienceLevel} candidate targeting ${targetCompanies}. Weak areas: ${sqlWeaknesses}. Provide step-by-step study topics.`,
//         max_tokens: 500,
//       },
//       { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
//     );

//     const planText = response.data.choices[0]?.text?.trim();

//     if (!planText) {
//       return res.status(500).json({ message: "Failed to generate SQL plan from AI" });
//     }

//     // Save the generated plan in MongoDB (optional)
//     const newPlan = await SQLPlan.create({
//       user: req.user?.id || "guest", // If using authentication
//       experienceLevel,
//       targetCompanies,
//       sqlWeaknesses,
//       plan: planText,
//     });

//     res.json({ plan: newPlan.plan });
//   } catch (error) {
//     console.error("Error generating SQL plan:", error.message);
//     res.status(500).json({ message: "AI generation failed", error: error.message });
//   }
// });

// module.exports = router;
// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// router.post("/generate-sql-plan", async (req, res) => {
//   const { experienceLevel, targetCompanies, sqlWeaknesses } = req.body;

//   if (!process.env.OPENAI_API_KEY) {
//     return res.status(500).json({ message: "Missing OpenAI API key" });
//   }

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are an expert SQL interview coach." },
//           { role: "user", content: `Generate an SQL interview plan for a ${experienceLevel} candidate targeting ${targetCompanies}. Weak areas: ${sqlWeaknesses}.` }
//         ],
//         max_tokens: 500,
//       },
//       { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" } }
//     );

//     res.json({ plan: response.data.choices[0].message.content.trim() });
//   } catch (error) {
//     console.error("Error generating SQL plan:", error.response?.data || error.message);
//     res.status(500).json({ message: "AI generation failed", error: error.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

router.post("/generate-sql-plan", async (req, res) => {
  try {
    const { experienceLevel = "beginner", targetCompanies = "top tech companies", sqlWeaknesses = "Joins, Indexing" } = req.body;

    let planText = "";

    if (experienceLevel === "beginner") {
      planText = `🔹 **SQL Plan for Beginners** 🔹
      
      ✅ **Fundamentals**: Learn SQL basics (SELECT, INSERT, UPDATE, DELETE)  
      ✅ **Joins & Relationships**: Master INNER, LEFT, RIGHT, FULL joins  
      ✅ **Practice**: Solve problems on LeetCode & HackerRank  
      ✅ **Optimization**: Understand Indexing & Query Performance  
      ✅ **Interview Prep**: Focus on SQL questions asked at ${targetCompanies}  
      ✅ **Work on Weaknesses**: Revise **${sqlWeaknesses}**  
      ✅ **Hands-on**: Build small projects to reinforce concepts  
      `;
    } else if (experienceLevel === "intermediate") {
      planText = `🔹 **SQL Plan for Intermediate Level** 🔹
      
      ✅ **Advanced Queries**: Use GROUP BY, HAVING, and nested subqueries  
      ✅ **Database Design**: Learn Normalization, Denormalization & ER Diagrams  
      ✅ **Optimization**: Query performance tuning (EXPLAIN, Indexing)  
      ✅ **Real-world Applications**: Analyze case studies and datasets  
      ✅ **Transactions & Procedures**: Master ACID, Stored Procedures & Triggers  
      ✅ **Targeted Prep**: Study SQL interview questions from ${targetCompanies}  
      ✅ **Work on Weaknesses**: Improve in **${sqlWeaknesses}**  
      `;
    } else if (experienceLevel === "advanced") {
      planText = `🔹 **SQL Plan for Advanced Level** 🔹
      
      ✅ **Database Internals**: Learn indexing strategies & performance tuning  
      ✅ **Query Optimization**: Work with Window Functions & CTEs  
      ✅ **Big Data & NoSQL**: Understand SQL vs. NoSQL databases  
      ✅ **Scalability**: Implement replication, sharding & partitioning  
      ✅ **System Design**: Solve large-scale database problems  
      ✅ **Targeted Prep**: Practice SQL rounds for ${targetCompanies}  
      ✅ **Work on Weaknesses**: Strengthen **${sqlWeaknesses}**  
      `;
    } else {
      planText = "⚠️ Please select a valid experience level!";
    }

    res.json({ plan: planText });

  } catch (error) {
    console.error("Error generating SQL plan:", error.message);
    res.status(500).json({ message: "Failed to generate SQL plan." });
  }
});

module.exports = router;
