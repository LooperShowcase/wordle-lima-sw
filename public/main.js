const NUMPER_OF_WORDS = 6;
const NUMPER_OF_CHARS = 5;

let words = document.getElementById("container");

for (let i = 0; i < NUMPER_OF_WORDS; i++) {
  let singleword = document.createElement("div");
  singleword.className = "word";

  for (let j = 0; j < NUMPER_OF_CHARS; j++) {
    let singleChar = document.createElement("div");
    singleChar.className = "char";
    singleword.appendChild(singleChar);
  }
  words.appendChild(singleword);
}

let curentword = 0;
let curentchar = 0;
document.addEventListener("keydown", async function (event) {
  let wordDiv = words.children[curentword];
  if (event.key === "Backspace") {
    if (curentchar > 0) {
      let charToDelete = wordDiv.children[curentchar - 1];
      animateCSS(charToDelete, "bounce");
      charToDelete.innerHTML = "";
      curentchar--;
    }
  } else if (event.key === "Enter") {
    if (curentchar === 5) {
      const word = getWord();
      const results = await (await fetch("/wordle/" + word)).json();
      for (let i = 0; i < results.length; i++) {
        wordDiv.children[i].style.backgroundColor = results[i];
      }
      curentword++;
      curentchar = 0;
    }
    animateCSS(wordDiv, "tada");
  } else if (curentchar < 5 && isLetter(event.key)) {
    let wordDiv = words.children[curentword];
    let charDiv = wordDiv.children[curentchar];

    charDiv.innerHTML = event.key.toUpperCase();
    curentchar++;
  }
});

function getWord() {
  let word = "";
  let myGuess = words.children[curentword];
  for (let i = 0; i < myGuess.children.length; i++) {
    word = word + myGuess.children[i].innerHTML;
  }
  return word;
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
