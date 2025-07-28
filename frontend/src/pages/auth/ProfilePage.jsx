// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { FiEdit3, FiMail, FiPhone, FiLock, FiLogOut, FiShoppingCart, FiHeart, FiList, FiPlus, FiXCircle } from 'react-icons/fi'; // Import all necessary icons
// import { useAuth } from '../../context/AuthContext';

// export default function ProfilePage() {
//     // const { user, isAuthenticated, loadingAuth, login, logout, revalidateAuth } = useAuth(); // Get user and auth state from AuthContext
//     const navigate = useNavigate();
//     const auth = useAuth();
//     console.log(auth, 'auth use')

//     const [profileFormData, setProfileFormData] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//     });
//     const [passwordFormData, setPasswordFormData] = useState({
//         currentPassword: '',
//         newPassword: '',
//         confirmNewPassword: '',
//     });

//     const [profileSubmitting, setProfileSubmitting] = useState(false);
//     const [passwordSubmitting, setPasswordSubmitting] = useState(false);

//     const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";




//     // Handle input changes for profile form
//     const handleProfileChange = (e) => {
//         const { name, value } = e.target;
//         setProfileFormData(prev => ({ ...prev, [name]: value }));
//     };

//     // Handle input changes for password form
//     const handlePasswordChange = (e) => {
//         const { name, value } = e.target;
//         setPasswordFormData(prev => ({ ...prev, [name]: value }));
//     };

//     // Handle profile update submission
//     const handleProfileUpdate = async (e) => {
//         e.preventDefault();
//         setProfileSubmitting(true);
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error("Not authenticated. Please log in.");
//                 navigate('/login');
//                 return;
//             }
//             const config = {
//                 headers: { Authorization: `Bearer ${token}` }
//             };
//             // API endpoint for updating user profile
//             const response = await axios.put(`${backdendUrl}/api/user/profile`, profileFormData, config);

//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 // Update AuthContext user data immediately
//                 login(response.data.user, token); // Pass updated user and existing token to AuthContext's login function
//             } else {
//                 toast.error(response.data.message || "Profile update failed.");
//             }
//         } catch (error) {
//             console.error("Profile update error:", error);
//             if (error.response?.status === 401) {
//                 toast.error("Your session has expired. Please log in again.");
//                 // logout();
//                 navigate('/login');
//             } else {
//                 toast.error(error.response?.data?.message || "An error occurred during profile update.");
//             }
//         } finally {
//             setProfileSubmitting(false);
//         }
//     };

//     // Handle password change submission (when logged in)
//     const handleChangePassword = async (e) => {
//         e.preventDefault();
//         setPasswordSubmitting(true);
//         if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
//             toast.error("New passwords do not match.");
//             setPasswordSubmitting(false);
//             return;
//         }
//         if (passwordFormData.newPassword.length < 6) { // Basic password length check
//             toast.error("New password must be at least 6 characters long.");
//             setPasswordSubmitting(false);
//             return;
//         }
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error("Not authenticated. Please log in.");
//                 navigate('/login');
//                 return;
//             }
//             const config = {
//                 headers: { Authorization: `Bearer ${token}` }
//             };
//             // API endpoint for changing password
//             const response = await axios.put(`${backdendUrl}/api/user/change-password`, passwordFormData, config);

//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 setPasswordFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); // Clear form
//                 // For security, it's good practice to log out user after password change
//                 // logout();
//                 navigate('/login'); // Redirect to login
//             } else {
//                 toast.error(response.data.message || "Password change failed.");
//             }
//         } catch (error) {
//             console.error("Password change error:", error);
//             if (error.response?.status === 401) {
//                 toast.error("Your session has expired. Please log in again.");
//                 // logout();
//                 navigate('/login');
//             } else {
//                 toast.error(error.response?.data?.message || "An error occurred during password change.");
//             }
//         } finally {
//             setPasswordSubmitting(false);
//         }
//     };

