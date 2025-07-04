import React, { useState, useRef } from 'react';
import { FiUser, FiHeart, FiShoppingCart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const categories = [
    {
        name: 'Engagement',
        sub: [
            { name: 'Solitaire Rings', image: '/images/engagement1.jpg' },
            { name: 'Halo Rings', image: '/images/engagement2.jpg' },
            { name: 'Three Stone', image: '/images/engagement3.jpg' }
        ]
    },
    {
        name: 'Wedding',
        sub: [
            { name: 'Wedding Bands', image: '/images/wedding1.jpg' },
            { name: 'His & Hers Sets', image: '/images/wedding2.jpg' },
            { name: 'Anniversary Rings', image: '/images/wedding3.jpg' }
        ]
    },
    {
        name: 'Diamonds',
        sub: [
            { name: 'Loose Diamonds', image: '/images/diamonds1.jpg' },
            { name: 'Certified Stones', image: '/images/diamonds2.jpg' },
            { name: 'Fancy Shapes', image: '/images/diamonds3.jpg' }
        ]
    },
    {
        name: 'Jewelry',
        sub: [
            { name: 'Necklaces', image: '/images/jewelry1.jpg' },
            { name: 'Earrings', image: '/images/jewelry2.jpg' },
            { name: 'Bracelets', image: '/images/jewelry3.jpg' }
        ]
    },
    {
        name: 'Custom Grown',
        sub: [
            { name: 'Lab-grown Rings', image: '/images/custom1.jpg' },
            { name: 'Custom Designs', image: '/images/custom2.jpg' },
            { name: '3D Previews', image: '/images/custom3.jpg' }
        ]
    }
];

const dummyCart = [
    {
        id: 1,
        title: 'Elegant Diamond Ring',
        image: '/images/engagement1.jpg',
        description: 'This stunning diamond ring is crafted with precision and elegance...',
        price: 5999
    }
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [cartOpen, setCartOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const userTimeout = useRef(null);

    const toggleCategory = (idx) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };

    const total = dummyCart.reduce((acc, item) => acc + item.price, 0);

    const handleUserEnter = () => {
        clearTimeout(userTimeout.current);
        setUserOpen(true);
    };

    const handleUserLeave = () => {
        userTimeout.current = setTimeout(() => setUserOpen(false), 500);
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
                    <img src="/logo/marron_icon.png" alt="logo" className='w-full h-20' />
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

                    <div
                        className="relative"
                        onMouseEnter={() => setUserOpen(true)}
                        onMouseLeave={() => setUserOpen(false)}
                    >
                        <FiUser className="text-gold w-5 h-5 cursor-pointer" />
                        {userOpen && (
                            <ul className="absolute -right-5 top-4 mt-2 w-40 bg-dark border border-gold rounded-md shadow-lg p-2 z-50">
                                <li className="py-1 px-3 hover:text-gold cursor-pointer fraunces"><a href="/login">Login/Signup</a></li>
                                <li className="py-1 px-3 hover:text-gold cursor-pointer fraunces">Contact Us</li>
                            </ul>
                        )}
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
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(index)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <a href="#" className="text-[16px] fraunces">
                            {cat.name}
                        </a>
                        <div
                            className={`fixed left-0 right-0 bg-gray-300 shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-40 ${activeDropdown === index ? 'max-h-96 opacity-100 py-6 mt-3' : 'max-h-0 opacity-0 py-0'
                                }`}
                        >
                            <div className="max-w-6xl mx-auto flex justify-start space-x-8 px-8">
                                {cat.sub.map((item, idx) => (
                                    <div key={idx} className="w-40 text-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-28 object-cover rounded-md mb-2"
                                        />
                                        <p className="text-sm text-platinum fraunces">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <a href="#" className="hover:text-gold transition text-[16px] fraunces">About</a>
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
                <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-gray-100/40 bg-opacity-50 flex justify-end">
                    <div className="bg-gray-200 text-ivory w-full md:w-[40%] h-full p-6 relative overflow-y-auto">
                        <button
                            className="absolute top-4 right-4 text-gold text-xl"
                            onClick={() => setCartOpen(false)}
                        >
                            <FiX />
                        </button>
                        <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">Your Cart</h2>
                        {dummyCart.map((item) => (
                            <div key={item.id} className="flex space-x-4 mb-4 border-b border-gray-300 pb-4">
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                <div>
                                    <h3 className="text-lg font-medium">{item.title}</h3>
                                    <p className="text-sm text-platinum">{item.description.slice(0, 50)}...</p>
                                    <p className="text-sm text-gold mt-1">₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                        <div className="text-right mt-6">
                            <div className="text-md font-semibold flex justify-between"><p>Subtotal:</p> <p>₹{total}</p></div>
                            <p className="text-xl font-bold mt-2 flex justify-between"><p>Total:</p> <p>₹{total}</p></p>
                        </div>
                    </div>
                </div>
            )}


        </header>
    );
}
