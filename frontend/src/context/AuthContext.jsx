// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true); // Ensure initial state is true
    const [user, setUser] = useState(null); //

    useEffect(() => {
        // console.log("🔍 AuthContext: Running useEffect on mount..."); //
        const token = localStorage.getItem("token"); //
        // console.log("📦 Retrieved token from localStorage:", token); //

        if (token) { //
            try { //
                const decoded = jwtDecode(token); //
                // console.log("✅ Token decoded successfully:", decoded); //
                setUser(decoded); //
            } catch (err) { //
                console.error("❌ Invalid token. Error:", err); //
                localStorage.removeItem("token"); //
            }
        } else { //
            console.log("⚠️ No token found in localStorage."); //
        }

        setLoading(false); // auth check complete
    }, []); //

    const logout = () => { //
        console.log("🚪 Logging out user..."); //
        localStorage.removeItem("token"); //
        setUser(null); //
    };

    return (
        <AuthContext.Provider value={{ user, logout, loading }}> {/* Add loading here */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => { //
    const context = useContext(AuthContext); //
    if (!context) console.warn("⚠️ useAuth called outside of AuthProvider!"); //
    return context; //
};