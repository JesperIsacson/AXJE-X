const sequelize = require('sequelize')

const dbConnect = new sequelize('webAppDatabase', 'root', 'hemligt', {
    host: 'database',
    dialect: 'mysql',
    logging: false
})

module.exports = dbConnect