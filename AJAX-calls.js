
let blueprintNode;

function fetchAllAndShow(event) {

  // clear the whole container ...
  document.getElementsByClassName('characters-container')[0].innerHTML = ''

  axios.get('http://localhost:8000/characters').then((result) => {

    let resultsFromAPI = result.data
    console.log(resultsFromAPI)

    // fill the container with results from the API
    resultsFromAPI.forEach((character) => {

      // this is kinda messy
      newNode = blueprintNode.cloneNode(true)

      newNode.getElementsByClassName('name')[0].innerText = character.name
      newNode.getElementsByClassName('occupation')[0].innerText = character.occupation
      newNode.getElementsByClassName('cartoon')[0].innerText = character.cartoon
      newNode.getElementsByClassName('weapon')[0].innerText = character.weapon


      document.getElementsByClassName('characters-container')[0].append(newNode)
    })
  })

}


window.addEventListener('load', () => {

  blueprintNode = document.getElementsByClassName('character-info')[0].cloneNode(true)

  document.getElementById('fetch-all').addEventListener('click', fetchAllAndShow);

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    // DOM stuff ( get whatever the user input )
    let theIDtheUserHasInput = document.getElementById('character-id-input').value
    // API stuff ( send that to the API get results )
    axios.get(`http://localhost:8000/characters/${theIDtheUserHasInput}`).then((result) => {
      console.log(result)
      let character = result.data
      document.getElementsByClassName('name')[0].innerText = result.data.name
      document.getElementsByClassName('occupation')[0].innerText = result.data.occupation
      document.getElementsByClassName('weapon')[0].innerText = result.data.weapon
      document.getElementsByClassName('cartoon')[0].innerText = result.data.cartoon
    })
    // DOM stuff ( display those results )

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    let theIDtheUserHasInput = document.getElementById('character-id-input-for-delete').value

    axios.delete(`http://localhost:8000/characters/${theIDtheUserHasInput}`).then(() => {
      console.log('delete worked')
      document.getElementById('delete-one').style.color = 'lightgreen'
      fetchAllAndShow()
    }).catch(() => {
      console.log('delete failed')
      document.getElementById('delete-one').style.color = 'red'
    })

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    // when you use submit, you want to prevent the default (if you use axios)
    event.preventDefault()

    let form = document.getElementById('new-character-form')
    let name = form.getElementsByTagName('input')[0].value
    let occupation = form.getElementsByTagName('input')[1].value
    let weapon = form.getElementsByTagName('input')[2].value
    let cartoon = form.getElementsByTagName('input')[3].checked

    axios.post(`http://localhost:8000/characters`, {
      name: name,
      occupation: occupation,
      weapon: weapon,
      cartoon: cartoon
    }).then((result) => {
      console.log('result : ', result)
      fetchAllAndShow()
    })
  });
});
