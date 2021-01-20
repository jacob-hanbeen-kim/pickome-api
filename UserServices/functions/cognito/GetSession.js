const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const UserPool = require('./UserPool');

async function getSession() {
   return new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
         user.getSession((err, session) => {
            if (err) {
               reject();
            } else {
               resolve(session);
            }
         });
      } else {
         reject();
      }
   });
}

module.exports = getSession;
