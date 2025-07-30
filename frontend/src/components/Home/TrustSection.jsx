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
        <section class="py-12 sm:py-16 lg:py-20 px-4 bg-stone-50">
            <div class="max-w-7xl mx-auto">
                {/* Main Slogan / Title */}
                <div class="text-center mb-12 lg:mb-16 relative">
                    {/* Decorative lines that are more subtle */}
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1/6 h-px bg-gray-200 hidden lg:block"></div>
                    <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1/6 h-px bg-gray-200 hidden lg:block"></div>

                    <p class="text-2xl sm:text-3xl lg:text-4xl italic text-gray-700 font-serif max-w-4xl mx-auto leading-relaxed sm:leading-loose">
                        Trust us to be part of your precious moments and to deliver jewellery that you'll cherish forever.
                    </p>
                </div>

                {/* Four Value Proposition Columns */}
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 text-center">
                    {trustPoints.map((point, index) => (
                        <div key={index} class="flex flex-col items-center p-4 group">
                            {/* Icon */}
                            <div class="w-24 h-24 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                                <img
                                    src={point.iconPath}
                                    alt={point.alt}
                                    className="w-full h-full object-contain filter drop-shadow-md"
                                />
                            </div>
                            {/* Title */}
                            <h3 class="text-xl font-semibold text-maroon fraunces mb-2 leading-tight">
                                {point.title}
                            </h3>
                            {/* Optional Description */}
                            <p class="text-gray-600 text-sm leading-relaxed">
                                {point.description} {/* Assuming you add a description to your trustPoints array */}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>


    );
};

export default TrustSection;