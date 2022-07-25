/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();

// const stayBtn;

// const hitBtn;

// const betBtn; (? different buttons for different bets—i.e chip values?


/*----- app's state (variables) -----*/
let scores; 
let winner;
let choices;
// let shuffledDeck;
let bank;

// let players;

// let handTotal; (dealer, player)

// let doubleBtn;

/*----- cached element references -----*/

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
}

const bankEl = document.querySelector('#money-remaining');

// const userHandEl = document.getElementById('p-hand');
// const dealerHandEl = document.getElementById("d-hand");


const shuffledContainerEl = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/

document.querySelector('#btnStart').addEventListener('click', startGame);

document.getElementById('hitBtn').addEventListener('click', hit);

document.getElementById('stayBtn').addEventListener('click', stay);

// document.getElementById('betBtn').addEventListener('click', *function());


/*----- functions -----*/
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


function cardValues(card){

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


// initialize
init()

function init(){
    console.log('init function invoked')

    buildMasterDeck();

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

    render()
};


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

function startGame(){

    // hide start button?
    shuffleDeck();
    dealHands();

                                                                         
}

function dealHands(){
    // deal 2 cards per party
    // create a card variable

    for (let i=0; i<1; i++) {
        
        let card = masterDeck.pop();
        console.log(card, "card");

        userHand.push(card);
    }

    for (let i=0; i<1; i++) {
        
        let card = masterDeck.pop();
        console.log(card, "card");

        dealerHand.push(card);
    }

    // renderCards(card, player);
    newScores();
    checkBJ();
    // amendDeck();
    render()
}

// calcutlate total value of hands
function calcHands(hand){
    let points = 0;
    let acePresent = false; 

    for (let i=0; i < hand.length; i++) {
       let card = hand[i];
       points += hand[i].value;

    //    if(card.value === "A") {
    //     acePresent = true;
    //    }
    }
    return points;
}

function newScores() {
    scores.user = calcHands(userHand);
    scores.dealer = calcHands(dealerHand);
};

// check if blackjack was hit
function checkBJ(){

    newScores();

    if (scores.user === 21) {
        return "BLACKJACK! User wins!";
    } else if (scores.dealer === 21){
        return "BLACKJACK! Dealer wins!";
    } else {
        return;
    }
}

// check scores logic
function check(){
    
}

// function renderCards(card, player){
//     let pHand = playerHandEl.innerHTML

//     let
// };


// function amendDeck(){

// };

function hit(){

    choices.hit = true; 
    
    let card = masterDeck.pop();
    console.log(card, "new card");

    userHand.push(card);
    // renderCards(card, players.user);
    // newScores();
    //amendDeck();

}

function stay(){
    choices.stay = true;
    // console.log('true'); -- logs twice?
}
