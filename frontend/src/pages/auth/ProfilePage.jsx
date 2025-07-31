import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import { useRef } from "react";
import Modal from 'react-modal';
import ProfilePhotoModal from "./ProfilePhotoModal";

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
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
    const fileInputRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const tabFromQuery = query.get("tab");
        if (tabFromQuery && TABS.some(t => t.id === tabFromQuery)) {
            setActiveTab(tabFromQuery);
        }
    }, [query]);

    useEffect(() => {
        const tabFromQuery = query.get("tab");
        if (tabFromQuery && TABS.some(t => t.id === tabFromQuery)) {
            setActiveTab(tabFromQuery);
        }
    }, [query]);

    // const handleFileChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;

    //     const formData = new FormData();
    //     formData.append('profilePhoto', file);

    //     try {
    //         const { data } = await axios.put('/api/users/profile/update-photo', formData);
    //         setUser({ ...user, image: { url: data.imageUrl } }); // Update UI instantly
    //         toast.success('Photo updated!');
    //     } catch (error) {
    //         toast.error('Upload failed.');
    //     } finally {
    //         setIsMenuOpen(false);
    //     }
    // };



    return (
        <div className="max-w-7xl mx-auto px-4 mt-10 mb-20">
            <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
                {/* Sidebar */}
                <aside className="w-full md:w-1/5 bg-gray-100 p-6 border-r">
                    <div className="flex items-center mb-8">
                        {/* Profile Pic Container */}
                        <div className="relative">
                            {user?.image?.url ? (
                                <img src={user.image.url} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-maroon text-white flex items-center justify-center text-xl font-bold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            {/* Pencil Icon Button now opens the modal */}
                            <button
                                onClick={() => setIsModalOpen(true)} // ✅ CHANGE THIS
                                className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border shadow-sm hover:bg-gray-200 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        <div className="ml-4">
                            <div className="text-base font-semibold text-gray-800">{user?.name}</div>
                            <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-3">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    navigate(`?tab=${tab.id}`);
                                }}
                                className={`text-left px-4 py-2 rounded-md transition text-sm font-medium
                  ${activeTab === tab.id
                                        ? 'bg-maroon text-white'
                                        : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                        <button
                            onClick={logout}
                            className="mt-6 text-left px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-600 text-sm font-medium"
                        >
                            Log Out
                        </button>
                    </nav>
                </aside>

                <ProfilePhotoModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                />


                {/* Main Content */}
                <main className="flex-1 p-6">
                    {activeTab === "overview" && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Details</h2>
                            <p><strong>Name:</strong> {user?.name}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
                            <p className="text-gray-500">No orders yet.</p>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <UpdateProfile /> // We'll create this new component
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
