import { GoogleGenerativeAI } from "@google/generative-ai";
import { getWeather, getFlightOptions } from "./tools.js";

const detailForm = document.getElementById("details-form");

const messages = [
  {
    role: "system",
    content: `
        You are a helpful AI agent. Provide detailed and 
        conversational responses, but only include the normal information a 
        regular person might want unless they explicitly ask for more. Provide 
        highly specific answers based on the information you're given. Prefer 
        to gather information with the tools provided to you rather than 
        giving basic, generic answers.You will have the following details
        about a user's travel plans:
        - Number of people traveling
        - Departure location
        - Destination location
        - Travel dates
        - Preferences (e.g., sightseeing, adventure, relaxation)
        - Budget constraints

        Use this information to suggest personalized travel itineraries,tell them 
        activities, and accommodations that fit the user's needs and preferences.
        `,
    tools: [
      {
        functionDeclarations: [
          {
            name: "getWeather",
            description: "Gets the current weather for a specified location.",
            parameters: {
              type: "OBJECT",
              properties: {
                location: {
                  type: "OBJECT",
                  properties: {
                    lat: {
                      type: "NUMBER",
                      description: "The latitude of the location.",
                    },
                    lon: {
                      type: "NUMBER",
                      description: "The longitude of the location.",
                    },
                  },
                  required: ["lat", "lon"],
                  description: "The coordinates latitude 44.34 and longitude 10.99 point to Modena, Italy, located in the Emilia-Romagna region of northern Italy",
                },
              },
              required: ["location"],
            },
          },
          {name: "getFlightOptions",
           description: "Provides flight options based on user travel details.",
           parameters: {
             type: "OBJECT",
             properties: {
               departure: {
                 type: "STRING",
                 description: "The departure location, e.g., New York",
               },
               destination: {
                 type: "STRING",
                 description: "The destination location, e.g., Paris",
               },
               fromDate: {
                 type: "STRING",
                 description: "The start date of travel in YYYY-MM-DD format",
               },
               toDate: {
                 type: "STRING",
                 description: "The end date of travel in YYYY-MM-DD format",
               },
             },
             required: ["departure", "destination", "fromDate", "toDate"],
           },
          },
        ],
      },
    ],
  },
];

// const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
// const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

// async function main() {
//   const result = await model.generateContent({
//     contents: [
//       {
//         role: "user",
//         parts: [{ text: "Explain how AI works in a few words" }],
//       },
//     ],
//   });
//   console.log(result.response.text());
// }

getFlightOptions({
    departure: "New York",
    destination: "Paris",
    fromDate: "2024-10-01",
    toDate: "2024-10-10",
})

detailForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const number = document.getElementById("number").value;
  const departure = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const fromDate = document.getElementById("from-date").value;
  const toDate = document.getElementById("to-date").value;
  const preferences = document.getElementById("preferences").value;
  const budget = document.getElementById("budget").value;

  const details = {
    number,
    departure,
    destination,
    fromDate,
    toDate,
    preferences,
    budget,
  };

  console.log(details);
});
