import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
  QUERY_GENRE,
  QUERY_PAGE,
} from './api.js'

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getDecade() {
  let arr = []

  const date = new Date(2020, 0)

  const dateRanges = (date, rule, sum = 0) => Math.floor(date.getFullYear() / rule) * rule + sum

  const lowerDecade = "".concat('&primary_release_date.gte=', dateRanges(date, 10), '-01-01')
  const upperDecade = "".concat('&primary_release_date.lte=', dateRanges(date, 10, 9), '-12-31')

  arr[0] = lowerDecade
  arr[1] = upperDecade
  
  return arr
}

const getMovie = async() => {
  const randomNumber = generateRandomIntegerInRange(1, 19)
  const randomPage = generateRandomIntegerInRange(1, 10)

  const arrDecade = getDecade()

  const url = "".concat(BASE_URL, '?', API_KEY, language, QUERY_GENRE, 18, QUERY_PAGE, randomPage, arrDecade[0], arrDecade[1])
  console.log(url)

  const response = await fetch(url)
  const jsonMovieData = await response.json()
  const movies = await jsonMovieData.results

  const chosenMovie = movies[randomNumber]
  show(chosenMovie)
}


/* async function getContent() {
  showLoading()

  let number = generateRandomIntegerInRange(1, 20)

  let url = "".concat(BASE_URL, '?', API_KEY, language, QUERY_GENRE, 18, QUERY_YEAR, 2000) 

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
  
} */

function reduceText(text) {
  let i = 1
  while (text[text.length - i] != '.') {
    i++
  }
  return text.substring(0, text.length - (i-1))
}

function showLoading() {
  document.querySelector('.movies img').src = ""
  document.querySelector('.movies img').alt = ""
  document.querySelector('.movies img').style.height = ""
  document.querySelector('.movies .text h2').textContent = "Carregando..."
  document.querySelector('.movies').style.paddingLeft = "30%"
  document.querySelector('.movies').style.paddingRight = "30%"
  document.querySelector('.movies .text p').textContent = ""
}

function show(movie) {
  document.querySelector('.movies').style.paddingLeft = "0"
  document.querySelector('.movies').style.paddingRight = "0"
  document.querySelector('.movies img').src = "".concat(IMG_URL, movie.poster_path)
  document.querySelector('.movies img').alt = "".concat('Poster do filme ', movie.title)
  document.querySelector('.movies img').style.height = "15em"
  document.querySelector('.movies .text h2').textContent = movie.title
  document.querySelector('.movies .text p').textContent = reduceText(movie.overview.substring(0, 500))
}



const btn = document.querySelector('.btn')
btn.addEventListener('click', function() {
  getMovie()
}, {once : false}) 