//     // Handle Forgot Password link click (triggers email reset on backend)
//     const handleForgotPassword = async () => {
//         if (!user?.email) {
//             toast.error("Your email is not available. Please contact support.");
//             return;
//         }
//         if (!window.confirm("A password reset link will be sent to your registered email address. Continue?")) {
//             return;
//         }
//         try {
//             // API endpoint for sending reset password email
//             const response = await axios.post(`${backdendUrl}/api/auth/reset-password`, { email: user.email });
//             if (response.data.success) {
//                 toast.success("Password reset link sent to your email!");
//             } else {
//                 toast.error(response.data.message || "Failed to send reset email.");
//             }
//         } catch (error) {
//             console.error("Forgot password error:", error);
//             toast.error(error.response?.data?.message || "An error occurred while sending reset email.");
//         }
//     };


//     // if (loadingAuth) {
//     //     return (
//     //         <div className="flex justify-center items-center h-screen bg-gray-50">
//     //             <p className="text-xl text-gray-700">Loading user profile...</p>
//     //         </div>
//     //     );
//     // }

//     // This case should ideally be caught by ProtectedRoute, but as a fallback/redundancy
//     // if (!isAuthenticated || !user) {
//     //     return null; // The useEffect will handle the redirect
//     // }

//     return (
//         <div className="px-4 py-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
//             <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 fraunces">My Profile</h1>

//             <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Left Section: User Info & Forms */}
//                 <div className="lg:w-2/3 space-y-8">

//                     {/* Basic User Information Display */}
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-3">Account Information</h2>
//                         <div className="space-y-3 text-gray-800">
//                             <p className="flex items-center gap-2"><FiMail className="text-violet-600" /> <strong>Name:</strong> {user.name}</p>
//                             <p className="flex items-center gap-2"><FiMail className="text-violet-600" /> <strong>Email:</strong> {user.email}</p>
//                             <p className="flex items-center gap-2"><FiPhone className="text-violet-600" /> <strong>Mobile:</strong> {user.mobile || 'N/A'}</p>
//                             <p><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>
//                             <p className="text-sm text-gray-500">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
//                         </div>
//                     </div>

//                     {/* Update Profile Form */}
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-3">Update Profile</h2>
//                         <form onSubmit={handleProfileUpdate} className="space-y-4">
//                             <div>
//                                 <label htmlFor="profileName" className="block text-sm font-medium text-gray-700">Name</label>
//                                 <input type="text" id="profileName" name="name" value={profileFormData.name} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                             </div>
//                             <div>
//                                 <label htmlFor="profileEmail" className="block text-sm font-medium text-gray-700">Email</label>
//                                 <input type="email" id="profileEmail" name="email" value={profileFormData.email} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                             </div>
//                             <div>
//                                 <label htmlFor="profileMobile" className="block text-sm font-medium text-gray-700">Mobile</label>
//                                 <input type="tel" id="profileMobile" name="mobile" value={profileFormData.mobile} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" />
//                             </div>
//                             <button
//                                 type="submit"
//                                 disabled={profileSubmitting}
//                                 className="w-full bg-violet-800 text-white py-2 rounded-md hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {profileSubmitting ? 'Updating...' : 'Save Changes'}
//                             </button>
//                         </form>
//                     </div>

//                     {/* Change Password Form */}
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-3">Change Password</h2>
//                         <form onSubmit={handleChangePassword} className="space-y-4">
//                             <div>
//                                 <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
//                                 <input type="password" id="currentPassword" name="currentPassword" value={passwordFormData.currentPassword} onChange={handlePasswordChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                             </div>
//                             <div>
//                                 <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
//                                 <input type="password" id="newPassword" name="newPassword" value={passwordFormData.newPassword} onChange={handlePasswordChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                             </div>
//                             <div>
//                                 <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
//                                 <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={passwordFormData.confirmNewPassword} onChange={handlePasswordChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                             </div>
//                             <button
//                                 type="submit"
//                                 disabled={passwordSubmitting}
//                                 className="w-full bg-violet-800 text-white py-2 rounded-md hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {passwordSubmitting ? 'Changing...' : 'Update Password'}
//                             </button>
//                         </form>
//                         <div className="mt-4 text-center">
//                             <button onClick={handleForgotPassword} className="text-blue-600 hover:underline text-sm">Forgot Password?</button>
//                         </div>
//                     </div>

