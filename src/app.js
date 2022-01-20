import './style.css';

import { initializeApp } from "firebase/app";
import {  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut, onAuthStateChanged} from "firebase/auth";

const emailEl = document.querySelector(".form-input--email");
const passwordEl = document.querySelector(".form-input--password");
const eyeContainerEl = document.querySelector(".password-eye-container");
const eyeImgEl = eyeContainerEl.getElementsByTagName("img")[0];
const createAccount = document.querySelector('.form-create-account-btn');
const formButton = document.querySelector('.form-log-in-btn');
const registerBtn = document.createElement('button');
const divider = document.querySelector('.divider');
const inputEmail = document.querySelector('.input-container');
const inputPassword = document.querySelector('.input-container--password');
const passwordText =  document.createElement('div');

const firebaseConfig = {
  apiKey: "AIzaSyDJMvxL-pzZGqcxQF4hyw3X51N3DDNUTdM",
  authDomain: "cardkeeper-48ee6.firebaseapp.com",
  databaseURL: "https://cardkeeper-48ee6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cardkeeper-48ee6",
  storageBucket: "cardkeeper-48ee6.appspot.com",
  messagingSenderId: "982688209470",
  appId: "1:982688209470:web:df219d126ce3e15fa48f6f",
  measurementId: "G-VFQZEBSTBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

formButton.before(passwordText)
passwordText.classList.add('smallRed');
passwordText.innerHTML =  'Password must be at least 6 characters';
passwordEl.addEventListener("keyup", (e) => {
  e.target.value.length
    ? eyeContainerEl.classList.remove("hidden")
    : eyeContainerEl.classList.add("hidden");
  }
);

// Show/hide the password
eyeContainerEl.addEventListener("click", () => {
  if (eyeImgEl.classList.contains("eye-off")) {
    eyeImgEl.src = 'https://raw.githubusercontent.com/clumes/fb-login-clone/master/images/eye.png';
    eyeImgEl.classList.remove("eye-off");
    passwordEl.type = "text";
  } else {
    eyeImgEl.src = 'https://raw.githubusercontent.com/clumes/fb-login-clone/master/images/eye-off.png';
    eyeImgEl.classList.add("eye-off");
    passwordEl.type = "password";
  }
}
)

registerBtn.classList.add('form-log-in-btn');
registerBtn.textContent = 'Register'

createAccount.addEventListener('click', () => {
    formButton.remove();
    createAccount.remove();
    divider.before(registerBtn)
    console.log('This is create btn')
  }
)
const dataUser = (user) => {
  console.log(user)
 return user
}
 // Signed in User
const singIn = () => { 
signInWithEmailAndPassword(auth, emailEl.value, passwordEl.value)
  .then((userCredential) => {
    document.location.href = './main.html'
    const user = userCredential.user;
    console.log(user) 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode / errorMessage)
  });
}
//register User
const regUser = () => {
 createUserWithEmailAndPassword(auth, emailEl.value, passwordEl.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  if(user) {
    console.log(user)
    document.location.href = './main.html'
  }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage + errorCode)
  })
}
//Sign Out
const logOut = () => {
  signOut(auth).then(() => {
  console.log('ok')
  })
  .catch((error) => {console.log(error)
  });
}

const userWatcher = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {console.log('user is singIn')
      const uid = user.uid;
      console.log(uid)
    }else {
      console.log('user is singOut')
    }
  })
}

var user = auth.currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  }
  )
}else('no users')
  document.addEventListener('DOMContentLoaded', () => {
    userWatcher()
  })

registerBtn.addEventListener('click', (event) => {
  event.preventDefault()
  const email = emailEl.value;
  const password = passwordEl.value;
  const emailConfirm = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)
  const passwordConfirm =/[0-9a-zA-Z!@#$%^&*]{6,}/.test(password)
  console.log(passwordConfirm)
  if(!emailConfirm) {
    inputEmail.classList.add('invalid')
  }
  if(!passwordConfirm) {
    inputPassword.classList.add('invalid')
  }
  if(emailConfirm && passwordConfirm) {regUser()
  } 
})

inputEmail.addEventListener('click', () => {
  inputEmail.classList.remove('invalid');
  }
)

inputPassword.addEventListener('click', () => {
  inputPassword.classList.remove('invalid')
  }
)

console.log(inputEmail.classList)
formButton.addEventListener('click', (event) => {
  event.preventDefault()
  const email = emailEl.value;
  const password = passwordEl.value;
  const emailConfirm = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)
  const passwordConfirm =/[0-9a-zA-Z!@#$%^&*]{6,}/.test(password)
  console.log(passwordConfirm)
  if(!emailConfirm) {
    inputEmail.classList.add('invalid')
  }
  if(!passwordConfirm) {
    inputPassword.classList.add('invalid')
  }  
  if( emailConfirm && passwordConfirm) {singIn()
  } 
})


// "start": "webpack-dev-server --mode development --open",