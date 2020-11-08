/* image upload */
import multer from 'multer';
import logger from '../utils/logger';
import * as fs from 'fs';
import * as path from 'path';


const upload = multer({
    storage: multer.diskStorage({
      destination(req,file,cb){
        cb(null, 'uploads');
      },
      filename(req,file,cb){
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname,ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5* 1024 * 1024},
  });

  export default upload.single('img');