//                     {/* Static Section: Shipping Address (Placeholder) */}
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-3">Shipping Addresses</h2>
//                         <div className="text-gray-700 text-center py-4">
//                             <p className="mb-2">No saved addresses yet.</p>
//                             <button className="text-violet-600 hover:underline">Add New Address</button>
//                         </div>
//                         {/* In a real app, this would be a dynamic list of addresses with Add/Edit/Delete options */}
//                     </div>

//                     {/* Static Section: Settings (Placeholder) */}
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-3">Account Settings</h2>
//                         <div className="text-gray-700 text-center py-4">
//                             <p>Manage your notification preferences, privacy settings, etc.</p>
//                             <Link to="/settings" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
//                                 Go to Settings Page <FiChevronRight />
//                             </Link>
//                         </div>
//                     </div>

//                 </div>

//                 {/* Right Section: Navigation Links */}
//                 <div className="lg:w-1/3 space-y-4">
//                     <div className="bg-white shadow-md rounded-lg p-6 text-gray-700">
//                         <h2 className="text-2xl font-semibold mb-4 border-b pb-3">My Account</h2>
//                         <ul className="space-y-3 font-medium">
//                             <li>
//                                 <Link to="/cart" className="flex items-center gap-2 hover:text-violet-600 transition">
//                                     <FiShoppingCart /> My Cart
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/orders" className="flex items-center gap-2 hover:text-violet-600 transition">
//                                     <FiList /> My Orders
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/wishlist" className="flex items-center gap-2 hover:text-violet-600 transition">
//                                     <FiHeart /> My Wishlist
//                                 </Link>
//                             </li>
//                             {/* Add more links as needed */}
//                             <li className="border-t pt-4 mt-4">
//                                 <button onClick={logout} className="flex items-center gap-2 text-red-600 hover:text-red-800 transition w-full text-left">
//                                     <FiLogOut /> Logout
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const TABS = [
    { id: "overview", label: "Profile" },
    { id: "orders", label: "Orders" },
    { id: "settings", label: "Settings" },
];

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const query = useQuery();
    const [activeTab, setActiveTab] = useState("overview");


    // Set activeTab from query param on mount/query change
    useEffect(() => {
        const tabFromQuery = query.get("tab");
        if (tabFromQuery && TABS.some(t => t.id === tabFromQuery)) {
            setActiveTab(tabFromQuery);
        }
    }, [query]);

    return (
        <div className="max-w-7xl mx-auto bg-white rounded p-6 mt-8">
            {/* Profile Header */}
            <div className="flex items-center mb-6">
                <div className="rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="text-xl font-semibold">{user?.name}</div>
                    <div className="text-gray-500">{user?.email}</div>
                </div>
            </div>

            {/* Tab Buttons */}
            <div className="flex space-x-4 mb-6 border-b">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        className={`pb-2 px-4 border-b-2 ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500'} font-semibold transition`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
                <div>
                    <div className="font-medium mb-2">Account Details</div>
                    <div>Name: {user?.name}</div>
                    <div>Email: {user?.email}</div>
                    {/* Add more fields as needed */}
                    <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Log Out</button>
                </div>
            )}

            {activeTab === "orders" && (
                <div>
                    <div className="font-medium mb-2">Order History</div>
                    {/* Map orders here, stub for now */}
                    <div className="text-gray-500">No orders yet.</div>
                </div>
            )}

            {activeTab === "settings" && (
                <div>
                    <div className="font-medium mb-2">Settings</div>
                    {/* Settings form or info here */}
                    <div className="text-gray-500">Settings tab coming soon.</div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
