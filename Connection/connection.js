const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection({
   host: config.host,
   user: config.user,
   password: config.password,
   database: config.database,
});

const connect = () => {
   connection.connect();
   return connection;
};

module.exports = connect;
