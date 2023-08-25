const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');

const { createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/round');

describe('round', function() {
  it('should hold onto the deck object', function() {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
  
  const deck = createDeck([card1, card2, card3]);
  const round = createRound(deck);
  
  expect(round.deck).to.deep.equal(deck); 
  expect(round.currentCard).to.equal(deck[0]);
  expect(round.turns).to.equal(0);
  expect(round.incorrectGuesses).to.deep.equal([]);  
  });
});

describe('turns', function() {
  it('should update turn count', function () {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
 
    const deck = createDeck([card1, card2, card3]);
    let round = createRound(deck);
    
    expect(round.turns).to.equal(0);
    takeTurn('sea otter', round);
    expect(round.turns).to.equal(1);
    takeTurn('spleen', round);
    expect(round.turns).to.equal(2);
  });

  it('should evaluate if a guess is correct and return correct', function () {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

    const deck = createDeck([card1, card2, card3]);
    let round = createRound(deck);

    guessResult = takeTurn('sea otter', round);
    expect(guessResult).to.equal('correct!');
  });

  it('should evaluate if a guess is incorrect and return incorrect', function () {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

    const deck = createDeck([card1, card2, card3]);
    let round = createRound(deck);

    guessResult = takeTurn('spleen', round);
    expect(guessResult).to.equal('incorrect!');
  });

  it('should be able to store ids of incorrect guesses and move to next card', function () {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

    const deck = createDeck([card1, card2, card3]);
    let round = createRound(deck);
    
    takeTurn('sea otter', round);
    takeTurn('spleen', round);
    expect(round.incorrectGuesses).to.deep.equal([14]);
    expect(round.currentCard).to.deep.equal({ id: 12, question: 'What is Travis\'s favorite stress reliever?', answers: ['listening to music', 'watching Netflix', 'playing with bubble wrap'], correctAnswer: 'playing with bubble wrap'});   
  });
});


describe('percentage', function() {
  it('should calculate and return the percentage of correct guesses', function () {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
 
    const deck = createDeck([card1, card2, card3]);
    let round = createRound(deck);
    
    takeTurn('sea otter', round);
    takeTurn('spleen', round);
    const percentageCorrectAnswers = calculatePercentCorrect(round);
    expect(percentageCorrectAnswers).to.deep.equal(50); 
  
  });
});

describe('end round', function() {
  it('should end the round and print percentage of questions answered correctly', function () {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
 
    const deck = createDeck([card1, card2, card3]);
    let round = createRound(deck);
    
    takeTurn('sea otter', round);
    takeTurn('spleen', round);
    
    const message = endRound(round);
    expect(message).to.equal("**Round Over!** You answered 50% of the questions correctly!"); 
  });
});