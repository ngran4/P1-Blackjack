/*------------------------------- constants -------------------------------*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
const shuffledDeck = shuffleDeck();


/*------------------------------- app's state (variables) -------------------------------*/
let scores; 
let bank;
let wins = 0;
let losses = 0;
let draws = 0;



/*------------------------------- cached element references -------------------------------*/

const scoresEl = {
    user: document.getElementById('u-score'),
    dealer: document.getElementById('d-score')
};

const choicesEl = {
    hit: document.getElementById('hitBtn'),
    stay: document.getElementById('stayBtn')
};

const handsEl = {
    user: document.getElementById('u-hand'),
    dealer: document.getElementById('d-hand')
};

const bankEl = document.querySelector('#money-remaining');
const textUpdateEl = document.getElementById('text-update');
const shuffledContainerEl = document.getElementById('shuffled-deck-container');
const scoreboardEl = document.getElementById('scoreboard');
const startBtnEl = document.getElementById("startBtn");


/*------------------------------- event listeners -------------------------------*/

document.querySelector('#startBtn').addEventListener('click', startGame);

choicesEl.hit.addEventListener('click', hit);

document.getElementById('stayBtn').addEventListener('click', stay);

document.getElementById("refreshBtn").addEventListener('click', init);




/*------------------------------- functions -------------------------------*/

// initialize
init()

function init(){
    console.log('init function invoked')

    if (shuffledDeck.length < 5) {
        let newShuffledDeck = shuffleDeck();
        shuffledDeck = newShuffledDeck
        console.log("This is the new shuffled deck")
    }

    buildMasterDeck();

    scores = {
        user: 0,
        dealer: 0
    }
 
    userHand = [];
    dealerHand = [];

    let wins = 0;
    let losses = 0;
    let draws = 0;

    // hide refresh button
    document.getElementById("refreshBtn").style.display="none";
    // hide hit/stay buttons until game is started
    document.getElementById("stayBtn").style.display="none";
    document.getElementById("hitBtn").style.display="none";

    render();
};

function startGame(){
    console.log(shuffledDeck.length);
    if (shuffledDeck.length <= 6){
    textUpdateEl.innerHTML = "Ran out of cards! Press refresh deck to play again!"
    document.getElementById("refreshBtn").style.display="block";

    } else {

         // hide start button once clicked
        startBtnEl.style.display = "none";
        // reveal choice buttons
        document.getElementById("stayBtn").style.display="inline";
        document.getElementById("hitBtn").style.display="inline";
        
    // reset text + scores + hands
        userHand = [];
        dealerHand = [];
        textUpdateEl.innerHTML = "";
        scores = {
            user: 0,
            dealer: 0
        }
        
        dealHands();     
        
        // check for win on first draw
        if (calcHands(userHand) === 21) {
            wins += 1;
            gameOver = true;
            textUpdateEl.innerHTML = `BLACKJACK! User wins!`;
            renderScoreboard();
            newGame();
            return;
        }
        
        // check for win
        if (calcHands(dealerHand) === 21) {
            losses += 1;
            gameOver = true; 
            textUpdateEl.innerHTML = `BLACKJACK! Dealer wins!`;
            renderScoreboard();
            newGame();
            return;
        }
    }
}

function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          value: Number(rank) || (rank === 'A' ? 11 : 10)
        });
      });
    });
    return deck;
}


function shuffleDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck]; 
    const newShuffleDeck = [];
    while (tempDeck.length) {
        // Get random index for a card still in the tempDeck
        const rndIdx = Math.floor(Math.random() * tempDeck.length);

        newShuffleDeck.push(tempDeck.splice(rndIdx, 1)[0]); // [0] placed after splice to return only the card object--otherwise splice will return array.
    }                                            
    return newShuffleDeck;
}


// Render hands of player and dealer to screen
function renderCards(){

    let uContainer = '';
    handsEl.user.innerHTML = '';
    userHand.forEach(function(card) {
        uContainer += `<div class ="card ${card.face}"></div>`
    });
    handsEl.user.innerHTML = uContainer;

    let dContainer = '';
    handsEl.dealer.innerHTML = '';
    dealerHand.forEach(function(card) {
        dContainer += `<div class ="card ${card.face}"></div>`
    });
    handsEl.dealer.innerHTML = dContainer;

};


