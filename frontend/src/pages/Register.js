
// import { useState } from "react";
// import axios from "axios";

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleRegister = async () => {
//         try {
//             await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
//             window.location.href = "/";
//         } catch (err) {
//             console.error("Registration failed", err);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <input className="border p-2 m-2" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
//             <input className="border p-2 m-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//             <input className="border p-2 m-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             <button className="bg-green-500 text-white p-2" onClick={handleRegister}>Register</button>
//         </div>
//     );
// };

// export default Register;
// import { useState } from "react";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:5000/api/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 alert("Registered successfully!");
//                 window.location.href = "/login";  // Redirect to login page
//             } else {
//                 alert(data.error || "Registration failed!");
//             }
//         } catch (error) {
//             console.error("Error registering:", error);
//             alert("Error connecting to server!");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//             <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//             <button type="submit">Register</button>
//         </form>
//     );
// };

// export default Register;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! Please log in.");
                navigate("/");
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (error) {
            setError("Error connecting to server");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br />
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
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/">Login</a></p>
        </div>
    );
}

export default Register;
