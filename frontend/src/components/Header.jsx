import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiShoppingCart, FiX, FiMenu, FiChevronDown } from 'react-icons/fi'; // Ensure FiShoppingCart is imported
import { FiMinus, FiPlus } from 'react-icons/fi'; // For quantity buttons
import { FaTrash } from 'react-icons/fa'; // For the delete icon
import { decryptData } from '../utils/secureStorage'; // Assuming you have this utility for decryption
import { jwtDecode } from "jwt-decode";
const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [cartOpen, setCartOpen] = useState(false);
    const [userPanelOpen, setUserPanelOpen] = useState(false);
    const userTimeout = useRef(null);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const { cartItems, cartTotal, cartItemCount, cartLoading, cartError, updateCartItemQuantity, removeFromCart } = useCart();

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            let role = null;

            if (token) {
                const decoded = jwtDecode(token);
                role = decoded.role;
            }

            const encryptedUser = localStorage.getItem("user");
            if (!encryptedUser) return;

            const decryptedUser = decryptData(encryptedUser);
            if (decryptedUser) {
                setUser({ ...decryptedUser, role }); // attach role too
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
            }
        } catch (err) {
            console.error("⚠️ Decryption or decoding failed:", err);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
        }
    }, []);

    const toggleCategory = (idx) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${backdendUrl}/api/category/featured-categories`);

                console.log("Fetched categories:", response.data);

                if (response.data.success) {
                    setCategories(response.data.categories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);
    // console.log("Categories:", categories);

    const handleCartModalQuantityChange = (itemId, currentQuantity, change, stock) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity < 1) {
            if (window.confirm("Are you sure you want to remove this item from your cart?")) {
                removeFromCart(itemId);
            }
        } else if (newQuantity > stock) {
            toast.error(`Only ${stock} items are available in stock.`);
        } else {
            updateCartItemQuantity(itemId, newQuantity);
        }
    };


    return (
        <header className="text-ivory sticky top-0 z-50 shadow-md">
            {/* Announcement Bar */}
            <div className="bg-maroon text-white text-sm text-center py-2 px-4 fraunces">
                Consult a Diamond Expert online or in-store for your Bespoke experience →
            </div>

            {/* Topbar */}
            <div className="flex items-center justify-between py-3 px-4 md:px-8 border-b border-gold">
                {/* Logo */}
                <div className="text-2xl font-bold fraunces">
                    <Link to={'/'}><img src="/logo/marron_icon.png" alt="logo" className='w-full h-20' /></Link>
                </div>

                {/* Search Bar (hidden on mobile) */}
                <div className="hidden md:flex flex-1 justify-center mx-4">
                    <input
                        type="text"
                        placeholder="Search jewelry..."
                        className="w-full max-w-2xl px-4 py-2 rounded-3xl border border-gray-700 bg-gray-100 text-midnight placeholder:text-platinum outline-0"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">

                    <div className="relative">
                        <FiUser
                            className="text-gold w-5 h-5 cursor-pointer"
                            onClick={() => setUserPanelOpen(true)}
                        />
                    </div>

                    <FiShoppingCart
                        className="text-gold w-5 h-5 cursor-pointer"
                        onClick={() => setCartOpen(true)}
                    />

                    {/* Hamburger Icon - visible on mobile */}
                    <button
                        className="md:hidden text-gold focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Bottom Nav - Desktop */}
            <nav className="hidden md:flex justify-center space-x-6 py-3 text-sm font-medium border-b border-gold relative">

                {categories?.map((cat, index) => (
                    <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(index)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <a href={cat.slug} className="text-[16px] fraunces">
                            {cat.name}
                        </a>
                        <div
                            className={`fixed left-0 right-0 bg-gray-100/30 shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-40 ${activeDropdown === index ? 'max-h-96 opacity-100 py-6 mt-3' : 'max-h-0 opacity-0 py-0'
                                }`}
                        >
                            <div className="max-w-6xl mx-auto flex justify-start space-x-4 px-8">
                                {cat.subcategories.map((item, idx) => (
                                    <div key={idx} className="w-48 text-center">
                                        <Link className="flex flex-col items-center" to={`/collections/${item.slug}`} state={{ subcategoryId: item._id }}>
                                            <img
                                                src={item.image.url}
                                                alt={item.name}
                                                className="w-full h-40 object-cover rounded-md mb-2"
                                            />
                                            <p className="text-md text-platinum fraunces px-5 py-2 bg-white rounded-full">{item.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <a href="/about" className="hover:text-gold transition text-[16px] fraunces">About</a>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-300 text-ivory p-4 space-y-4">
                    <input
                        type="text"
                        placeholder="Search jewelry..."
                        className="w-full px-4 py-2 rounded-md bg-light text-midnight placeholder:text-platinum"
                    />
                    <a href="#" className="block hover:text-gold">Contact Us</a>
                    <a href="#" className="block hover:text-gold">Wishlist</a>
                    <hr className="border-platinum" />
                    {categories.map((cat, idx) => (
                        <div key={idx}>
                            <button
                                className="flex justify-between items-center w-full hover:text-gold text-left"
                                onClick={() => toggleCategory(idx)}
                            >
                                <span className='fraunces'>{cat.name}</span>
                                <FiChevronDown className={`transform transition-transform ${expandedCategories[idx] ? 'rotate-180' : ''}`} />
                            </button>
                            {expandedCategories[idx] && (
                                <div className="pl-4 mt-2 space-y-2">
                                    {cat.sub.map((subItem, subIdx) => (
                                        <div key={subIdx} className="text-sm fraunces">
                                            {subItem.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <a href="#" className="block hover:text-gold">About</a>
                </div>
            )}

            {/* Cart Modal */}
            {cartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm transition-all duration-300">
                    {/* Slide-in Drawer */}
                    <div className="bg-white shadow-xl w-full md:w-[420px] h-full p-6 relative overflow-y-auto animate-slideInRight">

                        {/* Close Button */}
                        <button
                            className="absolute top-7 right-6 text-gray-600 hover:text-red-500 text-2xl"
                            onClick={() => setCartOpen(false)}
                        >
                            <FiX className='' />
                        </button>

                        {/* Title */}
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4 nunito uppercase">Shopping Cart</h2>

                        {/* States */}
                        {cartLoading ? (
                            <div className="text-center text-gray-500 py-8">Loading cart...</div>
                        ) : cartError ? (
                            <div className="text-center text-red-600 py-8">Error: {cartError}</div>
                        ) : cartItems.length === 0 ? (
                            <div className="text-center text-gray-600 py-8">Your cart is empty.</div>
                        ) : (
                            <>
                                {/* Cart Items */}
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex gap-4 border border-gray-200 p-4 rounded-lg shadow-sm"
                                        >
                                            <img
                                                src={item.mainImage || 'https://placehold.co/80x80/E0E0E0/6C6C6C?text=Img'}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {item.variantDetails?.material} {item.variantDetails?.purity}
                                                    {item.variantDetails?.size && ` | Size: ${item.variantDetails.size}`}
                                                </p>
                                                <p className="text-sm text-violet-800 font-medium mt-1">
                                                    ${(item.variantDetails?.price || 0).toFixed(2)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center mt-2 gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleCartModalQuantityChange(item._id, item.quantity, -1, item.variantDetails?.stock)
                                                        }
                                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm disabled:opacity-40"
                                                        disabled={item.quantity <= 1 || cartLoading}
                                                    >
                                                        <FiMinus />
                                                    </button>
                                                    <span className="px-3 text-base font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() =>
                                                            handleCartModalQuantityChange(item._id, item.quantity, 1, item.variantDetails?.stock)
                                                        }
                                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm disabled:opacity-40"
                                                        disabled={item.quantity >= (item.variantDetails?.stock || Infinity) || cartLoading}
                                                    >
                                                        <FiPlus />
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item._id)}
                                                        className="ml-auto text-red-500 text-sm hover:text-red-700 flex items-center gap-1"
                                                    >
                                                        <FaTrash /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="mt-8 border-t pt-4 space-y-2 text-gray-800 text-sm">
                                    <div className="flex justify-between font-medium">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link
                                    to="/cart"
                                    onClick={() => setCartOpen(false)}
                                    className="mt-6 block w-full text-center bg-violet-800 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition"
                                >
                                    View Full Cart
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}



            {/* User Side Panel */}
            {userPanelOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0  bg-opacity-40 z-40"
                        onClick={() => setUserPanelOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="fixed top-0 bottom-0 right-0 w-80 bg-gray-100 text-gray-900 z-50 shadow-lg p-6 flex flex-col">

                        {user ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl fraunces">Welcome, {user.name?.split(" ")[0]}</h2>
                                    <button onClick={() => setUserPanelOpen(false)} className="text-gold text-2xl cursor-pointer font-bold">&times;</button>
                                </div>
                                <ul className="space-y-4 text-md fraunces">
                                    {user.role === "admin" && (
                                        <li><a href="/admin/" className="hover:text-gold font-bold">Admin Panel</a></li>
                                    )}
                                    <li><a href="/profile" className="hover:text-gold">My Profile</a></li>
                                    <li><a href="/cart" className="hover:text-gold">My Cart</a></li>
                                    <li><a href="/wishlist" className="hover:text-gold">My Wishlist</a></li>
                                    <li><a href="/orders" className="hover:text-gold">My Orders</a></li>
                                    <li><a href="/settings" className="hover:text-gold">Settings</a></li>
                                    <li><a href="/logout" className="hover:text-gold">Logout</a></li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl fraunces">Hello, Guest</h2>
                                    <button onClick={() => setUserPanelOpen(false)} className="text-gold text-2xl font-bold">&times;</button>
                                </div>
                                <ul className="space-y-4 text-md fraunces">
                                    <li><a href="/login" className="hover:text-gold">Login / Signup</a></li>
                                    <li><a href="/cart" className="hover:text-gold">My Cart</a></li>
                                    <li><a href="/wishlist" className="hover:text-gold">My Wishlist</a></li>
                                    <li><a href="/orders" className="hover:text-gold">My Orders</a></li>
                                    <li><a href="/settings" className="hover:text-gold">Settings</a></li>
                                </ul>
                            </>
                        )}

                    </div>
                </>
            )}



        </header>
    );
}
