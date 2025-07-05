import { FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiCircle, } from 'react-icons/fi';
import { IoDiamondOutline } from "react-icons/io5";

export default function Footer() {
    return (
        <footer className="max-w-8xl m-2 rounded-xl bg-maroon text-cream pt-12 px-6 md:px-12 lg:px-20 pb-6 border-t border-gray-200">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">

                {/* Brand Section */}
                <div className="flex flex-col gap-4 lg:max-w-sm">
                    <h1 className="text-2xl font-bold tracking-wide text-black">MIROSA</h1>
                    <p className="text-green-700 font-medium">The House of Lab Grown Diamonds</p>
                    <div className="flex items-start gap-3 flex-col mt-2 text-sm">
                        <div className="flex items-center gap-2">
                            <FiCircle className="text-lg" />
                            <span>Start With A Setting</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoDiamondOutline className="text-lg" />
                            <span>Start With A Lab Grown Diamond</span>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-4 mt-4 text-xl text-[#333]">
                        <FaTiktok />
                        <FaYoutube />
                        <FaInstagram />
                        <FaFacebook />
                        <FaLinkedin />
                    </div>
                </div>

                {/* Link Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 text-sm">
                    {/* COMPANY */}
                    <div>
                        <h4 className="font-semibold text-green-700 mb-2">COMPANY</h4>
                        <ul className="space-y-1">
                            <li>About Us</li>
                            <li>Blog</li>
                            <li>Media Kit</li>
                            <li>Contact Us</li>
                            <li>Special Offer</li>
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h4 className="font-semibold text-green-700 mb-2">SUPPORT</h4>
                        <ul className="space-y-1">
                            <li>FAQ</li>
                            <li>Shipping & Return Policy</li>
                            <li>360° Display Technology</li>
                            <li>Ring Sizing</li>
                            <li>Ring Services</li>
                            <li>Size Charts</li>
                            <li>Intl Ring Size Guide</li>
                        </ul>
                    </div>

                    {/* EDUCATION */}
                    <div>
                        <h4 className="font-semibold text-green-700 mb-2">EDUCATION</h4>
                        <ul className="space-y-1">
                            <li>Lab Grown Diamond</li>
                            <li>Diamond Shapes</li>
                            <li>Product Care</li>
                            <li>Certification</li>
                            <li>Our Footprint</li>
                        </ul>
                    </div>

                    {/* QUICK CONTACT */}
                    <div>
                        <h4 className="font-semibold text-green-700 mb-2">QUICK CONTACT</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <FiMail /> info@mirosa.com
                            </li>
                            <li className="flex items-center gap-2">
                                <FiPhone /> +91 98765 43210
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
                <p>© 2025 Mirosa</p>
                <div className="flex gap-4">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Sitemap</a>
                    <a href="#">Accessibility</a>
                </div>
            </div>
        </footer>
    );
}
