const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isEmail: true,
        //     },
        // },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },



    {

        hooks: {
            // Use the beforeCreate hook to work with data before a new instance is created
            beforeCreate: async (newUserData) => {
                // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated email address, before updating the database.
            beforeUpdate: async (updatedUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return updatedUserData;
            },
        },

        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    }
);

module.exports = User;