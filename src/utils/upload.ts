/* image upload */
import multer from 'multer';
import multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as path from 'path';

AWS.config.loadFromPath('./src/config/aws.json');
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ehdguds3',
    key: function(req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
    acl: 'public-read-write',
  })
});

export default upload.single('img');
  