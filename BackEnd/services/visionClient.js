const vision=require("@google-cloud/vision");
const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_VISION_CREDENTIALS_BASE64, "base64").toString("utf-8")
);
// `Create a Vision API client using credentials
const visionClient = new vision.ImageAnnotatorClient({ credentials });

module.exports=visionClient;
