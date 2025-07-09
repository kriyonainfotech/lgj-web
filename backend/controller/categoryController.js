const Category = require('../models/Category');
const slugify = require("slugify");
// const cloudinary = require("../config/cloudinary");
// const streamifier = require("streamifier"); // ADD THIS AT TOP
const uploadImageToCloudinary = require('../middlewares/uploadTocloud');

// exports.createCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const image = req.imageUrl || null;

//         if (!name) {
//             return res.status(400).json({ message: "Name is required" });
//         }

//         const category = await Category.create({
//             name,
//             slug: slugify(name),
//             image,
//         });

//         res.status(201).json(category);
//     } catch (error) {
//         console.error("❌ Create Category Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

exports.createCategory = async (req, res) => {
    try {
        console.log("📥 [POST] Creating new category...");

        const { name } = req.body;
        const image = req.imageUrl || null;

        console.log("Received data:", req.body, req.file);

        if (!name || !req.file) {
            console.error("❌ categoryName or image not provided");
            return res
                .status(400)
                .json({ message: "categoryName and image are required" });
        }

        // Check if category already exists
        console.log("🔍 Checking if category already exists...");
        const existing = await Category.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: "Category already exists" });
        }

        console.log("📤 Uploading image to Cloudinary...");
        const imageUrl = await uploadImageToCloudinary(req.file, "categories");

        const category = await Category.create({
            name: name,
            slug: slugify(name),
            image: imageUrl,
        });

        console.log("✅ Category created:", category.categoryName);
        res.status(200).json({ message: "Category created", category });
    } catch (err) {
        console.log("🔥 Error creating category:", err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};