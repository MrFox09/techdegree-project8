const Sequelize = require('sequelize');
 
module.exports = (sequelize) => {
 
    class Book extends Sequelize.Model {}
    Book.init({
        id :{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        title:{
            type: Sequelize.STRING,
            validate:{
                notEmpty:{
                    msg: 'The "TITLE" can not be empty'
                }
            }
        },

        author:{
            type: Sequelize.STRING,
            validate:{
                notEmpty:{
                    msg: 'The "AUTHOR" can not be empty'
                }
            }
        },

        genre:{
            type: Sequelize.STRING,
            validate:{
                notEmpty:{
                    msg: 'The "GENRE" can not be empty'
                }
            }
        },

        year:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'Please provide a value for the year'
                },
                is: /^\d{4}$/
            }
        },

        




    }, {sequelize});
 
    return Book;
 
};
