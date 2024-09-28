
let keyboard = document.querySelectorAll('.key')
let wordContainer = document.querySelector('.word-container')
let hangMan = document.querySelector('.hangman')
let hangmanContainer = document.querySelector('.hangman-container')

let guessWord = "ANT";
let guessArray = guessWord.split("").fill(" ")
let guessedArray = []
let wrongGuess = 0

const head = '<circle cx="200" cy="140" r="40" stroke="black" stroke-width="3" fill="none" />';
const body = '<line x1="200" y1="180" x2="200" y2="300" stroke="black" stroke-width="3" />';
const leftHand = '<line x1="200" y1="220" x2="140" y2="180" stroke="black" stroke-width="3" />';
const righthand = '<line x1="200" y1="220" x2="260" y2="180" stroke="black" stroke-width="3" />';
const leftLeg = '<line x1="200" y1="300" x2="160" y2="380" stroke="black" stroke-width="3" />';
const rightLeg = '<line x1="200" y1="300" x2="240" y2="380" stroke="black" stroke-width="3" />';

let gif = document.createElement('img')
gif.classList.add('gif')


function updateHangman(wrongGuess) {

    switch (wrongGuess) {
        case 1:
            hangMan.innerHTML += head
            break;
        case 2:
            hangMan.innerHTML += body
            break;
        case 3:
            hangMan.innerHTML += leftHand
            break;
        case 4:
            hangMan.innerHTML += righthand
            break;
        case 5:
            hangMan.innerHTML += leftLeg
            break;
        case 6:
            hangMan.innerHTML += rightLeg
            break;
        default:
            break;
    }
}



function matchLetter(letter) {
    if (!guessedArray.includes(letter) && !guessWord.includes(letter)) {
        if (wrongGuess <= 6) {
            wrongGuess++;
            updateHangman(wrongGuess)
        }
    }

    if (!guessedArray.includes(letter)) {
        guessedArray.push(letter)
    }
    if (guessWord.includes(letter)) {
        for (let i = 0; i < guessWord.length; i++) {
            if (guessWord[i] == letter) {
                guessArray[i] = letter
            }
        }
    }
    showGuessWord()
}


function showGuessWord() {
    let word = ''
    for (let i = 0; i < guessArray.length; i++) {
        word += `<div class="word">${guessArray[i]}</div>`
    }
    wordContainer.innerHTML = word
};



keyboard.forEach((item) => {
    item.addEventListener('click', () => {
        let letter = item.innerHTML.trim()[0].toUpperCase();
        if (!guessedArray.includes(letter)) {
            item.innerHTML += '<img class="cross" src="./images/cross-removebg-preview.png" alt="">'
        }
        matchLetter(letter)
        if (wrongGuess == 7 && guessArray.join('') != guessWord){
            console.log('Fail')
            hangmanContainer.innerHTML = `<img src = './images/fail.gif'>`
        }

        if(guessArray.join('') == guessWord){
            console.log('win')
            hangmanContainer.innerHTML = `<img src = './images/win.gif'>`
        }
    })

})

console.log(wrongGuess, "  ", guessArray.join(''))




    showGuessWord()