function render(){
    // Take state variables and update the DOM with their values

    // Update the scores on the page 
    scoresEl.user.innerText = scores.user;
    scoresEl.dealer.innerText = scores.dealer;

    renderScoreboard();
    renderCards();

}


function dealHands(){
    // deal 2 cards per party
    // create a card variable

    console.log(shuffledDeck.length);

    for (let i=0; i<2; i++) {
        
        let card = shuffledDeck.pop();
        console.log(card, "card");

        userHand.push(card);
    }
    
    for (let i=0; i<2; i++) {
        
        let card = shuffledDeck.pop();
        console.log(card, "card");

        dealerHand.push(card);
    }

    
    renderScores();
    // amendDeck();
    render();
}

// calcutlate total value of hands
function calcHands(hand){
    let points = 0;
    let acePresent = 0; // check if ace(s) present

    for (let i=0; i < hand.length; i++) {
       let card = hand[i];
       points += hand[i].value;

        if (hand[i].value == 11) {
            acePresent += 1;
        }
    }

    // if ace is present and will cause a bust, subtract 10 from value
    for (let a = 0; a < acePresent; a++) {
        if (points > 21) {
            points -= 10;
        }
    }

    return points;
}

// Render scores to screen
function renderScores() {
    scores.user = calcHands(userHand);
    scores.dealer = calcHands(dealerHand);
};


// player chose hit 
function hit(){
 
    // deal card to user
    userHand.push(shuffledDeck.pop());
    console.log(userHand); 
    renderScores();

    if (scores.user > 21) {
        bust();
        textUpdateEl.innerHTML = `Uh oh! ${scores.user} points. That's a bust, dealer wins!`;
    } else if (scores.user === 21){
        userWin();
    }

    renderScores();
    render();
    return;
    // amendDeck();
   
}

function stay() {
    // if dealer has more than 16, dealer stays
    if (scores.dealer > 16 && scores.dealer <= 21) {
        checkEndGame();
    } else if (scores.dealer < 17) { // if dealer had less than 17, hit
        dealerHand.push(shuffledDeck.pop());
        renderScores();
        if (scores.dealer > 21) {
            dealerBust();
            textUpdateEl.innerHTML = `Dealer busts! User wins!`;
        } else {
            checkEndGame();
        }
    }

    renderScores();
    render();
}

// update scoreboard
function renderScoreboard(){
    scoreboardEl.innerHTML = `Wins: ${wins} Losses: ${losses} Draws: ${draws}`;

};

function bust(){
    losses += 1;
    gameOver = true;
    renderScoreboard();
    newGame();
    return;
}

function dealerBust(){
    wins += 1;
    gameOver = true;
    renderScoreboard();
    newGame();
    return;
}

function draw(){
    draws += 1;
    gameOver = true;
    textUpdateEl.innerHTML = `Thats a draw! User and dealer both hit Blackjack!`;
    renderScoreboard();
    newGame();
    return;
}

function userWin(){
    wins += 1;
    gameOver = true; 
    textUpdateEl.innerHTML = `Well done! User wins with ${scores.user} points`
    renderScoreboard();
    newGame();
    return;
}

function dealerWin(){
    losses += 1;
    gameOver = true;
    textUpdateEl.innerHTML = `Dealer wins with ${scores.dealer}. Better luck next time!`
    renderScoreboard();
    newGame();
    return;
}

function newGame(){
     // reveal start button 
     startBtnEl.style.display = "block";
     // hide choice buttons
     document.getElementById("stayBtn").style.display="none";
     document.getElementById("hitBtn").style.display="none";
}

// check scores logic & possible winner
function checkEndGame(){
    
    if (scores.user > 21) {
        bust();
        textUpdateEl.innerHTML = `Uh oh! ${scores.user} points. That's a bust, dealer wins!`;
    } else if (scores.dealer === scores.user){
        draw();
        return;
    } else if (scores.user > scores.dealer) {
       userWin();
       return;
    } else if (scores.dealer > scores.user) {
       dealerWin();
       return;
    }
}

