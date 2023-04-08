function comparer() { 
    return Math.random() - 0.5; 
}

//function to turn the cards
function turnCard(thisCard) {
    const card1 = thisCard.querySelector('.card1');
    const card2 = thisCard.querySelector('.card2');

    card1.classList.toggle('front');
    card2.classList.toggle('back');

    //do not allow for second click without selecting another
    //check whih side is up
    //if gif side is up
        //remove onclick
    //else
        //add onclick
    
    const frontUp = thisCard.querySelector('.card1.front');

    if(frontUp !== null) {
        if(thisCard.hasAttribute('onclick')) {
            thisCard.removeAttribute('onclick');
        } else {
            thisCard.onclick = function(){};
        }
    } else {
        thisCard.onclick = function(){selectCard(this)};
    }
}

//function to clear the cards
function clearCards() {
    const container = document.querySelector('.container-cards');
    container.innerHTML = '';
}

//updates the timer
let t = 0;
const timerDisplay = document.querySelector('p');

function updateTime() {
    t++;
    timerDisplay.innerHTML = t;
}

let timerActive = null;
function timer() {
    timerActive = setInterval(updateTime,1000);
}

//function to reset the game
function reset() {
    let inputReset ='';
    while(inputReset !== 'não' && inputReset !== 'sim') {
        inputReset = prompt("Você gostaria de reiniciar a partida? (sim ou não)");
    }
        
    if(inputReset === 'sim') {
        t=0;
        clearInterval(timerActive);
        clearCards();
        game();
    } 
}

//check for end of the game, when all classes will be already removed
function end() {
    const end = document.querySelector('.notSelected');
    if(end === null) {
        let totalTime = document.querySelector('p').innerHTML;

        setTimeout(alert.bind(null, 'Você ganhou em '+count+' jogadas! A duração do jogo foi de '+(Number(totalTime)+1)+' segundos!'),1000);
        //call reset function
        setTimeout(reset,1000);
    }
}

//onclick function
let count=0;
function selectCard(thisCard) {
    //do not allow to turn 3 cards at once
    const howMany = document.querySelectorAll('.face.notSelected.back');

    if(howMany.length<2) {
        count++;
        const alreadyTurned = document.querySelector('.face.notSelected.back');

        turnCard(thisCard);
        const thisCardChild = thisCard.querySelector('.face.notSelected.back');
        
        //if one is already turned, check if its the same
            //if it is, remove a class from both
            //if it isn't, wait and turn both again

        if(alreadyTurned !== null) {
            const alreadyTurnedParent = alreadyTurned.parentNode;
            const alreadyTurnedImg = alreadyTurned.querySelector('img').src;
            const thisCardImg = thisCardChild.querySelector('img').src;

            if(thisCardImg == alreadyTurnedImg) {
                thisCardChild.classList.remove('notSelected');
                thisCard.removeAttribute("onclick");
                alreadyTurned.classList.remove('notSelected');
                alreadyTurnedParent.removeAttribute("onclick");
            } else {
                setTimeout(turnCard.bind(null, thisCard),1000);
                setTimeout(turnCard.bind(null, alreadyTurnedParent),1000);
            }
        }
    }

    end();
}

function game() { 
    timer();
   //template to be added to parent div
    const template1 = '<div data-test="card" class="card" onclick="selectCard(this)"><div class="card1 face"><img data-test="face-down-image" src="./assets/back.png" alt="papagainho"></div><div class="card2 back-face face notSelected"><img data-test="face-up-image" src="./assets/';
    const template2 = '\" alt="papagainho"></div></div>';

    let numberCards = 0;

    //loop to define number of cards to be played 
    while(numberCards % 2 !== 0 || numberCards > 14 || numberCards < 4) {
        numberCards = prompt("Escolha com quantas cartas deseja jogar (número par entre 4 e 14):");
    }

    //create the array with back images and first shuffle
    let gifs = ['bobrossparrot.gif','explodyparrot.gif','fiestaparrot.gif','metalparrot.gif','revertitparrot.gif','tripletsparrot.gif','unicornparrot.gif'];

    const firstShuffle = gifs.sort(comparer);

    //select only the number of cards needed from the first shuffle and double them, then shuffle two more times
    const cardsNeeded = [];
    for(let i=0;i<(numberCards/2);i++) {
        cardsNeeded.push(firstShuffle[i]);
        cardsNeeded.push(firstShuffle[i]);
    }

    let secondShuffle = cardsNeeded.sort(comparer);
    let thirdShuffle = secondShuffle.sort(comparer);

    //fill the parent div with the cards shuffled
    const cardContainer = document.querySelector('.container-cards');

    for(let i=0;i<numberCards;i++) {
        const toBeAdded = template1+thirdShuffle[i]+template2;

        cardContainer.innerHTML += toBeAdded;
    }

    selectCard(thisCard);
}

//call the function to be executed for the first time
game();