import './style.css';

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

import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, doc, getFirestore, updateDoc, query, deleteDoc,  onSnapshot,  } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const user = auth.currentUser

// const addNewCard = document.querySelector('.binking__card-label')
const cardNumber = document.querySelector(".binking__number-field");
const cardMonth = document.querySelector('.binking__month-field');
const cardYear = document.querySelector('.binking__year-field');
const cardCvc = document.querySelector('.binking__code-field');
// const but = document.querySelector(".but")
// const cardList = document.querySelector('.card-list');
// const smalCard = document.createElement('div');
const commentField = document.querySelector('.comment')
const buttonPay = document.querySelector('.binking__button')
const newCardToList = document.querySelector('.binking__card-label')

// ADD DATA
async function dataPost ()  {
   await addDoc(collection(db, auth.currentUser.uid),  {
    number : cardNumber.value.trim(),
    cardDate: cardMonth.value + '/' + cardYear.value,
    cardCvc: cardCvc.value,
    comment:commentField.value ,
    date: Date.now(),
    queryId:''
  },

  )
  .then((docRef) => {
    updateDoc(docRef, {
      queryId: docRef.id
     }
    );
  console.log(docRef.id + "its done")
    }
  )
  .catch((error) => {
    console.log(error)
    }
  )
}

function logoImg (card) {
  if(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(card.number)) {
    return  "https://static.binking.io/brands-logos/visa-original.svg"
  }
  if(/^(?:5[1-5][0-9]{14})$/.test(card.number)) {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"
  }
}
 //CHECK legitimacy of user.
onAuthStateChanged(auth, (user) => {
  const cardList = document.querySelector('.card-list');
  if (user) {
   //USERWATCHER
    const citiesRef = (collection(db, user.uid));
    const q = query(citiesRef);
  
   onSnapshot(q, (querySnapshot) => {
      const cards = [];
      console.log("the q" )
      querySnapshot.forEach((doc) => {
        cards.push(doc.data())
        }
      )
      console.log(citiesRef.id)
      console.log(q.id)
     cardList.innerHTML = '';
     
     async function deleteCard (r) 
     {await deleteDoc(doc(db, auth.currentUser.uid, r ))
      .then(() => {console.log("sometthing was delete")})
      }

     for(let i of cards) {
       let item = document.createElement('div')
       cardList.appendChild(item)
       item.innerHTML = `<div class="binking__card" >
        <img class="binking__card-brand-logo" src=${logoImg(i)}>
        <div  class="binking__card-last4">${i.number.replace(/\s/g,'').replace(/(.{4})/g,"$1 ")}
        </div>
        <div class="binking__card-exp">${i.cardDate}
        </div>  
        </div>
        <div class = "card__buttons">
        <button class = "button__delete"  >Удалить</button>
        <button class = "button__cvc" onclick = "alert(${i.cardCvc})">CVC</button>
        </div>
        <div class = "card__comment">${i.comment}</div> `;
       
       item.querySelector(".button__delete").addEventListener("click", () => {
         if(window.confirm("are you sure"))
         deleteCard(i.queryId)
          }
        )
       }
     }
    );
  } else {
    history.back()
    }
  }
);

//LOGOUT
const logOut = () => {
  signOut(auth).then(() => {
 console.log('this user is sign out')
  }
)
.catch((error) => {console.log(error)
    }
  )
}

  // class Cards {
  //   static create(card) {
  //       return fetch('https://cardkeeper-48ee6-default-rtdb.europe-west1.firebasedatabase.app/cards.json', {
  //           method: 'POST',
  //           body: JSON.stringify(card),
  //           headers: {
  //               Content : 'application.json'
  //           }
  //       })
  //       .then(response => response.json())
  //       .then(response =>{card.id = response.name
  //         return card
  //       })
  //       .then(addToLocalStorage)
  //       .then(Cards.renderCardList)
  //   }
  //   static renderCardList () {
  //     const cards = getStorageCards()

  //     const cardMessage = cards.length 
  //       ? cards.map(toCard).join('')
  //       : `<div>NO CADRDS YET</div>`

  //     smalCard.innerHTML = cardMessage
  //   }
  // }

//   let logoCard
//   let typeCard

//   let card = {
//     number : cardNumber.value.trim(),
//     cardDate: cardMonth.value + '/' + cardYear.value,
//     cardCvc: cardCvc.value,
//     comment:typeCard,
//     brand: logoCard
// }
 
  // const numberVisaConfirm = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(cardNumber.value);
  // const numberMasterCardConfirm =  /^(?:5[1-5][0-9]{14})$/.test(cardNumber.value);

  // function toCard (card) {
  //   return  `<div class="binking__card" >
  //         <img class="binking__card-brand-logo" src=${card.brand}>
  //           <div class="binking__card-last4">${'...' + card.number.substr(12, 4)}
  //           </div>
  //             <div class="binking__card-exp">${card.cardDate}
  //             </div>  
  //           </div>
  //           <div>${card.comment}</div> `
  // } 

