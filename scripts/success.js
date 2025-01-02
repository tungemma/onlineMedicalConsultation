// Import and configure Firebase  
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";  
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";  

const firebaseConfig = {  
    // Your Firebase configuration here  
};  

const app = initializeApp(firebaseConfig);  
const db = getFirestore(app);  

// Function to fetch and display success stories  
async function fetchSuccessStories() {  
    const successStoriesRef = collection(db, "successStories");  
    const q = query(successStoriesRef, where("isImportant", "==", true));  
    const querySnapshot = await getDocs(q);  

    const successStoriesDiv = document.getElementById('successStories');  
    successStoriesDiv.innerHTML = '';  

    querySnapshot.forEach((doc) => {  
        const data = doc.data();  
        
        const colDiv = document.createElement('div');  
        colDiv.classList.add('col-md-4', 'mb-4');  

        colDiv.innerHTML = `  
            <div class="card">  
                <img src="${data.imageURL}" class="card-img-top" alt="Success Story">  
                <div class="card-body">  
                    <p class="card-text">${data.description}</p>  
                </div>  
            </div>  
        `;  
        successStoriesDiv.appendChild(colDiv);  
    });  
}  

// Call the function to fetch and display stories  
fetchSuccessStories();