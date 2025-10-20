const numberOfPeople = localStorage.getItem('numberOfPeople');
const timeAvailable = localStorage.getItem('timeAvailable');

let i = 1;
let messages = [];
const questionForm = document.getElementById("questionForm");

if (i == numberOfPeople) {
    document.getElementById("nextButton").classList.add("hidden");
    document
      .getElementById("getRecommendationsButton")
      .classList.remove("hidden");
}

questionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(numberOfPeople);
  const moodInput = document.getElementById("moodInput").value;
  const genreInput = document.getElementById("genreInput").value;

  const data = {
    mood: moodInput,
    genre: genreInput,
  };

  messages.push(data);
  i++;
  if (i == numberOfPeople) {
    document.getElementById("nextButton").classList.add("hidden");
    document
      .getElementById("getRecommendationsButton")
      .classList.remove("hidden");
}
  document.getElementById("personNumber").innerText = `Person ${i}`;
  document.getElementById("moodInput").value = "";
  document.getElementById("genreInput").value = "";


});

document.getElementById("getRecommendationsButton").addEventListener("click", () => {
    const moodInput = document.getElementById("moodInput").value;
    const genreInput = document.getElementById("genreInput").value;

    const data = {
        mood: moodInput,
        genre: genreInput,
    }

    messages.push(data);

    // Save as JSON string
    localStorage.setItem('peoplePreferences', JSON.stringify(messages));
    
    // Navigate to suggestions page
    window.location.href = 'suggestion.html';
});
