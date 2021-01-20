const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// global.fetch = require('node-fetch');

const UserPoolId = 'us-east-2_2knlkAMhK';
const ClientId = '6kfecu1nrkqqbm4nod6473vlqd';

const poolData = {
   UserPoolId,
   ClientId,
};

AWS.config.update({
   region: 'us-east-2',
});

async function registerUser(json) {
   const { email, password } = json;

   console.log(email, password);

   return new Promise((resolve, reject) => {
      let attributeList = [];

      attributeList.push(
         new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: email,
         })
      );

      console.log(poolData);
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      console.log('SIGNING UP!!');
      userPool.signUp(email, password, attributeList, [], function (err, result) {
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

const postUser = async (event, connection, callback) => {
   let requestBody = event.data;
   console.log('Created following user', requestBody);
   try {
      let result = await registerUser(requestBody);
      console.log(result);

      callback(null, {
         statusCode: result.statusCode,
         body: JSON.stringify(result),
      });
   } catch (e) {
      console.log(e);
   }

   // const sql = `INSERT INTO pickome.User (firstName, lastName)
   //                 VALUE ('${requestBody.firstName}', '${requestBody.lastName}')`;
   // connection.query(sql, function (error, results, fields) {
   //    console.log('Results: ', results);
   //    connection.end();

   //    const responseBody = {
   //       statusCode: 201,
   //       body: {
   //          message: 'The user was created',
   //       },
   //    };

   //    if (error) callback(error);
   //    else callback(null, responseBody);
   // });
};

module.exports = postUser;
