//! make a deck factory!
const makeDeck = () => {
  return {
    deck: [], //! this will be manipulated by the methods
    drawnCards: [], //! this will be manipulated by the methods
    suits: ['hearts', 'diamonds', 'spades', 'clubs'],
    values: '2,3,4,5,6,7,8,9,10,J,Q,K,A',

    initializeDeck() {
      const { values, suits, deck } = this

      for (let value of values.split(',')) {
        for (let suit of suits) {
          deck.push({ value, suit })
        }
      }
    },

    drawCard() {
      // return so we have access to the card that was just drawn
      // return this.deck.pop()
      const card = this.deck.pop()
      this.drawnCards.push(card)
      // console.log(this.drawnCards)
      return card
    },

    drawMultiple(numCards) {
      const cards = []
      for (let i = 0; i < numCards; i++) {
        cards.push(this.drawCard())
      }
      // console.log(this.drawnCards)
      return cards
    },
    // the fisher/yates shuffle
    // - where we're basically shuffling from the back of the array to the front
    shuffle() {
      const { deck } = this
      // loop over array backwards
      for (let i = deck.length - 1; i > 0; i--) {
        // pick random index before current element
        let j = Math.floor(Math.random() * (i + 1))
        // then swap
        ;[deck[i], deck[j]] = [deck[j], deck[i]]
        // console.log(deck)
      }
    }
  }
}

// USE IT
const myDeck = makeDeck()
myDeck.initializeDeck()
myDeck.shuffle()
const h1 = myDeck.drawMultiple(2)
const h2 = myDeck.drawMultiple(2)
const h3 = myDeck.drawMultiple(5)
console.log(myDeck)

const myDeckTwo = makeDeck()
myDeckTwo.initializeDeck()
myDeckTwo.shuffle()
console.log(myDeckTwo)

//! vv make an object oriented deck vv

/*const myDeck = {
  deck: [], //! this will be manipulated by the methods
  drawnCards: [], //! this will be manipulated by the methods
  suits: ['hearts', 'diamonds', 'spades', 'clubs'],
  values: '2,3,4,5,6,7,8,9,10,J,Q,K,A',

  initializeDeck() {
    const { values, suits, deck } = this

    for (let value of values.split(',')) {
      for (let suit of suits) {
        deck.push({ value, suit })
      }
    }
  },

  drawCard() {
    // return so we have access to the card that was just drawn
    // return this.deck.pop()
    const card = this.deck.pop()
    this.drawnCards.push(card)
    // console.log(this.drawnCards)
    return card
  },

  drawMultiple(numCards) {
    const cards = []
    for (let i = 0; i < numCards; i++) {
      cards.push(this.drawCard())
    }
    // console.log(this.drawnCards)
    return cards
  },
  // the fisher/yates shuffle
  // - where we're basically shuffling from the back of the array to the front
  shuffle() {
    const { deck } = this
    // loop over array backwards
    for (let i = deck.length - 1; i > 0; i--) {
      // pick random index before current element
      let j = Math.floor(Math.random() * (i + 1))
      // then swap
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
      // console.log(deck)
    }
  }
}
*/

//! vv functional way vv above is better for this

// function makeDeck() {
//   const deck = []
//   const suits = ['hearts', 'diamonds', 'spades', 'clubs']
//   const values = '2,3,4,5,6,7,8,9,10,J,Q,K,A'

//   for (let value of values.split(',')) {
//     for (let suit of suits) {
//       deck.push({ value, suit })
//     }
//   }
//   return deck
// }

// function drawCard(deck) {
//   // pop changes the original array and returns the value
//   return deck.pop()
// }

// // gets an array of 52 cards
// const myDeck = makeDeck()

// const card1 = drawCard(myDeck)

//! Basic Super Limited Way to handle a deck of cards
/*function makeDeck() {
  const deck = []
  const suits = ['hearts', 'diamonds', 'spades', 'clubs']
  const values = '2,3,4,5,6,7,8,9,10,J,Q,K,A'

  for (let value of values.split(',')) {
    for (let suit of suits) {
      deck.push({ value, suit })
    }
  }
  return deck
}

function drawCard(deck) {
  // pop changes the original array and returns the value
  return deck.pop()
}

// gets an array of 52 cards
const myDeck = makeDeck()

const card1 = drawCard(myDeck)
*/
