// import React, { useState, useRef, useEffect } from 'react';
// import { FiUser, FiShoppingCart, FiX, FiMenu, FiChevronDown } from 'react-icons/fi';
// import { FiMinus, FiPlus } from 'react-icons/fi';
// import { FaTrash } from 'react-icons/fa';
// import { decryptData } from '../utils/secureStorage';
// import { jwtDecode } from "jwt-decode";
// const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { useLocation, useNavigate } from "react-router-dom";

// export default function Header() {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activeDropdown, setActiveDropdown] = useState(null);
//     const [expandedCategories, setExpandedCategories] = useState({});
//     const [cartOpen, setCartOpen] = useState(false);
//     const [userPanelOpen, setUserPanelOpen] = useState(false);
//     const userTimeout = useRef(null);
//     const [user, setUser] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const { cartItems, cartTotal, cartItemCount, cartLoading, cartError, updateCartItemQuantity, removeFromCart } = useCart();
//     const navigate = useNavigate();

//     useEffect(() => {
//         try {
//             const token = localStorage.getItem("token");
//             let role = null;

//             if (token) {
//                 const decoded = jwtDecode(token);
//                 role = decoded.role;
//             }

//             const encryptedUser = localStorage.getItem("user");
//             if (!encryptedUser) return;

//             const decryptedUser = decryptData(encryptedUser);
//             if (decryptedUser) {
//                 setUser({ ...decryptedUser, role }); // attach role too
//             } else {
//                 localStorage.removeItem("user");
//                 localStorage.removeItem("token");
//                 setUser(null);
//             }
//         } catch (err) {
//             console.error("⚠️ Decryption or decoding failed:", err);
//             localStorage.removeItem("user");
//             localStorage.removeItem("token");
//             setUser(null);
//         }
//     }, []);

//     const toggleCategory = (idx) => {
//         setExpandedCategories((prev) => ({
//             ...prev,
//             [idx]: !prev[idx],
//         }));
//     };

//     useEffect(() => {

//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backdendUrl}/api/category/featured-categories`);

//                 console.log("Fetched categories:", response.data);

//                 if (response.data.success) {
//                     setCategories(response.data.categories);
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//     }, []);
//     // console.log("Categories:", categories);

//     const handleCartModalQuantityChange = (itemId, currentQuantity, change, stock) => {
//         const newQuantity = currentQuantity + change;
//         if (newQuantity < 1) {
//             if (window.confirm("Are you sure you want to remove this item from your cart?")) {
//                 removeFromCart(itemId);
//             }
//         } else if (newQuantity > stock) {
//             toast.error(`Only ${stock} items are available in stock.`);
//         } else {
//             updateCartItemQuantity(itemId, newQuantity);
//         }
//     };

//     return (
//         <header className="text-ivory sticky top-0 z-50 shadow-md">
//             {/* Announcement Bar */}
//             <div className="bg-maroon text-white text-sm text-center py-2 px-4 fraunces">
//                 Consult a Diamond Expert online or in-store for your Bespoke experience →
//             </div>

//             {/* Topbar */}
//             <div className="flex items-center justify-between py-3 px-4 md:px-8 border-b border-gold">
//                 {/* Logo */}
//                 <div className="text-2xl font-bold fraunces">
//                     <Link to={'/'}><img src="/logo/marron_icon.png" alt="logo" className='w-full h-20' /></Link>
//                 </div>

//                 {/* Search Bar (hidden on mobile) */}
//                 <div className="hidden md:flex flex-1 justify-center mx-4">
//                     <input
//                         type="text"
//                         placeholder="Search jewelry..."
//                         className="w-full max-w-2xl px-4 py-2 rounded-3xl border border-gray-700 bg-gray-100 text-midnight placeholder:text-platinum outline-0"
//                     />
//                 </div>

//                 {/* Icons */}
//                 <div className="flex items-center space-x-4">

//                     <div className="relative">
//                         <FiUser
//                             className="text-gold w-5 h-5 cursor-pointer"
//                             onClick={() => setUserPanelOpen(true)}
//                         />
//                     </div>

//                     <FiShoppingCart
//                         className="text-gold w-5 h-5 cursor-pointer"
//                         onClick={() => setCartOpen(true)}
//                     />

//                     {/* Hamburger Icon - visible on mobile */}
//                     <button
//                         className="md:hidden text-gold focus:outline-none"
//                         onClick={() => setMenuOpen(!menuOpen)}
//                     >
//                         {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//                     </button>
//                 </div>
//             </div>

//             {/* Bottom Nav - Desktop */}
//             <nav className="hidden md:flex justify-center space-x-6 py-3 text-sm font-medium border-b border-gold relative">

//                 {categories?.map((cat, index) => (
//                     <div
//                         key={index}
//                         className="relative"
//                         onMouseEnter={() => setActiveDropdown(index)}
//                         onMouseLeave={() => setActiveDropdown(null)}
//                     >
//                         <a href={cat.slug} className="text-[16px] fraunces">
//                             {cat.name}
//                         </a>
//                         <div
//                             className={`fixed left-0 right-0 bg-gray-100/30 shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-40 ${activeDropdown === index ? 'max-h-96 opacity-100 py-6 mt-3' : 'max-h-0 opacity-0 py-0'
//                                 }`}
//                         >
//                             <div className="max-w-6xl mx-auto flex justify-start space-x-4 px-8">
//                                 {cat.subcategories.map((item, idx) => (
//                                     <div key={idx} className="w-48 text-center">
//                                         <Link className="flex flex-col items-center" to={`/collections/${item.slug}`} state={{ subcategoryId: item._id }}>
//                                             <img
//                                                 src={item.image.url}
//                                                 alt={item.name}
//                                                 className="w-full h-40 object-cover rounded-md mb-2"
//                                             />
//                                             <p className="text-md text-platinum fraunces px-5 py-2 bg-white rounded-full">{item.name}</p>
//                                         </Link>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 <a href="/about" className="hover:text-gold transition text-[16px] fraunces">About</a>
//             </nav>

