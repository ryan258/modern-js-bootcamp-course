const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '450ca57c',
      // s: 'avengers' // for a search operation
      s: searchTerm
      // i: 'tt0848228' // for a look up operation, for the exact movie
    }
  })

  console.log(response.data)
}

const input = document.querySelector('input')

const onInput = (e) => {
  fetchData(e.target.value)
}

// input event is triggered whenever there is a change in the input
// apply rate limiter that limits invocation to once a second
input.addEventListener('input', debounce(onInput, 500))
