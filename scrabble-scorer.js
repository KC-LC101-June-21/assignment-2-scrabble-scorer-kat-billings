// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userInput = input.question("Let's play some scrabble!\n\nEnter a word: ");
   return userInput;
}

let simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoreFunction: function(wordToGrade) {return wordToGrade.length;}
};

let vowelBonusScore = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoreFunction: function(wordToGrade) {
    wordToGrade = wordToGrade.toUpperCase();
    let score = 0;
    const vowels = ['A','E','I','O','U'];
    for(let i=0; i<wordToGrade.length; i++) {
      if (vowels.indexOf(wordToGrade[i]) > -1) {
        score += 3;
      } else {
        score++;
      }
    }
    return score;
  }
};

let scrabbleScore = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoreFunction: function(wordToGrade) {
    wordToGrade = wordToGrade.toLowerCase();
    let sum = 0;
    for(let i=0; i<wordToGrade.length; i++) {
      sum = sum + Number(newPointStructure[wordToGrade[i]]);
    }
    return sum;
  }
};

const scoringAlgorithms = [simpleScore, vowelBonusScore,scrabbleScore];

function scorerPrompt() {
  let choice = input.question(`\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n\nEnter 0, 1, or 2: `);
  return Number(choice);
}

function transform(objectToChange) {
  for (item in objectToChange) {
    for (let i=0; i<objectToChange[item].length; i++) {
      let letter = objectToChange[item][i];
      letter = letter.toLowerCase();
      newPointStructure[letter] = item;
    }
  }
};

let newPointStructure = {};

function runProgram() {
   transform(oldPointStructure);
   let wordChoice = initialPrompt();
   let scoreChoice = scorerPrompt();
    console.log("\nScore for", wordChoice, ":", scoringAlgorithms[scoreChoice].scoreFunction(wordChoice));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