//             {/* Mobile Menu */}
//             {menuOpen && (
//                 <div className="md:hidden bg-gray-300 text-ivory p-4 space-y-4">
//                     <input
//                         type="text"
//                         placeholder="Search jewelry..."
//                         className="w-full px-4 py-2 rounded-md bg-light text-midnight placeholder:text-platinum"
//                     />
//                     <a href="#" className="block hover:text-gold">Contact Us</a>
//                     <a href="#" className="block hover:text-gold">Wishlist</a>
//                     <hr className="border-platinum" />
//                     {categories.map((cat, idx) => (
//                         <div key={idx}>
//                             <button
//                                 className="flex justify-between items-center w-full hover:text-gold text-left"
//                                 onClick={() => toggleCategory(idx)}
//                             >
//                                 <span className='fraunces'>{cat.name}</span>
//                                 <FiChevronDown className={`transform transition-transform ${expandedCategories[idx] ? 'rotate-180' : ''}`} />
//                             </button>
//                             {expandedCategories[idx] && (
//                                 <div className="pl-4 mt-2 space-y-2">
//                                     {cat.sub.map((subItem, subIdx) => (
//                                         <div key={subIdx} className="text-sm fraunces">
//                                             {subItem.name}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                     <a href="#" className="block hover:text-gold">About</a>
//                 </div>
//             )}

//             {/* Cart Modal */}
//             {cartOpen && (
//                 <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm transition-all duration-300">
//                     {/* Slide-in Drawer */}
//                     <div className="bg-white shadow-xl w-full md:w-[420px] h-full p-6 relative overflow-y-auto animate-slideInRight">

//                         {/* Close Button */}
//                         <button
//                             className="absolute top-7 right-6 text-gray-600 hover:text-red-500 text-2xl"
//                             onClick={() => setCartOpen(false)}
//                         >
//                             <FiX className='' />
//                         </button>

//                         {/* Title */}
//                         <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4 nunito uppercase">Shopping Cart</h2>

//                         {/* States */}
//                         {cartLoading ? (
//                             <div className="text-center text-gray-500 py-8">Loading cart...</div>
//                         ) : cartError ? (
//                             <div className="text-center text-red-600 py-8">Error: {cartError}</div>
//                         ) : cartItems.length === 0 ? (
//                             <div className="text-center text-gray-600 py-8">Your cart is empty.</div>
//                         ) : (
//                             <>
//                                 {/* Cart Items */}
//                                 <div className="space-y-6">
//                                     {cartItems.map((item) => (
//                                         <div
//                                             key={item._id}
//                                             className="flex gap-4 border border-gray-200 p-4 rounded-lg shadow-sm"
//                                         >
//                                             <img
//                                                 src={item.mainImage || 'https://placehold.co/80x80/E0E0E0/6C6C6C?text=Img'}
//                                                 alt={item.name}
//                                                 className="w-20 h-20 object-cover rounded-md"
//                                             />
//                                             <div className="flex-1">
//                                                 <h3 className="text-lg font-semibold text-gray-800">
//                                                     {item.name}
//                                                 </h3>
//                                                 <p className="text-sm text-gray-500">
//                                                     {item.variantDetails?.material} {item.variantDetails?.purity}
//                                                     {item.variantDetails?.size && ` | Size: ${item.variantDetails.size}`}
//                                                 </p>
//                                                 <p className="text-sm text-violet-800 font-medium mt-1">
//                                                     ${(item.variantDetails?.price || 0).toFixed(2)}
//                                                 </p>

//                                                 {/* Quantity Controls */}
//                                                 <div className="flex items-center mt-2 gap-2">
//                                                     <button
//                                                         onClick={() =>
//                                                             handleCartModalQuantityChange(item._id, item.quantity, -1, item.variantDetails?.stock)
//                                                         }
//                                                         className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm disabled:opacity-40"
//                                                         disabled={item.quantity <= 1 || cartLoading}
//                                                     >
//                                                         <FiMinus />
//                                                     </button>
//                                                     <span className="px-3 text-base font-medium">{item.quantity}</span>
//                                                     <button
//                                                         onClick={() =>
//                                                             handleCartModalQuantityChange(item._id, item.quantity, 1, item.variantDetails?.stock)
//                                                         }
//                                                         className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm disabled:opacity-40"
//                                                         disabled={item.quantity >= (item.variantDetails?.stock || Infinity) || cartLoading}
//                                                     >
//                                                         <FiPlus />
//                                                     </button>
//                                                     <button
//                                                         onClick={() => removeFromCart(item._id)}
//                                                         className="ml-auto text-red-500 text-sm hover:text-red-700 flex items-center gap-1"
//                                                     >
//                                                         <FaTrash /> Remove
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Summary */}
//                                 <div className="mt-8 border-t pt-4 space-y-2 text-gray-800 text-sm">
//                                     <div className="flex justify-between font-medium">
//                                         <span>Subtotal</span>
//                                         <span>${cartTotal.toFixed(2)}</span>
//                                     </div>
//                                     <div className="flex justify-between text-lg font-bold">
//                                         <span>Total</span>
//                                         <span>${cartTotal.toFixed(2)}</span>
//                                     </div>
//                                 </div>

