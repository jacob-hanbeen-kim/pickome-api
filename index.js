const AWS = require('aws-sdk');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./config.json');

const s3 = new AWS.S3();
const bucketName = 'pickome';

const connection = mysql.createConnection({
   host: config.host,
   user: config.user,
   password: config.password,
   database: config.database,
});

exports.handler = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;

   connectToDB();
   console.log(`EVENT: ${event.httpMethod}`);
   console.log(event);

   if (event.httpMethod === 'GET') {
      const { userid } = event.pathParameters;
      if (userid) {
         getUser(userid, connection, callback);
      } else {
         getAllUser(connection, callback);
      }
   }
   if (event.httpMethod === 'POST') {
      postUser(event, connection, callback);
      connection.end();
   }
};

function connectToDB() {
   connection.connect();
}

const getUser = (userid, connection, callback) => {
   const sql = `SELECT * FROM pickome.User
                WHERE userId = ${userid}`;
   connection.query(sql, function (error, results, fields) {
      console.log('Results: ', results);
      connection.end();

      if (error) {
         let responseBody = {
            statusCode: 400,
            body: JSON.stringify(error),
         };
         callback(responseBody);
      } else {
         let resposneBody = {
            statusCode: 200,
            body: JSON.stringify(results),
         };
         callback(null, resposneBody);
      }
   });
};

const getAllUser = (connection, callback) => {
   const sql = `SELECT * FROM pickome.User`;
   connection.query(sql, function (error, results, fields) {
      console.log('Results: ', results);
      connection.end();

      if (error) {
         let responseBody = {
            statusCode: 400,
            body: JSON.stringify(error),
         };
         callback(responseBody);
      } else {
         let responseBody = {
            statusCode: 200,
            body: JSON.stringify(results),
         };
         callback(null, responseBody);
      }
   });
};

const postUser = (event, connection, callback) => {
   let requestBody = event.data;
   console.log('Created following user', requestBody);

   const sql = `INSERT INTO pickome.User (firstName, lastName)
                   VALUE ('${requestBody.firstName}', '${requestBody.lastName}')`;
   connection.query(sql, function (error, results, fields) {
      console.log('Results: ', results);
      connection.end();

      const responseBody = {
         statusCode: 201,
         body: {
            message: 'The user was created',
         },
      };

      if (error) callback(error);
      else callback(null, responseBody);
   });
};

const uploadImage = (event, connection, callback) => {
   fs.readFile('interior.jpg', function (err, data) {
      if (err) {
         throw err;
      }

      params = { Bucket: bucketName, Key: 'jpeg', Body: data };

      s3.putObject(params, function (err, data) {
         if (err) {
            console.log(err);
         } else {
            console.log('Successfully uploaded data to myBucket/myKey');
         }
      });
   });
};
