import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import BannerSlider from '../components/BannerSlider'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
import axios from "axios";
import { toast } from "react-toastify";
import { FaLock, FaMoneyBillWave, FaShippingFast, FaUndoAlt } from "react-icons/fa";


const Home = () => {
    const [categories, setCategories] = useState([]);

    const products = [
        {
            name: 'Rose Gold Ring',
            price: '$5,499',
            image: '/images/products/ring1.jpg',
        },
        {
            name: 'Diamond Pendant',
            price: '$9,999',
            image: '/images/products/pendant1.jpg',
        },
        {
            name: 'Silver Bangles',
            price: '$3,250',
            image: '/images/products/bangles1.jpg',
        },
        {
            name: 'Minimalist Studs',
            price: '$2,150',
            image: '/images/products/studs1.jpg',
        }
    ];

    const features = [
        {
            title: "100% Secure Payment",
            icon: <FaLock className="text-blue-600 text-3xl" />,
        },
        {
            title: "100% Money Back Guarantee",
            icon: <FaMoneyBillWave className="text-green-600 text-3xl" />,
        },
        {
            title: "Free Fedex 2 Day Shipping",
            icon: <FaShippingFast className="text-purple-600 text-3xl" />,
        },
        {
            title: "Easy 30 Days Returns",
            icon: <FaUndoAlt className="text-yellow-600 text-3xl" />,
        },
    ];

    useEffect(() => {
        console.log("Fetching featured categories...");
        const fetchCategories = async () => {
            try {
                // console.log("Fetching categories from:", `${backdendUrl}/api/subcategory/featured-subcategories`);
                const response = await axios.get(`${backdendUrl}/api/subcategory/featured-subcategories`);

                // console.log("Featured categories:", response);

                if (response.data.success) {
                    setCategories(response.data.subcategories);
                }

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // console.log("Categories:", categories);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get(`${backdendUrl}/api/category/getCatWithSubCats`);

    //             console.log("Fetched categories:", response.data);

    //             if (response.data.success) {
    //                 setCategories(response.data.categories);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching categories:', error);
    //         }
    //     };
    //     fetchCategories();
    // }, []);
    // console.log("Categories:", categories);

    return (
        <div>
            <BannerSlider />

            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center space-y-3">
                            <div className="bg-gray-100 p-4 rounded-full shadow-sm">
                                {feature.icon}
                            </div>
                            <h4 className="text-sm font-semibold text-gray-800">{feature.title}</h4>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-12 px-4 bg-light text-midnight">
                <div className="text-center mb-10">
                    {/* <h2 className="text-[40px] text-black fraunces">Find Your Perfect Match</h2> */}
                    <p className="text-2xl text-primary mt-1 fraunces">Shop by Category</p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
                        {categories.map((cat, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-28">
                                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                                    <img
                                        src={cat.image.url}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="mt-2 text-sm font-medium text-gray-800">{cat.name}</h3>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="py-16 px-4 bg-light text-midnight">
                <div className="text-center mb-10">
                    <h2 className="text-[40px] fraunces text-black">MIROSA's Collection</h2>
                    <p className="text-2xl text-primary fraunces mt-2">A companion for every occasion</p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                        {/* Top: 40% height */}
                        <div className="relative h-[150px] md:h-[350px]">
                            <img src="/images/featured1.jpg" className="w-full h-full object-cover rounded-lg" />
                            <div className="absolute bottom-0 w-full h-[40px] md:h-[120px] rounded-lg bg-gradient-to-t from-[#832729] via-[#832729f2] to-transparent" />
                            <h3 className="absolute bottom-[5px] md:bottom-[30px] w-full text-white text-md md:text-2xl fraunces font-medium text-center">Engagement</h3>
                        </div>

                        {/* Bottom: 60% height */}
                        <div className="relative h-[150px] md:h-[400px]">
                            <img src="/images/featured2.jpg" className="w-full h-full object-cover rounded-lg" />
                            <div className="absolute bottom-0 w-full h-[40px] md:h-[120px] rounded-lg bg-gradient-to-t from-[#832729] via-[#832729f2] to-transparent" />
                            <h3 className="absolute bottom-[5px] md:bottom-[30px] w-full text-white text-md md:text-2xl fraunces font-medium text-center">Wedding</h3>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                        {/* Top: 60% height */}
                        <div className="relative h-[150px] md:h-[400px]">
                            <img src="/images/featured3.jpg" className="w-full h-full object-cover rounded-lg" />
                            <div className="absolute bottom-0 w-full h-[40px] md:h-[120px] rounded-lg bg-gradient-to-t from-[#832729] via-[#832729f2] to-transparent" />
                            <h3 className="absolute bottom-[5px] md:bottom-[30px] w-full text-white text-md md:text-2xl fraunces font-medium text-center">Festive</h3>
                        </div>

                        {/* Bottom: 40% height */}
                        <div className="relative h-[150px] md:h-[350px]">
                            <img src="/images/featured4.jpg" className="w-full h-full object-cover rounded-lg" />
                            <div className="absolute bottom-0 w-full h-[40px] md:h-[120px] rounded-lg bg-gradient-to-t from-[#832729] via-[#832729f2] to-transparent" />
                            <h3 className="absolute bottom-[5px] md:bottom-[30px] w-full text-white text-md md:text-2xl fraunces font-medium text-center">Custom Grown</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-light text-midnight">
                <div className="text-center mb-10">
                    <h2 className="text-[40px] fraunces text-black">New Arrivals</h2>
                    <p className="text-2xl fraunces text-primary mt-1">Discover the latest pieces in our curated collection</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {products.map((product, index) => (
                        <div key={index} className="flex flex-col items-center text-center ">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[320px] object-cover border border-gray-300 rounded-xl"
                            />
                            <h3 className="mt-4 text-lg font-medium text-black fraunces">{product.name}</h3>
                            <p className="text-black text-md mt-1 font-semibold fraunces">{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}

export default Home
