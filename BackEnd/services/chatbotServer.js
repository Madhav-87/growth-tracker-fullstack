const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
// --- 1. DEFINE THE PERSONA AND RULES ---
const goalCoachInstruction = `
You are a dedicated "Goal Coach" for a Personal Growth Tracking application. 
Your specific role is to help users define, track, and achieve their personal goals.

YOUR RULES:
1.  **Tone:** Be encouraging, strict but fair, and highly motivational. Use emojis occasionally to keep spirits high.
2.  **Focus:** specific strategies for habit formation, breaking big goals into small steps, and overcoming procrastination.
3.  **GUARDRAILS (CRITICAL):** * If the user asks about goals, habits, productivity, or mental mindset: Answer helpfully.
    * If the user asks about UNRELATED topics (e.g., "Write me code for Python", "Who won the World Cup?", "Recipe for pasta"): 
        You MUST refuse to answer. Instead, reply with this exact phrase: 
        "🚫 I am specialized as your Goal Coach. I cannot help with that topic. Let's get back to tracking your progress and smashing your goals!"
`;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function chatbot(messages, data) {
    const rawhistory=Array.isArray(messages)?messages:[];
    // 1. Get the last 10 messages to keep payload small (Sliding Window)
    // We exclude the very last one because that is the 'new' message we are about to send separately
    const historyPayload = rawhistory.slice(1).slice(-10).map(msg => ({
        role: msg.role === "ai" ? "model" : "user", // Rename 'ai' to 'model' for Gemini
        parts: [{ text: msg.text }] // Gemini requires this structure
    }));
    try {
        const prompt = data;
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            systemInstruction: goalCoachInstruction
        });
        const chat = model.startChat({
            history: historyPayload || []
        });
        const result = await chat.sendMessage(prompt);
        const reply = result.response.text();
        return reply;
    }
    catch (err) {
        console.log("Gemini Error:" + err);
        return false;
    }
}
module.exports = chatbot;