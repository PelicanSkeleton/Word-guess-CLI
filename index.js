var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var wordsArray = ["extent",
    "sleek",
    "zoom",
    "tragic",
    "regulator",
    "roasted",
    "penniless",
    "potential",
    "kindred",
    "clamped",
    "omission",
    "stain",
    "alpha",
    "altitude",
    "ajar",
    "neighbour",
    "riddle",
    "wrapped",
    "blaming",
    "dictator",
    "gambling",
    "clever",
    "fence",
    "shadow",
    "honor"];

var randomIndex = Math.floor(Math.random() * wordsArray.length);
var randomWord = wordsArray[randomIndex];

var computerWord = new Word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function game() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * wordsArray.length);
        var randomWord = wordsArray[randomIndex];

        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select a letter from A to Z",
                name: "userinput"
            }
        ]).then(function (input) {
            if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                console.log("\nPlease try again.\n");
                game();
            } else {
                if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                    console.log("\nAlready guessed or nothing was entered.\n");
                    game();
                } else {
                    var wordCheckArray = [];

                    computerWord.userGuess(input.userinput);
                    computerWord.objArray.forEach(wordCheck)
                    if (wordCheckArray.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect\n");

                        incorrectLetters.push(input.userinput);
                        guessesLeft--;
                    } else {
                        console.log("\nCorrect!\n");

                        correctLetters.push(input.userinput);
                    }
                    computerWord.log();

                    console.log("Guesses left: " + guessesLeft + "\n");
                    console.log("Letters guessed: " + incorrectLetters.join(" ") + "\n");

                    if (guessesLeft > 0) {
                        game();
                    } else {
                        console.log("You have lost.\n");

                        playAgain();
                    }
                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }
            }
        });
    } else {
        console.log("You win!\n")

        playAgain();
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}
function playAgain() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to: ",
            choices: ["Play again", "Exit"],
            name: "restart"
        }
    ]).then(function (input) {
        if (input.restart === "Play again") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            game();
        } else {
            return;
        }
    });
}
game();
