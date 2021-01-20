import { postUser } from './functions/register.js';
import { getUser } from './functions/getUser.js';
import { getAllUser } from './functions/getAllUser.js';
import { Connection } from '../Connection/connection.js';

// event['requestContext']['authorizer']['claims']['cognito:roles']
exports.handler = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;

   const connection = Connection.connect();

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
