const express = require('express')
const router = express.Router()

router.use('/auth', require('../routes/authRoute'))
router.use('/category', require('../routes/categoryRoute'))

module.exports = router;