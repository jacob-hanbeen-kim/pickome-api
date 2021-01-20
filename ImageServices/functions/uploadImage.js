const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3();
const bucketName = 'pickome';

export const uploadImage = (event, connection, callback) => {
   fs.readFile('interior.jpg', function (err, data) {
      if (err) {
         throw err;
      }

      params = { Bucket: bucketName, Key: 'jpeg', Body: data };

      s3.putObject(params, function (err, data) {
         if (err) {
            console.log(err);
         } else {
            console.log('Successfully uploaded data to myBucket/myKey');
         }
      });
   });
};
