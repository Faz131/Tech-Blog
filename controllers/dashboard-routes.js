const router = require('express').Router();
const { Posts, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        // Get all Posts and JOIN with user data
        const postData = await Posts.findAll({
            include: [User],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('post-page', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/create', withAuth, (req, res) => {
    res.render('create-post')
});


router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const editPost = await Posts.findByPk(req.params.id);
        const post = editPost.get({ plain: true });

        res.render('edit-post', {
            post
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;