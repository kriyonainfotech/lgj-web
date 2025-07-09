import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const apiurl = import.meta.env.VITE_API_URL;

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [tags, setTags] = useState("");
    const [status, setStatus] = useState("active");
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [variants, setVariants] = useState([
        {
            metalColor: "",
            carat: "",
            size: "",
            diamondDetails: [],
            priceBreakup: [],
            totalPrice: "",
            sku: "",
            stock: "",
            weightInGrams: "",
            images: [],
        },
    ]);

    const addNewVariant = () => {
        setVariants([
            ...variants,
            {
                metalColor: "",
                carat: "",
                size: "",
                diamondDetails: [],
                priceBreakup: [],
                totalPrice: "",
                sku: "",
                stock: "",
                weightInGrams: "",
                images: [],
            },
        ]);
    };
    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][field] = value;
        setVariants(updatedVariants);
    };

    const removeVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    // Add these handler functions
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleVariantImageChange = (variantIndex, files) => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].images = Array.from(files);
        setVariants(updatedVariants);
    };
    // categories and subcategories
    const fetchCategories = async () => {
        // ✅ Check localStorage first
        const cached = localStorage.getItem("categories");
        if (cached) {
            console.log("📦 Using cached categories from localStorage");
            setCategories(JSON.parse(cached));
            return;
        }

        // 🧠 If not cached, fetch from API
        try {
            console.log("🌐 Fetching categories from API...");
            const res = await axios.get(`${apiurl}/category/getallcategories`);
            if (res.data.success && res.data.categories) {
                setCategories(res.data.categories);
                localStorage.setItem("categories", JSON.stringify(res.data.categories));
                console.log("✅ Categories saved to localStorage");
            } else {
                console.error("⚠️ No categories received from API");
            }
        } catch (err) {
            console.error("❌ Error fetching categories:", err.message);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const validateVariants = () => {
        return variants.every(
            (v) => v.metalColor && v.carat && v.sku && v.totalPrice
        );
    };

    // Updated handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateVariants()) {
            toast.error("Please fill all required variant fields");
            return;
        }
        setIsSubmitting(true);

        try {
            const formData = new FormData();

            // Prepare product data
            const productData = {
                title: title.trim(),
                categoryId,
                subCategoryId,
                tags: tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t),
                description: description.trim(),
                status: status,
                variants: variants.map((variant) => ({
                    ...variant,
                    // Convert numbers from strings
                    stock: Number(variant.stock),
                    totalPrice: Number(variant.totalPrice),
                    weightInGrams: Number(variant.weightInGrams),
                    // Remove image files from data (will be sent as files)
                    images: [],
                })),
            };

            formData.append("product", JSON.stringify(productData));
            formData.append("thumbnail", thumbnailFile);

            // Append variant images
            variants.forEach((variant, index) => {
                variant.images.forEach((file) => {
                    formData.append(`variants[${index}][images]`, file);
                });
            });

            // API call
            const response = await axios.post(
                `${apiurl}/product/add-product`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Response:", response.data);
            toast.success("Product added successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage =
                error.response?.data?.error ||
                error.message ||
                "Failed to add product. Please check your inputs.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <h2 className="text-2xl font-bold text-cyan-900 mb-6">
                Add New Jewelry Product
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Product Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        placeholder="e.g. Diamond Ring"
                        required
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block mb-1 font-medium">
                        Tags (comma separated)
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        placeholder="e.g. New, Bestseller, Gift"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        value={categoryId}
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            setCategoryId(selectedId);

                            const selectedCategory = categories.find(
                                (cat) => cat._id === selectedId
                            );
                            if (selectedCategory && selectedCategory.subcategories) {
                                setSubcategories(selectedCategory.subcategories);
                                console.log("Subcategories:", selectedCategory.subcategories);
                            } else {
                                setSubcategories([]); // no subcategories
                            }
                        }}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Subcategory */}
                <div>
                    <label className="block mb-1 font-medium">Subcategory</label>
                    {subcategories.length > 0 && (
                        <div className="">
                            <select
                                value={subCategoryId}
                                onChange={(e) => setSubCategoryId(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            >
                                <option value="">Select Subcategory</option>
                                {subcategories.map((sub) => (
                                    <option key={sub._id} value={sub._id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Thumbnail Upload */}
                <div>
                    <label className="block mb-1 font-medium">Thumbnail Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                    />
                    {thumbnailPreview && (
                        <img
                            src={thumbnailPreview}
                            alt="Thumbnail"
                            className="mt-2 w-28 h-28 object-cover rounded-md"
                        />
                    )}
                </div>

                {/* Description - Full width row */}
                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md"
                        rows="4"
                        placeholder="Describe the product in detail..."
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-800">
                        Product Variants
                    </h3>

                    {variants.map((variant, index) => (
                        <div
                            key={index}
                            className="border p-4 mb-4 rounded-md shadow-sm space-y-4 bg-gray-50"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                <div>
                                    <label className="block mb-1">Metal Color</label>
                                    <select
                                        value={variant.metalColor}
                                        onChange={(e) =>
                                            handleVariantChange(index, "metalColor", e.target.value)
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    >
                                        <option value="">Select</option>
                                        <option value="Yellow Gold">Yellow Gold</option>
                                        <option value="Rose Gold">Rose Gold</option>
                                        <option value="White Gold">White Gold</option>
                                        <option value="Silver">Silver</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1">Carat</label>
                                    <select
                                        value={variant.carat}
                                        onChange={(e) =>
                                            handleVariantChange(index, "carat", e.target.value)
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    >
                                        <option value="">Select</option>
                                        <option value="14KT">14KT</option>
                                        <option value="18KT">18KT</option>
                                        <option value="22KT">22KT</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1">Size (for rings)</label>
                                    <input
                                        type="text"
                                        value={variant.size}
                                        onChange={(e) =>
                                            handleVariantChange(index, "size", e.target.value)
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        placeholder="e.g. 6, 7, 8..."
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">SKU</label>
                                    <input
                                        type="text"
                                        value={variant.sku}
                                        onChange={(e) =>
                                            handleVariantChange(index, "sku", e.target.value)
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        placeholder="Unique SKU"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Stock</label>
                                    <input
                                        type="number"
                                        value={variant.stock}
                                        onChange={(e) =>
                                            handleVariantChange(index, "stock", e.target.value)
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        placeholder="Stock quantity"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Total Price</label>
                                    <input
                                        type="number"
                                        value={variant.totalPrice}
                                        onChange={(e) =>
                                            handleVariantChange(index, "totalPrice", e.target.value)
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        placeholder="₹ Total price"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Weight (g)</label>
                                    <input
                                        type="number"
                                        value={variant.weightInGrams}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                index,
                                                "weightInGrams",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        placeholder="Weight in grams"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Upload Variant Images</label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) =>
                                            handleVariantImageChange(index, e.target.files)
                                        }
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                        accept="image/*"
                                    />
                                </div>
                                {/* 
                <div className="">
                  <label className="block mb-1 font-medium">
                    Diamond Details
                  </label>

                  {variant.diamondDetails.length === 0 ? (
                    <button
                      type="button"
                      className="text-sm text-orange-600"
                      onClick={() => {
                        const updated = [...variants];
                        updated[index].diamondDetails = [
                          {
                            stoneType: "",
                            color: "",
                            clarity: "",
                            shape: "",
                            weight: 0,
                          },
                        ];
                        setVariants(updated);
                      }}
                    >
                      + Add Diamond Details
                    </button>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Stone Type"
                        value={variant.diamondDetails[0].stoneType}
                        onChange={(e) => {
                          const updated = [...variants];
                          updated[index].diamondDetails[0].stoneType =
                            e.target.value;
                          setVariants(updated);
                        }}
                        className="p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Color"
                        value={variant.diamondDetails[0].color}
                        onChange={(e) => {
                          const updated = [...variants];
                          updated[index].diamondDetails[0].color =
                            e.target.value;
                          setVariants(updated);
                        }}
                        className="p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Clarity"
                        value={variant.diamondDetails[0].clarity}
                        onChange={(e) => {
                          const updated = [...variants];
                          updated[index].diamondDetails[0].clarity =
                            e.target.value;
                          setVariants(updated);
                        }}
                        className="p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Shape"
                        value={variant.diamondDetails[0].shape}
                        onChange={(e) => {
                          const updated = [...variants];
                          updated[index].diamondDetails[0].shape =
                            e.target.value;
                          setVariants(updated);
                        }}
                        className="p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="number"
                        placeholder="Weight"
                        value={variant.diamondDetails[0].weight}
                        onChange={(e) => {
                          const updated = [...variants];
                          updated[index].diamondDetails[0].weight = parseFloat(
                            e.target.value
                          );
                          setVariants(updated);
                        }}
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>
                  )}
                </div> */}

                                <div className="">
                                    <label className="block mb-1 font-medium">
                                        Price Breakup
                                    </label>
                                    {variant.priceBreakup?.map((price, pIndex) => (
                                        <div key={pIndex} className="mb-2 flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Label"
                                                value={price.label}
                                                onChange={(e) => {
                                                    const updated = [...variants];
                                                    updated[index].priceBreakup[pIndex].label =
                                                        e.target.value;
                                                    setVariants(updated);
                                                }}
                                                className="p-2 border rounded w-[60%]"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                value={price.amount}
                                                onChange={(e) => {
                                                    const updated = [...variants];
                                                    updated[index].priceBreakup[pIndex].amount =
                                                        parseFloat(e.target.value);
                                                    setVariants(updated);
                                                }}
                                                className="p-2 border rounded w-[30%]"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="mt-2 text-sm text-orange-600"
                                        onClick={() => {
                                            const updated = [...variants];
                                            updated[index].priceBreakup.push({
                                                label: "",
                                                amount: 0,
                                            });
                                            setVariants(updated);
                                        }}
                                    >
                                        + Add Price Breakup
                                    </button>
                                </div>
                            </div>

                            {/* 🗑️ Remove Variant (if more than one) */}
                            {variants.length > 1 && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove this variant
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* ➕ Add Variant Button */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={addNewVariant}
                            className="bg-violet-800 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
                        >
                            + Add Another Variant
                        </button>
                        {/* Submit Button - Full width row */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition relative ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    {/* Loading spinner */}
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Adding Product...
                                </div>
                            ) : (
                                "Add Product"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
