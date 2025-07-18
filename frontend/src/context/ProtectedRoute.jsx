// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useAuth(); // Now `loading` will be correctly received

    // console.log("ProtectedRoute: loading", loading); //
    // console.log("ProtectedRoute: user", user); //
    // console.log("ProtectedRoute: expected role", role); //

    if (loading) { // This condition will now correctly be true initially
        // console.log("ProtectedRoute: Still loading, showing placeholder."); //
        return <div>🔒 Checking auth...</div>; //
    }

    if (!user) { //
        // console.log("ProtectedRoute: No user found, redirecting to /login."); //
        return <Navigate to="/login" />; //
    }
    if (role && user.role !== role) { //
        // console.log(`ProtectedRoute: User role (${user.role}) does not match required role (${role}), redirecting to /unauthorized.`); //
        return <Navigate to="/unauthorized" />; //
    }

    console.log("ProtectedRoute: User is authorized, rendering children."); //
    return children; //
};

export default ProtectedRoute;