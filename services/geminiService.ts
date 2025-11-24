import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateEventDescription = async (title: string, category: string, location: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a short, exciting, and engaging description (max 2 sentences) for an event titled "${title}" in the category "${category}" taking place at "${location}". Do not include hashtags.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() || 'Join us for this amazing event!';
  } catch (error) {
    console.error("Error generating description:", error);
    return 'An exciting event you do not want to miss.';
  }
};

export const generateTodoSuggestions = async (eventTitle: string): Promise<string[]> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `Generate a list of 3 essential planning tasks (todos) for attending or hosting an event called "${eventTitle}". Return only the tasks separated by newlines.`;

        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });

        const text = response.text || '';
        return text.split('\n').filter(line => line.trim().length > 0).map(line => line.replace(/^[-\d.]+\s*/, ''));
    } catch (error) {
        return ['Check tickets', 'Plan transport', 'Invite friends'];
    }
}
