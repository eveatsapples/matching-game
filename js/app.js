//global variables
const deck =  document.getElementById('deck');
const open = ['show', 'open'];
const openCards = deck.getElementsByClassName(...open);
const moveIndicator = document.getElementById('moves');
const matchedCards = deck.getElementsByClassName('match');
const star1 = document.getElementById('star1');
const star2 = document.getElementById('star2');
const star3 = document.getElementById('star3');
const stars = document.querySelectorAll('.fa', '.fa-star');
const timer = document.getElementById('time');

let turnCounter = 0;
let time = 0;


//Create a list that holds all of your cards
let card = document.getElementsByClassName('card');
//make an array out of that list
let cards = [...card];


const startGame = function() {
    shuffledCards = shuffle(cards);
    
    //loop through deck and clear html list
    for(let i = 0; i < shuffledCards.length; i++) {
        deck.innerHTML = "";
        //loop through shuffled cards
        shuffledCards.forEach(function(i) {
            //and add to html list
            deck.appendChild(i);
        });
        //reset the class lists of all the cards
        shuffledCards[i].classList.remove('show', 'open', 'match');
        
        //reset turn counter
        turnCounter = 0;
        moveIndicator.innerHTML = 0;
        
        //reset stars
        for (var l= 0; l < stars.length; l++){
            stars[l].classList.add('fa', 'fa-star');
        }


    }
}


//reset game on page load.
document.addEventListener('DOMContentLoaded', startGame());


//reset game on reset button click
document.querySelector('#reset-button').addEventListener('click', function() {
    startGame();
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//game play functionality
deck.addEventListener('click', function(e) {


    //want to add timer here yet before posting to github
    
    //function incrementSeconds() {
    //    seconds += 1;
    //    el.innerText = "You have been here for " + seconds + " seconds.";
    //
    //} setInterval(incrementSeconds, 1000);
    
    
 
    //on click of card first check if it contains open classes
    if(e.target.classList.contains(...open)) {
        //do nothing

        //then check if contains match class
    } else if(e.target.classList.contains('match')) {
        //also do nothing

        //if card is not already open or matched then allow card to be opened
    } else if(e.target.classList.contains('card') && openCards.length < 2) {
        //add my array of open class's to card that was clicked to open it
        e.target.classList.add(...open);
        
        //when 2 cards are open check if they are the same
        if(openCards.length === 2) {
            //check if openCards innerHTML match
            const card0Symbol = openCards[0].innerHTML;
            const card1Symbol = openCards[1].innerHTML;
            const card0 = openCards[0];
            const card1 = openCards[1];
            
            //if the are the same
            if(card0Symbol === card1Symbol) {
                //add matching class
                card0.classList.add('match');
                card1.classList.add('match');
                // remove open classes
                card0.classList.remove(...open);
                card1.classList.remove(...open);
                
            } else {
                //if they are different then wait a little bit before flipping the cards back over
                setTimeout(function() {
                    //remove open classes to hide cards
                    card0.classList.remove(...open);
                    card1.classList.remove(...open);
                
                }, 800);
                
            }
            //add to turn counter at the end of each turn(2 cards opening)
            turnCounter++;
            moveIndicator.innerHTML = turnCounter;

            // k lets start taking away stars
            //after 18 turns
            if(turnCounter === 18) {
                //take away first stars class
                star1.classList.remove('fa', 'fa-star');

            //after 24 turns
            } else if(turnCounter === 24) {
                //take away second stars class
                star2.classList.remove('fa', 'fa-star');

            //after 30 turns
            } else if(turnCounter === 30) {
                //take away last stars class
                star3.classList.remove('fa', 'fa-star');
            }          
        }   
        //if all cards are matched then game over
        if(matchedCards.length === 16) {
            //popup a winning massage with sweet alert
            swal('you win!');

        }
    }
});