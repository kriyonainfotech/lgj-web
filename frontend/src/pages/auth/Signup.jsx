import React from 'react';
import logo from '../../../public/logo/marron_icon.png'; // update with your actual path
import { Link } from 'react-router-dom';

export default function Signup() {
    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-6xl rounded-xl flex flex-col md:flex-row overflow-hidden">

                {/* Left Side Banner / Image */}
                <div className="md:w-1/2 hidden md:flex items-center justify-center text-white p-8">
                    <div className="text-center space-y-4">
                        <Link to={'/'}><img src={logo} alt="Mirosa Logo" className="w-84 mx-auto" /></Link>
                        <h2 className="text-2xl fraunces">Join the Elegance</h2>
                        <p className="text-md nunito">Create your Mirosa account and start exploring</p>
                    </div>
                </div>

                {/* Right Side Signup Form */}
                <div className="md:w-1/2 w-full p-8 border border-gray-100 rounded-xl bg-gray-200">
                    <div className="md:hidden flex justify-center mb-6">
                        <img src={logo} alt="Mirosa Logo" className="w-30" />
                    </div>
                    <h2 className="text-2xl font-semibold text-maroon mb-2 fraunces">Create Account</h2>
                    <p className="text-sm text-gray-600 mb-6 nunito">Start your journey with Mirosa.</p>

                    <form className="space-y-4">
                        {/* Full Name + Phone in one row */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/2">
                                <label className="block mb-1 text-sm text-maroon fraunces">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <label className="block mb-1 text-sm text-maroon fraunces">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 9876543210"
                                    className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Email (full width) */}
                        <div>
                            <label className="block mb-1 text-sm text-maroon fraunces">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm text-maroon fraunces">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm text-maroon fraunces">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-maroon" />
                            <label className="text-sm text-gray-700 fraunces">
                                I agree to the <a href="#" className="text-maroon underline">Terms & Conditions</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white py-2 rounded-lg bg-maroon transition fraunces"
                        >
                            Create Account
                        </button>

                        <div className="text-center text-sm text-gray-600">or</div>

                        <button className="w-full fraunces border border-red-900 text-maroon py-2 rounded-md hover:bg-wine hover:text-white transition">
                            Continue with Google
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center fraunces text-maroon">
                        Already have an account? &nbsp;
                        <a href="login" className="font-medium hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
