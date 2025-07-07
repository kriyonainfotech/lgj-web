import React from 'react';

export default function ProductDetailPage() {
    const thumbnails = [
        "/images/p1.jpg",
        "/images/p2.jpg",
        "/images/p3.jpg"
    ];

    return (
        <div className="px-6 py-8 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
                Home / Rings / <span className="text-maroon font-semibold">Elegant Halo Ring</span>
            </nav>

            {/* Main Content Row */}
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left - Images */}
                <div className="w-full md:w-1/2">
                    <img
                        src="/images/product-main.jpg"
                        alt="Main Product"
                        className="w-[90%] rounded-md object-cover"
                    />
                    <div className="flex gap-4 mt-4">
                        {thumbnails.map((img, i) => (
                            <div key={i} className="relative group">
                                <img src={img} className="w-24 h-24 rounded object-cover" />
                                <span className="absolute top-1 right-1 text-red-500 hidden group-hover:block">
                                    ❤️
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Product Info */}
                <div className="w-full md:w-1/2 space-y-5">
                    <h1 className="text-3xl font-bold text-maroon">Elegant Halo Ring</h1>
                    <p className="text-xl font-semibold text-gold">₹7,999</p>

                    <div className="text-sm text-gray-700 space-y-1">
                        <p>Metal: 14K White Gold</p>
                        <p>Gender: Male, Female</p>
                        <p>Availability: In Stock</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center space-x-3">
                        <label className="text-sm font-medium">Qty:</label>
                        <div className="flex items-center border rounded">
                            <button className="px-2">-</button>
                            <input type="text" value="1" className="w-10 text-center border-x" readOnly />
                            <button className="px-2">+</button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button className="bg-maroon text-white px-6 py-2 rounded hover:bg-dark">
                            Add to Cart
                        </button>
                        <button className="border border-maroon text-maroon px-6 py-2 rounded hover:bg-maroon hover:text-white">
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Item Details Section */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-maroon mb-4">Item Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                    <div className="flex justify-between border-b py-2">
                        <span className="font-medium">Style:</span>
                        <span>Halo</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                        <span className="font-medium">Metal Type & Color:</span>
                        <span>14K White Gold</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                        <span className="font-medium">Gender:</span>
                        <span>Male, Female</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                        <span className="font-medium">Rhodium Finish:</span>
                        <span>No</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                        <span className="font-medium">Product ID:</span>
                        <span>1014</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
