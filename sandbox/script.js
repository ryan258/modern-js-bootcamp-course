/*//! forEach(fn[, index]) - applies function to each array element - forEach is like half a map
// - works like a for..of loop but this is calling a function where a for..of loop is just a block
// - .forEach() has been around much longer than for..of, since we had the regular for loop
// - we can add a second param if we want to use the index

const numbers = [20, 21, 22, 23, 24, 25, 26, 27]
numbers.forEach(function (num) {
  // console.log(num * 2)
})

const printTriple = (num) => console.log(num * 3)
// numbers.forEach(printTriple)

numbers.forEach(function (num, i) {
  // console.log(`At index ${i} is ${num}`)
})

const books = [
  {
    title: 'Needful Things',
    authors: ['Stephen King'],
    rating: 5.0
  },
  {
    title: 'Taltos',
    authors: ['Anne Rice'],
    rating: 4.2
  },
  {
    title: 'Good Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11
  }
]

books.forEach(function (book) {
  // console.log(book.title)
})
*/

/*//! arr.map(fn) - create new array w/ results of calling a callback on every element in an array
// - you probably use this one this most
// - good for extracting portions of an array and transforming an old array to a new array
// - it's v.useful for chaining
// - .forEach() is like half a map

const numbers = [20, 21, 22, 23, 24, 25, 26, 27]

const doubles = numbers.map((num) => num * 2)
// console.log(doubles)

// the eq for..of way
const doubles2 = []
for (let num of numbers) {
  doubles2.push(num * 2)
}
// console.log(doubles2)

const numDetail = numbers.map((num) => ({
  value: num,
  isEven: num % 2 === 0
}))

// console.log(numDetail)

const words = ['trousers', 'beep', 'potato', 'buffalo']
const coolWords = words.map((word) => word.toUpperCase().split('').join('.'))

// console.log(coolWords)

const books = [
  {
    title: 'Needful Things',
    authors: ['Stephen King'],
    rating: 5.0
  },
  {
    title: 'Taltos',
    authors: ['Anne Rice'],
    rating: 4.2
  },
  {
    title: 'Good Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11
  }
]

const bookTitles = books.map((book) => book.title)

// console.log(bookTitles)
*/

/*//! arr.find(fn) - return the value of the FIRST element in the array that = true in the test function
// - useful for when
//   - you're trying to find something based on an ID, like updating or deleting a post
// deletePost(2)
// posts.find(p => p.id === 2)

let movies = ['The Fantastic Mr. Fox', 'Mr. and Mrs. Smith', 'Mrs. Doubtfire', 'Mr. Deeds']

const movie = movies.find((movie) => {
  return movie.includes('Mrs')
})

console.log(movie) // 'Mr. and Mrs. Smith'

const movie2 = movies.find((m) => m.indexOf('Mrs') === 0)
console.log(movie2) // 'Mrs. Doubtfire'

const books = [
  {
    title: 'Needful Things',
    authors: ['Stephen King'],
    rating: 4.25
  },
  {
    title: 'Taltos',
    authors: ['Anne Rice'],
    rating: 4.42
  },
  {
    title: 'Good Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11
  }
]

const goodBook = books.find((b) => b.rating > 4.3)
console.log(goodBook)
const kingBook = books.find((b) => b.authors.includes('Stephen King'))
console.log(kingBook)
*/

/*//! arr.filter(fn) - creates a new array w/ all elements that pass the fn's test // true

const nums = [34, 35, 67, 54, 109, 102, 32, 9]

// get the odd numbers
const oddNums = nums.filter((n) => n % 2 === 1)
console.log(oddNums)

const books = [
  {
    title: 'Needful Things',
    authors: ['Stephen King'],
    rating: 4.25,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Taltos',
    authors: ['Anne Rice'],
    rating: 4.42,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Good Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11,
    genres: ['nonfiction', 'essays']
  },
  {
    title: 'Fake Spooky Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11,
    genres: ['fiction', 'essays']
  }
]

const fictionBooks = books.filter((book) => book.genres.includes('fiction'))
console.log('fiction books', fictionBooks)

const goodBooks = books.filter((book) => book.rating > 4.2)
console.log('good books:', goodBooks)

const fakeEssayBooks = books.filter((book) => book.genres.includes('fiction') && book.genres.includes('essays'))
console.log('fake essay books', fakeEssayBooks)

const query = 'omens'
const results = books.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
console.log('query results', results)
*/

/*//! arr.some(fn) - returns true if ANY of the array elements pass the test fn
//! arr.every(fn) - returns true if ALL of the array elements pass the test fn
// - both are boolean methods - end of the day you get true or false

const words = ['dog', 'dig', 'log', 'bag', 'wag']

// EVERY EXAMPLES
const allHave3Letters = words.every((word) => word.length === 3)
console.log('allHave3Letters', allHave3Letters)

const allEndWithG = words.every((word) => word[word.length - 1] === 'g')
console.log('allEndWithG', allEndWithG)

// SOME EXAMPLES
const someStartWithD = words.some((word) => word[0] === 'd')
console.log('someStartWithD:', someStartWithD)
const everyStartWithD = words.every((word) => word[0] === 'd')
console.log('everyStartWithD:', everyStartWithD)

const books = [
  {
    title: 'Needful Things',
    authors: ['Stephen King'],
    rating: 4.25,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Taltos',
    authors: ['Anne Rice'],
    rating: 4.42,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Good Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11,
    genres: ['nonfiction', 'essays']
  },
  {
    title: 'Fake Spooky Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11,
    genres: ['fiction', 'essays']
  }
]

const allGoodBooks = books.every((book) => book.rating > 3.5)
console.log('allGoodBooks:', allGoodBooks)

const any2Authors = books.some((book) => book.authors.length === 2)
console.log('any2Authors:', any2Authors)
*/

