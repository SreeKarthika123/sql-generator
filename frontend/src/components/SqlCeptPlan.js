// import React, { useState } from "react";
// import axios from "axios";

// const SqlConceptPlan = () => {
//   const [experienceLevel, setExperienceLevel] = useState("easy");
//   const [companies, setCompanies] = useState("");
//   const [weaknesses, setWeaknesses] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [conceptPlan, setConceptPlan] = useState(null);
//   const [error, setError] = useState("");

//   const handleGeneratePlan = async () => {
//     setLoading(true);
//     setError("");
//     setConceptPlan(null);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/sql-concept-plan/generate",
//         {
//           experienceLevel,
//           companies: companies.split(",").map((c) => c.trim()), // Convert to array
//           weaknesses: weaknesses.split(",").map((w) => w.trim()), // Convert to array
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setConceptPlan(response.data.sqlConceptPlan);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to generate plan.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Generate SQL Concept Plan</h2>

//       <label>Experience Level:</label>
//       <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
//         <option value="easy">Easy</option>
//         <option value="intermediate">Intermediate</option>
//         <option value="hard">Hard</option>
//       </select>

//       <label>Target Companies (comma-separated):</label>
//       <input type="text" value={companies} onChange={(e) => setCompanies(e.target.value)} />

//       <label>Weaknesses (comma-separated):</label>
//       <input type="text" value={weaknesses} onChange={(e) => setWeaknesses(e.target.value)} />

//       <button onClick={handleGeneratePlan} disabled={loading}>
//         {loading ? "Generating..." : "Generate Plan"}
//       </button>

//       {error && <p className="error">{error}</p>}

//       {conceptPlan && (
//         <div className="concept-plan">
//           <h3>Generated SQL Concept Plan:</h3>
//           <pre>{conceptPlan}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SqlConceptPlan;




// import React, { useState } from "react";
// import axios from "axios";

// const SqlConceptPlan = () => {
//   const [experienceLevel, setExperienceLevel] = useState("easy");
//   const [companies, setCompanies] = useState("");
//   const [weaknesses, setWeaknesses] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [conceptPlan, setConceptPlan] = useState(null);
//   const [error, setError] = useState("");

//   const handleGeneratePlan = async () => {
//     setLoading(true);
//     setError("");
//     setConceptPlan(null);

