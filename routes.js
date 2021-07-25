const router = require("express").Router();

//User routes
router.use('/api/', require('./controllers/register'));


module.exports = router;