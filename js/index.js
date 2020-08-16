const CARD_VALUE = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
const CARD_SCORE = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const IMG_VALUE = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
const CARD_SUIT = ["Spades", "Clubs", "Hearts", "Diamonds"];
const DECK = [];

class Card {
  constructor(name, src, inPlay) {
    this.name = name;
    this.src = src;
    this.inPlay = inPlay;
  }
}

for(var i = 0; i < CARD_SUIT.length; i++) {
  for(var j = 0; j < CARD_VALUE.length; j++) {
    DECK.push(new Card((CARD_VALUE[j] + " of " + CARD_SUIT[i]), ("images/" + IMG_VALUE[j] + "-" + CARD_SUIT[i].toLowerCase() + ".png"), false));
  }
}

var dealButton = document.getElementById("deal");
var player1Hand = document.getElementsByClassName("player1-hand");
var player2Hand = document.getElementsByClassName("player2-hand");
var player1DrawButton = document.getElementById("player1-draw");
var player2DrawButton = document.getElementById("player2-draw");
var player1Score = document.getElementById("player1-score");
var player2Score = document.getElementById("player2-score");
var score1, score2;

player1DrawButton.disabled = true;
player2DrawButton.disabled = true;

function showCard(card) {
  var elCard = document.createElement("img");
  elCard.src = card.src;
  elCard.alt = card.name;
  elCard.classList.add("card-image");
  elCard.addEventListener("click", function() {
    elCard.classList.toggle("selected");
  });
  card.inPlay = true;

  return elCard;
}

function drawCards() {
  var discardCards = document.getElementsByClassName("selected");
  var parent = discardCards[0].parentElement;
  var numCards = discardCards.length;
  while(discardCards.length !== 0) {
    discardCards = document.getElementsByClassName("selected");
    discardCards[0].parentElement.removeChild(discardCards[0]);
  }
  for(var i = 0; i < numCards; i++) {
    if(parent === player1Hand[0]) {
      player1Hand[0].appendChild(showCard(dealCard()));
    }
    else if(parent === player2Hand[0]) {
      player2Hand[0].appendChild(showCard(dealCard()));
    }
  }
  if(parent === player1Hand[0]) {
    player1DrawButton.disabled = true;
  }
  else if(parent === player2Hand[0]) {
    player2DrawButton.disabled = true;
  }
}

function dealCard() {
  var randomCard = Math.floor(Math.random() * 52);

  while(DECK[randomCard].inPlay) {
    randomCard = Math.floor(Math.random() * 52);
  }

  return DECK[randomCard];
}

function deal() {
  var backs = document.getElementsByClassName("back");

  while(backs.length !== 0) {
    backs = document.getElementsByClassName("back");
    backs[0].parentElement.removeChild(backs[0]);
  }

  for(var i = 0; i < 5; i++) {
    player1Hand[0].appendChild(showCard(dealCard()));
    player2Hand[0].appendChild(showCard(dealCard()));
  }

  player1DrawButton.disabled = false;
  player2DrawButton.disabled = false;
  dealButton.disabled = true;
}

player1DrawButton.addEventListener("click", drawCards);
player2DrawButton.addEventListener("click", drawCards);
dealButton.addEventListener("click", deal);

// player1HitButton.addEventListener("click", function() {
//   player1Hand[0].appendChild(showCard(dealCard()));
// });
//
// player2HitButton.addEventListener("click", function() {
//   player2Hand[0].appendChild(showCard(dealCard()));
// });
