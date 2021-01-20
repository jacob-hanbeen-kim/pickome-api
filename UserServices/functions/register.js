const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// global.fetch = require('node-fetch');

const UserPoolId = 'us-east-2_2knlkAMhK';
const ClientId = '6kfecu1nrkqqbm4nod6473vlqd';
const IdentityPoolId = 'us-east-2:2ae6cd0b-8d10-4acb-825c-32f8e72baaec';
const region = 'us-east-2';

const poolData = {
   UserPoolId,
   ClientId,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

AWS.config.update({
   region: region,
});

async function registerUser(json) {
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

async function login(json) {
   const { email, password } = json;
   return new Promise((resolve, reject) => {
      var authenticationData = {
         Username: email,
         Password: password,
      };
      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

      var userData = {
         Username: 'username',
         Pool: userPool,
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
         onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
               IdentityPoolId: IdentityPoolId, // your identity pool id here
               Logins: {
                  // Change the key below according to the specific region your user pool is in.
                  'cognito-idp.us-east-2.amazonaws.com/us-east-2_2knlkAMhK>': result.getIdToken().getJwtToken(),
               },
            });

            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
               if (error) {
                  resolve({
                     statusCode: 500,
                     error,
                  });
               }

               // Instantiate aws sdk service objects now that the credentials have been updated.
               // example: var s3 = new AWS.S3();
               console.log('Successfully logged!');

               resolve({
                  statusCode: 200,
                  body: accessToken,
               });
            });
         },

         onFailure: function (err) {
            resolve({
               statusCode: 500,
               err,
            });
            alert(err.message || JSON.stringify(err));
         },
      });
   });
}

const loginUser = async (event, connection, callback) => {
   let requestBody = event.data;
   console.log('Loginin following user', requestBody);
   try {
      let result = await login(requestBody);
      console.log(result);

      callback(null, {
         statusCode: result.statusCode,
         body: JSON.stringify(result),
      });
   } catch (e) {
      console.log(e);
   }
};

module.exports = { postUser, loginUser };