//                                 {/* CTA */}
//                                 <Link
//                                     to="/cart"
//                                     onClick={() => setCartOpen(false)}
//                                     className="mt-6 block w-full text-center bg-violet-800 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition"
//                                 >
//                                     View Full Cart
//                                 </Link>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}



//             {/* User Side Panel */}
//             {userPanelOpen && (
//                 <>
//                     {/* Overlay */}
//                     <div
//                         className="fixed inset-0  bg-opacity-40 z-40"
//                         onClick={() => setUserPanelOpen(false)}
//                     />

//                     {/* Sidebar */}
//                     <div className="fixed top-0 bottom-0 right-0 w-80 bg-gray-100 text-gray-900 z-50 shadow-lg p-6 flex flex-col">

//                         {user ? (
//                             <>
//                                 <div className="flex justify-between items-center mb-6">
//                                     <h2 className="text-xl fraunces">Welcome, {user.name?.split(" ")[0]}</h2>
//                                     <button onClick={() => setUserPanelOpen(false)} className="text-gold text-2xl cursor-pointer font-bold">&times;</button>
//                                 </div>
//                                 <ul className="space-y-4 text-md fraunces">
//                                     {user.role === "admin" && (
//                                         <li><a href="/admin/" className="hover:text-gold font-bold">Admin Panel</a></li>
//                                     )}
//                                     <li><a href="/profile" className="hover:text-gold">My Profile</a></li>
//                                     <li><a href="/cart" className="hover:text-gold">My Cart</a></li>
//                                     <li><a href="/wishlist" className="hover:text-gold">My Wishlist</a></li>
//                                     <li>
//                                         <Link to="/profile?tab=orders" className="text-sm hover:underline">
//                                             My Orders
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/profile?tab=settings" className="text-sm hover:underline">
//                                             Settings
//                                         </Link>
//                                     </li>
//                                     <li><a href="/logout" className="hover:text-gold">Logout</a></li>
//                                 </ul>
//                             </>
//                         ) : (
//                             <>
//                                 <div className="flex justify-between items-center mb-6">
//                                     <h2 className="text-xl fraunces">Hello, Guest</h2>
//                                     <button onClick={() => setUserPanelOpen(false)} className="text-gold text-2xl font-bold">&times;</button>
//                                 </div>
//                                 <ul className="space-y-4 text-md fraunces">
//                                     <li><a href="/login" className="hover:text-gold">Login / Signup</a></li>
//                                     <li><a href="/cart" className="hover:text-gold">My Cart</a></li>
//                                     <li><a href="/wishlist" className="hover:text-gold">My Wishlist</a></li>
//                                     <li><a href="/orders" className="hover:text-gold">My Orders</a></li>
//                                     <li><a href="/settings" className="hover:text-gold">Settings</a></li>
//                                 </ul>
//                             </>
//                         )}

//                     </div>
//                 </>
//             )}



//         </header>
//     );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiMenu, FiX, FiUser, FiShoppingCart, FiHeart, FiChevronDown, FiMinus, FiPlus } from 'react-icons/fi';
// import { FaTrash } from "react-icons/fa";
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";
// import { toast } from 'react-toastify';
// import { decryptData } from '../utils/secureStorage'; // Assuming you have this utility
// import { useCart } from '../context/CartContext';
// import { useWishlist } from '../context/WishlistContext'; // Import useWishlist

// const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

// export default function Header() {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activeDropdown, setActiveDropdown] = useState(null);
//     const [expandedCategories, setExpandedCategories] = useState({});
//     const [cartOpen, setCartOpen] = useState(false);
//     const [userPanelOpen, setUserPanelOpen] = useState(false);
//     const [user, setUser] = useState(null);
//     const [categories, setCategories] = useState([]);

//     // Use contexts for cart and wishlist
//     const { cartItems, cartTotal, cartItemCount, cartLoading, updateCartItemQuantity, removeFromCart } = useCart();
//     const { wishlist } = useWishlist(); // Get wishlist from its context

//     const navigate = useNavigate();

//     useEffect(() => {
//         try {
//             const token = localStorage.getItem("token");
//             let role = null;

//             if (token) {
//                 const decoded = jwtDecode(token);
//                 role = decoded.role;
//             }

//             const encryptedUser = localStorage.getItem("user");
//             if (!encryptedUser) return;

//             const decryptedUser = decryptData(encryptedUser);
//             if (decryptedUser) {
//                 setUser({ ...decryptedUser, role });
//             } else {
//                 localStorage.removeItem("user");
//                 localStorage.removeItem("token");
//                 setUser(null);
//             }
//         } catch (err) {
//             console.error("⚠️ Decryption or decoding failed:", err);
//             localStorage.removeItem("user");
//             localStorage.removeItem("token");
//             setUser(null);
//         }
//     }, []);

//     const toggleCategory = (idx) => {
//         setExpandedCategories((prev) => ({
//             ...prev,
//             [idx]: !prev[idx],
//         }));
//     };

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get(`${backdendUrl}/api/category/featured-categories`);
//                 if (response.data.success) {
//                     setCategories(response.data.categories);
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//     }, []);

