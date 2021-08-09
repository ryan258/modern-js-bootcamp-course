const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `
  },
  inputValue(movie) {
    // return whatever value should show up inside of the input
    return movie.Title
  },
  async fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '450ca57c',
        s: searchTerm
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
}

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left')
  }
})

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right')
  }
})

// add refs to reponses to hold the values
let leftMovie
let rightMovie

// grab individual movie data on selection
const onMovieSelect = async (movie, summaryElement, side) => {
  // console.log(movie)
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '450ca57c',
      i: movie.imdbID
    }
  })
  // console.log(response.data)
  summaryElement.innerHTML = movieTemplate(response.data)

  if (side === 'left') {
    leftMovie = response.data
  } else {
    rightMovie = response.data
  }

  if (leftMovie && rightMovie) {
    runComparison()
  }
}

const runComparison = () => {
  console.log('time for comparison')
  // we'll compare the data value props
  const leftSideStats = document.querySelectorAll('#left-summary .notification')
  const rightSideStats = document.querySelectorAll('#right-summary .notification')

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index]
    // console.log(leftStat, rightStat)
    const leftSideValue = parseFloat(leftStat.dataset.value)
    const rightSideValue = parseFloat(rightStat.dataset.value)

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary')
      leftStat.classList.add('is-warning')
    } else {
      rightStat.classList.remove('is-primary')
      rightStat.classList.add('is-warning')
    }
  })
}

// render out the details of a movie
const movieTemplate = (movieDetail) => {
  const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
  const metascore = parseInt(movieDetail.Metascore)
  const imdbRating = parseFloat(movieDetail.imdbRating)
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))
  let count = 0
  /*const awards = movieDetail.Awards.split(' ').forEach((word) => {
    const value = parseInt(word)
    if (isNaN(value)) {
      return
    } else {
      count += value
    }
  })
  console.log(count)
  but we'll use reduce*/
  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word)
    if (isNaN(value)) {
      return prev
    } else {
      return prev + value
    }
  }, 0)
  console.log(awards)

  return `
    <article class="media">
      <figure class="media-left">
        <div class="image">
          <img src="${movieDetail.Poster}" alt="${movieDetail.Title} Poster">
        </div>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `
}
