// DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Generate Password Click Event
generate.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copy password to clipboard
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard.')
})

// Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Initialise password variable
    let generatedPassword = '';

    // 2. Filter out unchecked types
    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if(typesCount === 0) {
        return '';
    }

    // 3. Loop over the length and call a generator function for each type
    for(let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
    }

    // 4. Add the final password to the password variable and return it
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Generator Functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Selecting a random number that correlates with a letter on the character code chart, starting from 97 = a, spanning the 26 numbers in the alphabet.
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Selecting a random number that correlates with a letter on the character code chart, starting from 65 = A, spanning the 26 numbers in the alphabet.
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // Selecting a random number that correlates with a number on the character code chart, starting from 48 = 0, spanning the numbers 0-9.
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}