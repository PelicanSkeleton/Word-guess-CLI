var Letter = require("./letter.js");

function Word(answer) {
    this.objArray = [];

    for (i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.objArray.push(letter);
    };

    this.log = function () {
        var answerLog = "";
        for (i = 0; i < this.objArray.length; i++) {
            answerLog += this.objArray[i] + " ";
        }
        console.log(answerLog + "\n==========\n");
    };

    this.userGuess = function (input) {
        for (i = 0; i < this.objArray.length; i++) {
            this.objArray[i].guess(input);
        }
    };
};

module.exports = Word;