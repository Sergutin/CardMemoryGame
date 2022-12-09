let normalCards = document.getElementById("cards");
let easyCards = document.getElementById("cards-easy");
let cards = document.querySelectorAll(".card");
let normal = document.querySelectorAll(".normal");

let card;
let cardOne, cardTwo;
let matched = 0;
let blockedDeck = false;

normalCards.style.display = "none";
easyCards.style.display = "none";

/* Start game functions */

function startEasyGame() {
    easyCards.style.display = "flex";
    normalCards.style.display = "none";
    shuffleEasyCard();
}

function startNormalGame() {
    normalCards.style.display = "flex";
    easyCards.style.display = "none";
    shuffleCard();
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
        if (matched == 2) {
            setTimeout(() => {
                modal.style.display = "block";
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
    normal.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `assets/images/${myArray[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

/* Function shuffle card Easy game */

function shuffleEasyCard() {
    matched = 0;
    blockedDeck = false;
    cardOne = cardTwo = "";
    let myArray = [1, 2, 2, 1];
    myArray.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `assets/images/${myArray[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}



/* Modal function */

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
// let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }