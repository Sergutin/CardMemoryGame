let normalCards = document.getElementById("cards");
let easyCards = document.getElementById("cards-easy");
let cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let matched = 0;
let blockedDeck = false;

normalCards.style.display = "none";
easyCards.style.display = "none";

function startEasyGame() {
    easyCards.style.display = "flex";
    normalCards.style.display = "none";
}

function startNormalGame() {
    normalCards.style.display = "flex";
    easyCards.style.display = "none";
}

/* Add event listener to the cards */

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});

/* Function flip card */

function flipCard({
    target: clickedCard
}) {
    if (cardOne !== clickedCard && !blockedDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        blockedDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

/* Function match cards */

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 8) {
            setTimeout(() => {
                myAlert();
                return shuffleCard();
            }, 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return blockedDeck = false;
    }

    /* If cards do not match */

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 500);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        blockedDeck = false;
    }, 1000);
}

/* Function shuffle card */

function shuffleCard() {
    matched = 0;
    blockedDeck = false;
    cardOne = cardTwo = "";
    let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3, 2, 1];
    myArray.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `assets/images/${myArray[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

/* Alert at the end of the game */

function myAlert() {
    alert(`Congratulations, YOU WIN!`);
}

shuffleCard();