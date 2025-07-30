const express = require('express');
const { registerUser, loginUser, updateUserRole, sendResetPasswordEmail, resetPassword, getAllUsers } = require('../controller/authController');
const router = express.Router()

router.post("/register-user", registerUser)
router.post("/login-user", loginUser)
router.post("/update-role", updateUserRole)
router.post("/reset-password", sendResetPasswordEmail)
router.post("/reset-password/:resetToken", resetPassword); // This route is for the reset password form submission
router.get("/allusers", getAllUsers)

module.exports = router;