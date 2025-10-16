import { GoogleGenerativeAI } from "@google/generative-ai"
const translationForm = document.getElementById('translationForm');

translationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputText =  document.getElementById('inputText').value;
    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;

    getTranslation(inputText, selectedLanguage);
})

async function getTranslation(inputText, selectedLanguage){

    const apiKey = "Your_API_KEY_Here"; // Replace with your actual API key

    try{
        const ai = new GoogleGenerativeAI(apiKey);

        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Translate the following text to ${selectedLanguage}: ${inputText} only provide the translated text without any additional information.`;

        const result = await model.generateContent(prompt )
        const response = await result.response;
        const translatedText = response.text();

        renderTranslation(translatedText);
    }
    catch(error){
        console.error("Error fetching translation:", error);
    }
}

function renderTranslation(translatedText){
    const outputDiv = document.getElementById('outputContainer');
    outputDiv.classList.remove('hidden');
    document.getElementById('lang-opt').classList.add('hidden');
    document.getElementById('translateButton').classList.add('hidden');
    document.getElementById('backButton').classList.remove('hidden');
    document.getElementById('outputText').innerText = translatedText;
}

document.getElementById('backButton').addEventListener('click', () => {
    document.getElementById('outputContainer').classList.add('hidden');
    document.getElementById('lang-opt').classList.remove('hidden');
    document.getElementById('translateButton').classList.remove('hidden');
    document.getElementById('backButton').classList.add('hidden');
});