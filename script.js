const templateCardBack = '<div class="card" onclick="turnCard(this)"><img src="./assets/back.png" alt="papagainho" class="front"><img src="./assets/bobrossparrot.gif" alt="papagainho" class="back hidden"></div>';

let numberCards = 0;

while(numberCards % 2 !== 0 || numberCards > 14 || numberCards < 4) {
    numberCards = prompt("Escolha com quantas cartas deseja jogar (número par entre 4 e 14):");
}

const cardContainer = document.querySelector('.container-cards');

for(let i=0;i<numberCards;i++) {
    cardContainer.innerHTML += templateCardBack;
}

//atribuir 1 gif a cada 2 cartas de forma aleatoria

function turnCard(thisCard) {
    const front = thisCard.querySelector('.front');
    const back = thisCard.querySelector('.back');

    front.classList.toggle('hidden');
    back.classList.toggle('hidden');
}

