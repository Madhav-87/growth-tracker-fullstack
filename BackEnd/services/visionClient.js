const vision=require("@google-cloud/vision");

// Create a Vision API client using credentials
const visionClient = new vision.ImageAnnotatorClient();

module.exports=visionClient;
