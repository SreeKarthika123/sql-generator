// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SQLPlanGenerator = () => {
//   const navigate = useNavigate();
//   const [sqlPlan, setSqlPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false); // New state for fetching saved SQL plan
//   const [error, setError] = useState("");
//   const [userData, setUserData] = useState({
//     yearsOfExperience: "",
//     ctcRange: "",
//     targetCompanies: "",
//     timeCommitment: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchStoredSqlPlan(); // Automatically fetch stored plan on mount
//   }, [navigate]);

//   // Fetch the saved SQL plan from the backend
//   const fetchStoredSqlPlan = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("User not authenticated. Please log in.");
//       return;
//     }

//     setFetching(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/users/get-sql-plan", {
//         method: "GET",
//         headers: { "Authorization": `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setSqlPlan(data.sqlPlan.sqlPlan);
//         setError(""); // Clear previous errors
//       } else {
//         setError("No stored SQL plan found.");
//       }
//     } catch (error) {
//       console.error("Error retrieving SQL plan:", error);
//       setError("Error fetching the stored SQL plan.");
//     } finally {
//       setFetching(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleGeneratePlan = async () => {
//     if (!userData.yearsOfExperience || !userData.ctcRange || !userData.targetCompanies || !userData.timeCommitment) {
//       setError("All fields are required!");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const formattedUserData = {
//         ...userData,
//         targetCompanies: userData.targetCompanies.split(",").map((c) => c.trim()),
//       };

//       const response = await fetch("http://localhost:5000/api/users/generate-sql-plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify(formattedUserData),
//       });

//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setSqlPlan(data.sqlPlan);
//         setError(""); // Clear errors
//       } else {
//         setError(data.message || "Error generating SQL plan.");
//       }
//     } catch (error) {
//       setError("Something went wrong while generating the SQL plan!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">Generate Your SQL Plan</h1>

//       {error && <p className="text-red-500 mb-3">{error}</p>}

//       <div className="space-y-4">
//         {["yearsOfExperience", "ctcRange", "targetCompanies", "timeCommitment"].map((field) => (
//           <div key={field}>
//             <label className="block font-medium">
//               {field.replace(/([A-Z])/g, " $1").trim()}:
//             </label>
//             <input
//               type="text"
//               name={field}
//               value={userData[field]}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-4 mt-4">
//         <button
//           onClick={handleGeneratePlan}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Generating..." : "Generate SQL Plan"}
//         </button>
        
//         <button
//           onClick={fetchStoredSqlPlan}
//           disabled={fetching}
//           className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
//         >
//           {fetching ? "Retrieving..." : "Retrieve SQL Plan"}
//         </button>
//       </div>

//       {sqlPlan ? (
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//           <h2 className="text-lg font-semibold">Your SQL Practice Plan:</h2>
//           <pre className="whitespace-pre-wrap">{sqlPlan}</pre>
//           <button
//             onClick={() => navigator.clipboard.writeText(sqlPlan)}
//             className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Copy to Clipboard
//           </button>
//         </div>
//       ) : (
//         <p className="mt-4 text-gray-500">No SQL plan found. Generate or retrieve one!</p>
//       )}
//     </div>
//   );
// };




             

// export default SQLPlanGenerator;



import React from "react";
import { useNavigate } from "react-router-dom";

const SQLPlanGenerator = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4">SQL Plan Generator</h1>
      <p className="mb-4 text-gray-600">
        Click the button below to generate your personalized SQL plan.
      </p>

      <button
        onClick={() => navigate("/sql-plan")}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Generate SQL Plan
      </button>
    </div>
  );
};

export default SQLPlanGenerator;
