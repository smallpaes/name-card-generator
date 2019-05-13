let sections = document.querySelectorAll('section')
let form = document.querySelector('.needs-validation')
let firstName = document.getElementById('first-name')
let lastName = document.getElementById('last-name')
let link = document.getElementById('photo-link')
let intro = document.getElementById('intro')
let themes = document.getElementsByName('theme')

//trigger form submit to validate input
form.addEventListener('submit', formValidate)

//intro length real-time display
intro.addEventListener('input', displayIntroLength)

//validate input
function formValidate(event) {
  event.preventDefault()
  if (form.checkValidity() === false) {
    event.stopPropagation()
    form.classList.add('was-validated')
  } else {
    //number of card is based of user's theme choice 
    (themes[2].checked === true) ? createCards(2) : createCards(1)
    form.classList.remove('was-validated')
  }
}

//create cards: number is based of user's theme choice 
function createCards(num) {
  //create a title for card section
  sections[1].innerHTML = `<h1 class='text-center text-white m-2'>Your Name Card</h1>`

  //create card content for each card
  for (let i = 0; i < num; i++) {
    generateCardContent(i)
  }
  //reset the form after submit
  resetForm()
}

//generate card content for a card
function generateCardContent(cardIndex) {
  //create card inner html
  sections[1].innerHTML += `
    <div class="card-container rounded mt-4">
      <div class="row p-2">
        <div class="col-8">
          <h1 class="col p-0">${firstName.value} ${lastName.value}</h1>
          <p>${intro.value}</p>
        </div>
        <div class="col-4">
          <div class="my-img"></div>
        </div>
      </div>
    </div>
  `
  //update the image url in CSS if user entered
  if (link.value !== '') {
    let image = document.querySelectorAll('.my-img')[cardIndex]
    image.style.backgroundImage = `url('${link.value}')`
  }
  //create theme for the card
  createTheme(cardIndex)
}

//display input length info to user
function displayIntroLength(event) {
  let feedback = intro.nextElementSibling
  let introLength = this.value.length

  if (introLength < 200 && introLength > 0) {
    feedback.innerHTML = `You have entered ${introLength} words, ${200 - introLength} more words allowed`
    feedback.style.display = 'inherit'
    feedback.classList.add('text-success')
  } else if (introLength === 0) {
    feedback.innerHTML = 'Description is required.'
    feedback.classList.remove('text-success')
  } else {
    feedback.innerHTML = `You have entered ${introLength} words, reaching the limit`
  }
}

//create theme for the card
function createTheme(cardIndex) {
  let cardContainer = sections[1].children[cardIndex + 1]

  //clear all previously added class
  cardContainer.classList.remove('dark-theme')
  cardContainer.classList.remove('light-theme')

  //for light theme choice or first card
  if (themes[0].checked || (themes[2].checked && cardIndex === 0)) {
    cardContainer.classList.add('light-theme')
    //for dark theme chioce or second card
  } else {
    cardContainer.classList.add('dark-theme')
  }
}

//reset form input and validation data
function resetForm() {
  form.reset()
  intro.nextElementSibling.classList.remove('text-success')
  intro.nextElementSibling.innerHTML = 'Description is required.'
  intro.nextElementSibling.style.display = ''
}