//     const handleCartModalQuantityChange = (itemId, currentQuantity, change, stock) => {
//         const newQuantity = currentQuantity + change;
//         if (newQuantity < 1) {
//             // Using a simple browser confirm, consider a custom modal for better UX
//             if (window.confirm("Are you sure you want to remove this item from your cart?")) {
//                 removeFromCart(itemId);
//             }
//         } else if (newQuantity > stock) {
//             toast.error(`Only ${stock} items are available in stock.`);
//         } else {
//             updateCartItemQuantity(itemId, newQuantity);
//         }
//     };

//     return (
//         <header className="text-ivory sticky top-0 z-50 shadow-md bg-white">
//             {/* Announcement Bar */}
//             <div className="bg-maroon text-white text-sm text-center py-2 px-4 fraunces">
//                 Consult a Diamond Expert online or in-store for your Bespoke experience →
//             </div>

//             {/* Topbar */}
//             <div className="flex items-center justify-between py-3 px-4 md:px-8 border-b border-gold">
//                 {/* Logo */}
//                 <div className="text-2xl font-bold fraunces">
//                     <Link to={'/'}><img src="/logo/marron_icon.png" alt="logo" className='w-full h-13 sm:h-16 md:h-20' /></Link>
//                 </div>

//                 {/* Search Bar (hidden on mobile) */}
//                 <div className="hidden md:flex flex-1 justify-center mx-4">
//                     <input
//                         type="text"
//                         placeholder="Search jewelry..."
//                         className="w-full max-w-2xl px-4 py-2 rounded-3xl border border-gray-300 bg-gray-100 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-maroon"
//                     />
//                 </div>

//                 {/* Icons */}
//                 <div className="flex items-center space-x-4 md:space-x-6">
//                     <div className="relative">
//                         <FiUser
//                             className="text-gray-700 w-6 h-6 cursor-pointer hover:text-maroon transition-colors"
//                             onClick={() => setUserPanelOpen(true)}
//                         />
//                     </div>

//                     {/* Wishlist Icon with Badge */}
//                     <Link to="/wishlist" className="relative">
//                         <FiHeart className="text-gray-700 w-6 h-6 cursor-pointer hover:text-maroon transition-colors" />
//                         {wishlist.length > 0 && (
//                             <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">
//                                 {wishlist.length}
//                             </span>
//                         )}
//                     </Link>

//                     {/* Shopping Cart Icon with Badge */}
//                     <button onClick={() => setCartOpen(true)} className="relative">
//                         <FiShoppingCart className="text-gray-700 w-6 h-6 cursor-pointer hover:text-maroon transition-colors" />
//                         {cartItemCount > 0 && (
//                             <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">
//                                 {cartItemCount}
//                             </span>
//                         )}
//                     </button>

//                     {/* Hamburger Icon - visible on mobile */}
//                     <button
//                         className="md:hidden text-gray-700 focus:outline-none"
//                         onClick={() => setMenuOpen(!menuOpen)}
//                     >
//                         {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//                     </button>
//                 </div>
//             </div>

//             {/* Bottom Nav - Desktop */}
//             <nav className="hidden md:flex justify-center space-x-8 py-3 text-sm font-medium border-b border-gold bg-white">
//                 {categories?.map((cat, index) => (
//                     <div
//                         key={index}
//                         className="relative group"
//                         onMouseEnter={() => setActiveDropdown(index)}
//                         onMouseLeave={() => setActiveDropdown(null)}
//                     >
//                         <Link to={`/collections/${cat.slug}`} state={{ categoryId: cat._id }} className="text-gray-800 text-[16px] fraunces hover:text-maroon transition-colors">
//                             {cat.name}
//                         </Link>
//                         <div
//                             className={`fixed left-0 right-0 bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-40 ${activeDropdown === index ? 'max-h-96 opacity-100 py-6 mt-3' : 'max-h-0 opacity-0 py-0'
//                                 }`}
//                         >
//                             <div className="max-w-6xl mx-auto flex justify-start space-x-4 px-8">
//                                 {cat.subcategories.map((item, idx) => (
//                                     <div key={idx} className="w-48 text-center">
//                                         <Link className="flex flex-col items-center" to={`/collections/${item.slug}`} state={{ subcategoryId: item._id }}>
//                                             <img
//                                                 src={item.image.url}
//                                                 alt={item.name}
//                                                 className="w-full h-40 object-cover rounded-md mb-2"
//                                             />
//                                             <p className="text-md text-gray-700 fraunces px-5 py-2 bg-gray-100 rounded-full hover:bg-maroon hover:text-white transition-colors">{item.name}</p>
//                                         </Link>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 <a href="/about" className="hover:text-maroon transition text-[16px] fraunces text-gray-800">About</a>
//             </nav>

//             {/* Mobile Menu */}
//             {menuOpen && (
//                 <div className="md:hidden bg-white text-gray-800 p-4 space-y-4">
//                     <input
//                         type="text"
//                         placeholder="Search jewelry..."
//                         className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 placeholder:text-gray-500"
//                     />
//                     <a href="#" className="block hover:text-maroon">Contact Us</a>
//                     <hr className="border-gray-200" />
//                     {categories.map((cat, idx) => (
//                         <div key={idx}>
//                             <button
//                                 className="flex justify-between items-center w-full hover:text-maroon text-left"
//                                 onClick={() => toggleCategory(idx)}
//                             >
//                                 <span className='fraunces'>{cat.name}</span>
//                                 <FiChevronDown className={`transform transition-transform ${expandedCategories[idx] ? 'rotate-180' : ''}`} />
//                             </button>
//                             {expandedCategories[idx] && (
//                                 <div className="pl-4 mt-2 space-y-2">
//                                     {cat.subcategories.map((subItem, subIdx) => (
//                                         <Link to={`/collections/${subItem.slug}`} state={{ subcategoryId: subItem._id }} key={subIdx} className="block text-sm fraunces hover:text-maroon">
//                                             {subItem.name}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                     <a href="/about" className="block hover:text-maroon">About</a>
//                 </div>
//             )}

