const dotenv = require("dotenv");

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
]`;
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
        reply = reply.replace(/```json|```/g, '').trim();
        return JSON.parse(reply);
    }
    catch (err) {
        console.log("Gemini Error:" + err);
        return false;
    }
}
async function aiVerify(data) {
    try {
        const verifyRules = `Role: Lenient Progress Auditor

Goal:
Return the exact percentage value based on valid learning progress, as a numeric decimal value only.

Rules (deterministic evaluator):

Base fields
Use the totalMarks field of each MainQuestion as the baseline earned marks for that goal.
Ignore isCorrect and answer fields entirely for scoring.

Feedback detection (rare condition — only when explicit):
Fetch the feedback text for the MainQuestion if present. Normalize it by trimming and converting to lowercase.
Treat feedback as explicit confirmation of completion if it contains any of these substrings:
compl, done, finished, complete, completed
(This intentionally matches common misspellings like complted.)

Treat feedback as explicit indication that the goal is NOT complete if it contains any of these substrings/words/phrases (case-insensitive):
will, i will, i'll, will complete, not yet, not complete, incomplete, pending, later, in future, future, tomorrow, plan to, to do, unfinished, will do
Conservative rule: Only consider feedback as indicating "not complete" if one or more of the explicit incomplete tokens above are present. If feedback is empty, missing, or ambiguous (no matching tokens), do not treat it as proof of lying or incompletion.
How to apply detection

For each MainQuestion:
If feedback indicates NOT COMPLETE (per rule 2), then set that goal's earned marks = 0 (do not use its totalMarks).
Otherwise (feedback confirms completion OR feedback absent/ambiguous), use the totalMarks value as the earned marks for that goal.

Important: When you exclude a goal's marks because feedback indicates incompletion, you do not change the Potential count. Potential remains the count of MainQuestion objects.

Scoring
Earned = sum(earned marks for all MainQuestion items after applying feedback rule)
Potential = number of MainQuestion items (integer)
Percentage = (Earned / Potential) × 100

Precision & Output
Do NOT round or truncate. Return the exact decimal value (as computed), preserving precision (e.g., 91.6666666667).
Output ONLY the numeric value (decimal allowed). No text, no JSON, no explanation, nothing else.

Behavior guarantees
Default is lenient: rely on totalMarks unless explicit feedback says otherwise.
Only exclude marks when there is clear textual evidence in feedback that the goal is not yet complete or is promised for the future.
Do not attempt to infer subtle dishonesty beyond explicit tokens above.

Example (from your provided object):
If one goal's feedback is "I will complete it on future", the rule finds will/future → exclude that goal's totalMarks (set to 0) while Potential remains the total goals count → compute Percentage = (Earned / Potential) × 100.`
        const prompt = JSON.stringify(data);
        const model = genAI2.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: verifyRules
        });
        const chat = model.startChat();
        const result = await chat.sendMessage(prompt);
        let reply = result.response.text();
        reply = reply.replace(/```json|```/g, '').trim();
        return JSON.parse(reply);
    }
    catch (err) {
        console.log("Gemini Error:" + err);
        return false;
    }
}
module.exports = { aigetQuestionaries, aiVerify };