// addNewCard.addEventListener('click', () => {
//        card = {
//         number : cardNumber.value.trim(),
//         cardDate: cardMonth.value + '/' + cardYear.value,
//         cardCvc: cardCvc.value,
//         comment:commentField.value ,
//         brand:logoImg (cardNumber)
//        }
  
//     if(numberVisaConfirm) {
//         Cards.create(card).then(() => {
//          logoCard = "https://static.binking.io/brands-logos/visa-original.svg"
//          typeCard = 'visa'
//           card = {
//             number : cardNumber.value.trim(),
//             cardDate: cardMonth.value + '/' + cardYear.value,
//             cardCvc: cardCvc.value,
//             comment:commentField.value,
//             brand: logoCard
//           }
//       console.log(card)
//       })
//       .then(() => {
//         card = {
//           number : cardNumber.value.trim(),
//           cardDate: cardMonth.value + '/' + cardYear.value,
//           cardCvc: cardCvc.value,
//           comment:commentField.value,
//           brand:logoCard
//         }
//       })
//       .then(() => {
//         cardNumber.value = '';
//         cardMonth.value = '';
//         cardCvc.value = '';
//         cardYear.value = '';
//         card.comment = '';
//         card.brand = '';
//       })
//     }

//       if(numberMasterCardConfirm) {
//         Cards.create(card).then(() => {
//           logoCard = "https://www.mastercard.kz/content/dam/mccom/global/logos/logo-mastercard-mobile.svg"
//           typeCard = 'mastercard'
//             card = {
//               number : cardNumber.value.trim(),
//               cardDate: cardMonth.value + '/' + cardYear.value,
//               cardCvc: cardCvc.value,
//               comment:commentField.value,
//               brand:logoCard
//             }
//           })
//        .then(() => {
//         card = {
//           number : cardNumber.value.trim(),
//           cardDate: cardMonth.value + '/' + cardYear.value,
//           cardCvc: cardCvc.value,
//           comment:commentField.value ,
//           brand:logoCard
//         }
//       })
//        .then(() => {
//          cardNumber.value = '';
//          cardMonth.value = '';
//          cardCvc.value = '';
//          cardYear.value = '';
//          card.comment = '';
//          card.brand = '';
//         })
//         commentField.textContent = ''
//       }else{console.error()
//       }
//     })
    //    card.comment = '';
    //      card.brand = '';
       
    // cardList.append(smalCard)
  
  // window.addEventListener('load', () => {
  //   userWatcher()
  // })

      cardNumber.addEventListener('click', () => {
        cardNumber.classList.remove('invalid')
      })
      cardYear.addEventListener('click', () => {
        cardYear.classList.remove('invalid')
      })
      cardMonth.addEventListener('click', () => {
        cardMonth.classList.remove('invalid')
      })
      cardCvc.addEventListener('click', () => {
        cardCvc.classList.remove('invalid')
      })
    
newCardToList.addEventListener('click', () => {
  if(/^(?:5[1-5][0-9]{14})$/.test(cardNumber.value) ||
    /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(cardNumber.value) ) {
    var numberValidate = true
  }
  else{console.log('invalid')
    cardNumber.classList.add('invalid')}

  if(/^([0-9]{2}?)$/.test(cardYear.value)) {
      var yearValidate = true
  }
  else{console.log('invalid')
    cardYear.classList.add('invalid')}
        
  if(/^([0-9]{2}?)$/.test(cardMonth.value)) {
      var monthValidate = true
  }
  else{console.log('invalid')
        cardMonth.classList.add('invalid')}

  if(/^([0-9]{3}?)$/.test(cardCvc.value)) {
    var cvcValidate = true
  }
  else{console.log('invalid month')
  cardCvc.classList.add('invalid')}
  if(numberValidate && yearValidate && monthValidate && cvcValidate) {
    dataPost()
    cardNumber.value = '';
    cardYear.value = '';
    cardMonth.value = '';
    cardCvc.value = '';
    commentField.value = '';

    cardMonth.classList.remove('invalid')
    cardYear.classList.remove('invalid')
    cardCvc.classList.remove('invalid')
    cardNumber.classList.remove('invalid')
  }
  else{console.log('invalid')
  }
})

buttonPay.addEventListener('click', (e) => {
  e.preventDefault()
  logOut()
  
  }
)
   
      



