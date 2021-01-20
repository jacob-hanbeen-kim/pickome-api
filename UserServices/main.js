const postUser = require('./functions/register.js');
const getUser = require('./functions/getUser.js');
const getAllUser = require('./functions/getAllUser.js');
const connect = require('../Connection/connection.js');

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
      postUser(event, connection, callback);
      connection.end();
   }
};
