import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

async function getWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
    const data = await response.json();
    return data.weather[0].description;
}

async function getFlightOptions(details){

    const result = await model.generateContent({
        contents: [
        {
            role: "user",
            parts: [{ text: `Tell me one Cheap flight from ${details.departure} to ${details.destination} on ${details.fromDate} and returning flight on ${details.toDate}Provide the answer in JSON format.` }],
        },
        ],
    });
    console.log(result.response.text());

}
export { getWeather, getFlightOptions };