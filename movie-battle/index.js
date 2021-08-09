const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '450ca57c',
      // s: 'avengers' // for a search operation
      i: 'tt0848228' // for a look up operation, for the exact movie
    }
  })

  console.log(response.data)
}

fetchData()
