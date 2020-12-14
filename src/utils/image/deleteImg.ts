import * as AWS from "aws-sdk";
import "dotenv/config";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export default (img: string): Error | object => {
  const s3Address = process.env.AWS_S3_ADDRESS;
  const deleted = img.split(s3Address).join("");

  const s3 = new AWS.S3();
  const result = s3.deleteObject(
    {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: deleted
    },
    (err, data) => {
      if (err) {
        return err;
      }
      return data;
    }
  );
  return result;
};
