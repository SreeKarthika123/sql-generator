// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SQLPlanPage = () => {
//   const navigate = useNavigate();
//   const [sqlPlan, setSqlPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
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
//     }
//   }, [navigate]);

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
//         setError("");
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
//         <p className="mt-4 text-gray-500">Generate your SQL plan now!</p>
//       )}
//     </div>
//   );
// };

// export default SQLPlanPage;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SQLPlanPage = () => {
//   const navigate = useNavigate();
//   const [sqlPlan, setSqlPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [existingPlan, setExistingPlan] = useState(null);
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
//     } else {
//       fetchSavedPlan(token);
//     }
//   }, [navigate]);

//   const fetchSavedPlan = async (token) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/generate-sql-plan", {
//         method: "POST", // Use POST since backend generates or fetches the plan
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({}), // Send empty body to trigger fetching of existing plan
//       });

//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setExistingPlan(data.sqlPlan);
//       }
//     } catch (error) {
//       console.error("Error fetching saved SQL plan:", error);
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
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(formattedUserData),
//       });

//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setSqlPlan(data.sqlPlan);
//         setExistingPlan(data.sqlPlan); // Update saved plan
//         setError("");
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

//       {existingPlan && (
//         <div className="mt-4 p-4 bg-green-100 rounded-lg">
//           <h2 className="text-lg font-semibold">Your Saved SQL Plan:</h2>
//           <pre className="whitespace-pre-wrap">{existingPlan}</pre>
//         </div>
//       )}

//       <div className="space-y-4 mt-4">
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
//           {loading ? "Generating..." : "Generate New SQL Plan"}
//         </button>
//       </div>

//       {sqlPlan && (
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//           <h2 className="text-lg font-semibold">Your New SQL Practice Plan:</h2>
//           <pre className="whitespace-pre-wrap">{sqlPlan}</pre>
//           <button
//             onClick={() => navigator.clipboard.writeText(sqlPlan)}
//             className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Copy to Clipboard
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SQLPlanPage;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./sql_plan.css";
// const SQLPlanPage = () => {
//   const navigate = useNavigate();
//   const [sqlPlan, setSqlPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [existingPlan, setExistingPlan] = useState(null);
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
//     } else {
//       fetchSavedPlan(token);
//     }
//   }, [navigate]);

//   const fetchSavedPlan = async (token) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/generate-sql-plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({}),
//       });
//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setExistingPlan(data.sqlPlan);
//       }
//     } catch (error) {
//       console.error("Error fetching saved SQL plan:", error);
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
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(formattedUserData),
//       });
//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setSqlPlan(data.sqlPlan);
//         setExistingPlan(data.sqlPlan);
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
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">Generate Your SQL Plan</h1>
//       {error && <p className="text-red-500 mb-3">{error}</p>}
//       {existingPlan && (
//         <div className="mt-4 p-4 bg-green-100 rounded-lg overflow-x-auto">
//           <h2 className="text-lg font-semibold">Your Saved SQL Plan:</h2>
//           <div className="flex items-center space-x-4 p-2 bg-white border rounded-lg overflow-x-auto">
//             <pre className="whitespace-nowrap text-sm p-2">{existingPlan}</pre>
//           </div>
//         </div>
//       )}
//       <div className="space-y-4 mt-4">
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
//           {loading ? "Generating..." : "Generate New SQL Plan"}
//         </button>
//       </div>
//       {sqlPlan && (
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg overflow-x-auto">
//           <h2 className="text-lg font-semibold">Your New SQL Practice Plan:</h2>
//           <div className="flex items-center space-x-4 p-2 bg-white border rounded-lg overflow-x-auto">
//             <pre className="whitespace-nowrap text-sm p-2">{sqlPlan}</pre>
//           </div>
//           <button
//             onClick={() => navigator.clipboard.writeText(sqlPlan)}
//             className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Copy to Clipboard
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SQLPlanPage;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./sql_plan.css"; // Ensure this file is imported

// const SQLPlanPage = () => {
//   const navigate = useNavigate();
//   const [sqlPlan, setSqlPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [existingPlan, setExistingPlan] = useState(null);
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
//     } else {
//       fetchSavedPlan(token);
//     }
//   }, [navigate]);

//   const fetchSavedPlan = async (token) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/generate-sql-plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({}),
//       });
//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setExistingPlan(data.sqlPlan);
//       }
//     } catch (error) {
//       console.error("Error fetching saved SQL plan:", error);
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
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(formattedUserData),
//       });
//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setSqlPlan(data.sqlPlan);
//         setExistingPlan(data.sqlPlan);
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
//     <div className="sql-plan-container">
//       <h1 className="title">Generate Your SQL Plan</h1>
//       {error && <p className="error-message">{error}</p>}

//       {existingPlan && (
//         <div className="sql-plan-box">
//           <h2 className="sub-title">Your Saved SQL Plan:</h2>
//           <pre>{existingPlan}</pre>
//         </div>
//       )}

