const getAllUser = (connection, callback) => {
   const sql = `SELECT * FROM pickome.User`;
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
         let responseBody = {
            statusCode: 200,
            body: JSON.stringify(results),
         };
         callback(null, responseBody);
      }
   });
};

module.exports = getAllUser;
