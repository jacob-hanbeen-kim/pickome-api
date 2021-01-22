const confirmRegistration = require('./cognito/ConfirmRegistration');

const postConfirmRegistration = async (event, connection, callback) => {
   let requestBody = JSON.parse(event.body);
   console.log('Confirming Registration for the following user', requestBody);
   try {
      let result = await confirmRegistration(requestBody);
      console.log(result);

      callback(null, result);
   } catch (e) {
      console.log(e);
   }
};

module.exports = postConfirmRegistration;
