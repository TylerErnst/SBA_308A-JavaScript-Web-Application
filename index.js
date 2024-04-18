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

// Step 0: Store your API key here for reference and easy access.
// Dog
// const API_KEY = "live_7O7rwERaaoi9qf9CLXmxrM9TVb3C7HNw99NUlaaIBCvMdpoDRMBbQIspORBLMupw";
// axios.defaults.baseURL = "https://api.thedogapi.com/v1/";
// axios.defaults.headers.common["x-api-key"] = API_KEY;
// Cat
// const API_KEY = "live_emZXn4x5IT3vE3DxfEyB4RmT3Uy3y4sd1E4KSnYlw8Iy92u84oOBax51uLXgasOV";
// axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
// axios.defaults.headers.common["x-api-key"] = API_KEY;

let apiSelected = 'dog';

// let API_KEY;

// function setApi (api){
//   if (api == 'cat'){
//     console.log('setting:', api);
//     API_KEY = "live_emZXn4x5IT3vE3DxfEyB4RmT3Uy3y4sd1E4KSnYlw8Iy92u84oOBax51uLXgasOV";
//     axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
//     axios.defaults.headers.common["x-api-key"] = API_KEY;
//     api = 'cat';
//   }else{
//     console.log('setting:', api);
//     API_KEY = "live_7O7rwERaaoi9qf9CLXmxrM9TVb3C7HNw99NUlaaIBCvMdpoDRMBbQIspORBLMupw";
//     axios.defaults.baseURL = "https://api.thedogapi.com/v1/";
//     axios.defaults.headers.common["x-api-key"] = API_KEY;
//     apiSelected = 'dog'
//   }
// }

Api.setApi(apiSelected);
let breedList = await Api.getBreeds();
let temperamentList;

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */


//List of
//Breeds
//Breed Group
//Temperments


async function initialLoad(breeds) {
  
  console.log(breeds)
  
  clearOptions(breedSelect);
  //filter dropdown

  loadBreedDropdown(getBreedNames(breeds));
  console.log('dropdown', breedSelect)

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

function loadBreedDropdown (list){
  list.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item.value;
    opt.textContent = item.textContent;

    breedSelect.appendChild(opt);
  });
}

function loadTemperamentDropdown (list){
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



initialLoad(breedList);

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

breedSelect.addEventListener("change", Carousel.prepareCarousel);

//   async function prepareCarousel(){
//   const selectedBreedId = breedSelect.value;
//   console.log('event')
//   let response = await axios(`images/search?limit=25&breed_ids=${selectedBreedId}`, {onDownloadProgress: updateProgress}); 
//   // let response = await axios(`images/search?limit=25&breed_ids=${selectedBreedId}&api_key=${API_KEY}`); 
//   // let response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=25&breed_ids=beng&api_key=${API_KEY}`);
//   let pictures = await response.data;
//   console.log('pictures', pictures);
//   carouselSetup(pictures)
// }


// async function carouselSetup(pictures, favorite)
//  {
//   Carousel.clear();
  

//   pictures.forEach(picture => {
//       let element = Carousel.createCarouselItem(
//       picture.url,
//       breedSelect.value,
//       picture.id
//       )
//       Carousel.appendCarousel(element);
//   });
  
//   console.log(pictures[0])

//   if (favorite){
//       console.log('favorites');
//       infoDump.innerHTML = `
//       <h2>Favorites</h2>`
//   }else if (pictures[0]) {
//       // const info = pictures[0].breeds || null;
//       // if (info && info[0].description) infoDump.innerHTML = info[0].description;
//       console.log('image exists');
//       infoDump.innerHTML = `
//       <h2>${pictures[0].breeds[0].name}</h2>
//       <p>Description: ${pictures[0].breeds[0].description}</p>
//       <p>Temperament: ${pictures[0].breeds[0].temperament}</p>
//       <p>Origin: ${pictures[0].breeds[0].origin}</p>`;
//   } else {
//       infoDump.innerHTML =
//       "<div class='text-center'>No information on this breed, sorry!</div>";
//   }
  


//     Carousel.start();
// }

//export function createCarouselItem(imgSrc, imgAlt, imgId)
//https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${event.target.value}&api_key=API_KEY

// <!-- Information Section -->
//     <div
//       id="infoDump"
//       class="px-5 py-3 mx-auto"
//       style="max-width: 1600px;"
//     ></div>


/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

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


/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * 
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

export function updateProgress(progressEvent){
  console.log("progress",progressEvent);
  
  progressBar.style.width = progressEvent.progress * 100 + "%";
}


/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */


// const favBtn = clone.querySelector(".favourite-button");
//   favBtn.addEventListener("click", () => {
//     favourite(imgId);
//   });


// export async function favourite(imgId) {
//   // your code here
//   const isFavorite = await axios(`favourites?image_id=${imgId}`);
//   console.log("is favorite",isFavorite)

//   if (isFavorite.data[0]) {
//     console.log("deleted favorite");
//     await axios.delete(`/favourites/${isFavorite.data[0].id}`);
//   } else {
//     console.log("added favorite");
//     await axios.post("favourites", {image_id: imgId});
//   }
// }

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

getFavouritesBtn.addEventListener("click", async () => {
  // getFavourites();
  let list = await Api.getFavourites();
  console.log('favorites list index:',list);
  Carousel.carouselSetup(list, true)
});

// async function getFavourites(){
//   const favourites = await axios(`/favourites`);
//   console.log("step 9", favourites)

//   const list = [];
//   favourites.data.forEach(favorite => {
//     console.log(favorite.image)
//     list.push(favorite.image);
//   });
//   console.log('favorites list:',list);
//   Carousel.carouselSetup(list, true)
// }

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */

speciesSelect.addEventListener('click', ({ target }) => { // handler fires on root container click
  if (target.getAttribute('name') === 'species') { // check if user clicks right element
    let species = target.id;
    console.log('Filter by: ' + species);
    apiSelected = Api.setApi(species);
    initialLoad(breedList);
  }
});

filterSelect.addEventListener('click', (event) => {
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
})

temperamentSelect.addEventListener('change', (event) => {
  if (temperamentSelect.childNodes){
    console.log("change")
  }else{
    console.log("empty")
  }
});