//             {/* Cart Modal */}
//             {cartOpen && (
//                 <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
//                     <div className="bg-white shadow-xl w-full md:w-[420px] h-full p-6 relative overflow-y-auto animate-slideInRight">
//                         <button
//                             className="absolute top-7 right-6 text-gray-600 hover:text-red-500 text-2xl"
//                             onClick={() => setCartOpen(false)}
//                         >
//                             <FiX />
//                         </button>
//                         <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4 nunito uppercase">Shopping Cart</h2>
//                         {cartLoading ? (
//                             <div className="text-center text-gray-500 py-8">Loading cart...</div>
//                         ) : cartItems.length === 0 ? (
//                             <div className="text-center text-gray-600 py-8">Your cart is empty.</div>
//                         ) : (
//                             <>
//                                 <div className="space-y-6">
//                                     {cartItems.map((item) => (
//                                         <div
//                                             key={item._id}
//                                             className="flex gap-4 border border-gray-200 p-4 rounded-lg shadow-sm"
//                                         >
//                                             <img
//                                                 src={item.mainImage || 'https://placehold.co/80x80/E0E0E0/6C6C6C?text=Img'}
//                                                 alt={item.name}
//                                                 className="w-20 h-20 object-cover rounded-md"
//                                             />
//                                             <div className="flex-1">
//                                                 <h3 className="text-lg font-semibold text-gray-800">
//                                                     {item.name}
//                                                 </h3>
//                                                 <p className="text-sm text-gray-500">
//                                                     {item.variantDetails?.material} {item.variantDetails?.purity}
//                                                     {item.variantDetails?.size && ` | Size: ${item.variantDetails.size}`}
//                                                 </p>
//                                                 <p className="text-sm text-violet-800 font-medium mt-1">
//                                                     ${(item.variantDetails?.price || 0).toFixed(2)}
//                                                 </p>
//                                                 <div className="flex items-center mt-2 gap-2">
//                                                     <button
//                                                         onClick={() => handleCartModalQuantityChange(item._id, item.quantity, -1, item.variantDetails?.stock)}
//                                                         className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm disabled:opacity-40"
//                                                         disabled={item.quantity <= 1 || cartLoading}
//                                                     >
//                                                         <FiMinus />
//                                                     </button>
//                                                     <span className="px-3 text-base font-medium">{item.quantity}</span>
//                                                     <button
//                                                         onClick={() => handleCartModalQuantityChange(item._id, item.quantity, 1, item.variantDetails?.stock)}
//                                                         className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm disabled:opacity-40"
//                                                         disabled={item.quantity >= (item.variantDetails?.stock || Infinity) || cartLoading}
//                                                     >
//                                                         <FiPlus />
//                                                     </button>
//                                                     <button
//                                                         onClick={() => removeFromCart(item._id)}
//                                                         className="ml-auto text-red-500 text-sm hover:text-red-700 flex items-center gap-1"
//                                                     >
//                                                         <FaTrash /> Remove
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mt-8 border-t pt-4 space-y-2 text-gray-800 text-sm">
//                                     <div className="flex justify-between font-medium">
//                                         <span>Subtotal</span>
//                                         <span>${cartTotal.toFixed(2)}</span>
//                                     </div>
//                                     <div className="flex justify-between text-lg font-bold">
//                                         <span>Total</span>
//                                         <span>${cartTotal.toFixed(2)}</span>
//                                     </div>
//                                 </div>
//                                 <Link
//                                     to="/cart"
//                                     onClick={() => setCartOpen(false)}
//                                     className="mt-6 block w-full text-center bg-violet-800 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition"
//                                 >
//                                     View Full Cart
//                                 </Link>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* User Side Panel */}
//             {userPanelOpen && (
//                 <>
//                     <div
//                         className="fixed inset-0 bg-black/20 bg-opacity-40 z-40"
//                         onClick={() => setUserPanelOpen(false)}
//                     />
//                     <div className="fixed top-0 bottom-0 right-0 w-80 bg-gray-100 text-gray-900 z-50 shadow-lg p-6 flex flex-col animate-slideInRight">
//                         {user ? (
//                             <>
//                                 <div className="flex justify-between items-center mb-6">
//                                     <h2 className="text-xl fraunces">Welcome, {user.name?.split(" ")[0]}</h2>
//                                     <button onClick={() => setUserPanelOpen(false)} className="text-gray-600 hover:text-red-500 text-2xl cursor-pointer font-bold">&times;</button>
//                                 </div>
//                                 <ul className="space-y-4 text-md fraunces">
//                                     {user.role === "admin" && (
//                                         <li><a href="/admin/" className="hover:text-maroon font-bold">Admin Panel</a></li>
//                                     )}
//                                     <li><Link to="/profile" onClick={() => setUserPanelOpen(false)} className="hover:text-maroon">My Profile</Link></li>
//                                     <li><Link to="/cart" onClick={() => setUserPanelOpen(false)} className="hover:text-maroon">My Cart</Link></li>
//                                     <li><Link to="/wishlist" onClick={() => setUserPanelOpen(false)} className="hover:text-maroon">My Wishlist</Link></li>
//                                     <li><Link to="/profile?tab=orders" onClick={() => setUserPanelOpen(false)} className="hover:text-maroon">My Orders</Link></li>
//                                     <li><a href="/logout" className="hover:text-maroon">Logout</a></li>
//                                 </ul>
//                             </>
//                         ) : (
//                             <>
//                                 <div className="flex justify-between items-center mb-6">
//                                     <h2 className="text-xl fraunces">Hello, Guest</h2>
//                                     <button onClick={() => setUserPanelOpen(false)} className="text-gray-600 hover:text-red-500 text-2xl font-bold">&times;</button>
//                                 </div>
//                                 <ul className="space-y-4 text-md fraunces">
//                                     <li><Link to="/login" onClick={() => setUserPanelOpen(false)} className="hover:text-maroon">Login / Signup</Link></li>
//                                     <li><Link to="/cart" onClick={() => setUserPanelOpen(false)} className="hover:text-maroon">My Cart</Link></li>
//                                     <li><Link to="/wishlist" onClick={() => setUserPanelOpen(false)} className="hover:text-maroon">My Wishlist</Link></li>
//                                 </ul>
//                             </>
//                         )}
//                     </div>
//                 </>
//             )}
//         </header>
//     );
// }


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiShoppingCart, FiHeart, FiChevronDown, FiMinus, FiPlus, FiLoader, FiSearch, FiLogOut } from 'react-icons/fi';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { decryptData } from '../utils/secureStorage'; // Assuming you have this utility
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // Import useWishlist
import { useAuth } from '../context/AuthContext';
import useOutsideClick from '../hooks/useOutsideClick';

