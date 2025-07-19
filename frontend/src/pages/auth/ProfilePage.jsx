// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoDiamondOutline } from 'react-icons/io5';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Sofia Rossi',
        email: 'sofia@mirosa.com',
        phone: '+1 (555) 123-4567',
        joinDate: 'January 15, 2022',
        orders: 12,
        wishlist: 8
    });

    const [formData, setFormData] = useState({ ...userData });

    const orders = [
        { id: '#MIROSA-1289', date: 'Oct 12, 2023', items: 2, total: '$2,450', status: 'Delivered' },
        { id: '#MIROSA-1123', date: 'Sep 3, 2023', items: 1, total: '$1,850', status: 'Delivered' },
        { id: '#MIROSA-0987', date: 'Jul 22, 2023', items: 3, total: '$5,200', status: 'Delivered' },
        { id: '#MIROSA-0765', date: 'Jun 14, 2023', items: 1, total: '$3,200', status: 'Delivered' }
    ];

    const wishlist = [
        { id: 1, name: 'Eternity Diamond Band', price: '$1,850', image: 'band' },
        { id: 2, name: 'Sapphire & Diamond Pendant', price: '$2,450', image: 'pendant' },
        { id: 3, name: 'Pearl Drop Earrings', price: '$1,200', image: 'earrings' },
        { id: 4, name: 'Emerald Cut Solitaire', price: '$3,800', image: 'solitaire' }
    ];

    const addresses = [
        { id: 1, name: 'Home', address: '123 Luxury Lane, Beverly Hills, CA 90210', isDefault: true },
        { id: 2, name: 'Office', address: '456 Diamond Street, Suite 1200, Los Angeles, CA 90067', isDefault: false }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        setUserData(formData);
        setEditMode(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <FaShoppingBag className="text-gold-500" /> Order History
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.items}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-semibold">{order.total}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{order.status}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-gold-500 hover:text-gold-700 font-medium">View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex justify-between items-center">
                            <p className="text-gray-600">Showing 4 of {userData.orders} orders</p>
                            <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg transition-colors">
                                View All Orders
                            </button>
                        </div>
                    </div>
                );

            case 'wishlist':
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <FaHeart className="text-gold-500" /> Your Wishlist
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {wishlist.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-6 last:border-0 last:pb-0">
                                    <div className="bg-gray-100 border border-gray-200 rounded-xl w-24 h-24 flex items-center justify-center">
                                        <IoDiamondOutline className="text-4xl text-gold-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-gold-500 font-bold my-1">{item.price}</p>
                                        <div className="flex gap-3 mt-3">
                                            <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                                Add to Cart
                                            </button>
                                            <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm transition-colors">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <button className="border-2 border-gold-500 text-gold-500 hover:bg-gold-50 px-6 py-3 rounded-lg transition-colors font-medium">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                );

            case 'addresses':
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gold-500" /> Saved Addresses
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {addresses.map((address) => (
                                <div key={address.id} className={`border rounded-xl p-5 relative ${address.isDefault ? 'border-gold-500 bg-gold-50' : 'border-gray-200'}`}>
                                    {address.isDefault && (
                                        <span className="absolute top-3 right-3 bg-gold-500 text-white text-xs px-2 py-1 rounded-full">Default</span>
                                    )}
                                    <h3 className="font-bold text-lg mb-2">{address.name}</h3>
                                    <p className="text-gray-600 mb-4">{address.address}</p>
                                    <div className="flex gap-3">
                                        <button className="text-gold-500 hover:text-gold-700 text-sm font-medium">Edit</button>
                                        {!address.isDefault && (
                                            <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">Set as Default</button>
                                        )}
                                        <button className="text-red-500 hover:text-red-700 text-sm font-medium ml-auto">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-xl font-bold mb-4">Add New Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Full Name" className="border border-gray-300 rounded-lg px-4 py-3" />
                                <input type="text" placeholder="Phone Number" className="border border-gray-300 rounded-lg px-4 py-3" />
                                <input type="text" placeholder="Address Line 1" className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2" />
                                <input type="text" placeholder="City" className="border border-gray-300 rounded-lg px-4 py-3" />
                                <input type="text" placeholder="State" className="border border-gray-300 rounded-lg px-4 py-3" />
                                <input type="text" placeholder="Postal Code" className="border border-gray-300 rounded-lg px-4 py-3" />
                                <select className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2">
                                    <option>Select Country</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Canada</option>
                                    <option>Australia</option>
                                </select>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg transition-colors">
                                    Save Address
                                </button>
                                <button className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <FaCog className="text-gold-500" /> Account Settings
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold mb-3">Password</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                    <input type="password" placeholder="Current Password" className="border border-gray-300 rounded-lg px-4 py-3" />
                                    <input type="password" placeholder="New Password" className="border border-gray-300 rounded-lg px-4 py-3" />
                                    <input type="password" placeholder="Confirm New Password" className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2" />
                                </div>
                                <button className="mt-4 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg transition-colors">
                                    Change Password
                                </button>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-lg font-bold mb-3">Notification Preferences</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Email Notifications</h4>
                                            <p className="text-gray-600 text-sm">Receive updates about orders and promotions</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">SMS Notifications</h4>
                                            <p className="text-gray-600 text-sm">Get order updates via text message</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Promotional Emails</h4>
                                            <p className="text-gray-600 text-sm">Receive exclusive offers and updates</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'profile':
            default:
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <FaUser className="text-gold-500" /> Profile Information
                            </h2>
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="text-gold-500 hover:text-gold-700 font-medium flex items-center gap-1"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
                                    <FaUser className="text-4xl text-gray-400" />
                                </div>
                                <button className="w-full border border-gold-500 text-gold-500 hover:bg-gold-50 py-2 rounded-lg transition-colors mb-6">
                                    Change Photo
                                </button>

                                <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <IoDiamondOutline className="text-xl text-gold-500" />
                                        <h3 className="font-semibold">Mirosa Rewards</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        You have 1,250 points. Redeem for exclusive discounts and early access to new collections.
                                    </p>
                                    <button className="bg-gold-500 hover:bg-gold-600 text-white w-full py-2 rounded-lg text-sm transition-colors">
                                        View Rewards
                                    </button>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-gray-600 mb-2">Full Name</label>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-lg px-4 py-3 w-full"
                                            />
                                        ) : (
                                            <p className="font-medium">{userData.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 mb-2">Email Address</label>
                                        {editMode ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-lg px-4 py-3 w-full"
                                            />
                                        ) : (
                                            <p className="font-medium">{userData.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 mb-2">Phone Number</label>
                                        {editMode ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-lg px-4 py-3 w-full"
                                            />
                                        ) : (
                                            <p className="font-medium">{userData.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 mb-2">Member Since</label>
                                        <p className="font-medium">{userData.joinDate}</p>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-bold mb-4">Account Overview</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                                            <p className="text-2xl font-bold text-gold-500">{userData.orders}</p>
                                            <p className="text-gray-600">Total Orders</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                                            <p className="text-2xl font-bold text-gold-500">{userData.wishlist}</p>
                                            <p className="text-gray-600">Wishlist Items</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold">Your Account</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Manage your profile, orders, wishlist and account settings
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
                                    <FaUser className="text-xl text-gray-400" />
                                </div>
                                <div>
                                    <h2 className="font-bold">{userData.name}</h2>
                                    <p className="text-gray-600 text-sm">{userData.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                {[
                                    { id: 'profile', icon: <FaUser />, label: 'My Profile' },
                                    { id: 'orders', icon: <FaShoppingBag />, label: 'My Orders' },
                                    { id: 'wishlist', icon: <FaHeart />, label: 'Wishlist' },
                                    { id: 'addresses', icon: <FaMapMarkerAlt />, label: 'Addresses' },
                                    { id: 'settings', icon: <FaCog />, label: 'Settings' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === item.id
                                            ? 'bg-gold-500 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </button>
                                ))}

                                <button className="w-full text-left flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                                    <span className="text-lg"><FaSignOutAlt /></span>
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>

                        <div className="bg-gradient-to-r from-gold-500 to-gold-700 rounded-xl shadow-sm p-6 mt-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <IoDiamondOutline className="text-2xl" />
                                <h3 className="font-bold text-lg">Premium Membership</h3>
                            </div>
                            <p className="text-gold-100 mb-4">
                                Upgrade to enjoy exclusive benefits, early access to new collections, and personal shopping services.
                            </p>
                            <button className="bg-white text-gold-700 hover:bg-gray-100 w-full py-2 rounded-lg font-medium transition-colors">
                                Upgrade Now
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;