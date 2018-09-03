/*
 * Create a list that holds all of your cards
 */

let cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let deck = document.querySelector(".deck");
let allCards = document.querySelectorAll(".card");
let modal = document.querySelector(".modal");
let stars = document.querySelectorAll(".fa-star");
let movesCountDisplay = document.querySelectorAll(".moves");
let starNumDisplay = document.querySelector(".star-num");
let showTimer = document.querySelectorAll(".Timer");
let resetGameButton = document.querySelector(".restart");
let playAgainButton = document.querySelector(".play-again");
let openedCards = [];
let matchCards = 0;
let twoStars = 16;
let oneStar = 32;
let moves = 0;
let starNum = 3;
let minute = 0;
let second = 0;
let timer;
let displayTimer = "";
let gameStart = false;

//initiallize deck of cards
function displayDeck() {
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="fa ${cards[i]}"></i>`;
    deck.appendChild(card);
    clickCard(card);
  }
}

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

//open and show the icon of the card
function display(card) {
  if (!card.classList.contains("open")) {
    card.classList.add("open", "show");
    openedCards.push(card);
  }
}

//function when click on cards
function clickCard(card) {
  card.addEventListener("click", function(e) {
    startTimer();
    if (
      !card.classList.contains("open") ||
      !card.classList.contains("show") ||
      !card.classList.contains("match")
    ) {
      if (openedCards.length == 0) {
        display(card);
      } else if (openedCards.length == 1) {
        display(card);

        moves++;
        moveCounter();
        if (compareCards(openedCards)) {
          setCardMatch();
        } else {
          setTimeout(function() {
            removeDisplay();
          }, 800);
        }
      }
    }
  });
}

//compare the cards in the list
function compareCards(matchList) {
  if (
    matchList[0].children[0].classList[1] ==
    matchList[1].children[0].classList[1]
  ) {
    return true;
  } else {
    return false;
  }
}

//remove the open and show classlist if the cards are not matched
function removeDisplay() {
  openedCards.forEach(function(card) {
    card.classList.remove("open", "show");
  });
  openedCards = [];
}

//check if the game is won
function gameWon() {
  if (matchCards === 16) {
    return true;
  } else return false;
}

//add the match class in card and check the if the game won
function setCardMatch() {
  openedCards.forEach(function(card) {
    card.classList.add("match");
  });
  openedCards = [];
  matchCards += 2;
  if (gameWon()) {
    clearInterval(timer);
    modal.style.display = "block";
  }
}

//count the moves
function moveCounter() {
  movesCountDisplay.forEach(function(move) {
    move.innerText = moves;
  });
  if (moves === twoStars) {
    stars[0].classList.replace("fa-star", "fa-star-o");
    starNum--;
    starNumDisplay.innerText = starNum;
  } else if (moves === oneStar) {
    stars[1].classList.replace("fa-star", "fa-star-o");
    starNum--;
    starNumDisplay.innerText = starNum;
  }
}

//reset the star icons and star numbers back to 3
function resetStars() {
  starNum = 3;
  starNumDisplay.innerText = starNum;
  for (let i = 0; i < 3; i++) {
    stars[i].classList.replace("fa-star-o", "fa-star");
  }
}

//start timer
function startTimer() {
  if (gameStart == false) {
    timer = setInterval(function() {
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      showTimer.forEach(function(timer) {
        timer.innerText = formatTime();
      });
    }, 1000);
  }
  gameStart = true;
}

//stop and reset the timer
function stopTimer() {
  clearInterval(timer);
  second = 0;
  minute = 0;
  showTimer.forEach(function(timer) {
    timer.innerHTML = "00:00";
  });
}

//format the time to 00:00
function formatTime() {
  let sec = second > 9 ? String(second) : "0" + String(second);
  let min = minute > 9 ? String(minute) : "0" + String(minute);
  displayTimer = `${min}:${sec}`;
  return displayTimer;
}

//reset all the parameters to the initial condition
function resetGame() {
  deck.innerHTML = "";
  openedCards = [];
  matchCards = 0;
  moves = 0;
  stopTimer();
  moveCounter();
  displayDeck();
  resetStars();
  allCards.forEach(function(card) {
    card.classList.remove("open", "show", "match");
  });
}

//event when click on reset button
resetGameButton.addEventListener("click", function(e) {
  resetGame();
});

//event when click on play again buttion
playAgainButton.addEventListener("click", function(e) {
  resetGame();
  modal.style.display = "none";
});

//initialize the first game
displayDeck();

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
