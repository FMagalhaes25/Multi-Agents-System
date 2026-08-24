import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const geminiApiKey = process.env.GOOGLE_API_KEY ?? process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    throw new Error("Defina GOOGLE_API_KEY (ou GEMINI_API_KEY) no ambiente antes de rodar o projeto.");
}

export const ai = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: geminiApiKey
});