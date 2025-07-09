import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const backdendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
// console.log(apiurl);

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCategoryImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName || !categoryImage) {
            setError("Please provide category name and image.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("categoryName", categoryName);
            formData.append("image", categoryImage);

            const response = await axios.post(
                `${backdendUrl}/api/category/add-category`, // Update your backend URL here
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data && response.data.category) {
                toast.success("✅ Category created successfully!");
                // navigate("/admin/categories"); // Redirect to category list page if needed
            }
        } catch (err) {
            console.error("❌ Error:", err.response?.data || err.message);
            setError(
                err.response?.data?.message ||
                "Something went wrong while creating category."
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6 nunito">Add New Category</h2>
                {error && (
                    <p className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 border border-red-300">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category Name */}
                    <div>
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={handleNameChange}
                            placeholder="e.g. Rings, Bracelets"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700 mb-1">
                            Category Image <span className="text-gray-400 text-xs">(optional)</span>
                        </label>

                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                id="categoryImage"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />

                            {categoryImage && (
                                <img
                                    src={imagePreview}
                                    alt="Category Preview"
                                    className="w-20 h-20 rounded-md object-cover border border-gray-200"
                                />
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
                        >
                            ➕ Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default AddCategory;