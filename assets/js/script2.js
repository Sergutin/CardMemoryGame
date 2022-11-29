let cards = document.querySelectorAll(".card-easy");
let cardOne, cardTwo;
let matched = 0;
let myDeck = false;

/* Add event listener to the cards*/

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

/* Function flip card */

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        myDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

/* Function match card */

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 2) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
            myAlert();
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return myDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 500);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        myDeck = false;
    }, 1000);
}

/* Function shuffle card */

function shuffleCard() {
    matched = 0;
    myDeck = false;
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

/* Alert at the end of the game */

function myAlert(){
    alert(`Congratulations, YOU WIN!`);
}

shuffleCard();