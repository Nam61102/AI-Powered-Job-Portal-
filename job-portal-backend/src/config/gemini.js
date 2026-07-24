const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini client with your API key
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = ai;
