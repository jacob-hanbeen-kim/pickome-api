const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognitoInfo = require('./cognitoInfo.json');

const poolData = {
   UserPoolId: cognitoInfo.UserPoolId,
   ClientId: cognitoInfo.ClientId,
};

const UserPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = UserPool;
