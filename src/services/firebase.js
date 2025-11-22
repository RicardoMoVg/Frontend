// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    // PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT.firebaseapp.com",
    projectId: "TU_PROJECT",
    storageBucket: "TU_PROJECT.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `chat_images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};