// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//     const [questions, setQuestions] = useState([]);
//     const navigate = useNavigate();

//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));

//     // Fetch SQL Interview Questions
//     useEffect(() => {
//         if (!token) {
//             navigate("/login"); // Redirect if not authenticated
//         } else {
//             fetch("http://localhost:5000/api/questions/random", {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//                 .then((res) => res.json())
//                 .then((data) => setQuestions(data))
//                 .catch((error) => console.error("Error fetching questions:", error));
//         }
//     }, [token, navigate]);

//     // Handle marking a question as complete
//     const handleComplete = async (questionId) => {
//         try {
//             await fetch("http://localhost:5000/api/progress/save", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ questionId }),
//             });

//             // Update UI after marking question as complete
//             setQuestions(questions.filter((q) => q._id !== questionId));
//         } catch (error) {
//             console.error("Error marking question as complete:", error);
//         }
//     };

//     // Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//     };

//     return (
//         <div>
//             <h2>Welcome, {user?.name}</h2>
//             <p>Email: {user?.email}</p>
//             <button onClick={handleLogout}>Logout</button>

//             <h1>SQL Interview Questions</h1>
//             <ul>
//                 {questions.length > 0 ? (
//                     questions.map((q) => (
//                         <li key={q._id}>
//                             {q.questionText}
//                             <button onClick={() => handleComplete(q._id)}>Mark as Complete</button>
//                         </li>
//                     ))
//                 ) : (
//                     <p>Loading questions...</p>
//                 )}
//             </ul>
//         </div>
//     );
// }

// export default Dashboard;
// import React from "react";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <Link to="/customized-sql-kit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Go to Customized SQL Kit
//       </Link>
//     </div>
//   );
// };

// export default Dashboard;


// import React from "react";
// import SQLPlanGenerator from "../components/SQLPlanGenerator";
// import SQLQuestionnaire from "../components/SqlCeptPlan";

// const Dashboard = () => {
//   const handleSubmit = (formData) => {
//     console.log("Form Data Submitted:", formData);
//     // Handle API requests here if needed
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Dashboard</h1>
      
//       {/* SQL Plan Generator Section */}
//       <div className="p-4">
//         <h2 className="text-center text-xl font-bold p-4">SQL Plan Generator</h2>
//         <SQLQuestionnaire onSubmit={handleSubmit} />
//       </div>

//       <div className="p-4">
//         <h3 className="text-xl font-bold">Generate SQL</h3>
//         <SQLPlanGenerator onSubmit={handleSubmit} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold mb-4">Welcome to Dashboard</h2>
//             <button
//                 onClick={() => navigate("/sql-plan")}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//                 Go to SQL Plan Generator
//             </button>
//         </div>
//     );
// };

// export default Dashboard;


import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Welcome to Dashboard</h2>
            
            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/sql-plan")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Go to SQL Plan Generator
                </button>

                <button
                    onClick={() => navigate("/sql-cept-plan")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Go to SQL Cept Plan
                </button>
            </div>
        </div>
    );
};

export default Dashboard;

