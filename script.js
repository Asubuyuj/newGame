let deck = [];
let playerHand = [];
let dealerHand = [];
let wins = 0;
let losses = 0;
let ties = 0;

const dealerCards = document.getElementById('dealer-cards');
const playerCards = document.getElementById('player-cards');
const dealerScore = document.getElementById('dealer-score');
const playerScore = document.getElementById('player-score');
const message = document.getElementById('message');
const statLosses = document.getElementById('losses');
const statWins = document.getElementById('wins');
const statTies = document.getElementById('ties');

const dealBtn = document.getElementById('deal-btn');
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const restartBtn = document.getElementById('restart-btn');
const resetStatsBtn = document.getElementById('reset-stats-btn');

// Deck & Hand Functions
function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
}

function drawCard() {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck.splice(randomIndex, 1)[0];
  return card;
}

function handValue(hand) {
  let total = 0;
  let aces = 0;

  for (let card of hand) {
    if (["J", "Q", "K"].includes(card.value)) total += 10;
    else if (card.value === "A") {
      total += 11;
      aces++;
    } else {
      total += parseInt(card.value);
    }
  }

  // adjust Aces from 11 to 1 if needed
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

// Game Logic
function startGame() {
  createDeck();
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];

  updateUI();

  dealBtn.disabled = true;
  hitBtn.disabled = false;
  standBtn.disabled = false;
  restartBtn.disabled = false;
  resetStatsBtn.disabled = false;

  message.textContent = "Your move!";
}

function hit() {
  playerHand.push(drawCard());
  updateUI();

  if (handValue(playerHand) > 21) {
    message.textContent = "You busted! Dealer wins";
    losses++;
    statUI();
    endGame();
  }
}

function stand() {
  // Dealer draws until 17 or higher
  while (handValue(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }

  const playerVal = handValue(playerHand);
  const dealerVal = handValue(dealerHand);

  if (dealerVal > 21 || playerVal > dealerVal) {
    message.textContent = "You win!";
    wins++;
  } else if (playerVal === dealerVal) {
    message.textContent = "Push! It's a tie.";
    ties++;
  } else {
    message.textContent = "Dealer wins!";
    losses++;
  }

  updateUI();
  statUI()
  endGame();
}

function endGame() {
  hitBtn.disabled = true;
  standBtn.disabled = true;
}

function restart() {
  createDeck();
  playerHand = [];
  dealerHand = [];
  message.textContent = "";
  dealerCards.textContent = "";
  playerCards.textContent = "";
  dealerScore.textContent = "";
  playerScore.textContent = "";

  dealBtn.disabled = false;
  hitBtn.disabled = true;
  standBtn.disabled = true;
  restartBtn.disabled = true;
}

//function will reset the stats back to 0
function resetStats(){
  wins = 0;
  losses = 0;
  ties = 0;
  statUI();
}

function updateUI() {
  renderHand(dealerCards, dealerHand);   // changed with new
  renderHand(playerCards, playerHand);
  dealerScore.textContent = "Dealer: " + handValue(dealerHand);
  playerScore.textContent = "Player: " + handValue(playerHand);
}

//function to update UI for stat tracking
function statUI(){
  statWins.textContent = "Wins: " + wins;
  statLosses.textContent =  "Losses: " + losses;
  statTies.textContent =  "Ties: " + ties;
}
// new
function renderHand(container, hand) {
  // clear previous content
  container.innerHTML = "";

  hand.forEach(card => {
    const span = document.createElement("span");
    span.classList.add("card");

    // red suits
    if (card.suit === "♥" || card.suit === "♦") {
      span.classList.add("red");
    }

    // e.g. "A♠" or "10♦"
    span.textContent = card.value + card.suit;

    container.appendChild(span);
  });
}





//event listeners
dealBtn.addEventListener('click', startGame);
hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);
restartBtn.addEventListener('click', restart);
resetStatsBtn.addEventListener('click', resetStats)
