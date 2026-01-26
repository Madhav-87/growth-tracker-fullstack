const dotenv = require("dotenv");
const visionClient = require("./visionClient");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
// --- 1. DEFINE THE PERSONA AND RULES ---
const getQuestionaries = `
Act as a Goal Verification Assistant. You will receive a JSON list of user goals. For each goal, generate exactly 4 simple "Yes/No" questions to verify the task was completed and extra 5th question regarding "Q5.Submit your feedback about goal".
Constraints:
Focus on Execution: Ask about steps taken or completion status, not deep technical knowledge or memory.
Format: Output strictly as a JSON array in this format: [
        {
            MainQuestion: "What is JavaScript?",
            subQuestionSet: [
                { question: "What is JavaScript used for?" },
                { question: "Is JavaScript a compiled language?" },
                { question: "Who created JavaScript?" },
                { question: "Is JavaScript synchronous or asynchronous?" },
                { question: "Submit your feedback about the goal" }
            ]
        }
];`
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_GET_QUE);
const genAI2 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_VERIFY_SCORE);
async function aigetQuestionaries(data) {
    try {
        const prompt = JSON.stringify(data);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            systemInstruction: getQuestionaries
        });
        const chat = model.startChat();
        const result = await chat.sendMessage(prompt);
        let reply = result.response.text();
        reply = reply.replace(/json|/g, '').trim();
        return JSON.parse(reply);
    }
    catch (err) {
        console.log("Gemini Error:" + err);
        return false;
    }
} 
async function aiVerify(data) {
    try {
        // ---------- BASIC CHECKS ----------
        if (!Array.isArray(data)) {
            throw new Error("Input must be an array.");
        }

        if (data.length === 0) {
            throw new Error("No images provided.");
        }

        if (data.length > 15) {
            throw new Error("Maximum 15 images are allowed.");
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].image.length > 4_000_000) {
                 throw new Error("Image too large");
            }
        }
        const finalResult = []; // ✅ array result

        // ---------- PROCESS EACH IMAGE ----------
        for (let i = 0; i < data.length; i++) {
            const { GoalText, image } = data[i];

            // Vision disabled / missing
            if (!visionClient) {
                finalResult.push({
                    GoalText,
                    imageDesc: "Vision service disabled.",
                    object: []
                });
                continue;
            }

            const [result] = await visionClient.annotateImage({
                image: { content: image },
                features: [
                    { type: "LABEL_DETECTION" },
                    { type: "TEXT_DETECTION" }
                ]
            });

            // ---------- OBJECT LABELS ----------
            let objects = [];
            if (result.labelAnnotations?.length) {
                objects = result.labelAnnotations.map(l => l.description);
            }

            // ---------- TEXT OCR ----------
            let textDesc = "No readable text is visible in the image.";
            if (result.textAnnotations?.[0]?.description) {
                textDesc = result.textAnnotations[0].description.trim();
            }

            // ---------- IMAGE DESCRIPTION ----------
            const imageDesc =
                objects.length > 0
                    ? `Visible objects: ${objects.join(", ")}. Text: ${textDesc}`
                    : `No clear objects detected. Text: ${textDesc}`;

            // ---------- PUSH SYNCED RESULT ----------
            finalResult.push({
                GoalText,
                imageDesc,
                object: objects
            });
        }

        return { success: true, data: finalResult };

    } catch (err) {
        console.error("Vision API Error:", err.message);
        return { success: false, error: err.message };
    }
}
async function getScore(finalArray) {
    console.log(finalArray)
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
You are a STRICT, RULE-BASED evaluator.

You will receive an ARRAY of OBJECTS.
Each object contains:
- GoalText
- imageDesc
- object (labels)

TASK (STRICT):
Evaluate EACH object INDIVIDUALLY.

For EACH object:
- Assign score 100 if GoalText is CLEARLY related to imageDesc and object labels.
- Assign score 0 if GoalText is NOT related.

AGGREGATION RULE (MANDATORY):
- The FINAL result MUST be the ARITHMETIC AVERAGE of all individual scores.
- Formula:
  (sum of individual scores) / (number of objects)
- Round the final result to the nearest integer.

FAILSAFE RULE:
- If any object cannot be evaluated, treat it as score 0.

IMPORTANT RULES (DO NOT BREAK):
- Do NOT explain.
- Do NOT include text.
- Do NOT include comments.
- Do NOT include markdown.
- Do NOT wrap output in backticks.
- Do NOT return arrays or multiple objects.
- Return ONLY ONE valid JSON object in EXACT format:

{ "result": NUMBER }
`
    });

    // Send ONLY data as prompt
    const response = await model.generateContent(
      JSON.stringify(finalArray)
    );

    const text = response.response.text().trim();

    // Safety parse
    let finalResult;
    try {
      finalResult = JSON.parse(text);
    } catch {
      throw new Error("Gemini did not return valid JSON");
    }

    // Validate response
    if (
      typeof finalResult.result !== "number" ||
      finalResult.result < 0 ||
      finalResult.result > 100
    ) {
      throw new Error("Invalid score from Gemini");
    }
    console.log(finalResult)

    return { success: true, data: finalResult };

  } catch (err) {
    console.error("Gemini Scoring Error:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { aigetQuestionaries, aiVerify, getScore };