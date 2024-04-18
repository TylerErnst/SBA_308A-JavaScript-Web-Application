import * as Carousel from "./Carousel.js";
import * as Api from "./api.js"
// import axios from "axios";
// import axios from 'https://cdn.skypack.dev/axios';

const speciesSelect = document.getElementById("speciesSelect");
// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

const temperamentSelect = document.getElementById("temperamentSelect");

const filterSelect = document.getElementById("filterSelect");


// Initial api related setup
let apiSelected = 'dog';
Api.setApi(apiSelected);
var breedList = await Api.getBreeds();

async function initialLoad(breeds) {
  breedList = await Api.getBreeds();
  breeds = breedList
  console.log(breeds)

  
  
  loadBreedDropdown(getBreedNames(breeds));
  console.log('dropdown', breedSelect)
  
  checkFilter()
  Carousel.prepareCarousel()
}


function getBreedNames(breeds){
  const list = [];
  breeds.forEach((breed) => {
    let opt = {};
    opt.value = breed.id;
    opt.textContent = breed.name;

    list.push(opt);
  });
  return list;
}

function getTemperaments (breeds) {
  let list = [];
  breeds.forEach((breed) => {
    if (breed.temperament){
      const myArray = breed.temperament.split(", ")
      list.push(myArray);
    }
  });
  list = list.flat();
  list = removeArrayDuplicates(list);
  return list;
}

function removeArrayDuplicates(array) {
  for (let i = 0; i < array.length; i++){
    array[i] = array[i].toLowerCase();
    let string = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    array[i] = string;
  }
  return array.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  });
}

function loadBreedDropdown (list){
  clearOptions(breedSelect);
  list.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item.value;
    opt.textContent = item.textContent;

    breedSelect.appendChild(opt);
  });
}

function loadTemperamentDropdown (list){
  clearOptions(temperamentSelect);
  const blank = document.createElement("option");
  blank.textContent = "";
  temperamentSelect.appendChild(blank)
  for (let i = 0; i < list.length; i++){
    const opt = document.createElement("option");
    opt.textContent = list[i];
    temperamentSelect.appendChild(opt);
  }
  console.log(list)
}


function clearOptions(selectElement) {
  let L = selectElement.options.length - 1;
  for(let i = L; i >= 0; i--) {
     selectElement.remove(i);
  }
}



initialLoad(breedList);





export function updateProgress(progressEvent){
  console.log("progress",progressEvent);
  
  progressBar.style.width = progressEvent.progress * 100 + "%";
}



// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log("Request Started.");
  progressBar.style.width = '0%';
  config.metadata = { startTime: new Date()}
  document.body.style.cursor = "progress";
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  response.config.metadata.endTime = new Date();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
  console.log(`Request took ${response.duration} milliseconds.`)
  document.body.style.cursor = "default";
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
  console.log(`Request took ${error.duration} milliseconds.`)
  document.body.style.cursor = "default";
  return Promise.reject(error);
});









breedSelect.addEventListener("change", Carousel.prepareCarousel);


getFavouritesBtn.addEventListener("click", async () => {
  // getFavourites();
  let list = await Api.getFavourites();
  console.log('favorites list index:',list);
  Carousel.carouselSetup(list, true)
});


speciesSelect.addEventListener('click', ({ target }) => { // handler fires on root container click
  if (target.getAttribute('name') === 'species') { // check if user clicks right element
    let species = target.id;
    console.log('Filter by: ' + species);
    apiSelected = Api.setApi(species);
    initialLoad(breedList);
  }
});

filterSelect.addEventListener('click', checkFilter); 

function checkFilter(){
  const buttonNone = document.getElementById("none");
  const buttonTemperament = document.getElementById("temperament");
  if (buttonNone.checked){
    console.log('none checked')
    temperamentSelect.style.display = "none"
    clearOptions(temperamentSelect);
    console.log(temperamentSelect);
    // Clear filter function
  }else{
    console.log('temperament checked')
    console.log(temperamentSelect.style)
    temperamentSelect.style.display = "block"
    loadTemperamentDropdown(getTemperaments (breedList));
    console.log(temperamentSelect);
    // Add filter function
  }
}

function filterBreeds (breeds, filter) {
  // console.log(filter)
  filter = filter.toLowerCase();
  // console.log(filter)
  if (!filter){
    return breeds;
  }
  let list = [];
  // console.log(breeds)
  breeds.forEach((breed) => {
    let temperaments = [];
    if (breed.temperament){
      const myArray = breed.temperament.split(", ")
      temperaments.push(myArray);
      // console.log(temperaments)
      for (let i = 0; i < temperaments[0].length; i++){
        console.log(i)
        let currentTemperament = temperaments[0][i].toLowerCase();
        // console.log(currentTemperament)
        // console.log(currentTemperament == filter)
        if (currentTemperament == filter){
          list.push(breed)
          break;
        }
      }
    }
  });
  console.log(list)
  return list;
}

temperamentSelect.addEventListener('change', (event) => {
  if (temperamentSelect.childNodes){
    console.log("change")
    console.log(event.target.value)
    let filteredList = filterBreeds(breedList, event.target.value)
    console.log(filteredList)
    clearOptions(breedSelect);
    loadBreedDropdown(getBreedNames(filteredList));
  }else{
    console.log("empty")
  }
});

