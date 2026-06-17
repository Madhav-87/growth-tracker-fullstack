const vision = require("@google-cloud/vision");
let visionClient, credentials;
try {
  credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_VISION_CREDENTIALS_BASE64, "base64").toString("utf-8")
  );
  visionClient = new vision.ImageAnnotatorClient({ credentials });
}
catch (err) {
  visionClient = null;
}

module.exports = visionClient;
