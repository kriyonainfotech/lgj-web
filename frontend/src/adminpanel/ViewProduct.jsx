import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

const VariantModal = ({ product, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full rounded-lg p-6 shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">
                    Variants of {product.title}
                </h2>
                <button
                    className="absolute top-2 right-4 text-lg font-bold text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>

                {product.variants?.map((variant, idx) => (
                    <div key={idx} className="border rounded-md p-4 mb-4">
                        <p className="mb-2">
                            <strong>Color:</strong> {variant.metalColor} |{" "}
                            <strong>Carat:</strong> {variant.carat} | <strong>Size:</strong>{" "}
                            {variant.size}
                        </p>
                        <p>
                            <strong>Price:</strong> ₹{variant.totalPrice}
                        </p>
                        <div className="flex gap-3 mt-2 flex-wrap">
                            {variant.images?.length ? (
                                variant.images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`Variant-${idx}-Image-${i}`}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-400">No Images</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/product/all`
                );

                console.log(response.data.data, "all products");
                if (response.data.success === true) {
                    setProducts(response.data.data);
                    localStorage.setItem(
                        "allProducts",
                        JSON.stringify(response.data.data)
                    );
                }
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, []);

    const handleFilter = () => {
        const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");

        let filtered = allProducts;

        if (categoryId) {
            filtered = filtered.filter((p) => p.categoryId?._id === categoryId);
        }

        if (subCategoryId) {
            filtered = filtered.filter((p) => p.subCategoryId?._id === subCategoryId);
        }

        setProducts(filtered);
    };

    // useEffect(() => {
    //   handleFilter();
    // }, [categoryId, subCategoryId]);

    useEffect(() => {
        const storedCategories = JSON.parse(
            localStorage.getItem("categories") || "[]"
        );
        setAllCategories(storedCategories);
    }, []);

    useEffect(() => {
        console.log(categoryId, "cat id");
        const category = allCategories.find((cat) => cat._id === categoryId);
        console.log(category, "cat");
        if (category) {
            setAllSubCategories(category.subcategories || []);
        } else {
            setAllSubCategories([]);
        }

        handleFilter(); // Automatically filter when category/subcategory changes
    }, [categoryId, subCategoryId]);

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?"))
            return;

        try {
            const res = await axios.delete(`${apiurl}/product/delete/${productId}`);

            console.log(res.data, "product delete");
            if (res.status === 200) {
                alert("Product deleted successfully");

                // ✅ Remove from localStorage
                const stored = JSON.parse(localStorage.getItem("allProducts") || "[]");
                const updated = stored.filter((p) => p._id !== productId);
                localStorage.setItem("allProducts", JSON.stringify(updated));

                // ✅ Update React state
                setProducts((prev) => prev.filter((p) => p._id !== productId));
            } else {
                alert("Failed to delete: " + res.data.message);
            }
        } catch (err) {
            console.error("Delete error:", err);
            // Handle both server and network errors
            if (err.response && err.response.data && err.response.data.message) {
                alert("Failed to delete: " + err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };

    return (
        <div className="p-6 mt-10 md:mt-0">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-semibold fraunces">Manage Products</h1>
                <Link
                    to={"/admin/products/add"}
                    className="bg-violet-800 no-underline text-white px-4 py-2 rounded-md shadow-md hover:bg-violet-700 transition duration-300"
                >
                    Add Product
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-2">
                <div className="flex justify-start items-center ">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                className="block w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 text-sm transition duration-200 ease-in-out hover:border-violet-400"
                                value={categoryId}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                    setSubCategoryId(""); // Reset subcategory on category change
                                }}
                            >
                                <option value="">All Categories</option>
                                {allCategories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subcategory
                            </label>
                            <select
                                className="block w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 text-sm transition duration-200 ease-in-out hover:border-violet-400"
                                value={subCategoryId}
                                onChange={(e) => setSubCategoryId(e.target.value)}
                                disabled={!categoryId}
                            >
                                <option value="">All Subcategories</option>
                                {allSubCategories.map((sub) => (
                                    <option key={sub._id} value={sub._id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Reset Filter Button */}
                    <div className="flex justify-start ps-3">
                        <button
                            onClick={() => {
                                setCategoryId("");
                                setSubCategoryId("");
                                handleFilter(); // Reset the filter to show all products
                            }}
                            className="px-4 py-2 bg-purple-500 text-white rounded-3xl shadow-md hover:bg-violet-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>

                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold">
                            <th className="px-3 py-3 border-b">Thumbnail</th>
                            <th className="px-3 py-3 border-b">Product Title</th>
                            <th className="px-3 py-3 border-b">Category</th>
                            {/* <th className="px-3 py-3 border-b">Description</th> */}
                            <th className="px-3 py-3 border-b">Tags</th>
                            <th className="px-3 py-3 border-b text-center">Variants</th>
                            {/* <th className="px-3 py-3 border-b text-center">Status</th> */}
                            <th className="px-3 py-3 border-b text-center">Actions</th>
                        </tr>
                    </thead>

                    {products.length === 0 ? (
                        <div className="text-center py-12 w-full flex flex-col justify-center rounded-lg">
                            <div className="text-gray-500 text-xl mb-4">
                                <svg
                                    className="w-16 h-16 mx-auto text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600 text-lg font-medium">
                                No products available at the moment
                            </p>
                        </div>
                    ) : (
                        <>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="text-sm">
                                        <td className="px-6 py-4 border-b">
                                            <img
                                                src={product.thumbnail || "/no-image.png"}
                                                className="w-14 h-14 object-cover rounded"
                                                alt={product.title}
                                            />
                                        </td>
                                        <td className="px-3 py-2 border-b">{product.title}</td>
                                        <td className="px-3 py-2 border-b">
                                            {product.categoryId?.name}
                                        </td>
                                        {/* <td className="px-3 py-2 border-b">
                      {product.description}
                    </td> */}
                                        <td className="px-3 py-2 border-b">
                                            {product?.tags?.join(", ") || "-"}
                                        </td>
                                        <td className="px-3 py-2 border-b text-center">
                                            <button
                                                className="text-indigo-600 bg-indigo-100 px-3 py-2 rounded-lg hover:underline"
                                                onClick={() => setSelectedProduct(product)}
                                            >
                                                {product.variants?.length} Variant
                                                {product.variants?.length > 1 ? "s" : ""}
                                            </button>
                                        </td>
                                        {/* <td className="px-3 py-2 border-b text-center capitalize">
                      {product.status?.status ? "Active" : "Inactive"}
                    </td> */}
                                        <td className="px-3 py-2 border-b text-center">
                                            <button
                                                className="text-blue-500 hover:text-blue-700 mx-2"
                                                onClick={() => navigate(`/admin/edit-product/${product._id}`, { state: { product } })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-white px-3 py-2 rounded-lg bg-red-500 hover:text-red-700 mx-2"
                                                onClick={() => handleDeleteProduct(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    )}
                </table>

                {/* 🔍 Variant Modal */}
                {selectedProduct && (
                    <VariantModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default ViewProduct;