/*//! arr.sort(fn) -
// - THIS MUTATES THE ORIGINAL ARRAY SO WE MUCH COPY IT, SLICE() CAN DO THAT
const prices = [400.5, 3000, 99.99, 35.99, 12.0, 9500]
//! - default in sort is to convert all the numbers to strings
const simplySortedPrices = prices.slice().sort()
console.log('simplySortedPrices', simplySortedPrices) // [12, 3000, 35.99, 400.5, 9500, 99.99]
//! - so we must pass sort a compare function!
//    - (a,b) returns less than 0 ---> sort a before b
//    - (a,b) returns 0 ---> no change
//    - (a,b) returns more than 0 ---> sort b before a
const ascSort = prices.slice().sort((a, b) => a - b)
// a - b (400.5 - 3000) is a negative number
// a - b (35.99 - 12.00) is a positive number so b(12.00) is put before a(35.99)
console.log('ascSort:', ascSort)

const descSort = prices.slice().sort((a, b) => b - a)
console.log('descSort:', descSort)

console.log(prices)

// complex sort practice
const books = [
  {
    title: 'Needful Things',
    authors: ['Stephen King'],
    rating: 4.25,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Taltos',
    authors: ['Anne Rice'],
    rating: 4.42,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Good Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11,
    genres: ['nonfiction', 'essays']
  },
  {
    title: 'Fake Spooky Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11,
    genres: ['fiction', 'essays']
  }
]

const sortBooksByRatingAsc = books.sort((a, b) => a.rating - b.rating)
console.log('sortBooksByRating:', sortBooksByRatingAsc)
*/

//! arr.reduce(acc, fn[, initStartVal]) - executes a render function on each element of the array resulting in a single value
// - acc starts as the first item in the array
//   ! it is initialized to the first element of the array !
// - every time the fn runs it's passed the previous iterations return value

// sum all elements in an array //
const nums = [3, 4, 5, 6, 7]
const product = nums.reduce((total, currentVal) => {
  return total * currentVal
})
console.log('product:', product) // 3*4*5*6*7 = 2520

//!!! find max value in an array //
let grades = [87, 64, 96, 92, 88, 99, 73, 70, 64]
const maxGrade = grades.reduce((max, curVal) => {
  // if (curVal > max) return curVal
  // return max
  return Math.max(max, curVal)
})
console.log('maxGrade:', maxGrade) // 99

//!!! find min value in an array //
const minGrade = grades.reduce((min, curVal) => Math.min(min, curVal))
console.log('minGrade:', minGrade) // 64

//! - you can also pass in an initial starting value after the callback
const moreNums = [10, 20, 30, 40, 50]
const totalPlusSeven = moreNums.reduce((sum, currVal) => sum + currVal, 7)
console.log('totalPlusSeven:', totalPlusSeven) // 157

//!!! TALLYING
const votes = ['y', 'y', 'n', 'y', 'n', 'y', 'n', 'y', 'n', 'n', 'n', 'y', 'y', 'beep', 'boop', 'beep']

// we want to make:
// {
//   y: 7,
//   n: 6
// }

const voteCountVerbose = votes.reduce((tally, val) => {
  // add to obj whatever key we have
  // - if it exists, use it
  if (tally[val]) {
    tally[val]++
  }
  // - if not, create a key and set it to 1
  else {
    tally[val] = 1
  }
  return tally
}, {})
console.log('voteCount:', voteCountVerbose)

const voteCount = votes.reduce((tally, val) => {
  // if there is no tally[val] set to current tally of y
  // or 0 to 0+1
  tally[val] = (tally[val] || 0) + 1
  // next time we'll set tally[y] + 1
  return tally
}, {})

console.log('voteCount:', voteCount)

const books = [
  {
    title: 'Needful Things',
    authors: ['Stephen King'],
    rating: 5,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Taltos',
    authors: ['Anne Rice'],
    rating: 4.42,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Good Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 3.11,
    genres: ['nonfiction', 'essays']
  },
  {
    title: 'Fake Spooky Omens',
    authors: ['Terry P', 'Neil G'],
    rating: 4.11,
    genres: ['fiction', 'essays']
  },
  {
    title: 'A Terrible Book',
    authors: ['Jack K.'],
    rating: 2.11,
    genres: ['fiction', 'essays']
  }
]

const ratingGroups = books.reduce((groupedBooks, book) => {
  // get the rating from the book to use for a key
  const key = Math.floor(book.rating)
  // does key exist? if not, make it w/ an empty array on the obj
  if (!groupedBooks[key]) groupedBooks[key] = []
  // push book to target array by key
  groupedBooks[key].push(book)
  // return the updated obj
  return groupedBooks
}, {})

console.log('ratingGroups:', ratingGroups)
// {
//   '2': [],
//   '3': [],
//   '4': [],
//   '5': []
// }
