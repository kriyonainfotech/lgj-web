// import React from 'react';

// export default function ProductDetailPage() {
//     const thumbnails = [
//         "/images/p1.jpg",
//         "/images/p2.jpg",
//         "/images/p3.jpg"
//     ];

//     return (
//         <div className="px-6 py-8 max-w-7xl mx-auto">
//             {/* Breadcrumb */}
//             <nav className="text-sm text-gray-500 mb-6">
//                 Home / Rings / <span className="text-maroon font-semibold">Elegant Halo Ring</span>
//             </nav>

//             {/* Main Content Row */}
//             <div className="flex flex-col md:flex-row gap-10">
//                 {/* Left - Images */}
//                 <div className="w-full md:w-1/2">
//                     <img
//                         src="/images/product-main.jpg"
//                         alt="Main Product"
//                         className="w-[90%] rounded-md object-cover"
//                     />
//                     <div className="flex gap-4 mt-4">
//                         {thumbnails.map((img, i) => (
//                             <div key={i} className="relative group">
//                                 <img src={img} className="w-24 h-24 rounded object-cover" />
//                                 <span className="absolute top-1 right-1 text-red-500 hidden group-hover:block">
//                                     ❤️
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Right - Product Info */}
//                 <div className="w-full md:w-1/2 space-y-5">
//                     <h1 className="text-3xl font-bold text-maroon">Elegant Halo Ring</h1>
//                     <p className="text-xl font-semibold text-gold">₹7,999</p>

//                     <div className="text-sm text-gray-700 space-y-1">
//                         <p>Metal: 14K White Gold</p>
//                         <p>Gender: Male, Female</p>
//                         <p>Availability: In Stock</p>
//                     </div>

//                     {/* Quantity */}
//                     <div className="flex items-center space-x-3">
//                         <label className="text-sm font-medium">Qty:</label>
//                         <div className="flex items-center border rounded">
//                             <button className="px-2">-</button>
//                             <input type="text" value="1" className="w-10 text-center border-x" readOnly />
//                             <button className="px-2">+</button>
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex gap-4">
//                         <button className="bg-maroon text-white px-6 py-2 rounded hover:bg-dark">
//                             Add to Cart
//                         </button>
//                         <button className="border border-maroon text-maroon px-6 py-2 rounded hover:bg-maroon hover:text-white">
//                             Add to Wishlist
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Item Details Section */}
//             <div className="mt-12">
//                 <h2 className="text-xl font-semibold text-maroon mb-4">Item Details</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
//                     <div className="flex justify-between border-b py-2">
//                         <span className="font-medium">Style:</span>
//                         <span>Halo</span>
//                     </div>
//                     <div className="flex justify-between border-b py-2">
//                         <span className="font-medium">Metal Type & Color:</span>
//                         <span>14K White Gold</span>
//                     </div>
//                     <div className="flex justify-between border-b py-2">
//                         <span className="font-medium">Gender:</span>
//                         <span>Male, Female</span>
//                     </div>
//                     <div className="flex justify-between border-b py-2">
//                         <span className="font-medium">Rhodium Finish:</span>
//                         <span>No</span>
//                     </div>
//                     <div className="flex justify-between border-b py-2">
//                         <span className="font-medium">Product ID:</span>
//                         <span>1014</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// src/pages/product/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

