let API_KEY;
export function setApi (api){
  if (api == 'cat'){
    console.log('API setting:', api);
    API_KEY = "live_emZXn4x5IT3vE3DxfEyB4RmT3Uy3y4sd1E4KSnYlw8Iy92u84oOBax51uLXgasOV";
    axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
    axios.defaults.headers.common["x-api-key"] = API_KEY;
    return 'cat';
  }else{
    console.log('API setting:', api);
    API_KEY = "live_7O7rwERaaoi9qf9CLXmxrM9TVb3C7HNw99NUlaaIBCvMdpoDRMBbQIspORBLMupw";
    axios.defaults.baseURL = "https://api.thedogapi.com/v1/";
    axios.defaults.headers.common["x-api-key"] = API_KEY;
    return 'dog'
  }
}

export async function getBreeds() {
  let response = await axios('breeds/' ) 
  let breeds = await response.data;
  return breeds;
}

export async function getImages(selectedBreedId){
  let response = await axios(`images/search?limit=25&breed_ids=${selectedBreedId}`, {onDownloadProgress: updateProgress}); 
  let pictures = await response.data;
  return pictures;
}

export async function favourite(imgId) {
  // your code here
  const isFavorite = await axios(`favourites?image_id=${imgId}`);
  console.log("is favorite",isFavorite)

  if (isFavorite.data[0]) {
    console.log("deleted favorite");
    await axios.delete(`/favourites/${isFavorite.data[0].id}`);
  } else {
    console.log("added favorite");
    await axios.post("favourites", {image_id: imgId});
  }
}

export async function getFavourites(){
  const favourites = await axios(`/favourites`);
  console.log("step 9", favourites)

  const list = [];
  favourites.data.forEach(favorite => {
    console.log(favorite.image)
    list.push(favorite.image);
  });
  console.log('favorites list api:',list);
  // Carousel.carouselSetup(list, true)
  return list;
}





// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   console.log("Request Started.");
//   progressBar.style.width = '0%';
//   config.metadata = { startTime: new Date()}
//   document.body.style.cursor = "progress";
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   response.config.metadata.endTime = new Date();
//   response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
//   console.log(`Request took ${response.duration} milliseconds.`)
//   document.body.style.cursor = "default";
//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   error.config.metadata.endTime = new Date();
//   error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
//   console.log(`Request took ${error.duration} milliseconds.`)
//   document.body.style.cursor = "default";
//   return Promise.reject(error);
// });