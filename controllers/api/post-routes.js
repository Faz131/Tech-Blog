const router = require('express').Router();
const { Posts } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


// Route to create a post

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Posts.create({ ...body, userId: req.session.userId }) // creating and passing properties of the body for a given user session
        res.json(newPost);
    } catch (err) {
        console.log('Failed to post', err);
        res.status(500).json(err);
    }
});

//Updating a post

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Posts.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (updatePost > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;