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

let timeoutId
const onInput = (e) => {
  // this will be called many times in a row
  if (timeoutId) {
    // first time this is called it will be undefined and skipped over
    // 2nd time, timeoutId will be defined and timeout cleared
    clearTimeout(timeoutId)
  }
  timeoutId = setTimeout(() => {
    // setTimeout returns a timer ID
    // then on further typing we set up a brand new one
    fetchData(e.target.value)
  }, 1000) // in 1 second call fetch data
}

// input event is triggered whenever there is a change in the input
input.addEventListener('input', onInput)
