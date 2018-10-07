var unshuffled = [];
var shuffled = [];
var drawn = [];
var i, j, k;
var cardName;
var cardNum;
var cardSuit;
var cardInfo;
var guess;
var drinks;

function makeDeck() {
  for (i = 0; i < 13; i++) {
    for (j = 0; j < 4; j++) {
      
      cardNum = i + 2;
      
      if (j == 0) {
        cardSuit = "Hearts";
      } else if (j == 1) {
        cardSuit = "Diamonds";
      } else if (j == 2) {
        cardSuit = "Spades";
      } else {
        cardSuit = "Clubs";
      }
      
      if (cardNum < 11) {
        cardName = cardNum + cardSuit[0].toLowerCase();
      } else if (cardNum == 11) {
        cardName = "J" + cardSuit[0].toLowerCase();
      } else if (cardNum == 12) {
        cardName = "Q" + cardSuit[0].toLowerCase();
      } else if (cardNum == 13) {
        cardName = "K" + cardSuit[0].toLowerCase();
      } else if (cardNum == 14) {
        cardName = "A" + cardSuit[0].toLowerCase();
      }
      
      cardInfo = {Card_Name: cardName, Card_Num: cardNum, Card_Suit: cardSuit}
      unshuffled.push(cardInfo);
    }
  }
}

function shuffleDeck() {
  
  var cards = unshuffled.length;
  
  for (i = 0; i < cards; i++) {
    var pick = Math.floor(Math.random()*unshuffled.length);
    shuffled.push(unshuffled[pick]);
    unshuffled.splice(pick, 1);
  }
}

function drawCard() {
  var checkSuit = true;
  var checkOneAway = true;
  var checkPair = true;
  var checkAce = true;
  
  drinks = 0;
  drawn.unshift(shuffled[0]);
  shuffled.shift();
  
  var cardDOM = document.querySelector('.card');
  cardDOM.src = drawn[0].Card_Name.toUpperCase() + '.png';
  
  //check guess
  if((drawn[0].Card_Num > drawn[1].Card_Num && guess == "Lower") || (drawn[0].Card_Num < drawn[1].Card_Num && guess == "Higher")) {
    drinks++;
    console.log("wrong guess");
  }
  
  for (i = 0; i < drawn.length - 1; i++) {
    //check suits
    if(drawn[i].Card_Suit == drawn[i+1].Card_Suit && checkSuit) {
      drinks++;
      console.log("same suit");
    } else {
      checkSuit = false;
    }
  
    //check one aways
    if((drawn[i].Card_Num == drawn[i+1].Card_Num + 1 || drawn[i].Card_Num == drawn[i+1].Card_Num - 1) && checkOneAway) {
      drinks++;
      console.log("one away");
    } else {
      checkOneAway = false;
    }
  
    //check pairs
    if(drawn[i].Card_Num == drawn[i+1].Card_Num && checkPair) {
      drinks = drinks + drawn[i].Card_Num;
    } else {
      checkPair = false;
    }
  
    //check aces
    if(drawn[i].Card_Num == 14 && checkAce) {
      drinks = drinks + 3;
      console.log("ace");
    } else {
      checkAce = false;
    }
    
    if(checkSuit == false && checkOneAway == false && checkPair == false && checkAce == false) {
      break;
    }
    
  }
}

makeDeck();
shuffleDeck();
document.querySelector('.card').style.display = 'none';

drawn.unshift(shuffled[0]);
shuffled.shift();

var cardDOM = document.querySelector('.card');
cardDOM.style.display = 'block';
cardDOM.src = drawn[0].Card_Name.toUpperCase() + '.png';

console.log(drawn[0].Card_Name);

document.getElementById("btn_hi").addEventListener("click", function() {
  guess = "Higher";
  drawCard();
  var drinksDOM = document.querySelector('.text_box');
  drinksDOM.textContent = drinks + " DRINK(S)";
});

document.getElementById("btn_lo").addEventListener("click", function() {
  guess = "Lower";
  drawCard();
  var drinksDOM = document.querySelector('.text_box');
  drinksDOM.textContent = drinks + " DRINK(S)";
});