const formContainer = document.querySelector(".form-field");
const inputText = document.querySelector(".js-input");
const submitBtn = document.querySelector(".js-submit");
const symbol = document.getElementById("symbol");
const number = document.getElementById("number");

let passwordLength;
let includesNumber;
let includesSymbol;
let password;

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    resetDisplay();
    getDetails();
    password = generatePassword(passwordLength, includesNumber, includesSymbol);

    document.querySelector(
      ".password p"
    ).innerHTML = `Here is your password: ${password}`;
  } catch (error) {
    displayError(error);
  }
});

function getDetails() {
  passwordLength = inputText.value;

  if (passwordLength === "") {
    throw new Error(`Input can't be empty`);
  } else if (passwordLength < 6) {
    throw new Error("password must be at least greater than 6");
  } else if (passwordLength > 20) {
    throw new Error("Exceed max");
  }
  includesNumber = number.checked ? true : false;
  includesSymbol = symbol.checked ? true : false;
}

function generatePassword(length, number, symbol) {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = lowerCaseChars.toUpperCase();
  const numbers = "0123456789";
  const symbolsChars = "!@#$%^&*()?/|<>-_";

  let allowedChars = "";
  let password = "";

  allowedChars += lowerCaseChars + upperCaseChars;

  allowedChars += number ? numbers : "";
  allowedChars += symbol ? symbolsChars : "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);

    password += allowedChars[randomIndex];
  }

  console.log(password);
  return password;
}

function displayError(message) {
  document.querySelector(".js-error").innerHTML = message;
}

function resetDisplay() {
  document.querySelector(".js-error").innerHTML = "";
  document.querySelector(".password p").innerHTML = ``;
}
