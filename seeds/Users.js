const { User } = require('../models');

const userSeed = [{

    username: 'Mike',
    password: 'root'
}
];


const dataUser = () => User.bulkCreate(userSeed);

module.exports = dataUser;
