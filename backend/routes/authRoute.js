const express = require('express');
const { registerUser, loginUser, updateUserRole, sendResetPasswordEmail, resetPassword, getAllUsers, getCounts, updateProfilePhoto, deleteProfilePhoto } = require('../controller/authController');
const { isUser } = require('../middlewares/authmiddleware');
const upload = require("../middlewares/multer");
const router = express.Router()

router.post("/register-user", registerUser)
router.post("/login-user", loginUser)
router.post("/update-role", updateUserRole)
router.post("/reset-password", sendResetPasswordEmail)
router.post("/reset-password/:resetToken", resetPassword); // This route is for the reset password form submission
router.get("/allusers", getAllUsers)
router.get("/getCounts", getCounts)
router.put(
    '/profile/update-photo',
    isUser,
    upload.single('profilePhoto'),
    updateProfilePhoto
);
router.delete('/profile/delete-photo', isUser, deleteProfilePhoto);

module.exports = router;