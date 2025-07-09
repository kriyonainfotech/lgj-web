// middleware/upload.js
const multer = require("multer");
const storage = multer.memoryStorage(); // We'll use memory because image is going to Cloudinary

const upload = multer({ storage });

module.exports = upload;
