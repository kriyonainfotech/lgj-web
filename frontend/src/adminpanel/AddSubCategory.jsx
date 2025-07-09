import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const apiurl = import.meta.env.VITE_API_URL;
// console.log(apiurl);
import { useLocation, useParams } from "react-router-dom";

const AddSubCategory = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams(); // Optional, auto-select
    const [categories, setCategories] = useState([]);
    const [subCategoryName, setSubCategoryName] = useState("");
    const [category, setCategory] = useState(categoryId || ""); // Auto-select if param exists
    const [subCategoryImage, setSubCategoryImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const location = useLocation();
    console.log(location.state, "location state");
    const categoryName = location.state?.categoryName || "";

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSubCategoryImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(category, subCategoryName, "category id");
        if (!category || !subCategoryName || !subCategoryImage) {
            alert("Please fill all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", subCategoryName);
        formData.append("categoryId", category);
        formData.append("image", subCategoryImage);
        // 🔍 Just to debug FormData entries
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const res = await axios.post(
                `${apiurl}/subcategory/add-subcategory`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success) {
                toast.success("✅ Subcategory added successfully!");
                setSubCategoryName("");
                setCategory(categoryId || "");
                setSubCategoryImage(null);
                setImagePreview(null);
            } else {
                toast("Failed to add subcategory.");
            }
        } catch (err) {
            console.error("❌ Error:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="flex justify-center mt-20">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6 gap-4">
                    <h2 className="text-2xl font-semibold text-cyan-900">
                        Add New Subcategory
                    </h2>

                    {/* 🔙 Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-white bg-gray-800 px-3 py-2 rounded-lg flex items-center"
                    >
                        ← Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category Select */}
                    <div>
                        <label className="block text-lg font-medium mb-1">
                            Select Category
                        </label>
                        <div className="flex flex-col">
                            <label
                                htmlFor="categoryName"
                                className="text-lg font-medium mb-1"
                            >
                                Category
                            </label>
                            <input
                                type="text"
                                id="categoryName"
                                value={categoryName}
                                disabled
                                className="p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-lg font-medium mb-1">
                            Subcategory Name
                        </label>
                        <input
                            type="text"
                            value={subCategoryName}
                            onChange={(e) => setSubCategoryName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter subcategory name"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-lg font-medium mb-1">
                            Subcategory Image
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-600">
                                    Image Preview:
                                </h3>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 w-32 h-32 object-cover rounded-md border"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                    >
                        Add Subcategory
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSubCategory;
