const sequelize = require('../config/connection');



const dataUser = require('./Users');
const dataPost = require('./Post');
const dataComment = require('./Comments');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await dataUser();
    await dataPost();
    await dataComment();


    process.exit(0);
};

seedDatabase();
