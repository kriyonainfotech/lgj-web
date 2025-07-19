// src/components/Footer.jsx
import React from 'react';
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoDiamondOutline } from "react-icons/io5";

export default function Footer() {
    return (
        <footer className="bg-maroon text-cream pt-16 pb-8 border-t border-gold-500">
            <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gold-500 p-2 rounded-full">
                                <IoDiamondOutline className="text-maroon text-2xl" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-wide">MIROSA</h1>
                        </div>
                        <p className="text-gold-300 italic mb-6 max-w-md">
                            The House of Lab Grown Diamonds - Crafting sustainable luxury for the modern connoisseur
                        </p>

                        <div className="flex flex-col gap-3 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-gold-500/20 p-1 rounded-full">
                                    <IoDiamondOutline className="text-gold-300 text-lg" />
                                </div>
                                <span className="font-medium">Start With A Setting</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gold-500/20 p-1 rounded-full">
                                    <IoDiamondOutline className="text-gold-300 text-lg" />
                                </div>
                                <span className="font-medium">Start With A Lab Grown Diamond</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3">Join Our Exclusive Community</h3>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="py-2 px-4 rounded-l-lg bg-maroon-light text-cream border border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 w-full"
                                />
                                <button className="bg-gold-500 text-maroon font-semibold py-2 px-4 rounded-r-lg hover:bg-gold-600 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-3">
                        {/* COMPANY */}
                        <div>
                            <h4 className="font-semibold text-gold-300 text-lg mb-4 pb-2 border-b border-gold-500/30">COMPANY</h4>
                            <ul className="space-y-3">
                                {['About Us', 'Blog', 'Media Kit', 'Contact Us', 'Special Offer'].map((item, index) => (
                                    <li key={index} className="hover:text-gold-300 transition-colors cursor-pointer">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SUPPORT */}
                        <div>
                            <h4 className="font-semibold text-gold-300 text-lg mb-4 pb-2 border-b border-gold-500/30">SUPPORT</h4>
                            <ul className="space-y-3">
                                {['FAQ', 'Shipping & Return Policy', '360° Display Technology', 'Ring Sizing', 'Ring Services', 'Size Charts', 'Intl Ring Size Guide'].map((item, index) => (
                                    <li key={index} className="hover:text-gold-300 transition-colors cursor-pointer">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* EDUCATION & CONTACT */}
                        <div className="col-span-2 md:col-span-1">
                            <div className="mb-8">
                                <h4 className="font-semibold text-gold-300 text-lg mb-4 pb-2 border-b border-gold-500/30">EDUCATION</h4>
                                <ul className="space-y-3">
                                    {['Lab Grown Diamond', 'Diamond Shapes', 'Product Care', 'Certification', 'Our Footprint'].map((item, index) => (
                                        <li key={index} className="hover:text-gold-300 transition-colors cursor-pointer">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gold-300 text-lg mb-4 pb-2 border-b border-gold-500/30">QUICK CONTACT</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <FaEnvelope className="text-gold-300" />
                                    <span>info@mirosa.com</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaPhone className="text-gold-300" />
                                    <span>+91 98765 43210</span>
                                </li>
                            </ul>

                            <div className="flex items-center gap-4 mt-6 text-xl text-gold-300">
                                <FaTiktok className="hover:text-gold-500 cursor-pointer transition-colors" />
                                <FaYoutube className="hover:text-gold-500 cursor-pointer transition-colors" />
                                <FaInstagram className="hover:text-gold-500 cursor-pointer transition-colors" />
                                <FaFacebook className="hover:text-gold-500 cursor-pointer transition-colors" />
                                <FaLinkedin className="hover:text-gold-500 cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment & Trust Badges */}
                <div className="flex flex-col items-center justify-center gap-6 mb-12 py-6 border-y border-gold-500/30">
                    <h3 className="text-lg font-semibold text-gold-300">Secure Payment Methods</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-maroon-light border border-gold-500/30 rounded-lg h-12 w-20 flex items-center justify-center">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-6" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-sm">
                    <p className="text-gold-300">© 2025 Mirosa Jewelry. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#" className="hover:text-gold-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gold-300 transition-colors">Terms & Conditions</a>
                        <a href="#" className="hover:text-gold-300 transition-colors">Sitemap</a>
                        <a href="#" className="hover:text-gold-300 transition-colors">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}