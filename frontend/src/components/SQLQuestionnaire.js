// import React, { useState } from "react";

// const SQLQuestionnaire = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     experienceLevel: "",
//     targetCompanies: "",
//     sqlWeaknesses: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 space-y-4">
//       <label className="block">
//         Experience Level:
//         <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="border p-2 w-full">
//           <option value="">Select</option>
//           <option value="beginner">Beginner</option>
//           <option value="intermediate">Intermediate</option>
//           <option value="advanced">Advanced</option>
//         </select>
//       </label>

//       <label className="block">
//         Target Companies:
//         <input type="text" name="targetCompanies" value={formData.targetCompanies} onChange={handleChange} className="border p-2 w-full" />
//       </label>

//       <label className="block">
//         SQL Weaknesses:
//         <textarea name="sqlWeaknesses" value={formData.sqlWeaknesses} onChange={handleChange} className="border p-2 w-full"></textarea>
//       </label>

//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Generate Plan
//       </button>
//     </form>
//   );
// };

// export default SQLQuestionnaire;
import React, { useState } from "react";

const SQLQuestionnaire = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    experienceLevel: "",
    targetCompanies: "",
    sqlWeaknesses: "",
  });

  const [sqlPlan, setSqlPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/sql/generate-sql-plan", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSqlPlan(data.plan);
        setError(null);
      } else {
        setError(data.message || "Failed to generate SQL plan. Try again.");
        setSqlPlan(null);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setSqlPlan(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Experience Level:
          <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="border p-2 w-full">
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label className="block">
          Target Companies:
          <input type="text" name="targetCompanies" value={formData.targetCompanies} onChange={handleChange} className="border p-2 w-full" />
        </label>

        <label className="block">
          SQL Weaknesses:
          <textarea name="sqlWeaknesses" value={formData.sqlWeaknesses} onChange={handleChange} className="border p-2 w-full"></textarea>
        </label>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate Plan
        </button>
      </form>

      {/* Display the generated plan */}
      {sqlPlan && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-bold text-lg">Your SQL Plan:</h2>
          <p>{sqlPlan}</p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SQLQuestionnaire;
