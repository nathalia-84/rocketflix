import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getContent() {
  let number = generateRandomIntegerInRange(1, 1069293)

  let url = "".concat(BASE_URL, number, '?', API_KEY, '&', language) 

  try {
    let response = await fetch(url)
    let data = await response.json()

    while(response.status != 200 || data.poster_path == null || data.overview == "" || data.vote_average < 7) {
      number = generateRandomIntegerInRange(1, 1069293)
      url = "".concat(BASE_URL, number, '?', API_KEY, '&', language) 

      response = await fetch(url)
      data = await response.json()
    }
    console.log(data)
    show(data)
  } catch (error) {
    console.log(error)
  }
  
}

function reduceText(text) {
  let i = 1
  while (text[text.length - i] != '.') {
    i++
  }
  return text.substring(0, text.length - (i-1))
}

function show(movie) {
  document.querySelector('.movies img').src = "".concat(IMG_URL, movie.poster_path)
  document.querySelector('.movies img').alt = "".concat('Poster do filme ', movie.title)
  document.querySelector('.movies img').style.height = "15em"
  document.querySelector('.movies .text h2').textContent = movie.title
  document.querySelector('.movies .text p').textContent = reduceText(movie.overview.substring(0, 500))
}



const btn = document.querySelector('.btn')
btn.addEventListener('click', function() {
  getContent()
}, {once : false}) 