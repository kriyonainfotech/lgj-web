// controllers/productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const uploadToCloudinary = require("../config/cloudinary");
const slugify = require("slugify");

const getPublicIdFromCloudinaryUrl = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    // Cloudinary URL format is typically:
    // .../upload/v<version>/<folder>/<public_id>.<extension>
    // We want to get '<folder>/<public_id>'
    const filenameWithExtension = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const publicId = `${folder}/${filenameWithExtension.split('.')[0]}`;
    return publicId;
};

// exports.addProduct = async (req, res) => {

//     try {
//         console.log("📝 Parsing product data...");
//         const productData = JSON.parse(req.body.product);

//         const {
//             title,
//             description,
//             categoryId,
//             subCategoryId,
//             tags,
//             isFeatured,
//             isCustomizable,
//             status,
//             variants
//         } = productData;

//         console.log("🔎 Checking category existence...");
//         const categoryExists = await Category.findById(categoryId);
//         if (!categoryExists) {
//             console.log("❌ Invalid category ID");
//             return res.status(400).json({ success: false, message: "Invalid category ID" });
//         }

//         let subcategoryExists = true;
//         if (subCategoryId) {
//             console.log("🔎 Checking subcategory existence...");
//             subcategoryExists = await Subcategory.findById(subCategoryId);
//             if (!subcategoryExists) {
//                 console.log("❌ Invalid subcategory ID");
//                 return res.status(400).json({ success: false, message: "Invalid subcategory ID" });
//             }
//         }

//         let mainImageUrl = "";
//         if (req.files && req.files["mainImage"] && req.files["mainImage"].length > 0) {
//             console.log("☁️ Uploading main image to Cloudinary...");
//             const file = req.files["mainImage"][0];
//             const result = await uploadToCloudinary(file.buffer, "product");
//             mainImageUrl = result.secure_url;
//             console.log("✅ Main image uploaded:", mainImageUrl);
//         }

//         // 📸 Upload variant images
//         for (let i = 0; i < variants.length; i++) {
//             const uploadedImages = [];
//             const variantImageFieldName = `variantImages_${i}`;

//             if (req.files && req.files[variantImageFieldName]) {
//                 console.log(`☁️ Uploading images for variant ${i}...`);
//                 const variantFiles = req.files[variantImageFieldName];
//                 for (const img of variantFiles) {
//                     const result = await uploadToCloudinary(img.buffer, "product");
//                     uploadedImages.push(result.secure_url);
//                 }
//                 console.log(`✅ Uploaded ${uploadedImages.length} images for variant ${i}`);
//             }
//             variants[i].images = uploadedImages;

//             variants[i].material = variants[i].metalColor;
//             variants[i].weight = variants[i].weightInGrams;
//             variants[i].price = variants[i].totalPrice;
//             variants[i].stock = variants[i].Number(stock), // 👈 Store the numeric stock
//                 variants[i].inStock = variants[i].stock > 0;

//             delete variants[i].metalColor;
//             delete variants[i].weightInGrams;
//             delete variants[i].totalPrice;
//             delete variants[i].stock;
//         }

//         console.log("🛠️ Creating new product document...");
//         const newProduct = new Product({
//             title,
//             slug: slugify(title, { lower: true, strict: true }),
//             description,
//             category: categoryId,
//             subcategory: subCategoryId || null,
//             tags: tags,
//             mainImage: mainImageUrl,
//             variants,
//             isFeatured: isFeatured || false,
//             isCustomizable: isCustomizable || false,
//             status: status || 'active',
//         });

//         await newProduct.save();

//         console.log("🎉 Product created successfully:", newProduct);
//         res.status(201).json({ success: true, product: newProduct });
//     } catch (err) {
//         console.error("💥 Product creation error:", err);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

