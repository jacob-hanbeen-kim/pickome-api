const login = require('./cognito/Login');

const loginUser = async (event, connection, callback) => {
   let requestBody = event.body;
   console.log('Login in following user', requestBody);
   try {
      let result = await loginUser(requestBody);
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

module.exports = loginUser;
