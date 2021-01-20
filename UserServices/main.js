const postUser = require('./functions/postUser');
const loginUser = require('./functions/postAuth');
const getUser = require('./functions/getUser');
const getAllUser = require('./functions/getAllUser');
const connect = require('../Connection/connection');

// event['requestContext']['authorizer']['claims']['cognito:roles']
exports.handler = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;

   const connection = connect();

   console.log(`EVENT: ${event.httpMethod}`);
   console.log(event);

   if (event.httpMethod === 'GET') {
      if (event.pathParameters) {
         getUser(event, connection, callback);
      } else {
         getAllUser(connection, callback);
      }
   }
   if (event.httpMethod === 'POST') {
      if (event.path == '/user') {
         postUser(event, connection, callback);
      } else if (event.path == '/auth') {
         loginUser(event, connection, callback);
      }
      connection.end();
   }
};
