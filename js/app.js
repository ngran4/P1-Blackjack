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

let players;

// let handTotal; (dealer, player)

// let doubleBtn;

/*----- cached element references -----*/

const scoresEl = {
    player: document.getElementById('p-score'),
    dealer: document.getElementById('d-score')
};

const choicesEl = {
    hit: document.getElementById('hitBtn'),
    stay: document.getElementById('stayBtn')
};

const handsEl = {
    player: document.getElementById('p-hand'),
    dealer: document.getElementById('d-hand')
}

const bankEl = document.querySelector('#money-remaining');

// const playerEl = document.querySelector('#player');


const shuffledContainerEl = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/

document.querySelector('#start').addEventListener('click', startGame);

// document.getElementById('hitBtn').addEventListener('click', *function());

// document.getElementById('stayBtn').addEventListener('click', *function());

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
    shuffleDeck();

    players = {
        user: {
            score: 0,
            hand: [],
        },
        dealer: {
            score: 0,
            hand: []
        }
    }
 
    choices = {
        hit: false,
        stay: false
    }

    winner = null;

    bank = 500;

    render()
};

console.log(init)


function render(){
    // Take state variables and update the DOM with their values

    // Update the scores on the page 
    scoresEl.player.innerText = players.user.score;
    scoresEl.dealer.innerText = players.dealer.score;

    // update bank
    bankEl.innerText = bank;

    for (let choice in choices) {
        console.log(choice, "key name on object")
        console.log(choices[choice], "<- choices[choice]")

        // choicesEl[choice].hit
    }

}



function startGame(){
    
    dealHands();


}


function dealHands(){
    // deal 2 cards per party
    // create a card variable

    for (let i=0; i<2; i++) {

        for (let x=0; x<2; x++) {
            
            let card = masterDeck.pop();
            playerHand.push(card);
            dealerHand.push(card);
            renderCards(card, x);
            newScores();
        }
    }
    amendDeck();
}

// function newScores() {
    
// };

function renderCards(){

};

// function amendDeck(){

// };

// hit()

// deal()
