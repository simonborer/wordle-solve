// Copy word lists into sublime, then create array with regex search & replace:
// Find: ^(.*)$
// Replace: "$1",

// Filter for only five-letter words

const newWords = [];
const existingWords = [];

const fiveLetterWords = [];

newWords.forEach(word => {
  if (word.length === 5) {
    fiveLetterWords.push(word);
  }
});

const netNewWords = fiveLetterWords.filter(x => !existingWords.includes(x));

const sumWords = existingWords.concat(netNewWords);