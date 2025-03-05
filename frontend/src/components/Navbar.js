import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <Link to="/" className="text-xl font-bold">SQL Prep Kit</Link>
            <div>
                <Link to="/dashboard" className="mr-4">Dashboard</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
