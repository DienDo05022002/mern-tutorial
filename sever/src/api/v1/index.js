const express = require('express');
var router = express.Router();

router.use(require('./routes/users'))
router.use(require('./routes/posts'))

module.exports = router;