//       <div className="form-container">
//         {["yearsOfExperience", "ctcRange", "targetCompanies", "timeCommitment"].map((field) => (
//           <div key={field} className="input-group">
//             <label>{field.replace(/([A-Z])/g, " $1").trim()}:</label>
//             <input
//               type="text"
//               name={field}
//               value={userData[field]}
//               onChange={handleInputChange}
//               className="input-field"
//             />
//           </div>
//         ))}
//       </div>

//       <button onClick={handleGeneratePlan} disabled={loading} className="generate-btn">
//         {loading ? "Generating..." : "Generate New SQL Plan"}
//       </button>

//       {sqlPlan && (
//         <div className="sql-new-plan-box">
//           <h2 className="sub-title">Your New SQL Practice Plan:</h2>
//           <pre>{sqlPlan}</pre>
//           <button onClick={() => navigator.clipboard.writeText(sqlPlan)} className="copy-btn">
//             Copy to Clipboard
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SQLPlanPage;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./sql_plan.css"; // Ensure this file is imported

// const SQLPlanPage = () => {
//   const navigate = useNavigate();
//   const [sqlPlan, setSqlPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [existingPlan, setExistingPlan] = useState(null);
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
//     } else {
//       fetchSavedPlan(token);
//     }
//   }, [navigate]);

//   const fetchSavedPlan = async (token) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/generate-sql-plan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({}),
//       });
//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setExistingPlan(data.sqlPlan);
//       }
//     } catch (error) {
//       console.error("Error fetching saved SQL plan:", error);
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
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(formattedUserData),
//       });
//       const data = await response.json();
//       if (response.ok && data.sqlPlan) {
//         setSqlPlan(data.sqlPlan);
//         setExistingPlan(data.sqlPlan);
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
//     <div className="sql-plan-container">
//       <h1 className="title">Generate Your SQL Plan</h1>
//       {error && <p className="error-message">{error}</p>}

//       <div className="form-container">
//         {["yearsOfExperience", "ctcRange", "targetCompanies", "timeCommitment"].map((field) => (
//           <div key={field} className="input-group">
//             <label>{field.replace(/([A-Z])/g, " $1").trim()}:</label>
//             <input
//               type="text"
//               name={field}
//               value={userData[field]}
//               onChange={handleInputChange}
//               className="input-field"
//             />
//           </div>
//         ))}
//       </div>

//       <button onClick={handleGeneratePlan} disabled={loading} className="generate-btn">
//         {loading ? "Generating..." : "Generate New SQL Plan"}
//       </button>

//       {existingPlan && (
//         <div className="sql-plan-box">
//           <h2 className="sub-title">Your Saved SQL Plan:</h2>
//           <div className="plan-box">
//             <pre>{existingPlan}</pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SQLPlanPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sql_plan.css"; // Ensure this file is imported

const SQLPlanPage = () => {
  const navigate = useNavigate();
  const [sqlPlan, setSqlPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingPlan, setExistingPlan] = useState(null);
  const [userData, setUserData] = useState({
    yearsOfExperience: "",
    ctcRange: "",
    targetCompanies: "",
    timeCommitment: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchSavedPlan(token);
    }
  }, [navigate]);

  const fetchSavedPlan = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/generate-sql-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (response.ok && data.sqlPlan) {
        setExistingPlan(data.sqlPlan);
      }
    } catch (error) {
      console.error("Error fetching saved SQL plan:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGeneratePlan = async () => {
    if (!userData.yearsOfExperience || !userData.ctcRange || !userData.targetCompanies || !userData.timeCommitment) {
      setError("All fields are required!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formattedUserData = {
        ...userData,
        targetCompanies: userData.targetCompanies.split(",").map((c) => c.trim()),
      };
      const response = await fetch("http://localhost:5000/api/users/generate-sql-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formattedUserData),
      });
      const data = await response.json();
      if (response.ok && data.sqlPlan) {
        setSqlPlan(data.sqlPlan);
        setExistingPlan(data.sqlPlan);
      } else {
        setError(data.message || "Error generating SQL plan.");
      }
    } catch (error) {
      setError("Something went wrong while generating the SQL plan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sql-plan-container">
      <h1 className="title">Generate Your SQL Plan</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="content-container">
        <div className="form-container">
          {[
            "yearsOfExperience",
            "ctcRange",
            "targetCompanies",
            "timeCommitment",
          ].map((field) => (
            <div key={field} className="input-group">
              <label>{field.replace(/([A-Z])/g, " $1").trim()}:</label>
              <input
                type="text"
                name={field}
                value={userData[field]}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          ))}
          <button onClick={handleGeneratePlan} disabled={loading} className="generate-btn">
            {loading ? "Generating..." : "Generate New SQL Plan"}
          </button>
        </div>

        {existingPlan && (
          <div className="sql-plan-box">
            <h2 className="sub-title">Your Saved SQL Plan:</h2>
            <div className="plan-box">
              <pre>{existingPlan}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SQLPlanPage;