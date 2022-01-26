import { wordList } from "./wordlist.js";
import { whatIKnow } from "./whatIKnow.js";

// Short array for testing

// const fakeWords = [
//   "aaron",
//   "about",
//   "above",
//   "abuse",
//   "acids",
//   "acres",
//   "actor",
//   "acute",
//   "adams",
//   "added",
//   "admin",
//   "admit",
//   "adobe",
//   "adopt",
//   "adult",
//   "after",
//   "again",
//   "agent",
//   "aging"
// ];

// Used to determine word priority ranking
// Most common letter by position
// according to https://artofproblemsolving.com/news/articles/the-math-of-winning-wordle#:~:text=In%20order%20of%20frequency%2C%20they,steep%20drop%2Doff%20after%20that.
const likelyLetters = {
  0: ["c", "b", "t", "p", "a", "f"],
  1: ["a", "o", "r", "e", "i", "l", "u", "h"],
  2: ["a", "i", "o", "e", "u", "r", "n"],
  3: ["e", "n", "s", "a", "l", "i", "r", "c", "t", "o"],
  4: ["e", "y", "t", "r", "l", "h", "n", "d"]
};


/* 
  Rule out words
*/

// Initialize an array of possible words
const possibilities = [];
// Accept a candidate words
const solver = (word) => {
  // Initialize an array of confirmations for the different letters
  const confirmations = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  };
  // Initialize an array of the candidate word's component letters
  const letterArray = word.split("");
//   For each position in "whatIKnow" object
//    check if the letter is known to be negated
//    for that position (yellow) or does not match 
//    a confirmed letter (green).
  Object.keys(whatIKnow).forEach((knownPosition) => {
    if (!isNaN(knownPosition)) {
    const knowIt = whatIKnow[knownPosition];
    knowIt["not"].forEach((not) => {
      if (letterArray[knownPosition] === not) {
        confirmations[knownPosition].push("false");
      }
    });
    knowIt["is"].forEach(is => {
      if (letterArray[knownPosition] !== is) {
        confirmations[knownPosition].push("false")
      }
    });
    }
  });

  const flse = (element) => element === "false";
  const checker = (arr, target) => target.every(v => arr.includes(v));
  
  // If it has not been proven false, and has a letter that is known to 
  // be somewhere in the word, and does not have any letters ruled out
  // entirely (grey).
  if (!Object.values(confirmations).flat().some(flse) && checker(letterArray, whatIKnow.maybe) && !letterArray.some(r => whatIKnow.never.includes(r))) {
    possibilities.push(word)
  }
};

/* 
  Prioritize candidate words
*/

// Initialize an object that will hold
// the three tiers of prioritization.
const likelyWords = {
  veryLikely: [],
  somewhatLikely: [],
  lessLikely: []
};

const likely = (word) => {
  const confirmations = [];
// Split the candidate word into letters
  const letterArray = word.split("");
  // For each position in likelyLetters
  Object.keys(likelyLetters).forEach((likelyPosition) => {
    const knowIt = likelyLetters[likelyPosition];
    // For each letter in the 'likely' array for that position
      knowIt.forEach((likely) => {
        if (letterArray[likelyPosition] === likely.toLowerCase()) {
          confirmations.push("true");
        }
      });
  });
  
  if (confirmations.length > 4) {
    likelyWords.veryLikely.push(word);
  } else if (confirmations.length > 3) {
    likelyWords.somewhatLikely.push(word)
  } else {
    likelyWords.lessLikely.push(word)
  }
};

// Generate possibilities
wordList.forEach((word) => solver(word));
// Prioritize possibilities
possibilities.forEach((word) => likely(word));

console.table({"likely": likelyWords.veryLikely, "somewhat likely": likelyWords.somewhatLikely, "less likely": likelyWords.lessLikely});
