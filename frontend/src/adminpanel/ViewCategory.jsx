import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const apiurl = import.meta.env.VITE_API_URL;
console.log(apiurl);

const ViewCategory = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()
    // Fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                console.log("Fetching categories...");
                const res = await axios.get(`${apiurl}/category/getallcategories`, {
                    withCredentials: true,
                });
                console.log(res, "categories data");
                if (res.data.success) {
                    setCategories(res.data.categories);
                    localStorage.setItem(
                        "categories",
                        JSON.stringify(res.data.categories)
                    );
                }
                // Make sure your backend returns an array of categories
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await axios.delete(`${apiurl}/category/delete/${id}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success("Category deleted successfully");
                // Remove from UI if using local state:
                setCategories((prev) => prev.filter((cat) => cat._id !== id));
            } else {
                toast.error(res.data.message || "Delete failed");
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message || "Something went wrong while deleting.");
        }
    };

    return (
        <div>
            <div className="p-6">
                {/* Add Category Button */}
                <div className="mb-6 flex justify-between align-center ">
                    <h1 className="text-3xl font-bold text-gray-900 nunito">
                        Manage Categories
                    </h1>
                    <Link
                        to="/admin/categories/add"
                        className="bg-indigo-500 no-underline text-white nunito px-4 py-2 rounded-md shadow-md hover:bg-indigo-600 transition duration-300"
                    >
                        Add Category
                    </Link>
                </div>

                {/* Categories Table */}
                <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-rose-900 text-white text-sm uppercase tracking-wide">
                                <th className="px-6 py-4 text-left">Image</th>
                                <th className="px-6 py-4 text-left">Category Name</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr
                                    key={category._id}
                                    className="hover:bg-gray-50 transition-all duration-200 border-b"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-14 h-14 object-cover rounded-full shadow-md border"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-3">
                                        <button
                                            onClick={() => navigate(`/admin/edit-category/${category._id}`)}
                                            className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category._id)}
                                            className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>

                                        <button>
                                            <Link
                                                to={`/admin/categories/${category._id}`}
                                                className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition no-underline"
                                            >
                                                Manage Subcategories
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewCategory;
