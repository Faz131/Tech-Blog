const { Posts } = require('../models');

const postSeed = [{

    post_title: 'Macaroni and cheese is great',
    content: 'It is awesome anytime',
    user_id: 1
}
];


const dataPost = () => Posts.bulkCreate(postSeed);

module.exports = dataPost;
