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

// components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // ✅ Ensure path is correct

// const ProtectedRoute = ({ children, role }) => {
//     // ✅ Destructure loadingAuth and isAuthenticated from useAuth
//     const { user, loadingAuth, isAuthenticated } = useAuth();

//     // console.log("ProtectedRoute: loadingAuth", loadingAuth);
//     // console.log("ProtectedRoute: isAuthenticated", isAuthenticated);
//     // console.log("ProtectedRoute: user", user);
//     // console.log("ProtectedRoute: expected role", role);

//     if (loadingAuth) { // ✅ Use loadingAuth
//         console.log("ProtectedRoute: Still loading auth status, showing placeholder.");
//         return <div>🔒 Checking authentication...</div>;
//     }

//     // ✅ Primary check: If not authenticated, redirect to login
//     if (!isAuthenticated) {
//         console.log("ProtectedRoute: Not authenticated, redirecting to /login.");
//         return <Navigate to="/login" />;
//     }

//     // Check role if required (only if authenticated)
//     if (role && user.role !== role) {
//         console.log(`ProtectedRoute: User role (${user.role}) does not match required role (${role}), redirecting to /unauthorized.`);
//         return <Navigate to="/unauthorized" />;
//     }

//     console.log("ProtectedRoute: User is authorized, rendering children.");
//     return children;
// };

// export default ProtectedRoute;