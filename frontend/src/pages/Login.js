// import { useState } from "react";
// import axios from "axios";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleLogin = async () => {
//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//             localStorage.setItem("token", res.data.token);
//             window.location.href = "/dashboard";
//         } catch (err) {
//             console.error("Login failed", err);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <input className="border p-2 m-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//             <input className="border p-2 m-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             <button className="bg-blue-500 text-white p-2" onClick={handleLogin}>Login</button>
//         </div>
//     );
// };

// export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//     const [formData, setFormData] = useState({ email: "", password: "" });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:5000/api/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 localStorage.setItem("token", data.token); // Save token for authentication
//                 navigate("/dashboard"); // Redirect to Dashboard
//             } else {
//                 setError(data.error || "Login failed");
//             }
//         } catch (error) {
//             setError("Error connecting to server");
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <br />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <br />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                setError(data.error || "Login failed");
            }
        } catch (error) {
            setError("Error connecting to server");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}

export default Login;
