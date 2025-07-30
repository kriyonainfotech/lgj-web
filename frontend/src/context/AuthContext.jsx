// // AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [loading, setLoading] = useState(true); // Ensure initial state is true
//     const [user, setUser] = useState(null); //

//     useEffect(() => {
//         // console.log("🔍 AuthContext: Running useEffect on mount..."); //
//         const token = localStorage.getItem("token"); //
//         // console.log("📦 Retrieved token from localStorage:", token); //

//         if (token) { //
//             try { //
//                 const decoded = jwtDecode(token); //
//                 // console.log("✅ Token decoded successfully:", decoded); //
//                 setUser(decoded); //
//             } catch (err) { //
//                 console.error("❌ Invalid token. Error:", err); //
//                 localStorage.removeItem("token"); //
//             }
//         } else { //
//             console.log("⚠️ No token found in localStorage."); //
//         }

//         setLoading(false); // auth check complete
//     }, []); //

//     const logout = () => { //
//         console.log("🚪 Logging out user..."); //
//         localStorage.removeItem("token"); //
//         setUser(null); //
//     };

//     return (
//         <AuthContext.Provider value={{ user, logout, loading }}> {/* Add loading here */}
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) console.warn("⚠️ useAuth called outside of AuthProvider!");
//     return context;
// };


// src/contexts/AuthContext.jsx
// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { decryptData, encryptData } from '../utils/secureStorage'; // Make sure this path is correct

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [authError, setAuthError] = useState(null);

    // --- Helper to clear all authentication related data ---
    const clearAuthData = useCallback(() => {
        // console.log("DEBUG: clearAuthData called. Clearing token and user from localStorage.");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
    }, []);

    // --- Core function to load/validate user from storage ---
    const loadUserFromStorage = useCallback(() => {
        setLoadingAuth(true);
        setAuthError(null);
        try {
            const storedToken = localStorage.getItem('token');
            const storedUserEncrypted = localStorage.getItem('user'); // This is the encrypted string

            // console.log("DEBUG: loadUserFromStorage called.");
            // console.log("DEBUG: Stored Token:", storedToken ? storedToken.substring(0, 30) + '...' : 'None');
            // console.log("DEBUG: Stored User (Encrypted String):", storedUserEncrypted ? storedUserEncrypted.substring(0, 30) + '...' : 'None');

            if (storedToken && storedUserEncrypted) {
                const decodedToken = jwtDecode(storedToken);
                const isExpired = decodedToken.exp * 1000 < Date.now();

                const expiryDate = new Date(decodedToken.exp * 1000).toLocaleString();
                const currentClientTime = new Date().toLocaleString();
                // console.log(`DEBUG: Token EXP: ${expiryDate}, Current Time: ${currentClientTime}`);
                // console.log("DEBUG: Is token expired?", isExpired);

                if (isExpired) {
                    // console.warn("DEBUG: Token EXPIRED. Calling clearAuthData.");
                    toast.info("Your session has expired. Please log in again.");
                    clearAuthData();
                } else {
                    // console.log("DEBUG: Token VALID. Attempting to decrypt user data.");

                    // ✅ CRUCIAL FIX: Assume decryptData directly returns the PARSED JAVASCRIPT OBJECT.
                    //    No JSON.parse() needed here because decryptData does it internally.
                    const parsedUserProfile = decryptData(storedUserEncrypted);

                    if (!parsedUserProfile || typeof parsedUserProfile !== 'object') {
                        console.error("DEBUG: Decryption failed OR result is not a valid JS object:", parsedUserProfile);
                        throw new Error("Decryption failed or invalid user object returned."); // Trigger catch block
                    }

                    // ✅ Use the object directly as returned by decryptData
                    // Combine parsed user profile with decoded JWT payload for full compatibility
                    const combinedUserObject = {
                        ...parsedUserProfile,    // Contains _id, name, email, mobile
                        id: decodedToken.id,     // Ensure 'id' from JWT is present for backward compatibility
                        role: decodedToken.role, // Ensure 'role' from JWT is canonical
                        iat: decodedToken.iat,   // Add 'iat' from JWT
                        exp: decodedToken.exp,   // Add 'exp' from JWT
                    };

                    setUser(combinedUserObject);
                    setIsAuthenticated(true);
                    setToken(storedToken);
                    console.log("DEBUG: User state set. Authenticated. Combined User:", combinedUserObject);
                }
            } else {
                console.log("DEBUG: No token/user in localStorage. Calling clearAuthData.");
                clearAuthData();
            }
        } catch (error) {
            console.error("DEBUG: Error in loadUserFromStorage catch block (Likely decryption/parsing issue or invalid data):", error);
            setAuthError("Authentication data corrupted or decryption failed. Please log in again.");
            toast.error("Session data invalid. Please log in.");
            clearAuthData(); // Clear data because something went wrong during loading
        } finally {
            setLoadingAuth(false);
            console.log("DEBUG: loadUserFromStorage finished. loadingAuth set to false.");
        }
    }, [clearAuthData]);

    // --- Authentication Actions (Login/Logout) ---
    const login = useCallback((plainUserDataFromBackend, userToken) => {
        localStorage.setItem('token', userToken);
        // Assuming plainUserDataFromBackend is a plain JS object (e.g., { _id: "...", name: "...", email: "..." })
        // encryptData should convert this object into an encrypted STRING for localStorage
        localStorage.setItem('user', encryptData(plainUserDataFromBackend));

        // When setting user in context state, we use the plain (unencrypted) object
        // and combine it with JWT payload for full compatibility.
        const decodedToken = jwtDecode(userToken);
        const combinedUserObject = {
            ...plainUserDataFromBackend, // This should be the original plain JS object
            id: decodedToken.id,
            role: decodedToken.role,
            iat: decodedToken.iat,
            exp: decodedToken.exp,
        };

        setUser(combinedUserObject);
        setIsAuthenticated(true);
        setToken(userToken);
        setAuthError(null);
    }, []);

    const logout = useCallback(() => {
        clearAuthData();
        toast.info("You have been logged out.");
    }, [clearAuthData]);

    // --- Effect to load user on initial mount ---
    useEffect(() => {
        loadUserFromStorage();
    }, [loadUserFromStorage]);

    // Provide context values to children
    const value = {
        user,
        isAuthenticated,
        token,
        loadingAuth,
        authError,
        login,
        logout,
        revalidateAuth: loadUserFromStorage
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        console.warn("useAuth must be used within an AuthProvider");
    }
    return context;
};