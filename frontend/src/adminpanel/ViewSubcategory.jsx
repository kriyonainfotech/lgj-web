import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const apiurl = import.meta.env.VITE_API_URL;

const ViewSubcategory = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams(); // get categoryName from URL
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryTitle, setCategoryTitle] = useState("");

    // useEffect(() => {
    //   const localData = localStorage.getItem("categories");
    //   if (localData) {
    //     const allCategories = JSON.parse(localData);
    //     const matchedCategory = allCategories.find(
    //       (cat) => cat._id === categoryId
    //     );

    //     if (matchedCategory) {
    //       setCategoryTitle(matchedCategory.name);
    //       setSubcategories(matchedCategory.subcategories || []);
    //     }
    //   }
    // }, [categoryId]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this subcategory?")) return;

        try {
            const res = await axios.delete(`${apiurl}/subcategory/delete/${id}`, {
                withCredentials: true,
            });
            console.log(res, 'del')
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message || "Something went wrong");
            }
        } catch (err) {
            toast.error(err.response.data.message || "Something went wrong");
            console.log(err, 'helo');
        }
    };


    // ✅ Load from localStorage first (for speed)
    useEffect(() => {
        const cachedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
        const currentCategory = cachedCategories.find((cat) => cat._id === categoryId);
        if (currentCategory?.subcategories) {
            setSubcategories(currentCategory.subcategories);
            setCategoryTitle(currentCategory.name);
        }
    }, [categoryId]);

    // ✅ Then fetch from backend (for freshness)
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const res = await axios.get(`${apiurl}/subcategory/view`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    // Filter only for the current category
                    const filtered = res.data.data.filter(
                        (sub) => sub.categoryId._id === categoryId
                    );
                    setSubcategories(filtered);

                    // Optional: update localStorage too
                    const cachedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
                    const updated = cachedCategories.map((cat) => {
                        if (cat._id === categoryId) {
                            return {
                                ...cat,
                                subcategories: filtered,
                            };
                        }
                        return cat;
                    });
                    localStorage.setItem("categories", JSON.stringify(updated));
                }
            } catch (err) {
                console.error("Error fetching subcategories:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [categoryId]);

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-semibold montserrat">
                    {categoryTitle
                        ? `Subcategories of "${categoryTitle}"`
                        : "Manage Subcategories"}
                </h1>
                <Link
                    to={`/admin/${categoryId}/add`}
                    state={{ categoryName: categoryTitle }}
                    className="bg-purple-500 no-underline text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 transition duration-300"
                >
                    Add Subcategory
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold">
                            <th className="px-5 py-3 border-b">Image</th>
                            <th className="px-5 py-3 border-b">Subcategory Name</th>
                            <th className="px-5 py-3 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-6 text-gray-500">
                                    No subcategories found.
                                </td>
                            </tr>
                        ) : (
                            subcategories.map((subcategory) => (
                                <tr key={subcategory._id} className="text-sm">
                                    <td className="px-6 py-4 border-b">
                                        <img
                                            src={subcategory.image}
                                            className="w-14 h-14 object-cover rounded"
                                            alt={subcategory.name}
                                        />
                                    </td>
                                    <td className="px-5 py-3 border-b">{subcategory.name}</td>
                                    <td className="px-5 py-3 border-b text-center">
                                        <button
                                            className="text-white bg-blue-500 px-3 py-2 rounded-lg hover:text-blue-700 mx-2"
                                            onClick={() => navigate(`/admin/edit-subcategory/${subcategory._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(subcategory._id)}
                                            className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 mt-6"
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewSubcategory;
