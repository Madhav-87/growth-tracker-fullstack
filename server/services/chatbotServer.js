const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const goalCoachInstruction = require('../config/goalCoachInstruction.js');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function chatbot(messages, data) {
    const rawHistory = Array.isArray(messages) ? messages : [];
    // Keep the latest 10 previous messages. The newest message is sent separately.
    const historyPayload = rawHistory.slice(1).slice(-10).map((message) => ({
        role: message.role === 'ai' ? 'model' : 'user',
        parts: [{ text: message.text }]
    }));

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
            systemInstruction: goalCoachInstruction
        });
        const chat = model.startChat({ history: historyPayload || [] });
        const result = await chat.sendMessage(data);
        return result.response.text();
    }
    catch (err) {
        console.log('Gemini Error:' + err);
        return false;
    }
}

module.exports = chatbot;
