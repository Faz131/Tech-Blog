const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comments-routes');

router.use('/comment', commentRoutes);
// router.use('/user', userRoutes);
// router.use('/posts', postRoutes);


module.exports = router;
