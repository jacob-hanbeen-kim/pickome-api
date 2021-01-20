export const getUser = (event, connection, callback) => {
   const { userid } = event.pathParameters;
   const sql = `SELECT * FROM pickome.User
                 WHERE userId = ${userid}`;
   connection.query(sql, function (error, results, fields) {
      console.log('Results: ', results);
      connection.end();

      if (error) {
         let responseBody = {
            statusCode: 400,
            body: JSON.stringify(error),
         };
         callback(responseBody);
      } else {
         let resposneBody = {
            statusCode: 200,
            body: JSON.stringify(results),
         };
         callback(null, resposneBody);
      }
   });
};
