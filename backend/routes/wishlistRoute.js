const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controller/wishlistController');
const { isUser } = require('../middlewares/authmiddleware');

router.get('/', getWishlist);

router.post(
    '/add',
    [
        body('productId', 'Product ID is required').not().isEmpty(),
        body('productId', 'Invalid Product ID').isMongoId()
    ],
    addToWishlist
);

router.delete('/remove/:productId', removeFromWishlist);


module.exports = router;
