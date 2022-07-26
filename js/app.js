/*------------------------------- constants -------------------------------*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();

// const stayBtn;

// const hitBtn;

// const betBtn; (? different buttons for different bets—i.e chip values?


/*------------------------------- app's state (variables) -------------------------------*/
let scores; 
let winner;
let choices;
// let shuffledDeck;
let bank;

let wins = 0;
let losses = 0;
let ties = 0;

// let handTotal; (dealer, player)


/*------------------------------- cached element references -------------------------------*/

const scoresEl = {
    user: document.getElementById('p-score'),
    dealer: document.getElementById('d-score')
};

const choicesEl = {
    hit: document.getElementById('hitBtn'),
    stay: document.getElementById('stayBtn')
};

const handsEl = {
    user: document.getElementById('p-hand'),
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

// document.getElementById('betBtn').addEventListener('click', *function());



/*------------------------------- functions -------------------------------*/

// initialize
init()

function init(){
    console.log('init function invoked')
    // hide hit/stay buttons until game is started

    buildMasterDeck();
    shuffleDeck();

    scores = {
        user: 0,
        dealer: 0
    }
 
    userHand = [];
    dealerHand = [];
 
    choices = {
        hit: false,
        stay: false
    }

    winner = null;

    bank = 500;
    bankEl.innerText = `Bank: $ ${bank}`;

    document.getElementById("stayBtn").style.display="none";
    document.getElementById("hitBtn").style.display="none";

    render()
};

function startGame(){
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
    shuffleDeck();
    dealHands();     
    
        // check for win 
        if (calcHands(userHand) === 21) {
            wins += 1;
            textUpdateEl.innerHTML = `BLACKJACK! User wins!`;
            scoreboard();
            gameWon = true;
            return;
        }
    
        // check for win
        if (calcHands(dealerHand) === 21) {
            losses += 1;
            textUpdateEl.innerHTML = `BLACKJACK! User wins!`;
            scoreboard();
            gameWon = true; 
            return;
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
    }                                            // ^ does this need to be 4 to draw 4 cards?
    return newShuffleDeck;
}


function render(){
    // Take state variables and update the DOM with their values

    // Update the scores on the page 
    scoresEl.user.innerText = scores.user;
    scoresEl.dealer.innerText = scores.dealer;

    // update bank
    // bankEl.innerText = bank;

    // for (let choice in choices) {
    //     console.log(choice, "key name on object")
    //     console.log(choices[choice], "<- choices[choice]")

    //     // choicesEl[choice].hit
    // }
    // const userScore = calcHands(userHand);
    // const dealerScore = calcHands(dealerHand);  

}

// Render hands of player and dealer to screen
function renderCards(){
    let render = "";
    let pHand = handsEl.user.innerHTML;
    let dHand = handsEl.user.innerHTML;

    
};
 

function dealHands(){
    // deal 2 cards per party
    // create a card variable

    for (let i=0; i<2; i++) {
        
        let card = masterDeck.pop();
        console.log(card, "card");

        userHand.push(card);
    }
    
    for (let i=0; i<2; i++) {
        
        let card = masterDeck.pop();
        console.log(card, "card");

        dealerHand.push(card);
    }

    newScores();
    
    // if no winners...

    // renderCards(card, player);
    newScores();
    // amendDeck();
    render()
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

function newScores() {
    scores.user = calcHands(userHand);
    scores.dealer = calcHands(dealerHand);
};

// // check if blackjack was hit
// function checkBJ(){

//     newScores();

//     if (scores.user === scores.dealer) {
//         ties += 1;
//         gameWon = false;
//         textUpdateEl.innerHTML = `Thats a tie! User and dealer both hit Blackjack!`
//     } else if (scores.user === 21) {
//         wins += 1;
//         gameWon = true; 
//         textUpdateEl.innerHTML = `BLACKJACK! User wins!`;
//     } else if (scores.dealer === 21){
//         losses += 1;
//         gameWon = false;
//         textUpdateEl.innerHTML = `BLACKJACK! Dealer wins!`;
//     } else {
//         return;
//     }
// }

// check scores logic & possible winner
function checkEndGame(){
    
    if (scores.dealer === scores.user){
        ties += 1;
        gameWon = false;
        textUpdateEl.innerHTML = `Thats a tie! User and dealer both have ${scores.user}`
    } else if (scores.user > scores.dealer) {
        wins += 1;
        gameWon = true; 
        textUpdateEl.innerHTML = `Well done! User wins with ${scores.user} points`
    } else if (scores.dealer > scores.user) {
        losses += 1;
        gameWon = false;
        textUpdateEl.innerHTML = `Dealer wins with ${scores.dealer}. Better luck next time!`
    } else {
        return;
    }
}


function hit(){

    if (gameWon = true) {
        console.log('game already over');
        return;
    }

    choices.hit = true; 

    userHand.push(masterDeck.pop());
    console.log(userHand)

    // renderCards(card, players.user);
    // amendDeck();

    if (scores.user > 21) {
        return textUpdateEl.innerHTML = `Uh oh! ${scores.user} points. That's a bust, dealer wins!`;
    } 

    newScores();
    dealerTurn();
    render();
   
}

function stay() {
    choices.stay = true;
    checkEndGame();
    dealerTurn();

    //check end game
}

function dealerTurn(){
    if (scores.dealer < 17) {
        dealerHand.push(masterDeck.pop());
    } else if (scores.dealer > 21) {
        return textUpdateEl.innerHTML = `Dealer busts! User wins!`
    }
    else {
        checkEndGame();
    }
}

// update scoreboard
function scoreboard(){
    scoreboardEl.innerHTML = `Wins: ${wins} Losses: ${losses} Ties: ${ties}`;

};

// function amendDeck(){

// };