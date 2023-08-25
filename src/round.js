const { evaluateGuess } = require("./card");

const createRound = (deck) => {
 let round = {
  deck: deck,
  currentCard: deck[0],
  turns: 0,
  incorrectGuesses: [],
 }
 return round;
}

const takeTurn = (guess, round) => {
  round.turns++;

  const guessResult = evaluateGuess(guess, round.currentCard.correctAnswer);
  
  if (guessResult === 'correct') {
  round.currentCard = round.deck[round.turns];
    return 'correct!'
} else {
  round.incorrectGuesses.push(round.currentCard.id);
  round.currentCard = round.deck[round.turns];
    return 'incorrect!'
  }
}

const calculatePercentCorrect = (round) => {
  let numCorrectAnswers = round.turns - round.incorrectGuesses.length
  let percentageCorrectAnswers  = (numCorrectAnswers / round.turns) * 100 
  return percentageCorrectAnswers;
}

const endRound = (round) => {
  const percentageCorrectAnswers = calculatePercentCorrect(round)
    console.log(`**Round Over!** You answered ${percentageCorrectAnswers}% of the questions correctly!`); 
    return `**Round Over!** You answered ${percentageCorrectAnswers}% of the questions correctly!`;
}

module.exports = {
  createRound,
  takeTurn,
  calculatePercentCorrect, 
  endRound
};