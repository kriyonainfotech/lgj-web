// models/Subcategory.js
const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        image: { type: String, default: "" } // optional image URL (Cloudinary, local, etc.)
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
