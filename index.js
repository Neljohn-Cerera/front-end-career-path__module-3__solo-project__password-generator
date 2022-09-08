const stringChars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolChars = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];
const allChars = [...stringChars, ...numberChars, ...symbolChars];
let checkboxLetters = document.querySelector("#checkbox-letters");
let checkboxNumbers = document.querySelector("#checkbox-numbers");
let checkboxSymbols = document.querySelector("#checkbox-characters");
let passwordOneHtml = document.querySelector("#password-one");
let passwordTwoHtml = document.querySelector("#password-two");
let inputLengthHtml = document.querySelector("#input-length");
let clipboardCopiedhHtml = document.getElementById("clipboard-copied");

let passwordOne = "";
let passwordTwo = "";
let stringsIndex;
let numbersIndex;
let symbolsIndex;
let allCharsIndex;
let stringCount;
let numberCount;
let symbolCount;
let count = 8;

inputLengthHtml.addEventListener("change", (e) => {
  count = e.target.value;
});

function generatePassword() {
  const validateNumberOnly = new RegExp("^[0-9]+$");
  if (!validateNumberOnly.test(count)) {
    alert("Length should only contain numbers!");
    return;
  } else if (count < 6 || count > 19) {
    alert("Length should be greater than 5 and less than 20");
    return;
  }

  if (
    !checkboxLetters.checked &&
    !checkboxNumbers.checked &&
    !checkboxSymbols.checked
  ) {
    alert("Please checked characters of your choice!");
    return;
  } else if (
    checkboxLetters.checked &&
    !checkboxNumbers.checked &&
    !checkboxSymbols.checked
  ) {
    // Letters Only
    passwordOne = "";
    passwordTwo = "";
    passwordOne = generateRandomString(count);
    passwordTwo = generateRandomString(count);
  } else if (
    !checkboxLetters.checked &&
    checkboxNumbers.checked &&
    !checkboxSymbols.checked
  ) {
    // Numbers only
    passwordOne = "";
    passwordTwo = "";
    passwordOne = generateRandomNumber(count);
    passwordTwo = generateRandomNumber(count);
  } else if (
    !checkboxLetters.checked &&
    !checkboxNumbers.checked &&
    checkboxSymbols.checked
  ) {
    // Symbols Only
    passwordOne = "";
    passwordTwo = "";
    passwordOne = generateRandomSymbol(count);
    passwordTwo = generateRandomNumber(count);
  } else if (
    checkboxLetters.checked &&
    checkboxNumbers.checked &&
    !checkboxSymbols.checked
  ) {
    // Letters and Numbers Only
    passwordOne = "";
    passwordTwo = "";
    stringCount = Math.floor(Math.random() * count + 1);
    numberCount = count - stringCount;
    passwordOne =
      generateRandomString(stringCount) + generateRandomNumber(numberCount);
    passwordTwo =
      generateRandomString(stringCount) + generateRandomNumber(numberCount);
  } else if (
    checkboxLetters.checked &&
    !checkboxNumbers.checked &&
    checkboxSymbols.checked
  ) {
    // Letters and Symbols Only
    passwordOne = "";
    passwordTwo = "";
    stringCount = Math.floor(Math.random() * count + 1);
    symbolCount = count - stringCount;
    passwordOne =
      generateRandomString(stringCount) + generateRandomSymbol(symbolCount);
    passwordTwo =
      generateRandomString(stringCount) + generateRandomSymbol(symbolCount);
  } else if (
    !checkboxLetters.checked &&
    checkboxNumbers.checked &&
    checkboxSymbols.checked
  ) {
    // Numbers and Symbols Only
    passwordOne = "";
    passwordTwo = "";
    numberCount = Math.floor(Math.random() * count + 1);
    symbolCount = count - numberCount;
    passwordOne =
      generateRandomNumber(numberCount) + generateRandomSymbol(symbolCount);
    passwordTwo =
      generateRandomNumber(numberCount) + generateRandomSymbol(symbolCount);
  } else if (
    checkboxLetters.checked &&
    checkboxNumbers.checked &&
    checkboxSymbols.checked
  ) {
    // Checked all
    passwordOne = "";
    passwordTwo = "";
    for (let i = 0; i < count; i++) {
      allCharsIndex = Math.floor(Math.random() * allChars.length);
      passwordOne += allChars[allCharsIndex];
    }
    for (let i = 0; i < count; i++) {
      allCharsIndex = Math.floor(Math.random() * allChars.length);
      passwordTwo += allChars[allCharsIndex];
    }
  }
  passwordOneHtml.textContent = passwordOne;
  passwordTwoHtml.textContent = passwordTwo;
}

function copyClipboard(whatPassword) {
  if (passwordOne === "" || !passwordTwo === "") return;

  clipboardCopiedhHtml.classList.add("display-block");

  setTimeout(() => {
    clipboardCopiedhHtml.classList.remove("display-block");
  }, 8000);

  if (!navigator.clipboard) return;

  navigator.clipboard.writeText(whatPassword).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function resetPass() {
  passwordOneHtml.textContent = "";
  passwordTwoHtml.textContent = "";
  inputLengthHtml.value = "";
}

function generateRandomString(count) {
  let randomString = "";
  for (let i = 0; i < count; i++) {
    stringsIndex = Math.floor(Math.random() * stringChars.length);
    randomString += stringChars[stringsIndex];
  }
  return randomString;
}

function generateRandomNumber(count) {
  let randomNumber = "";
  for (let i = 0; i < count; i++) {
    numbersIndex = Math.floor(Math.random() * numberChars.length);
    randomNumber += numberChars[numbersIndex];
  }
  return randomNumber;
}

function generateRandomSymbol(count) {
  let randomSymbol = "";
  for (let i = 0; i < count; i++) {
    symbolsIndex = Math.floor(Math.random() * symbolChars.length);
    randomSymbol += symbolChars[symbolsIndex];
  }
  return randomSymbol;
}
