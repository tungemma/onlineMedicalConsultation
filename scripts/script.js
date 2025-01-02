// Import and configure Firebase  
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";  
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";  
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";  

const firebaseConfig = {  
    // Your Firebase configuration here  
};  

const app = initializeApp(firebaseConfig);  
const auth = getAuth(app);  
const storage = getStorage(app);  

// Registration  
const registrationForm = document.getElementById('registrationForm');  
if (registrationForm) {  
    registrationForm.addEventListener('submit', async (e) => {  
        e.preventDefault();  
        const email = registrationForm.email.value;  
        const password = registrationForm.password.value;  
        const name = registrationForm.name.value;  

        try {  
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);  
            console.log('Registered:', userCredential.user);  
            alert('Registration successful!');  
        } catch (error) {  
            console.error(error);  
            alert(error.message);  
        }  
    });  
}  

// X-ray Upload  
const uploadForm = document.getElementById('uploadForm');  
if (uploadForm) {  
    uploadForm.addEventListener('submit', async (e) => {  
        e.preventDefault();  
        const file = uploadForm.xray.files[0];  
        const storageRef = ref(storage, `xrays/${file.name}`);  

        try {  
            await uploadBytes(storageRef, file);  
            alert('X-ray uploaded successfully!');  
        } catch (error) {  
            console.error(error);  
            alert(error.message);  
        }  
    });  
}