import { wordList } from "./components/wordList.js";
import {updateToast} from "./components/toastAction.js";

let wordString = [[], [], [], [], []];
var i = 0;
let checkedString = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    deleteFromString();
  } else if (e.key === "Enter") {
    if (wordString.length === 5) {
      enterAction();
    }
    if (wordString[i]?.length === 5 && i < 5 && checkedString) {
      i += 1;
    }
  } else {
    if (
      wordString[i]?.length !== 5 &&
      e.key.toUpperCase().length === 1 &&
      e.code.substring(0, 3) === "Key"
    ) {
      appendString(e.key.toUpperCase());
    } else if (wordString[i]?.length === 5 && i < 5 && checkedString) {
      i += 1;
      checkedString = false;
    }
  }
  displayString();
});

document.addEventListener("click", (e) => {
  if (e.target.id === "back") {
    deleteFromString();
  } else if (e.target.id === "enter") {
    if (wordString.length === 5) {
      enterAction();
    }
    if (wordString[i]?.length === 5 && i < 5 && checkedString) {
      i += 1;
    }
  } else {
    if (wordString[i]?.length < 5 && e.target.innerHTML.length === 1) {
      appendString(e.target.innerHTML);
    } else if (
      wordString[i]?.length === 5 &&
      e.target.innerHTML.length === 1 &&
      i < 5 &&
      checkedString
    ) {
      i += 1;
       appendString(e.target.innerHTML);
      checkedString = false;
    }
  }
  displayString();
});


let randomSelectedWord = wordList[Math.floor(Math.random() * wordList.length)];

const enterAction = () => {
  let checkString = "";
  let index;
  let greenCount = 0;
  checkString = wordString[i].join("").toUpperCase();
  if (wordList.includes(checkString)) {
    for (let x = 0; x < checkString.length; x++) {
      for (let y = 0; y < randomSelectedWord.length; y++) {
        if (checkString[x] !== randomSelectedWord[y]) {
          if (
            !document.getElementById(`${i}${x}`).classList.contains("green") &&
            !document.getElementById(`${i}${x}`).classList.contains("yellow")
          ) {
            setColor(`${i}${x}`, "gray");
            setColor(`${checkString[x]}`, "gray");
          }
        } else {
          if (x === y) {
            greenCount += 1;
            setColor(`${i}${x}`, "green");
            setColor(`${checkString[x]}`, "green");
          } else {
            if (
              !document.getElementById(`${i}${x}`).classList.contains("green")
            ) {
              setColor(`${i}${x}`, "yellow");
              setColor(`${checkString[x]}`, "yellow");
            }
          }
        }
      }
    }
    checkedString = true;
    if (greenCount === 5) {
      updateToast("", i);
    } else {
      if (i === 4) {
        updateToast(`it was ${randomSelectedWord} </br> reload for another word`, (i = 6));
      }
    }
  } else {
    updateToast("Not a word in my list!");
    checkedString = false;
  }
};

const appendString = (target) => {
  wordString[i]?.push(target);
};

const deleteFromString = () => {
  wordString[i].pop();
  document.getElementById(`${i}${wordString[i].length}`).innerHTML = "";
};

const displayString = () => {
  for (let k = 0; k < wordString.length; k++) {
    for (let j = 0; j < wordString[k].length; j++) {
      document.getElementById(`${k}${j}`).innerHTML = wordString[k][j];
    }
  }
};


const setColor = (id, color) => {
  document.getElementById(id).classList.add(color);
};
const openModal = () => {
  document.getElementById("rules").classList.toggle("opacity");
};
const closeModal = () => {
  document.getElementById("rules").classList.remove("opacity");
};

document.getElementById('modal-icon')?.addEventListener('click',()=>{
 closeModal()
})
document.getElementById('openIcon')?.addEventListener('click',()=>{
  openModal()
 })