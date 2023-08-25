const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const { createDeck, countCards } = require('../src/deck');
const { createRound } = require('../src/round');

const startGame = () => {
  const deck = createDeck(prototypeQuestions);
  let round = createRound(deck);
  printMessage(deck);
  printQuestion(round);
}

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

module.exports = { printMessage, printQuestion, startGame};
