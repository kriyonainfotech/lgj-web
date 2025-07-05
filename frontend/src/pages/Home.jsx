import React from 'react'
import Header from '../components/Header'
import BannerSlider from '../components/BannerSlider'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
    const categories = [
        {
            name: 'Rings',
            image: '/images/categories/rings.jpg',
        },
        {
            name: 'Necklaces',
            image: '/images/categories/necklaces.jpg',
        },
        {
            name: 'Earrings',
            image: '/images/categories/earrings.jpg',
        },
        {
            name: 'Bracelets',
            image: '/images/categories/bracelets.jpg',
        },
        {
            name: 'Bangles',
            image: '/images/categories/bangles.jpg',
        },
        {
            name: 'Chains',
            image: '/images/categories/chains.jpg',
        },
        {
            name: 'Mangalsutras',
            image: '/images/categories/mangalsutra.jpg',
        },
        {
            name: 'More Categories',
            image: null, // intentionally empty, no image
            isMoreCard: true, // special flag for custom styling
        },
    ];

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


    return (
        <div>
            <BannerSlider />

            <section className="py-12 px-4 bg-light text-midnight">
                <div className="text-center mb-10">
                    <h2 className="text-[40px] text-black fraunces">Find Your Perfect Match</h2>
                    <p className="text-2xl text-primary mt-1 fraunces">Shop by Category</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {/* Category Cards (7) */}
                    {categories.map((cat, index) => (
                        <div key={index} className="flex flex-col items-center text-center ">
                            {cat.isMoreCard ? (
                                <>
                                    <Link to={'/'}>
                                        <div className="flex items-center justify-center w-[276px] h-[350px] border border-gray-300 rounded-xl">
                                            <p className="text-lg font-semibold text-primary nunito"><span className='fraunces text-5xl text-black'> 10+ </span><br />Categories to choose from</p>
                                        </div>
                                        <button className="mt-2 text-black fraunces text-xl">
                                            View All
                                        </button>
                                    </Link>

                                </>
                            ) : (
                                <>
                                    <div className='border border-gray-300 rounded-xl'>
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-[276px] h-[350px] object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-3 font-medium text-xl fraunces uppercas">{cat.name}</h3>
                                </>
                            )}
                        </div>
                    ))}
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
