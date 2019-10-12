const {username,password,database,host,port,dialect, pool} = require('./mariadb.config')[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(database,username,password, {
    host: host,
    dialect: dialect,
    port: port
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require('../../users/models/users')(sequelize,Sequelize);


db.sequelize.sync({force:false}).then(() =>  {});

module.exports =  db;

