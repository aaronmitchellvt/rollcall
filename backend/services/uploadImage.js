const AWS = require('aws-sdk')
const multer = require("multer")
const multerS3 = require("multer-s3")

// import config from "../config.js"

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1"
})

const s3 = new AWS.S3()

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_DEVELOPMENT,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = uploadImage