const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '450ca57c',
      // s: 'avengers' // for a search operation
      s: searchTerm
      // i: 'tt0848228' // for a look up operation, for the exact movie
    }
  })

  // console.log(response.data)
  // return only the data that we care about
  return response.data.Search
}

const input = document.querySelector('input')

const onInput = async (e) => {
  const movies = await fetchData(e.target.value)
  // console.log(movies)
  // v this could also be a normal for loop, while loop, .forEach(), .map() as well, but for..of loops are nice and readable
  for (let movie of movies) {
    //! 1) Create it
    const div = document.createElement('div')
    //! 2) Fill it
    div.innerHTML = `
      <img src="${movie.Poster}" />
      <h1>${movie.Title}</h1>
    `
    //! 3) Insert it
    document.querySelector('#target').appendChild(div)
  }
}

// input event is triggered whenever there is a change in the input
// apply rate limiter that limits invocation to once a second
input.addEventListener('input', debounce(onInput, 500))
