const { User } = require('../models');

const userSeed = [{

    username: 'Mike',
    password: 'root',
    email: 'mike@mike.com'
}
];


const dataUser = () => User.bulkCreate(userSeed);

module.exports = dataUser;
