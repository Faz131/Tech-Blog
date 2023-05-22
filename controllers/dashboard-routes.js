const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    Posts.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],

        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'created_at'],
            includes: {
                model: User,
                attributes: ['username']
            }
        },

        ]
    })
        .then(dbData => {
            const posts = dbData.map(post => post.get({
                plain: true
            }));
            res.render('dashboard', { posts, logged_in: true });
        })

        .catch(err => {
            res.status(500).json(err);
        });

});

router.get('/edit/:id', withAuth, (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'title',
            'content',
            'created_at'
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']

            }
        }
        ]
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No id found for this post' });
                return;
            }
            const post = dbData.get({
                plain: true
            });
            res.render('edit-post', { post, logged_in: true });
        })
        .catch(err => {
            res.status(500).json(err)
        })
    router.get('/new', (req, res) => {
        res.render('new-post');
    });
})



module.exports = router;