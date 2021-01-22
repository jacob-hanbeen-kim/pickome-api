const AWS = require('aws-sdk');
const cognitoInfo = require('./cognitoInfo.json');

let cognitoISP = new AWS.CognitoIdentityServiceProvider({ region: cognitoInfo.region });

function adminUserUpdate(username, name, value) {
   return new Promise((resolve, reject) => {
      let params = {
         UserAttributes: [
            {
               Name: name, // name of attribute
               Value: value, // the new attribute value
            },
         ],
         UserPoolId: cognitoInfo.UserPoolId,
         Username: username,
      };

      cognitoISP.adminUpdateUserAttributes(params, (err, data) => {
         if (err) {
            resolve({
               statusCode: 400,
               body: JSON.stringify(err),
            });
         }

         resolve({
            statusCode: 200,
            body: JSON.stringify(data),
         });
      });
   });
}

module.exports = adminUserUpdate;
