import React from 'react';
import logo from '../../public/logo/marron_icon.png'; // update with your actual path
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
            <div className="w-full max-w-6xl rounded-xl flex flex-col md:flex-row overflow-hidden">

                {/* Left Side Banner / Image */}
                <div className="md:w-1/2 hidden md:flex items-center justify-center bg-wine text-white p-8">
                    <div className="text-center space-y-4">
                        <Link to={'/'}><img src={logo} alt="Mirosa Logo" className="w-84 mx-auto" /></Link>
                        <h2 className="text-2xl fraunces">Welcome Back</h2>
                        <p className="text-md nunito">Sign in to access our stunning collections</p>
                    </div>
                </div>

                {/* Right Side Login Form */}
                <div className="md:w-1/2 w-full p-8 border border-gray-100 rounded-xl bg-gray-200">
                    <div className="md:hidden flex justify-center mb-6" >
                        <img src={logo} alt="Mirosa Logo" className="w-30" />
                    </div>
                    <h2 className="text-2xl font-semibold text-maroon mb-2 fraunces">Login to Mirosa</h2>
                    <p className="text-sm text-gray-600 mb-6 nunito">Enter your credentials below.</p>

                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm text-maroon fraunces">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none "
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm text-maroon fraunces">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none "
                            />
                            <div className="text-right mt-1">
                                <a href="#" className="text-sm text-maroon hover:underline fraunces">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white py-2 rounded-lg bg-maroon transition fraunces"
                        >
                            Login
                        </button>

                        <div className="text-center text-sm text-gray-600">or</div>

                        <button className="w-full fraunces border border-red-900 text-maroon py-2 rounded-md hover:bg-wine hover:text-white transition">
                            Continue with Google
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center fraunces text-maroon">
                        New to Mirosa ?{' '} &nbsp;
                        <a href="signup" className="font-medium hover:underline ">
                            Create an account
                        </a>
                    </p>
                </div>
            </div >
        </div >
    );
}
