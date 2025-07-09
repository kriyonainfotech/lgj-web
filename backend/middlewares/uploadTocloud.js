const sharp = require("sharp");
const cloudinary = require("../config/cloudinary"); // Make sure it's actual Cloudinary config
const fs = require("fs/promises");
const path = require("path");

const uploadImageToCloudinary = async (file, folder) => {
    const tempDir = path.join(__dirname, "../temp");
    const compressedPath = path.join(tempDir, `compressed-${Date.now()}-${file.originalname}`);

    try {
        // Create temp dir if not exist
        await fs.mkdir(tempDir, { recursive: true });

        // Compress image to temp
        await sharp(file.buffer)
            .jpeg({ quality: 80 })
            .toFile(compressedPath);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(compressedPath, {
            folder: `mirosa/${folder}`,
            use_filename: true,
            unique_filename: false,
        });

        return result.secure_url;
    } catch (err) {
        console.error("❌ Upload error:", err.message);
        throw new Error("Image upload failed");
    } finally {
        // Always attempt to delete the temp file
        try {
            await fs.unlink(compressedPath);
        } catch (e) {
            console.warn("⚠️ Could not delete temp file:", e.message);
        }
    }
};

module.exports = { uploadImageToCloudinary };