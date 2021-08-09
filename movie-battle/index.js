const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '450ca57c',
      // s: 'avengers' // for a search operation
      s: searchTerm
      // i: 'tt0848228' // for a look up operation, for the exact movie
    }
  })

  // if not search turns up nothing, suppress error console message
  if (response.data.Error) {
    return []
  }

  // console.log(response.data)
  // return only the data that we care about
  return response.data.Search
}

const root = document.querySelector('.autocomplete')
root.innerHTML = `
  <label><b>Search for a Movie</b></label>
  <input type="text" class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
  <div id="target"></div>
`

const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')

const onInput = async (e) => {
  const movies = await fetchData(e.target.value)
  // console.log(movies)
  if (!movies.length) {
    dropdown.classList.remove('is-active')
    return // then return out of this function so nothing else returns
  }
  // v empty out existing results to make way for new results
  resultsWrapper.innerHTML = ''

  dropdown.classList.add('is-active')
  // v this could also be a normal for loop, while loop, .forEach(), .map() as well, but for..of loops are nice and readable
  for (let movie of movies) {
    //! 1) Create it
    const option = document.createElement('a')
    const imgSrc = movie.Post === 'N/A' ? '' : movie.Poster
    option.classList.add('dropdown-item')
    //! 2) Fill it
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `
    //! 3) Insert it
    resultsWrapper.appendChild(option)
  }
}

// input event is triggered whenever there is a change in the input
// apply rate limiter that limits invocation to once a second
input.addEventListener('input', debounce(onInput, 500))

document.addEventListener('click', (e) => {
  // console.log(e.target)
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active')
  }
})
