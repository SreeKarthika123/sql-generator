

// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import "./App.css";
// // import SQLPlanGenerator from './components/SQLPlanGenerator';
// import ProtectedRoute from "./components/ProtectedRoute";
// // import SQLQuestionnaire from "./components/SqlCeptPlan"; // Import SQLQuestionnaire
// // import SQLConceptPlan from "../../backend/models/SqlConceptPlan";

// function App() {
//     const handleSubmit = (formData) => {
//         console.log("Form Data Submitted:", formData);
//         // Handle API requests here if needed
//     };

//     return (
//         <div>
//             {/* Navbar stays constant */}
//             <Navbar />

//             {/* Define Routes */}
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//                 {/* <Route path="/retrieve-sql-plan" element={<SQLPlanGenerator />} /> */}
//             </Routes>

//             {/* Add SQLQuestionnaire below the routes */}
//             {/* <div className="p-4">
//                 <h2 className="text-center text-xl font-bold p-4">SQL Plan Generator</h2>
//                 <SQLQuestionnaire onSubmit={handleSubmit} />
//             </div> */}
//             {/* <div>
//               <h3>generate sql</h3>
//               <SQLPlanGenerator onSubmit={handleSubmit}/>
//             </div> */}
//         </div>
//     );
// }

// export default App;


/* Centered Container with Fixed Width */



import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SQLPlanPage from "./components/SQLPlanPage"; 
import SqlCeptPlan from "./components/SqlCeptPlan"; 
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"; // Import the CSS file

function App() {
    return (
        <div>
            {/* Navbar stays constant */}
            <div className="navbar">My App</div>

            {/* Centered Container */}
            <div className="center">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/sql-plan" element={<SQLPlanPage />} />
                        <Route path="/sql-cept-plan" element={<SqlCeptPlan />} />
                        {/* <Route path="/sql-plan" element={<SQLPlanPage />} /> */}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
