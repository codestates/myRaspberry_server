import multer from 'multer'
import * as AWS from 'aws-sdk'
import multerS3 from 'multer-s3'
import 'dotenv/config'
import {Request} from 'express'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
})

const s3 = new AWS.S3()
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read-write',
    key: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, `testIMG/${Date.now()}${file.originalname}`)
    },
  }),
})

export default upload