const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [cartOpen, setCartOpen] = useState(false);
    const [userPanelOpen, setUserPanelOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);

    // --- Live Search States ---
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay
    const searchRef = useRef(null);

    // Use contexts for cart and wishlist
    const { cartItems, cartTotal, cartItemCount, cartLoading, updateCartItemQuantity, removeFromCart } = useCart();
    const { wishlist } = useWishlist(); // Get wishlist from its context
    const { logout } = useAuth();

    const navigate = useNavigate();

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
                setUser({ ...decryptedUser, role });
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
                if (response.data.success) {
                    setCategories(response.data.categories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCartModalQuantityChange = (itemId, currentQuantity, change, stock) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity < 1) {
            // Using a simple browser confirm, consider a custom modal for better UX
            if (window.confirm("Are you sure you want to remove this item from your cart?")) {
                removeFromCart(itemId);
            }
        } else if (newQuantity > stock) {
            toast.error(`Only ${stock} items are available in stock.`);
        } else {
            updateCartItemQuantity(itemId, newQuantity);
        }
    };


    // --- useEffect for Live Search API Call ---
    useEffect(() => {
        if (debouncedSearchQuery.length > 1) {
            setIsSearchLoading(true);
            axios.get(`${backdendUrl}/api/product/search?q=${encodeURIComponent(debouncedSearchQuery)}`)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data.results, 'search results')
                        setSearchResults(response.data.results);
                    } else {
                        setSearchResults(null);
                    }
                })
                .catch(error => {
                    console.error("Search API error:", error);
                    setSearchResults(null);
                })
                .finally(() => {
                    setIsSearchLoading(false);
                });
        } else {
            setSearchResults(null);
        }
    }, [debouncedSearchQuery]);

    // --- useEffect to handle clicks outside of search ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeSearch = () => {
        setIsSearchFocused(false);
        setSearchQuery('');
    }

    const handleLogout = () => {
        logout(); // 🔥 clear auth
        navigate("/login"); // 👋 redirect
    };

    // Create a ref for your cart's container
    const cartRef = useRef(null);

    // This function will be called by the hook
    const closeCart = () => {
        setCartOpen(false);
    };

    useOutsideClick(cartRef, closeCart);

    return (
        <header className="text-ivory sticky top-0 z-50 shadow-md bg-white">
            {/* Announcement Bar */}
            <div className="bg-maroon text-white text-sm text-center py-2 px-4 fraunces">
                Consult a Diamond Expert online or in-store for your Bespoke experience →
            </div>

            {/* --- DESKTOP HEADER --- */}
            <div className="hidden md:flex items-center justify-between py-3 px-8 border-b border-gold">
                <div className="text-2xl font-bold fraunces">
                    <Link to={'/'}><img src="/logo/marron_icon.png" alt="logo" className='w-full h-20' /></Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div ref={searchRef} className="hidden md:flex flex-1 justify-center mx-4 relative">
                    <input
                        type="text"
                        placeholder="Search jewelry..."
                        className="w-full max-w-2xl px-4 py-2 rounded-3xl border border-gray-300 bg-gray-100 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-maroon"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                    />
                    {isSearchLoading && <FiLoader className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gray-500" />}

                    {/* --- Live Search Results Dropdown --- */}
                    {isSearchFocused && searchQuery && (
                        <div className="absolute top-full mt-2 w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden z-10 transition-opacity duration-300">
                            {isSearchLoading && !searchResults ? (
                                <div className="p-4 text-center text-gray-500">Searching...</div>
                            ) : searchResults && (searchResults.products.length > 0 || searchResults.categories.length > 0 || searchResults.subcategories.length > 0) ? (
                                <div className="max-h-[60vh] overflow-y-auto">
                                    {searchResults.products.length > 0 && (
                                        <div className="p-2">
                                            <h4 className="px-3 py-1 text-xs font-bold text-gray-500 uppercase">Products</h4>
                                            <ul>
                                                {searchResults.products.map(p => (
                                                    <li key={`prod-${p._id}`}>
                                                        <Link to={`/products/${p.slug}`} onClick={closeSearch} className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-md">
                                                            <img src={p.mainImage} alt={p.title} className="w-12 h-12 object-cover rounded" />
                                                            <div>
                                                                <p className="font-semibold text-gray-800">{p.title}</p>
                                                                <p className="text-sm text-maroon">₹{p.variants[0]?.price}</p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {(searchResults.categories.length > 0 || searchResults.subcategories.length > 0) && (
                                        <div className="p-2 border-t">
                                            <h4 className="px-3 py-1 text-xs font-bold text-gray-500 uppercase">Suggestions</h4>
                                            <ul>
                                                {searchResults.categories.map(c => (
                                                    <li key={`cat-${c._id}`}>
                                                        <Link to={`/collections/${c.slug}`} state={{ categoryId: c._id }} onClick={closeSearch} className="block p-3 hover:bg-gray-100 rounded-md font-semibold text-gray-700">{c.name}</Link>
                                                    </li>
                                                ))}
                                                {searchResults.subcategories.map(s => (
                                                    <li key={`subcat-${s._id}`}>
                                                        <Link to={`/collections/${s.slug}`} state={{ subcategoryId: s._id }} onClick={closeSearch} className="block p-3 hover:bg-gray-100 rounded-md pl-6 text-gray-600">{s.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <FiSearch className="mx-auto text-4xl text-gray-300 mb-2" />
                                    <p className="font-semibold text-gray-700">No results found for "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <FiUser className="text-gray-700 w-6 h-6 cursor-pointer hover:text-maroon transition-colors" onClick={() => setUserPanelOpen(true)} />
                    </div>
                    <Link to="/wishlist" className="relative">
                        <FiHeart className="text-gray-700 w-6 h-6 cursor-pointer hover:text-maroon transition-colors" />
                        {wishlist.length > 0 && (
                            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">{wishlist.length}</span>
                        )}
                    </Link>
                    <button onClick={() => setCartOpen(true)} className="relative">
                        <FiShoppingCart className="text-gray-700 w-6 h-6 cursor-pointer hover:text-maroon transition-colors" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">{cartItemCount}</span>
                        )}
                    </button>
                </div>
            </div>

            {/* --- MOBILE HEADER --- */}
            <div className="md:hidden border-b border-gold">
                {/* Top Row: Logo and Icons */}
                <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <div className="text-xl font-bold fraunces">
                        <Link to={'/'}><img src="/logo/marron_icon.png" alt="logo" className='w-auto h-16' /></Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <FiUser className="text-gray-700 w-6 h-6 cursor-pointer" onClick={() => setUserPanelOpen(true)} />
                        </div>
                        <Link to="/wishlist" className="relative">
                            <FiHeart className="text-gray-700 w-6 h-6 cursor-pointer" />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">{wishlist.length}</span>
                            )}
                        </Link>
                        <button onClick={() => setCartOpen(true)} className="relative">
                            <FiShoppingCart className="text-gray-700 w-6 h-6 cursor-pointer" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">{cartItemCount}</span>
                            )}
                        </button>
                    </div>
                </div>
                {/* Bottom Row: Search and Menu Toggle */}
                <div className="flex items-center justify-between px-4 pb-3 pt-1">
                    <div className="flex-1 mr-4">
                        <input
                            type="text"
                            placeholder="Search jewelry..."
                            className="w-full px-4 py-2 rounded-3xl border border-gray-300 bg-gray-100 text-gray-800 placeholder:text-gray-500 outline-none"
                        />
                    </div>
                    <button className="text-gray-700 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Bottom Nav - Desktop */}
            <nav className="hidden md:flex justify-center space-x-8 py-3 text-sm font-medium border-b border-gold bg-white">
                {categories?.map((cat, index) => (
                    <div
                        key={index}
                        className="relative group"
                        onMouseEnter={() => setActiveDropdown(index)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <Link to={`/collections/${cat.slug}`} state={{ categoryId: cat._id }} className="text-gray-800 text-[16px] fraunces hover:text-maroon transition-colors">
                            {cat.name}
                        </Link>
                        <div
                            className={`fixed left-0 right-0 bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-40 ${activeDropdown === index ? 'max-h-96 opacity-100 py-6 mt-3' : 'max-h-0 opacity-0 py-0'
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
                                            <p className="text-md text-gray-700 fraunces px-5 py-2 bg-gray-100 rounded-full hover:bg-maroon hover:text-white transition-colors">{item.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <a href="/about" className="hover:text-maroon transition text-[16px] fraunces text-gray-800">About</a>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/40" onClick={() => setMenuOpen(false)}></div>

                {/* Menu Panel */}
                <div className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        {/* Menu Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800 fraunces">Menu</h2>
                            <button onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-maroon">
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-grow overflow-y-auto">
                            <ul className="py-2">
                                {categories.map((cat, idx) => (
                                    <li key={idx} className="border-b border-gray-400">
                                        <div className="flex items-center justify-between h-16 px-4">
                                            <Link to={`/collections/${cat.slug}`} state={{ categoryId: cat._id }} className="flex items-center flex-grow" onClick={() => setMenuOpen(false)}>
                                                {cat.image && <img src={cat.image.url} alt={cat.name} className="w-10 h-10 object-cover rounded-md mr-4" />}
                                                <span className='fraunces text-gray-800'>{cat.name}</span>
                                            </Link>
                                            {cat.subcategories && cat.subcategories.length > 0 && (
                                                <button onClick={() => toggleCategory(idx)} className="p-2 text-gray-500">
                                                    <FiPlus className={`transform transition-transform duration-300 ${expandedCategories[idx] ? 'rotate-45' : ''}`} />
                                                </button>
                                            )}
                                        </div>
                                        {/* Animated Submenu */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCategories[idx] ? 'max-h-96' : 'max-h-0'}`}>
                                            <ul className="bg-gray-50">
                                                {cat.subcategories.map((subItem, subIdx) => (
                                                    <li key={subIdx} className="border-t border-gray-400">
                                                        <Link
                                                            to={`/collections/${subItem.slug}`}
                                                            state={{ subcategoryId: subItem._id }}
                                                            onClick={() => setMenuOpen(false)}
                                                            className="flex items-center h-14 pl-12 pr-4 text-md fraunces text-gray-700 hover:bg-gray-200 w-full"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <ul className="">
                                <li><Link to="/about" onClick={() => setMenuOpen(false)} className="block py-3 px-4 fraunces text-gray-800 hover:bg-gray-100">About</Link></li>
                                <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="block py-3 px-4 fraunces text-gray-800 hover:bg-gray-100 border-t border-gray-400">Contact Us</Link></li>
                                <li><Link to="/track-order" onClick={() => setMenuOpen(false)} className="block py-3 px-4 fraunces text-gray-800 hover:bg-gray-100 border-t border-gray-400">Track Order</Link></li>
                                <li><Link to="/return-policy" onClick={() => setMenuOpen(false)} className="block py-3 px-4 fraunces text-gray-800 hover:bg-gray-100 border-t border-gray-400">Return & Exchange</Link></li>
                                <li><Link to="/privacy-policy" onClick={() => setMenuOpen(false)} className="block py-3 px-4 fraunces text-gray-800 hover:bg-gray-100 border-t border-gray-400">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Menu Footer with Contact Info */}
                        <div className="p-4 border-t bg-gray-50 border-gray-400 text-center">
                            <p className="text-sm text-gray-600">Need help? Contact us:</p>
                            <a href="mailto:support@yourjewelry.com" className="text-sm font-semibold text-maroon hover:underline">support@yourjewelry.com</a>
                            <p className="text-xs text-gray-500 mt-1">or call +91 12345 67890</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Modal */}
            {cartOpen && (
                <div ref={cartRef} className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
                    <div className="bg-white shadow-xl w-full md:w-[420px] h-full p-6 relative overflow-y-auto animate-slideInRight">
                        <button
                            className="absolute top-7 right-6 text-gray-600 hover:text-red-500 text-2xl"
                            onClick={() => setCartOpen(false)}
                        >
                            <FiX />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4 nunito uppercase">Shopping Cart</h2>
                        {cartLoading ? (
                            <div className="text-center text-gray-500 py-8">Loading cart...</div>
                        ) : cartItems.length === 0 ? (
                            <div className="text-center text-gray-600 py-8">Your cart is empty.</div>
                        ) : (
                            <>
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
                                                <div className="flex items-center mt-2 gap-2">
                                                    <button
                                                        onClick={() => handleCartModalQuantityChange(item._id, item.quantity, -1, item.variantDetails?.stock)}
                                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm disabled:opacity-40"
                                                        disabled={item.quantity <= 1 || cartLoading}
                                                    >
                                                        <FiMinus />
                                                    </button>
                                                    <span className="px-3 text-base font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleCartModalQuantityChange(item._id, item.quantity, 1, item.variantDetails?.stock)}
                                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm disabled:opacity-40"
                                                        disabled={item.quantity >= (item.variantDetails?.stock || Infinity) || cartLoading}
                                                    >
                                                        <FiPlus />
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item._id || item.variantId)}
                                                        className="ml-auto text-red-500 text-sm hover:text-red-700 flex items-center gap-1"
                                                    >
                                                        <FaTrash /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                <div className="relative z-50">
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserPanelOpen(false)}
                    />

                    <div className="absolute -top-20 right-20 mt-2 w-64 bg-white shadow-xl rounded-md border z-50">
                        <div className="px-4 py-3 border-b flex justify-between items-center">
                            <span className="font-semibold text-gray-800">
                                {user ? `Hi, ${user.name?.split(" ")[0]}` : "Hello, Guest"}
                            </span>
                            <button
                                onClick={() => setUserPanelOpen(false)}
                                className="text-gray-500 hover:text-red-500 text-lg"
                            >
                                ×
                            </button>
                        </div>

                        <ul className="p-4 space-y-2 text-sm text-gray-700">
                            {user ? (
                                <>
                                    {user.role === "admin" && (
                                        <li>
                                            <Link to="/admin" className="hover:text-maroon font-medium block">Admin Panel</Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link to="/profile" className="hover:text-maroon block">My Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/cart" className="hover:text-maroon block">My Cart</Link>
                                    </li>
                                    <li>
                                        <Link to="/wishlist" className="hover:text-maroon block">My Wishlist</Link>
                                    </li>
                                    <li>
                                        <Link to="/profile?tab=orders" className="hover:text-maroon block">My Orders</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="hover:text-red-600 cursor-pointer block w-full text-left">
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" className="hover:text-maroon block">Login / Signup</Link>
                                    </li>
                                    <li>
                                        <Link to="/cart" className="hover:text-maroon block">My Cart</Link>
                                    </li>
                                    <li>
                                        <Link to="/wishlist" className="hover:text-maroon block">My Wishlist</Link>
                                    </li>
                                    <li>
                                        <p>Track Your Order</p>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            )}

        </header>
    );
}
