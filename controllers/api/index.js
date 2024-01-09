const router = require("express").Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const comRoutes = require('./comRoutes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', comRoutes);


module.exports = router;
