const express = require("express");
const router = express.Router();
const { createCategory } = require("../controller/categoryController");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/add-category",
    upload.single("image"),
    createCategory
);

module.exports = router;
