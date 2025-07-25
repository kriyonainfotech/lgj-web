// src/components/TrustSection.jsx
import React from 'react';

const TrustSection = () => {
    // Data for your four value propositions
    // Replace 'iconPath' with the actual paths to your icons (e.g., /images/tanishq-exchange.png)
    const trustPoints = [
        {
            iconPath: '/trust/exchange.png', // Placeholder icon 1
            title: 'Mirosa Exchange',
            alt: 'Mirosa Exchange Icon',
        },
        {
            iconPath: '/trust/diamond.png', // Placeholder icon 2
            title: 'The Purity Guarantee',
            alt: 'Purity Guarantee Icon',
        },
        {
            iconPath: '/trust/protection.png', // Placeholder icon 3
            title: 'Complete Transparency and Trust',
            alt: 'Transparency and Trust Icon',
        },
        {
            iconPath: '/trust/trust.png', // Placeholder icon 4
            title: 'Lifetime Maintenance',
            alt: 'Lifetime Maintenance Icon',
        },
    ];

    return (
        <section className=" py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Main Slogan / Title */}
                <div className="text-center mb-16 relative">
                    {/* Decorative elements (adjust SVG/image paths as needed) */}
                    {/* These are placeholders; you'd typically use SVG for the exact swirls */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-px bg-gray-300 md:w-1/5 lg:w-1/6 hidden md:block"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 h-px bg-gray-300 md:w-1/5 lg:w-1/6 hidden md:block"></div>

                    <p className="text-2xl md:text-3xl lg:text-4xl italic text-gray-700 font-serif max-w-4xl mx-auto leading-relaxed px-4">
                        Trust us to be part of your precious moments and to deliver jewellery that you'll cherish forever.
                    </p>
                </div>

                {/* Four Value Proposition Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-8">
                    {trustPoints.map((point, index) => (
                        <div key={index} className="flex flex-col items-center p-4">
                            {/* Icon */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-4">
                                <img
                                    src={point.iconPath}
                                    alt={point.alt}
                                    className="w-full h-full object-contain filter drop-shadow-md"
                                // You might need to adjust styling for specific gold effect, e.g., using SVG and CSS filters
                                />
                            </div>
                            {/* Title */}
                            <h3 className="text-xl sm:text-xl font-semibold text-maroon fraunces mb-2 leading-tight">
                                {point.title}
                            </h3>
                            {/* Short Description (optional, if you want more text) */}
                            {/* <p className="text-gray-600 text-sm">A brief description of this value.</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;