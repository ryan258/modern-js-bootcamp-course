createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `
  },
  onOptionSelect(movie) {
    // grab individual movie data
    onMovieSelect(movie)
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
})

// grab individual movie data on selection
const onMovieSelect = async (movie) => {
  // console.log(movie)
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '450ca57c',
      i: movie.imdbID
    }
  })
  // console.log(response.data)
  document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}

// render out the details of a movie
const movieTemplate = (movieDetail) => {
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
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `
}
