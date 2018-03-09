var triesLeft = 15;

var incrementWins = function () {

}

var generateWord = function () {
    var possibleWords = ['red', 'green', 'blue']
    var chosenWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];

    return chosenWord
}

var generateBlanks = function () {
    var chosenWord = generateWord()
    var blanks = ''
    for (let i = 0; i < chosenWord.length; i++) {
        blanks = '_ ' + blanks

    }
    return blanks
}

var decrementGuesses = function () {
 triesLeft--;
 var triesLeftElement = document.getElementById('tries-left');
 console.log(triesLeft)
 triesLeftElement.textContent = triesLeft;
}

var addToGuessesList = function () {

}

document.onkeyup = function (e) {
    var keyInput = e.key;
    var blanks = generateBlanks();
    if (e.key === ' ') {
        var currentWordElement = document.getElementById('current-word');
        currentWordElement.textContent = blanks;
    }
    //if match 
        //then show in word, 
        //if no letters left to guess 
            //then increment win 
            //and end game
    //if not a match 
        //show in letters guessed
        //decrease guesses left
            //if guesses left is less than 0 
                //then end game

};