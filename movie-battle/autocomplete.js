// a function that can be called multiple different times to create different instances
// config will have the specifics of how this particular instance should work
const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  root.innerHTML = `
    <label><b>Search</b></label>
    <input type="text" class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
    <div id="target"></div>
  `

  const input = root.querySelector('input')
  const dropdown = root.querySelector('.dropdown')
  const resultsWrapper = root.querySelector('.results')

  const onInput = async (e) => {
    const items = await fetchData(e.target.value)
    // console.log(items)
    if (!items.length) {
      dropdown.classList.remove('is-active')
      return // then return out of this function so nothing else returns
    }
    // v empty out existing results to make way for new results
    resultsWrapper.innerHTML = ''

    dropdown.classList.add('is-active')
    // v this could also be a normal for loop, while loop, .forEach(), .map() as well, but for..of loops are nice and readable
    for (let item of items) {
      //! 1) Create it
      const option = document.createElement('a')
      option.classList.add('dropdown-item')
      //! 2) Fill it
      option.innerHTML = renderOption(item)
      //! 3) Handle option click
      option.addEventListener('click', () => {
        // close the dropdown
        dropdown.classList.remove('is-active')
        // to update the value of the input
        input.value = inputValue(item)
        // grab individual item data
        onOptionSelect(item)
      })
      //! 4) Insert it
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
}