// --- Shimmer Loading Component ---
const Shimmer = () => (
    <div className="px-6 py-8 max-w-7xl mx-auto animate-pulse">
        {/* Breadcrumb Shimmer */}
        <div className="h-4 bg-gray-200 w-1/4 mb-6 rounded"></div>

        {/* Main Content Row Shimmer */}
        <div className="flex flex-col md:flex-row gap-10">
            {/* Left - Images Shimmer */}
            <div className="w-full md:w-1/2">
                <div className="w-[90%] h-96 bg-gray-200 rounded-md mb-4"></div>
                <div className="flex gap-4 mt-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
                    <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
                    <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
                </div>
            </div>

            {/* Right - Product Info Shimmer */}
            <div className="w-full md:w-1/2 space-y-5">
                <div className="h-10 bg-gray-200 w-3/4 rounded-md"></div> {/* Title */}
                <div className="h-8 bg-gray-200 w-1/4 rounded-md"></div> {/* Price */}

                <div className="space-y-2 text-sm">
                    <div className="h-4 bg-gray-200 w-1/2 rounded"></div> {/* Metal */}
                    <div className="h-4 bg-gray-200 w-2/3 rounded"></div> {/* Gender */}
                    <div className="h-4 bg-gray-200 w-1/3 rounded"></div> {/* Availability */}
                </div>

                {/* Variant Selection Shimmer */}
                <div className="space-y-4">
                    <div className="h-6 bg-gray-200 w-1/3 rounded"></div> {/* Material label */}
                    <div className="h-10 bg-gray-200 w-full rounded-md"></div> {/* Material dropdown */}
                    <div className="h-6 bg-gray-200 w-1/3 rounded"></div> {/* Purity label */}
                    <div className="h-10 bg-gray-200 w-full rounded-md"></div> {/* Purity dropdown */}
                    <div className="h-6 bg-gray-200 w-1/3 rounded"></div> {/* Size label */}
                    <div className="h-10 bg-gray-200 w-full rounded-md"></div> {/* Size dropdown/input */}
                </div>

                {/* Quantity Shimmer */}
                <div className="h-10 bg-gray-200 w-1/4 rounded-md"></div>

                {/* Buttons Shimmer */}
                <div className="flex gap-4">
                    <div className="h-12 bg-gray-200 w-1/2 rounded"></div>
                    <div className="h-12 bg-gray-200 w-1/2 rounded"></div>
                </div>

                {/* Description Shimmer */}
                <div className="h-24 bg-gray-200 w-full rounded-md"></div>
            </div>
        </div>

        {/* Item Details Section Shimmer */}
        <div className="mt-12 space-y-4">
            <div className="h-10 bg-gray-200 w-1/4 rounded-md"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded-md"></div>
                <div className="h-10 bg-gray-200 rounded-md"></div>
                <div className="h-10 bg-gray-200 rounded-md"></div>
                <div className="h-10 bg-gray-200 rounded-md"></div>
            </div>
        </div>
    </div>
);
// --- End Shimmer Component ---


