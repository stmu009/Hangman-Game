var triesLeftReset = 15;
var triesLeft = triesLeftReset;
var wins = 0;
var blanks = [];
var chosenWord = [];
var guessedLetters = [];
var restart = true;

var checkGuess = function(keyInput) {
  if (chosenWord.indexOf(keyInput) >= 0) {
    return true;
  } else {
    return false;
  }
};

var guessedWord = function() {
  if (blanks.indexOf("_") < 0) {
    return true;
  } else {
    return false;
  }
};

var win = function() {
  wins++;
  var winsElement = document.getElementById("wins");
  winsElement.textContent = wins;
  var currentWordElement = document.getElementById("current-word");
  var goldImage = document.createElement("img");
  goldImage.setAttribute('src', 'assets/images/gold-medal.gif');
  goldImage.setAttribute('style', 'display:block; margin: 0 auto; width:50px;');
  currentWordElement.appendChild(goldImage);
  var newPTag = document.createElement("p");
  newPTag.textContent = " You win! Press SPACE BAR to generate a new word";
  currentWordElement.appendChild(newPTag);
  var audio = new Audio('assets/sounds/Ovation-Mike_Koenig-1061486511.wav');
audio.play();
  restart = true;
};

var correctGuess = function(keyInput) {
  for (let i = 0; i < blanks.length; i++) {
    if (chosenWord[i] === keyInput) {
      blanks[i] = keyInput;
    }
    currentWordElement = document.getElementById("current-word");
    currentWordElement.textContent = blanks.join(" ");
  }
};

var outOfGuesses = function() {
  if (triesLeft === 0) return true;
  else return false;
};

var gameOver = function() {
  var currentWordElement = document.getElementById("current-word");
  currentWordElement.textContent =
    "You are out of guesses. The answer is " +
    chosenWord +
    ". Press Space Bar to generate a new word";
  restart = true;
};

var decrementGuesses = function() {
  triesLeft--;
  var triesLeftElement = document.getElementById("tries-left");
  triesLeftElement.textContent = triesLeft;
};

var addToGuessList = function(keyInput) {
  var guessedLettersElement = document.getElementById("guessed-letters");
  guessedLetters.push(keyInput);
  guessedLettersElement.textContent = guessedLetters.join(" ");
};

var incorrectGuess = function(keyInput) {
  decrementGuesses();
  addToGuessList(keyInput);
};

var validateKey = function(keyInput) {
  if (guessedLetters.indexOf(keyInput) >= 0) {
    alert("You have already guessed this letter. Try a different letter.");
    return false;
  } else if (blanks.indexOf(keyInput) >= 0) {
    alert("You have already guessed this letter. Try a different letter.");
    return false;
  } else if (keyInput.match(/[a-z]/i)) {
    return true;
  } else {
    alert("Not a valid letter. Try letters between a-z.");
    return false;
  }
};

var newWord = function() {
  var possibleWords = [
    "archery",
    "badminton",
    "baseball",
    "basketball",
    "boxing",
    "canoe",
    "kayak",
    "climbing",
    "cycling",
    "diving",
    "equestrian",
    "fencing",
    "golf",
    "gymnastics",
    "handball",
    "judo",
    "karate",
    "pentathalon",
    "rowing",
    "rugby",
    "sailing",
    "shooting",
    "soccer",
    "swimming",
    "surfing",
    "taekwondo",
    "tennis",
    "triathlon",
    "volleyball",
    "weightlifting",
    "wrestling"
  ];
  chosenWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];

  return chosenWord;
};

var generateBlanks = function() {
  chosenWord = newWord();
  blanks = [];
  triesLeft = triesLeftReset;
  for (let i = 0; i < chosenWord.length; i++) {
    blanks.push("_");
  }
  var currentWordElement = document.getElementById("current-word");
  currentWordElement.textContent = blanks.join(" ");
  triesLeft = triesLeftReset;
  var triesLeftElement = document.getElementById("tries-left");
  triesLeftElement.textContent = triesLeft;
  guessedLetters = [];
  var guessedLettersElement = document.getElementById("guessed-letters");
  guessedLettersElement.textContent = guessedLetters.join(" ");
  return blanks;
};

var processInput = function(keyInput) {
  var validKey = validateKey(keyInput);
  if (validKey) {
    var isCorrectGuess = checkGuess(keyInput);
    if (isCorrectGuess) {
      correctGuess(keyInput);
      var isGuessedWord = guessedWord();
      if (isGuessedWord) {
        win();
      }
    } else {
      var isOutOfGuesses = outOfGuesses();
      if (isOutOfGuesses) {
        gameOver();
      } else {
        incorrectGuess(keyInput);
      }
    }
  }
};

document.onkeyup = function(e) {
  var keyInput = e.key;
  if (e.key === " ") {
    restart = false;
    generateBlanks();
  } else if (restart === true) {
    alert("Press the space bar to generate a new word");
  } else {
    processInput(keyInput);
  }
};
