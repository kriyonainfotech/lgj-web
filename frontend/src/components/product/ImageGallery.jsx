import React, { useState, useEffect } from 'react';

// This is the individual image tile with the zoom effect
const ImageTile = ({ imageUrl, alt }) => {
    // Inside the ImageTile component
    const [zoomStyle, setZoomStyle] = useState({ opacity: 0 }); // ✅ Solution: Starts fully transparent

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStyle({
            backgroundPosition: `${x}% ${y}%`,
            backgroundImage: `url(${imageUrl})`,
            opacity: 1,
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ opacity: 0 });
    };

    return (
        <div
            className="relative aspect-square bg-gray-100 overflow-hidden cursor-zoom-in group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img src={imageUrl} alt={alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-white"
                style={{ ...zoomStyle, backgroundRepeat: 'no-repeat', backgroundSize: '250%' }}
            />
        </div>
    );
};

// This is the main gallery component
const ImageGallery = ({ product, selectedMaterial, onClearFilter }) => { // ✅ Add onClearFilter prop
    const [displayImages, setDisplayImages] = useState([]);

    useEffect(() => {
        // Get all unique images from the product
        const allUniqueImages = [...new Set([
            product.mainImage,
            ...product.variants.flatMap(v => v.images)
        ].filter(Boolean))];

        if (selectedMaterial) {
            // Get images for the selected material
            const materialImages = product.variants
                .filter(v => v.material === selectedMaterial)
                .flatMap(v => v.images);

            // Display main image + unique images for the selected material
            setDisplayImages([...new Set([product.mainImage, ...materialImages].filter(Boolean))]);
        } else {
            // If no material is selected, show all unique images
            setDisplayImages(allUniqueImages);
        }
    }, [product, selectedMaterial]);

    return (
        <div
            className="max-h-[100vh] overflow-y-auto pr-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            {/* ✅ "Show All" Button */}
            {selectedMaterial && (
                <div className="mb-4 text-right">
                    <button
                        onClick={onClearFilter}
                        className="text-sm text-gray-600 underline hover:text-maroon transition"
                    >
                        Show All Images
                    </button>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 no-scrollbar">
                {displayImages.map((img, index) => (
                    <ImageTile key={index} imageUrl={img} alt={`${product.title} view ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};


export default ImageGallery;