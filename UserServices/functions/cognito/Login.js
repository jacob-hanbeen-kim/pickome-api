const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const UserPool = require('./UserPool');

async function login(json) {
   const { email, password } = json;

   console.log(email, password);
   console.log(UserPool);

   return new Promise((resolve, reject) => {
      const user = new AmazonCognitoIdentity.CognitoUser({
         Username: email,
         Pool: UserPool,
      });
      const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
         Username: email,
         Password: password,
      });

      user.authenticateUser(authDetails, {
         onSuccess: (data) => {
            console.log('IN');
            console.log('onSuccess:', data);
            resolve(data);
         },

         onFailure: (err) => {
            console.error('onFailure:', err);
            resolve(err);
         },

         newPasswordRequired: (data) => {
            console.log('newPasswordRequired:', data);
            resolve(data);
         },
      });
   });
}

// login({ email: 'kjkjkjhan424@gmail.com', password: 'Jacob3Kim!2' });
module.exports = login;
