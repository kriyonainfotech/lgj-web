const express = require('express')
const router = express.Router()

router.use('/auth', require('../routes/authRoute'))
router.use('/category', require('../routes/categoryRoute'))
router.use('/subcategory', require('../routes/subcategoryRoutes'))
router.use('/product', require('../routes/productRoute'))

module.exports = router;