export default function ProductDetailPage() {
    // We'll use useParams to get the ID directly from the URL for robust linking
    // const { id: productId } = useParams(); // ✅ Get product ID from URL parameter
    // If you prefer to rely ONLY on location.state:
    const location = useLocation();
    const { productId } = location.state || {};

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null); // The currently displayed variant
    const [selectedMainImage, setSelectedMainImage] = useState(''); // The main image displayed
    const [quantity, setQuantity] = useState(1);

    // States for selected options to find the matching variant
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [selectedPurity, setSelectedPurity] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const { addToCart, cartLoading } = useCart();

    // Fetch product details
    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!productId) {
                setError("Product ID is missing.");
                setLoading(false);
                toast.error("Product ID is missing.");
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${backdendUrl}/api/product/get-product/${productId}`);
                if (response.data.success) {
                    const fetchedProduct = response.data.product;
                    setProduct(fetchedProduct);

                    // Initialize selected variant and images
                    if (fetchedProduct.variants && fetchedProduct.variants.length > 0) {
                        setSelectedVariant(fetchedProduct.variants[0]); // Default to first variant
                        setSelectedMainImage(fetchedProduct.variants[0].images?.[0] || fetchedProduct.mainImage);

                        // Initialize dropdowns with first variant's values
                        setSelectedMaterial(fetchedProduct.variants[0].material || '');
                        setSelectedPurity(fetchedProduct.variants[0].purity || '');
                        setSelectedSize(fetchedProduct.variants[0].size || '');

                    } else {
                        setSelectedMainImage(fetchedProduct.mainImage); // Use main image if no variants
                    }
                } else {
                    setError(response.data.message || "Failed to fetch product details.");
                    toast.error(response.data.message || "Failed to fetch product details.");
                }
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(err.response?.data?.message || "Server error fetching product details.");
                toast.error(err.response?.data?.message || "Server error fetching product details.");
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]); // Re-fetch when productId changes

    // Update selectedMainImage when a different thumbnail is clicked
    const handleThumbnailClick = (imageUrl) => {
        setSelectedMainImage(imageUrl);
    };

    // Find a matching variant when material, purity, or size changes
    useEffect(() => {
        if (product && product.variants && product.variants.length > 0) {
            const foundVariant = product.variants.find(v =>
                (selectedMaterial === '' || v.material === selectedMaterial) &&
                (selectedPurity === '' || v.purity === selectedPurity) &&
                (selectedSize === '' || v.size === selectedSize)
            );
            setSelectedVariant(foundVariant || product.variants[0]); // Fallback to first if no exact match
            setSelectedMainImage(foundVariant?.images?.[0] || product.mainImage); // Update main image based on new variant
        }
    }, [selectedMaterial, selectedPurity, selectedSize, product]);


    const handleQuantityChange = (change) => {
        setQuantity(prevQty => Math.max(1, prevQty + change));
    };

    const handleAddToCart = () => {
        if (!selectedVariant) {
            toast.error("Please select a variant.");
            return;
        }
        if (selectedVariant.stock < quantity) {
            toast.error(`Only ${selectedVariant.stock} items available in stock.`);
            return;
        }
        // Call addToCart from CartContext, passing the full product and variant data
        addToCart(product, selectedVariant, quantity);
    };

    // Render Shimmer while loading
    if (loading) {
        return <Shimmer />;
    }

    // Render Error Message
    if (error) {
        return (
            <div className="px-6 py-8 max-w-7xl mx-auto text-center text-red-600">
                <p className="text-xl font-semibold">Error: {error}</p>
                <p className="text-gray-600 mt-2">Please try again later or check the product ID.</p>
                <Link to="/shop" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">Back to Shop</Link>
            </div>
        );
    }

    // Render "Product Not Found"
    if (!product) {
        return (
            <div className="px-6 py-8 max-w-7xl mx-auto text-center text-gray-600">
                <p className="text-xl font-semibold">Product Not Found</p>
                <p className="mt-2">The product you are looking for does not exist or has been removed.</p>
                <Link to="/shop" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">Back to Shop</Link>
            </div>
        );
    }

    // Helper to get unique options for dropdowns
    const getUniqueOptions = (variants, field) => {
        return [...new Set(variants.map(v => v[field]).filter(Boolean))];
    };

    const uniqueMaterials = getUniqueOptions(product.variants, 'material');
    const uniquePurities = getUniqueOptions(product.variants, 'purity');
    const uniqueSizes = getUniqueOptions(product.variants, 'size');

    const calculateFinalPrice = (variant) => {
        // Guard clause for safety
        if (!variant || !variant.price) return 0;

        const originalPrice = variant.price;
        const discount = variant.discount;

        // Return original price if there's no valid discount
        if (!discount || !discount.type || !discount.value || discount.value <= 0) {
            return originalPrice;
        }

        let finalPrice = (discount.type === 'percentage')
            ? originalPrice - (originalPrice * discount.value / 100)
            : originalPrice - discount.value;

        return Math.max(0, finalPrice); // Ensure price isn't negative
    };

    return (
        <div className="px-6 py-8 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:underline">Home</Link> /
                {product.category && <Link to={`/collections/${product.category.slug}`} className="hover:underline"> {product.category.name}</Link>} /
                {product.subcategory && <Link to={`/collections/${product.subcategory.slug}`} className="hover:underline"> {product.subcategory.name}</Link>} /
                <span className="text-maroon font-semibold"> {product.title}</span>
            </nav>

            {/* Main Content Row */}
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left - Images */}
                <div className="w-full md:w-1/2">
                    <img
                        src={selectedMainImage || product.mainImage || 'https://placehold.co/600x600/E0E0E0/6C6C6C?text=No+Image'}
                        alt={product.title}
                        className="w-[90%] h-auto rounded-md object-cover"
                    />
                    <div className="flex gap-4 mt-4 overflow-x-auto pb-2"> {/* Added overflow-x-auto for many thumbnails */}
                        {/* Always show product.mainImage as a thumbnail if it exists */}
                        {product.mainImage && (
                            <img
                                src={product.mainImage}
                                onClick={() => handleThumbnailClick(product.mainImage)}
                                className={`w-24 h-24 rounded object-cover cursor-pointer border-2 ${selectedMainImage === product.mainImage ? 'border-maroon' : 'border-transparent'}`}
                                alt={`${product.title} main thumbnail`}
                            />
                        )}
                        {/* Show selected variant images as thumbnails */}
                        {selectedVariant?.images && selectedVariant.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => handleThumbnailClick(img)}
                                className={`w-24 h-24 rounded object-cover cursor-pointer border-2 ${selectedMainImage === img ? 'border-maroon' : 'border-transparent'}`}
                                alt={`${product.title} variant thumbnail ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right - Product Info */}
                <div className="w-full md:w-1/2 space-y-5">
                    <h1 className="text-3xl font-bold text-maroon nunito">{product.title}</h1>
                    {selectedVariant && (() => {
                        // --- Logic for the selected variant ---
                        const finalPrice = calculateFinalPrice(selectedVariant);
                        const hasDiscount = finalPrice < selectedVariant.price;

                        return (
                            <div className="mt-4">
                                {hasDiscount ? (
                                    // If there IS a discount, show both prices
                                    <div className="flex items-baseline gap-4">
                                        <p className="text-4xl text-maroon fraunces font-semibold">
                                            ${finalPrice.toLocaleString()}
                                        </p>
                                        <p className="text-2xl text-gray-500 fraunces font-normal line-through">
                                            ${selectedVariant.price.toLocaleString()}
                                        </p>
                                    </div>
                                ) : (
                                    // If NO discount, show only the regular price
                                    <p className="text-5xl text-gray-800 fraunces font-semibold">
                                        ${selectedVariant.price.toLocaleString()}
                                    </p>
                                )}
                            </div>
                        );
                    })()}


                    {/* Variant Selection Options */}
                    {product.variants.length > 0 && ( // Only show if multiple variants exist
                        <div className="space-y-4">
                            {uniqueMaterials.length > 1 && (
                                <div>
                                    <label className="text-sm font-medium block mb-1">Material:</label>
                                    <select
                                        value={selectedMaterial}
                                        onChange={(e) => setSelectedMaterial(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="">Select Material</option>
                                        {uniqueMaterials.map(material => (
                                            <option key={material} value={material}>{material}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {uniquePurities.length > 1 && (
                                <div>
                                    <label className="text-sm font-medium block mb-1">Purity:</label>
                                    <select
                                        value={selectedPurity}
                                        onChange={(e) => setSelectedPurity(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="">Select Purity</option>
                                        {uniquePurities.map(purity => (
                                            <option key={purity} value={purity}>{purity}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {uniqueSizes.length > 1 && (
                                <div>
                                    <label className="text-sm font-medium block mb-1">Size:</label>
                                    <select
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="">Select Size</option>
                                        {uniqueSizes.map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Currently selected variant details */}
                    {selectedVariant && (
                        <div className="text-md nunito text-gray-700 space-y-1">
                            <p className=''><strong>Material:</strong> <span>{selectedVariant.material}</span> </p>
                            <p className=''><strong>Purity:</strong> <span>{selectedVariant.purity}</span> </p>

                        </div>
                    )}


                    <div className="flex items-center gap-4 mt-4">
                        <label className="text-md font-medium text-gray-700">Qty:</label>
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                // Disable decrement button if quantity is already 1
                                disabled={quantity <= 1}
                                className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                −
                            </button>
                            <span className="w-10 text-center text-lg">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                // Disable increment button if quantity reaches available stock
                                disabled={selectedVariant && quantity >= selectedVariant.stock}
                                className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            onClick={handleAddToCart} // ✅ Connect the onClick event to handleAddToCart
                            // ✅ Disable button based on loading, selected variant, and stock
                            disabled={cartLoading || !selectedVariant || selectedVariant.stock < 1 || quantity < 1 || quantity > selectedVariant.stock}
                            className="flex-1 bg-maroon text-white py-2.5 rounded-md shadow transition
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center space-x-2" // Added flex for loading spinner
                        >
                            {cartLoading ? (
                                // ✅ Loading spinner for Add to Cart
                                <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Add to Cart' // ✅ Button text changes to "Adding..." or "Add to Cart"
                            )}
                        </button>
                        <button className="flex-1 border border-maroon text-maroon py-2.5 rounded-md cursor-pointer hover:bg-maroon hover:text-white transition">
                            Add to Wishlist
                        </button>
                    </div>


                    {/* Currently selected variant details */}
                    {selectedVariant && (
                        <div className="text-md nunito text-gray-700 space-y-1 mt-10">
                            {/* <p><strong>SKU:</strong> {selectedVariant.sku}</p> */}
                            <p><strong>Availability:</strong> <span className={selectedVariant.inStock ? 'text-green-600' : 'text-red-600'}>{selectedVariant.inStock ? 'In Stock' : 'Out of Stock'}</span> (available)</p>
                            <p><strong>Weight:</strong> {selectedVariant.weight}g</p>
                        </div>
                    )}

                    {/* Item Details Section - populated from product.description or other fields */}
                    <div className="mt-6">
                        <h2 className="text-lg nunito font-bold text-gray-700 mb-2">Product Description</h2>
                        <p className="text-gray-800 nunito">{product.description}</p>
                    </div>

                </div>
            </div>


        </div>
    );
}

// okay lets noto it then, need to update produc detail page



// see i does not hande variant gracefully, first of all all all image of allvarants in left side(st mainImage large) down all imes rom varaints.send, remove that input dropdown of selecting material, if is is yellow gld then show a golden small cirlce(filled) and silver(if there) anupdate the picturs of product according to that(filtring).irdi want to change the display of products, make the each product photo half of thcolmn, what i mean to say is that for images we have col - 6(50 % space)  so show two images i one row(25 % -25 % - square aspect)

// also i want to add when image hover, a ultra zoomimg append which is mostly presnt injwellery websites, on product deails keep show all images(to remove the filter), if the imags gets more lenghty from product detail then ad scroll effect  scrollbar should not be visile but scroll effect presen, fourth if there is braclet or necklace as category then dont show sze(like only show szes of value is present otherwisenot), that too likei said in small cirlcle manner not input dropdown, fifth if two varaint have purity diferen then only two diff feild, otherwise(this part handlle it own your own - smothly) same goes or weight too.lets keep the feild which are different for product / present in varaint oerwise if they differ, actully i want

