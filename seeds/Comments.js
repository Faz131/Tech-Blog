const { Comment } = require('../models');

const commentSeed = [{

    comment_info: 'Great post, super cool',
    user_id: 1,
    post_id: 1,
}
];


const dataComment = () => Comment.bulkCreate(commentSeed);

module.exports = dataComment;