//     // Get the token from localStorage (or modify if using sessionStorage/cookies)
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("No authentication token found. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/sql-concept-plan/generate",
//         {
//           experienceLevel,
//           companies: companies ? companies.split(",").map((c) => c.trim()): [], // Convert to array
//           weaknesses: weaknesses ?weaknesses.split(",").map((w) => w.trim()): [], // Convert to array
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Include the token in the headers
//           },
//         }
//       );
//       console.log("Response:", response.data); 
//       setConceptPlan(response.data.sqlConceptPlan);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to generate plan.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Generate SQL Concept Plan</h2>

//       <label>Experience Level:</label>
//       <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
//         <option value="easy">Easy</option>
//         <option value="intermediate">Intermediate</option>
//         <option value="hard">Hard</option>
//       </select>

//       <label>Target Companies (comma-separated):</label>
//       <input type="text" value={companies} onChange={(e) => setCompanies(e.target.value)} />

//       <label>Weaknesses (comma-separated):</label>
//       <input type="text" value={weaknesses} onChange={(e) => setWeaknesses(e.target.value)} />

//       <button onClick={handleGeneratePlan} disabled={loading}>
//         {loading ? "Generating..." : "Generate Plan"}
//       </button>

//       {error && <p className="error">{error}</p>}

//       {conceptPlan && (
//         <div className="concept-plan">
//           <h3>Generated SQL Concept Plan:</h3>
//           <pre>{conceptPlan}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SqlConceptPlan;


import React, { useState } from "react";
import axios from "axios";

const SqlConceptPlan = () => {
  const [experienceLevel, setExperienceLevel] = useState("easy");
  const [companies, setCompanies] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [loading, setLoading] = useState(false);
  const [conceptPlan, setConceptPlan] = useState(null);
  const [error, setError] = useState("");

  const handleGeneratePlan = async () => {
    setLoading(true);
    setError("");
    setConceptPlan(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sql-concept-plan/generate",
        {
          experienceLevel,
          companies: companies ? companies.split(",").map((c) => c.trim()) : [],
          weaknesses: weaknesses ? weaknesses.split(",").map((w) => w.trim()) : [],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setConceptPlan(response.data.sqlConceptPlan);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Generate SQL Concept Plan</h2>

      <label>Experience Level:</label>
      <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="intermediate">Intermediate</option>
        <option value="hard">Hard</option>
      </select>

      <label>Target Companies (comma-separated):</label>
      <input type="text" value={companies} onChange={(e) => setCompanies(e.target.value)} />

      <label>Weaknesses (comma-separated):</label>
      <input type="text" value={weaknesses} onChange={(e) => setWeaknesses(e.target.value)} />

      <button onClick={handleGeneratePlan} disabled={loading}>
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {error && <p className="error">{error}</p>}

      {conceptPlan && (
        <div className="concept-plan-container">
          <h3>Generated SQL Concept Plan:</h3>
          <div className="concept-plan">
            <pre>{conceptPlan}</pre>
          </div>
        </div>
      )}

      <style jsx>{`
        .concept-plan-container {
          max-width: 100%;
          margin-top: 20px;
        }

        .concept-plan {
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #ccc;
          padding: 10px;
          background-color: #f9f9f9;
          border-radius: 5px;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
};

export default SqlConceptPlan;




// import React, { useState } from "react";
// import "./SqlCeptPlan.css";

// import axios from "axios";

// const SqlConceptPlan = () => {
//   const [experienceLevel, setExperienceLevel] = useState("easy");
//   const [companies, setCompanies] = useState("");
//   const [weaknesses, setWeaknesses] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [conceptPlan, setConceptPlan] = useState([]);
//   const [error, setError] = useState("");
//   const [completedQuestions, setCompletedQuestions] = useState({});

//   const handleGeneratePlan = async () => {
//     setLoading(true);
//     setError("");
//     setConceptPlan([]);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("No authentication token found. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/sql-concept-plan/generate",
//         {
//           experienceLevel,
//           companies: companies ? companies.split(",").map((c) => c.trim()) : [],
//           weaknesses: weaknesses ? weaknesses.split(",").map((w) => w.trim()) : [],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const questions = response.data.sqlConceptPlan || [];
//       setConceptPlan(questions);
//       setCompletedQuestions(questions.reduce((acc, q) => ({ ...acc, [q]: false }), {}));
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to generate plan.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleCompletion = (question) => {
//     setCompletedQuestions((prev) => {
//       const updatedQuestions = { ...prev, [question]: !prev[question] };
//       return updatedQuestions;
//     });
//   };

//   // Calculate progress dynamically
//   const completedCount = Object.values(completedQuestions).filter(Boolean).length;
//   const totalQuestions = conceptPlan.length;
//   const progress = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

//   return (
//     <div className="container p-6">
//       <h2 className="text-xl font-bold mb-4">Generate SQL Concept Plan</h2>

//       <label className="block font-medium">Experience Level:</label>
//       <select
//         value={experienceLevel}
//         onChange={(e) => setExperienceLevel(e.target.value)}
//         className="border p-2 mb-4"
//       >
//         <option value="easy">Easy</option>
//         <option value="intermediate">Intermediate</option>
//         <option value="hard">Hard</option>
//       </select>

//       <label className="block font-medium">Target Companies (comma-separated):</label>
//       <input
//         type="text"
//         value={companies}
//         onChange={(e) => setCompanies(e.target.value)}
//         className="border p-2 mb-4 w-full"
//       />

//       <label className="block font-medium">Weaknesses (comma-separated):</label>
//       <input
//         type="text"
//         value={weaknesses}
//         onChange={(e) => setWeaknesses(e.target.value)}
//         className="border p-2 mb-4 w-full"
//       />

//       <button
//         onClick={handleGeneratePlan}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {loading ? "Generating..." : "Generate Plan"}
//       </button>

//       {error && <p className="text-red-600 mt-2">{error}</p>}

//       {totalQuestions > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-bold">Progress</h3>
//           <div className="w-full bg-gray-300 rounded-full h-4 mt-2 relative">
//             <div
//               className="bg-green-500 h-4 rounded-full transition-all duration-500"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p className="mt-2">{completedCount} / {totalQuestions} Questions Completed ({progress}%)</p>
//         </div>
//       )}

//       {conceptPlan.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-bold mb-3">Generated SQL Concept Plan:</h3>
//           <div className="flex overflow-x-auto space-x-4 p-4 border border-gray-300 rounded-lg">
//             {conceptPlan.map((question, index) => (
//               <div key={index} className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg whitespace-nowrap">
//                 <input
//                   type="checkbox"
//                   checked={completedQuestions[question] || false}
//                   onChange={() => toggleCompletion(question)}
//                   className="w-5 h-5"
//                 />
//                 <span className={completedQuestions[question] ? "line-through text-gray-500" : ""}>
//                   {question}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SqlConceptPlan;
