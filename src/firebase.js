import {initializeApp} from "firebase/app"
import {getAuth,GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBX4obQiC4QL4rJfUcD3GBuOKSiOQAEqdE",
    authDomain: "whatsapp-clone-97942.firebaseapp.com",
    projectId: "whatsapp-clone-97942",
    storageBucket: "whatsapp-clone-97942.appspot.com",
    messagingSenderId: "465986359992",
    appId: "1:465986359992:web:4a87a467938d3993a9da4d"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export{app, auth, provider};