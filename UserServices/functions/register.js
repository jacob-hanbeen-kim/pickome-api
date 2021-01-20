const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const PoolId = 'us-east-2_2knlkAMhK';
const ClientId = '6kfecu1nrkqqbm4nod6473vlqd';

const poolData = {
   PoolId,
   ClientId,
};

AWS.config.update({
   region: 'us-east-2',
});

async function registerUser(json) {
   const { email, password } = json;

   return new Promise((resolve, reject) => {
      let attributeList = [];

      attributeList.push(
         new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: email,
         })
      );

      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      userPool.signUp(email, password, attributeList, function (err, result) {
         if (err) {
            return resolve({
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

export const postUser = (event, connection, callback) => {
   let requestBody = event.data;
   console.log('Created following user', requestBody);
   let result = await registerUser(requestBody);

   callback(null, {
      statusCode: result.statusCode,
      body: JSON.stringify(result),
   });

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
