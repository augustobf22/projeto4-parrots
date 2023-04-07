//template to be added to parent div
const template1 = '<div class="card" onclick="selectCard(this)"><div class="card1 face"><img src="./assets/back.png" alt="papagainho"></div><div class="card2 back-face face notSelected"><img src="./assets/';
const template2 = ' alt="papagainho"></div></div>';

let numberCards = 0;

//loop to define number of cards to be played 
while(numberCards % 2 !== 0 || numberCards > 14 || numberCards < 4) {
    numberCards = prompt("Escolha com quantas cartas deseja jogar (número par entre 4 e 14):");
}

//create the array with back images and first shuffle
let gifs = ['bobrossparrot.gif\" id=1','explodyparrot.gif\" id=2','fiestaparrot.gif\" id=3','metalparrot.gif\" id=4','revertitparrot.gif\" id=5','tripletsparrot.gif\" id=6','unicornparrot.gif\" id=7'];

function comparer() { 
	return Math.random() - 0.5; 
}

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

//function to turn the cards
function turnCard(thisCard) {
    const card1 = thisCard.querySelector('.card1');
    const card2 = thisCard.querySelector('.card2');

    card1.classList.toggle('front');
    card2.classList.toggle('back');
}

//onclick function
let count = 0;

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

        //check for end of the game, when all classes will be already removed
        const fim = document.querySelector('.notSelected');
        if(fim === null) {
            setTimeout(alert.bind(null, 'Você ganhou em '+count+' jogadas!'),1000);
        }
    }
}

