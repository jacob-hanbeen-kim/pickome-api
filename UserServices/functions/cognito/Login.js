const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const UserPool = require('./UserPool');

async function login(json) {
   const { username, password } = json;

   console.log(username, password);

   console.log(UserPool);

   const user = new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: UserPool,
   });

   console.log(user);
   const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password,
   });

   console.log(authDetails);

   return new Promise((resolve, reject) => {
      console.log('INpromise');
      user.authenticateUser(authDetails, {
         onSuccess: (data) => {
            console.log('onSuccess:', data);
            resolve({
               statusCode: 200,
               body: JSON.stringify(data),
            });
         },

         onFailure: (err) => {
            console.error('onFailure:', err);
            resolve({
               statusCode: 400,
               body: JSON.stringify(err),
            });
         },

         newPasswordRequired: (data) => {
            console.log('newPasswordRequired:', data);
            resolve({
               statusCode: 203,
               body: JSON.stringify(data),
            });
         },
      });
   });
}

module.exports = login;
