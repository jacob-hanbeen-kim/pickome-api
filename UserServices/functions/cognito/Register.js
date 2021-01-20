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
   const { email, password, firstName, lastName } = json;

   console.log(email, password);

   return new Promise((resolve, reject) => {
      let attributeList = [];

      attributeList.push(
         new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: email,
         })
      );

      attributeList.push(
         new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'name',
            Value: `${firstName} ${lastName}`,
         })
      );

      console.log(poolData);

      console.log('SIGNING UP!!');
      UserPool.signUp(email, password, attributeList, null, function (err, result) {
         console.log('SIGNUP RESULT!!!');
         console.log(result);

         if (err) {
            resolve({
               statusCode: 500,
               err,
            });
         }

         resolve({
            statusCode: 200,
            message: 'User successfully registered!',
         });
      });
   });
}

module.exports = { register };
