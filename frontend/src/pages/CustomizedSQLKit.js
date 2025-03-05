import { useState } from "react";
import axios from "axios";

const SQLPlan = () => {
  const [experienceLevel, setExperienceLevel] = useState("");
  const [targetCompanies, setTargetCompanies] = useState("");
  const [sqlWeaknesses, setSqlWeaknesses] = useState("");
   const [generatedPlan, setGeneratedPlan] = useState("");

  // const handleGenerate = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/sql/generate-sql-plan", {
  //       experienceLevel,
  //       targetCompanies,
  //       sqlWeaknesses,
  //     });

  //     setGeneratedPlan(response.data.plan);
  //   } catch (error) {
  //     console.error("Error generating SQL plan:", error);
  //   }
  // };
  const handleGenerate = async () => {
    try {
      // Ensure sqlWeaknesses is converted to an array
      const weaknessesArray = sqlWeaknesses
        ? sqlWeaknesses.split(",").map(w => w.trim())
        : [];
  
      const response = await axios.post("http://localhost:5000/api/sql/generate-sql-plan", {
        experienceLevel,
        targetCompanies,
        sqlWeaknesses: weaknessesArray, // ✅ Sending an array instead of a string
      });
  
      setGeneratedPlan(response.data.plan);
    } catch (error) {
      console.error("Error generating SQL plan:", error.response?.data || error.message);
      setGeneratedPlan("Failed to generate plan. Please try again later.");
    }
  };
  
  return (
    <div>
      <h2>Generate SQL Interview Plan</h2>
      <label>Experience Level:</label>
      <input type="text" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} />

      <label>Target Companies:</label>
      <input type="text" value={targetCompanies} onChange={(e) => setTargetCompanies(e.target.value)} />

      <label>SQL Weaknesses:</label>
      <input type="text" value={sqlWeaknesses} onChange={(e) => setSqlWeaknesses(e.target.value)} />

      <button onClick={handleGenerate}>Generate Plan</button>

      {generatedPlan && <div><h3>Your SQL Plan:</h3><p>{generatedPlan}</p></div>}
    </div>
  );
};

export default SQLPlan;

