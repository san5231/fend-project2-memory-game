/*
 * Create a list that holds all of your cards
 */
let cards = [
  '<li class="card"><i class="fa fa-diamond"></i></li>',
  '<li class="card"><i class="fa fa-diamond"></i></li>',
  '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
  '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
  '<li class="card"><i class="fa fa-anchor"></i></li>',
  '<li class="card"><i class="fa fa-anchor"></i></li>',
  '<li class="card"><i class="fa fa-bolt"></i></li>',
  '<li class="card"><i class="fa fa-bolt"></i></li>',
  '<li class="card"><i class="fa fa-cube"></i></li>',
  '<li class="card"><i class="fa fa-cube"></i></li>',
  '<li class="card"><i class="fa fa-leaf"></i></li>',
  '<li class="card"><i class="fa fa-leaf"></i></li>',
  '<li class="card"><i class="fa fa-bicycle"></i></li>',
  '<li class="card"><i class="fa fa-bicycle"></i></li>',
  '<li class="card"><i class="fa fa-bomb"></i></li>',
  '<li class="card"><i class="fa fa-bomb"></i></li>'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let deck = document.querySelector(".deck");
function displayDeck() {
  shuffle(cards);
  cards.map(function(card) {
    deck.innerHTML = cards.join("");
  });
}
displayDeck();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function display(element) {
  element.classList.add("open", "show");
}

let openedCards = [];
function openCard(...cards) {
  openedCards.push(...cards);
}

let cardsAreMatch = false;
function compareCards(openCardList) {
  if (openCardList === 2) {
    if (openCardList[0] === openCardList[1]) {
      cardsAreMatch = true;
    } else {
      cardsAreMatch = false;
    }
  }
  return cardsAreMatch;
}

function removeDisplay(element) {
  element.classList.remove("open", "show");
}

let count = 0;
function counter(bool) {
  if (bool === true) {
    count++;
  } else {
    count = count;
  }
}

let allCards = document.querySelectorAll(".card");
allCards.forEach(function(card) {
  card.addEventListener("click", function(e) {
    display(card);
  });
});

let modal = document.getElementById("congrads");
function gameWon() {
  if (openedCards === 16) {
    modal.style.display = "block";
  }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
