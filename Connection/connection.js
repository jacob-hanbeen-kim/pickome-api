const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection({
   host: config.host,
   user: config.user,
   password: config.password,
   database: config.database,
});

export const Connection = {
   connect() {
      connection.connect();
      return connection;
   },
};
