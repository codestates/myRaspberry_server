import * as AWS from 'aws-sdk'
import 'dotenv/config'

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
})

export const deleteImg = (img: string) => {
  const s3Address = process.env.AWS_S3_ADDRESS
  const deleteImg = img.split(s3Address).join('')

  const s3 = new AWS.S3()
  let result = s3.deleteObject(
    {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: deleteImg,
    },
    (err, data) => {
      if (err) {
        return err
      }
      return data
    },
  )
  return result
}

export default deleteImg
