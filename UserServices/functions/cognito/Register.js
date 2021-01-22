const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognitoInfo = require('./cognitoInfo.json');
// global.fetch = require('node-fetch');

const UserPool = require('./UserPool');
const region = cognitoInfo.region;

AWS.config.update({
   region: region,
});

async function register(json) {
   const { username, password, email, phonenumber } = json;

   console.log(username, password, email, phonenumber);

   return new Promise((resolve, reject) => {
      let attributeList = [];

      if (email) {
         console.log(`added email ${email}`);
         attributeList.push(
            new AmazonCognitoIdentity.CognitoUserAttribute({
               Name: 'email',
               Value: email,
            })
         );
      }

      if (phonenumber) {
         console.log(`added phonenumber ${phonenumber}`);
         attributeList.push(
            new AmazonCognitoIdentity.CognitoUserAttribute({
               Name: 'phone_number',
               Value: phonenumber,
            })
         );
      }

      if (!email && !phonenumber) {
         console.log('failed sign up');
         resolve({
            statusCode: 400,
            body: JSON.stringify({ message: 'Email or Phone Number required!' }),
         });
      } else {
         console.log('SIGNING UP!!');
         UserPool.signUp(username, password, attributeList, null, function (err, result) {
            console.log(result);

            if (err) {
               resolve({
                  statusCode: 400,
                  body: JSON.stringify(err),
               });
            }

            resolve({
               statusCode: 200,
               body: 'User successfully registered!',
            });
         });
      }
   });
}

module.exports = register;
