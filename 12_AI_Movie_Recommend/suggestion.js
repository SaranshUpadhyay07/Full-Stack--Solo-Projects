import { ai, supabase } from './config.js';

// Get stored data
const numberOfPeople = localStorage.getItem('numberOfPeople');
const timeAvailable = localStorage.getItem('timeAvailable');
const peoplePreferences = JSON.parse(localStorage.getItem('peoplePreferences'));

let chatHistory = [];

// Build data string
let data = "";
if (Array.isArray(peoplePreferences)) {
  for (let i = 0; i < peoplePreferences.length; i++) {
    data += `(genre: ${peoplePreferences[i].genre}, mood: ${peoplePreferences[i].mood}), `;
  }
  data = data.trim().slice(0, -1); // remove trailing comma
} else {
  console.warn("No peoplePreferences found in localStorage");
}



// Create full prompt text for Gemini
const fullPrompt = `
You are a movie recommendation engine. Based on the preferences of a group of people and the time they have available, create an embedding-friendly text prompt to find similar movies from a vector database.
only give prompts without any additional text in 100 words.
Group details:
- Number of people: ${numberOfPeople}
- Preferences (each person is inside parentheses): ${data}
- Time available: ${timeAvailable} hours
`;

const promptHistory = `
You are a movie recommendation chatbot.
Your role:
- Help users find or discuss movie recommendations.
- Clear their doubts about movies.(very important)
- Base all answers on previous recommendations and user preferences.
- Be brief, friendly, and conversational.

Group details:
- Number of people: ${numberOfPeople}
- Time available: ${timeAvailable} hours
- Preferences (each person inside parentheses): ${data}

Previous recommendations (from the recommendation engine seperated by commas):
${chatHistory[0] || "None yet."}

Chat history so far:
${chatHistory
  .slice(1)
  .map((entry, index) => `(${index + 1}) ${entry}`)
  .join('\n')}

Now respond as the chatbot. 
If the user asks for more options, suggest similar movies based on genre/mood and available time.
If they ask question about a movie from previous recommendations, answer based on that.
If they ask about a movie from the previous list, provide insights about it.
If no prior recommendation exists, politely say so.

Answwer concisely and in a friendly manner.
`;

async function chatBotResponse(chatHistory) {
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: promptHistory}],
                },
            ],
        });

        const generatedText = result.response.text();
        chatHistory.push(`system: (${generatedText})`);
        console.log(chatHistory)
        document.getElementById('chatBoxBody').innerHTML += `<p class="chat-done">Bot: ${generatedText}\n\n </p>`;

    } catch (err) {
        console.error("Error generating prompt:", err);
    }
}

async function findNearestMatch(embedding) {
  try {
    const { data: matches, error } = await supabase.rpc('match_movies', {
      query_embedding: embedding,
      match_threshold: 0.60,
      match_count: 3
    });

    if (error) throw error;
    if (!matches || matches.length === 0) {
      console.warn("No matches found.");
      return "";
    }

    const matchText = matches.map(obj => obj.content).join('\n\n');
    return matchText;
  } catch (err) {
    console.error("Error finding nearest match:", err);
    return "";
  }
}

function renderData(match){
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('recommendations').classList.remove('hidden');
    document.getElementById('recommendations').innerText = match;

    // Regex to match movie headers
    const regex = /[\w\s'!&:-]+: \d{4} \| [A-Z0-9-]+ \| \d+h\s?\d+m \| \d+(\.\d+)? rating/g;

    const matches = match.match(regex);
    console.log(matches);
    const a = matches.join(", ");
    chatHistory.push(`${a}`);
}

async function embeddedPrompt (generatedText){
    const model = ai.getGenerativeModel({ model: "gemini-embedding-001" });

    try{
        const embeddingResponse = await model.embedContent(generatedText)
        const embedding = embeddingResponse.embedding.values
        
        const match = await findNearestMatch(embedding);
        renderData(match);
    }
    catch(err){
        console.error("Error generating embedding:", err);

    }
}

async function promptWritter() {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    });

    const generatedText = result.response.text();
    embeddedPrompt(generatedText);

  } catch (err) {
    console.error("Error generating prompt:", err);
  }
}

promptWritter();

// Chat Modal Logic
const chatModal = document.getElementById('chatModal');
const closeModalButton = document.getElementById('closeModalButton');
const watchButton = document.getElementById('watchButton');

watchButton.addEventListener('click', () => {
    chatModal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
    chatModal.classList.add('hidden');
});


chatModal.addEventListener('click', (e) => {
    if (e.target === chatModal) {
        chatModal.classList.add('hidden');
    }
});

sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message === '') return;

    chatHistory.push(`user: (${message})`);
    document.getElementById('chatBoxBody').innerHTML += `<p class="chat-done">you: ${message} </p>`;
    chatInput.value = '';
    chatBotResponse(chatHistory);
});


chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Function to add message to chat
function addMessageToChat(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = text;
    
    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}