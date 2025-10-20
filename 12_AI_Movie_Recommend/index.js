import { ai, supabase } from './config.js';
import { CharacterTextSplitter } from '@langchain/textsplitters';

// code for storing data into vector database

// async function textSplitter(){
//     const response = await fetch('movies.txt');
//     const data = await response.text();
    
//     const splitter = new CharacterTextSplitter({
//         separator: '\n\n',
//         chunkSize: 1000,
//         chunkOverlap: 200,
//     });

//     const output = await splitter.createDocuments([data]);
//     console.log(output);
//     return output;
    
// } 

// async function storeData(){

//     try{
//         const data = await textSplitter();
//         const prompt = data.map((item) => {
//             return item.pageContent;
//         })
//         console.log(prompt);

//         const model = ai.getGenerativeModel({ model: "gemini-embedding-001" });

//         prompt.forEach(async (item) => {
//                 const embeddingResponse = await model.embedContent(item);
//                 const embedding =  embeddingResponse.embedding.values;             
//                 const { error } = await supabase.from('movies').insert([
//                     {
//                         content: item,
//                         embedding: embedding
//                     }
//                 ]);

//                 if(error){
//                     throw new Error(error.message);
//                 }
//         })
//     }
//     catch(error){
//         console.error("Error storing data:", error);
//     }
// }
// storeData();

const peopleInput = document.getElementById('peopleInput');
let numberOfPeople 
let timeAvailable
    peopleInput.addEventListener('submit', async (e) => {
        e.preventDefault();
        numberOfPeople = document.getElementById('numberInput').value;
        timeAvailable = document.getElementById('timeInput').value;
        if(numberOfPeople == 0){
            e.preventDefault();
            alert("Please enter a valid number of people.");
            return;
        }
        localStorage.setItem('numberOfPeople', numberOfPeople);
        localStorage.setItem('timeAvailable', timeAvailable);
        
        window.location.href = `question.html`;

    });




