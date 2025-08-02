import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import BannerSlider from '../components/BannerSlider'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
import axios from "axios";
import { toast } from "react-toastify";
import { FaLock, FaMoneyBillWave, FaShippingFast, FaUndoAlt } from "react-icons/fa";
import TrustSection from '../components/Home/TrustSection';
import JewelryCollectionSection from '../components/Home/JewelryCollectionSection';
import ShopByCategory from '../components/Home/ShopByCategory';
import FeaturesSection from '../components/Home/FeaturesSection';
import NewArrivalsSection from '../components/Home/NewArrivalsSection';
import TrendingNowSection from '../components/Home/TrendingNow';
import LuxuryBanner from '../components/Home/LuxuryBanner';


const Home = () => {
    const [categories, setCategories] = useState([]);
    const [menuData, setMenuData] = useState({});
    const [mirosasCollection, setMirosasCollection] = useState(null);
    const [newArrivals, setNewArrivals] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);
    const [trendingNow, setTrendingNow] = useState([]);
    const [products, setProducts] = useState({}); // State to hold the indexed product object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categorySlugsToFetch = ['new-arrivals', 'best-seller', 'trending-now'];

    const features = [
        {
            title: "100% Secure Payment",
            icon: <FaLock className="text-maroon text-3xl" />,
        },
        {
            title: "100% Money Back Guarantee",
            icon: <FaMoneyBillWave className="text-maroon text-3xl" />,
        },
        {
            title: "Free Fedex 2 Day Shipping",
            icon: <FaShippingFast className="text-maroon text-3xl" />,
        },
        {
            title: "Easy 30 Days Returns",
            icon: <FaUndoAlt className="text-maroon text-3xl" />,
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


    // Fetch subcategories by multiple slugs
    const fetchSubcategoriesBySlugs = async (slugs = []) => {
        if (!slugs.length) return;
        try {
            const response = await axios.post(
                `${backdendUrl}/api/subcategory/getsubs-by-slugs`,
                { slugs }
            );

            console.log("Fetched subcategories by slugs:", response.data);

            if (response.data.success) {
                const categories = response.data.categories;
                setMenuData(categories); // Set the full menu data as well
                // ✅ Find "MIROSA's Collection" by its slug
                // Loop through the values of the categories object
                const mirosasCategory = Object.values(categories).find(
                    (cat) => cat.slug === "mirosas-collection"
                );

                if (mirosasCategory) {
                    setMirosasCollection(mirosasCategory);
                    console.log("Found MIROSA's Collection:", mirosasCategory);
                } else {
                    console.log("MIROSA's Collection not found in fetched data.");
                    setMirosasCollection(null); // Ensure it's null if not found
                }

            }
        } catch (error) {
            console.error('Error fetching subcategories by slugs:', error);
            toast.error('Failed to fetch subcategories.');
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `${backdendUrl}/api/product/get-products-by-category-slugs`,
                { slugs: categorySlugsToFetch } // Send the array of slugs in the request body
            );

            if (response.data.success) {
                const blocks = Object.values(response.data.data);
                // Update all products if you want
                setProducts(blocks);

                // Loop through blocks to extract specific slug data like 'new-arrivals'
                const newArrivalsBlock = blocks.find(
                    (block) => block.details?.slug === "new-arrivals"
                );
                const bestSeller = blocks.find(
                    (block) => block.details?.slug === "best-seller"
                );
                const trendingNow = blocks.find(
                    (block) => block.details?.slug === "trending-now"
                );

                if (newArrivalsBlock) {
                    setNewArrivals(newArrivalsBlock.products);
                }

                if (bestSeller) {
                    setBestSeller(bestSeller.products)
                }

                if (trendingNow) {
                    setTrendingNow(trendingNow.products)
                }

                console.log("Fetched Products by Category Slugs:", blocks);
            } else {
                setError(response.data.message || "Failed to fetch products.");
                toast.error(response.data.message || "Failed to fetch products.");
            }
        } catch (err) {
            console.error("Error fetching products by category slugs:", err);
            setError(err.response?.data?.message || "Server error fetching products.");
            toast.error(err.response?.data?.message || "Server error fetching products.");
        } finally {
            setLoading(false);
        }
    };

    // Example usage: fetch subcategories for given slugs on mount
    useEffect(() => {
        const slugs = ['mirosas-collection', 'earrings']; // replace with your slugs
        fetchSubcategoriesBySlugs(slugs);

        if (categorySlugsToFetch && categorySlugsToFetch.length > 0) {
            fetchProducts();
        } else {
            setProducts({});
            setLoading(false);
        }
    }, []);


    // if (loading) {
    //     return <div className="text-center py-8">Loading products...</div>;
    // }

    // if (error) {
    //     return <div className="text-center py-8 text-red-600">Error: {error}</div>;
    // }

    // if (Object.keys(products).length === 0) {
    //     return <div className="text-center py-8 text-gray-500">No products found for these categories.</div>;
    // }
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

            <FeaturesSection />

            <ShopByCategory categories={categories} />

            <JewelryCollectionSection mirosasCollection={mirosasCollection} />

            <NewArrivalsSection localnewArrivals={newArrivals} />

            <TrustSection />

            <TrendingNowSection localtrendingNow={trendingNow} />

            <LuxuryBanner />

            <section className="py-16 px-4 bg-light text-midnight">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-[40px] fraunces text-black">Best Sellers</h2>
                    <p className="text-lg md:text-2xl fraunces text-primary mt-1">Discover the latest pieces in our curated collection</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-7xl mx-auto">
                    {bestSeller.map((product, index) => (
                        <div key={index} className="flex flex-col items-center text-center ">
                            <Link to={`/products/${product.slug}`} state={{ productId: product._id }}>
                                <div className="aspect-[4/5]  overflow-hidden">                                    <img
                                    src={product.mainImage}
                                    alt={product.title}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />
                                </div>
                            </Link>

                            <h3 className="mt-4 text-lg font-medium text-black fraunces">{product.title}</h3>
                            <p className="text-black text-md mt-1 font-semibold fraunces">₹{product.variants[0].price}</p>
                        </div>
                    ))}


                </div>
                <div className="flex justify-center mt-10">
                    <Link to={`/collections/best-seller`} className="px-20 fraunces py-3 rounded-md bg-maroon text-white text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        View All
                    </Link>
                </div>
            </section>



        </div>
    )
}

export default Home