exports.addProduct = async (req, res) => {
    // Array to keep track of successfully uploaded public_ids for rollback
    const uploadedPublicIds = [];

    try {
        console.log("📝 Parsing product data...");
        const productData = JSON.parse(req.body.product);

        const {
            title,
            description,
            categoryId,
            subCategoryId,
            tags,
            isFeatured,
            isCustomizable,
            status,
            variants // This `variants` array from frontend contains metadata + new file info
        } = productData;

        console.log("🔎 Checking category existence...");
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            console.log("❌ Invalid category ID");
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        let subcategoryDoc = null; // Use subcategoryDoc to store the found subcategory
        if (subCategoryId) {
            console.log("🔎 Checking subcategory existence...");
            subcategoryDoc = await Subcategory.findById(subCategoryId);
            if (!subcategoryDoc) {
                console.log("❌ Invalid subcategory ID");
                return res.status(400).json({ success: false, message: "Invalid subcategory ID" });
            }
        }

        let mainImageUrl = "";
        if (req.files && req.files["mainImage"] && req.files["mainImage"].length > 0) {
            console.log("☁️ Uploading main image to Cloudinary...");
            const file = req.files["mainImage"][0];
            const result = await uploadToCloudinary(file.buffer, "product"); // ✅ Use the shared function
            mainImageUrl = result.secure_url;
            uploadedPublicIds.push(result.public_id); // ✅ Store public_id for rollback
            console.log("✅ Main image uploaded:", mainImageUrl);
        }

        // 📸 Process and upload variant images
        // We'll build the final variants array for Mongoose here
        const finalVariantsForDb = [];
        for (let i = 0; i < variants.length; i++) {
            const currentVariantFromFrontend = variants[i];
            const variantImagesUrls = [];

            // If there are new files for this variant, upload them
            const variantImageFieldName = `variantImages_${i}`;
            if (req.files && req.files[variantImageFieldName]) {
                console.log(`☁️ Uploading images for variant ${i}...`);
                const newVariantFiles = req.files[variantImageFieldName];
                for (const file of newVariantFiles) {
                    const result = await uploadToCloudinary(file.buffer, "product"); // ✅ Use shared function
                    variantImagesUrls.push(result.secure_url);
                    uploadedPublicIds.push(result.public_id); // ✅ Store public_id for rollback
                }
                console.log(`✅ Uploaded ${variantImagesUrls.length} images for variant ${i}`);
            }

            // Construct the variant object to be saved to DB
            finalVariantsForDb.push({
                // _id: currentVariantFromFrontend._id, // Only include if it's an existing variant with an actual _id
                sku: currentVariantFromFrontend.sku,
                weight: Number(currentVariantFromFrontend.weightInGrams), // ✅ Ensure conversion and correct field name
                material: currentVariantFromFrontend.metalColor, // ✅ Ensure mapping from frontend name
                purity: currentVariantFromFrontend.purity,
                size: currentVariantFromFrontend.size,
                price: Number(currentVariantFromFrontend.totalPrice), // ✅ Ensure conversion and correct field name
                stock: Number(currentVariantFromFrontend.stock), // ✅ Use the numeric stock value
                images: variantImagesUrls, // Assign the collected image URLs
                // inStock will be set automatically by the Mongoose pre-save hook
            });
        }

        console.log("🛠️ Creating new product document...");
        const newProduct = new Product({
            title,
            slug: slugify(title, { lower: true, strict: true }),
            description,
            category: categoryId,
            subcategory: subCategoryId || null, // Use null if no subcategory is selected
            tags: tags,
            mainImage: mainImageUrl,
            variants: finalVariantsForDb, // ✅ Use the constructed variants array
            isFeatured: isFeatured || false,
            isCustomizable: isCustomizable || false,
            status: status || 'active',
        });

        await newProduct.save();

        console.log("🎉 Product created successfully:", newProduct);
        res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
        console.error("💥 Product creation error:", err);

        // --- Rollback: Delete uploaded images from Cloudinary if an error occurred ---
        if (uploadedPublicIds.length > 0) {
            console.log("Cleanup: Deleting uploaded images from Cloudinary due to error...");
            try {
                // Ensure cloudinary is imported as v2 at the top of this file
                await Promise.all(uploadedPublicIds.map(publicId => cloudinary.uploader.destroy(publicId)));
                console.log("✅ Successfully deleted temporary images from Cloudinary.");
            } catch (cleanupError) {
                console.error("❌ Error during Cloudinary cleanup:", cleanupError);
            }
        }
        // --- End Rollback ---

        if (err.name === 'ValidationError') {
            const errors = {};
            for (let field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.status(400).json({ success: false, message: "Validation failed", errors });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        console.log("🛒 Fetching all products...");
        const products = await Product.find()
            .populate('category')
            .populate('subcategory');
        console.log("✅ Products fetched successfully:", products.length);
        res.status(200).json({ success: true, products });
    } catch (err) {
        console.error("❌ Error fetching products:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(`🔍 Fetching product by ID: ${productId}...`);
        const product = await Product.findById(productId)
            .populate('category')
            .populate('subcategory');
        if (!product) {
            console.log("❌ Product not found");
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        console.log("✅ Product fetched successfully:", product.title);
        res.status(200).json({ success: true, product });
    } catch (err) {
        console.error("💥 Error fetching product by ID:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// updateProduct Controller with emoji logs

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("📝 Updating Product ID:", productId);

        const productData = JSON.parse(req.body.product);
        const {
            title,
            description,
            categoryId,
            subCategoryId,
            tags,
            isFeatured,
            isCustomizable,
            status,
            variants
        } = productData;

        console.log("📦 Parsed product data:", productData);

        // Find existing product
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            console.log("❌ Product not found with ID:", productId);
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Validate category and subcategory
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            console.log("🚫 Invalid category ID:", categoryId);
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }
        let subcategoryDoc = null;
        if (subCategoryId) {
            subcategoryDoc = await Subcategory.findById(subCategoryId);
            if (!subcategoryDoc) {
                console.log("🚫 Invalid subcategory ID:", subCategoryId);
                return res.status(400).json({ success: false, message: "Invalid subcategory ID" });
            }
        }

        // Handle main image update
        let mainImageUrl = existingProduct.mainImage;
        if (req.files && req.files["mainImage"] && req.files["mainImage"].length > 0) {
            console.log("📤 Uploading new main image...");
            const file = req.files["mainImage"][0];
            const result = await uploadToCloudinary(file.buffer, "product");
            mainImageUrl = result.secure_url;
        } else if (productData.mainImage === '') {
            console.log("🗑️ Clearing existing main image...");
            mainImageUrl = '';
        }

        // Prepare updated variants array
        const updatedVariants = [];
        for (let i = 0; i < variants.length; i++) {
            const variantData = variants[i];
            console.log(`🔄 Processing Variant ${i + 1}`);

            const uploadedVariantImageUrls = [];
            if (variantData.images && Array.isArray(variantData.images)) {
                uploadedVariantImageUrls.push(...variantData.images);
            }

            const variantImageFieldName = `variantImages_${i}`;
            if (req.files && req.files[variantImageFieldName]) {
                console.log(`📤 Uploading new images for Variant ${i + 1}`);
                const newVariantFiles = req.files[variantImageFieldName];
                for (const file of newVariantFiles) {
                    const result = await uploadToCloudinary(file.buffer, "product");
                    uploadedVariantImageUrls.push(result.secure_url);
                }
            }

            updatedVariants.push({
                _id: variantData._id,
                sku: variantData.sku,
                weight: Number(variantData.weight),
                material: variantData.material,
                purity: variantData.purity,
                size: variantData.size,
                price: Number(variantData.price),
                stock: Number(variantData.stock),
                inStock: Boolean(variantData.inStock),
                images: uploadedVariantImageUrls
            });
        }

        // Update fields
        existingProduct.title = title;
        existingProduct.slug = slugify(title, { lower: true, strict: true });
        existingProduct.description = description;
        existingProduct.category = categoryId;
        existingProduct.subcategory = subCategoryId || null;
        existingProduct.tags = tags;
        existingProduct.mainImage = mainImageUrl;
        existingProduct.variants = updatedVariants;
        existingProduct.isFeatured = isFeatured || false;
        existingProduct.isCustomizable = isCustomizable || false;
        existingProduct.status = status;

        await existingProduct.save();

        console.log("✅ Product updated successfully");
        res.status(200).json({ success: true, message: "Product updated successfully", product: existingProduct });

    } catch (err) {
        console.error("🔥 Product update error:", err);
        if (err.name === 'ValidationError') {
            const errors = {};
            for (let field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.status(400).json({ success: false, message: "Validation failed", errors });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // 1. Find the product
        const productToDelete = await Product.findById(productId);
        if (!productToDelete) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        // 2. Collect all Cloudinary public_ids for deletion
        const publicIdsToDelete = [];

        // Main image
        const mainImagePublicId = getPublicIdFromCloudinaryUrl(productToDelete.mainImage);
        if (mainImagePublicId) {
            publicIdsToDelete.push(mainImagePublicId);
        }

        // Variant images
        productToDelete.variants.forEach(variant => {
            if (variant.images && Array.isArray(variant.images)) {
                variant.images.forEach(imageUrl => {
                    const variantImagePublicId = getPublicIdFromCloudinaryUrl(imageUrl);
                    if (variantImagePublicId) {
                        publicIdsToDelete.push(variantImagePublicId);
                    }
                });
            }
        });

        // 3. Delete images from Cloudinary
        if (publicIdsToDelete.length > 0) {
            console.log(`☁️ Deleting ${publicIdsToDelete.length} images from Cloudinary:`, publicIdsToDelete);
            try {
                // Use Promise.all to delete images concurrently
                const deletionResults = await Promise.all(
                    publicIdsToDelete.map(publicId => cloudinary.uploader.destroy(publicId))
                );
                console.log("✅ Cloudinary deletion results:", deletionResults);
            } catch (cloudinaryError) {
                console.error("❌ Error deleting images from Cloudinary:", cloudinaryError);
                // Decide whether to halt deletion or proceed with DB deletion.
                // For a critical app, you might want to fail the whole operation.
                // For now, we'll log and proceed with DB deletion.
            }
        } else {
            console.log("ℹ️ No Cloudinary images to delete for this product.");
        }

        // 4. Delete the product from MongoDB
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ success: true, message: "Product and associated images deleted successfully." });

    } catch (err) {
        console.error("💥 Product deletion error:", err);
        // Log Mongoose/server errors
        res.status(500).json({ success: false, message: "Server error during product deletion." });
    }
};