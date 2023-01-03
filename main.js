import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let number = generateRandomIntegerInRange(1, 1069293)

let url = "".concat(BASE_URL, number, '?', API_KEY, '&', language) 


async function getContent() {
  try {
    let response = await fetch(url)
    let data = await response.json()

    while(response.status != 200 || data.poster_path == null || data.overview == "") {
      number = generateRandomIntegerInRange(1, 1069293)
      url = "".concat(BASE_URL, number, '?', API_KEY, '&', language) 

      response = await fetch(url)
      data = await response.json()
    }

    show(data)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  
}

function show(movie) {
  document.querySelector('.movies img').src = "".concat(IMG_URL, movie.poster_path)
  document.querySelector('.movies img').alt = "".concat('Poster do filme ', movie.title)
  document.querySelector('.movies h1').textContent = movie.title
  document.querySelector('.movies p').textContent = movie.overview
}



const btn = document.querySelector('.btn')
btn.addEventListener('click', getContent())