const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const UserPool = require('./UserPool');

async function confirmRegistration(json) {
   const { username, code } = json;

   const user = new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: UserPool,
   });

   return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, function (err, result) {
         if (err) {
            resolve({
               statusCode: 400,
               body: JSON.stringify(err),
            });
         }

         resolve({
            statusCode: 200,
            body: JSON.stringify(result),
         });
      });
   });
}

module.exports = confirmRegistration;
