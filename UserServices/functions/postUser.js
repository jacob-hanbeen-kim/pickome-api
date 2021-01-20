const register = require('./cognito/Register');

const postUser = async (event, connection, callback) => {
   let requestBody = event.body;
   console.log('Created following user', requestBody);
   try {
      let result = await register(requestBody);
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
