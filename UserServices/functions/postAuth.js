const login = require('./cognito/Login');

const postAuth = async (event, connection, callback) => {
   let requestBody = event.body;
   console.log('Login in following user', requestBody);
   try {
      let result = await login(requestBody);
      console.log(result);

      callback(null, result);
      //   callback(null, {
      //      statusCode: result.statusCode,
      //      body: JSON.stringify(result),
      //   });
   } catch (e) {
      console.log(e);
   }
};

module.exports = postAuth;
