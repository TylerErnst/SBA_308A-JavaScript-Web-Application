// import * as bootstrap from "bootstrap";
// import * as bootstrap from "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
import { favourite } from "./api.js";
import { updateProgress } from "./index.js";

export function createCarouselItem(imgSrc, imgAlt, imgId) {
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  const favBtn = clone.querySelector(".favourite-button");
  favBtn.addEventListener("click", () => {
    favourite(imgId);
  });

  return clone;
}

export function clear() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}

export function appendCarousel(element) {
  const carousel = document.querySelector("#carouselInner");

  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) element.classList.add("active");

  carousel.appendChild(element);
}

export function start() {
  const multipleCardCarousel = document.querySelector(
    "#carouselExampleControls"
  );
  if (window.matchMedia("(min-width: 768px)").matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false
    });
    const carouselWidth = $(".carousel-inner")[0].scrollWidth;
    const cardWidth = $(".carousel-item").width();
    let scrollPosition = 0;
    $("#carouselExampleControls .carousel-control-next").unbind();
    $("#carouselExampleControls .carousel-control-next").on(
      "click",
      function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
    $("#carouselExampleControls .carousel-control-prev").unbind();
    $("#carouselExampleControls .carousel-control-prev").on(
      "click",
      function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}


export async function prepareCarousel(){
  const selectedBreedId = breedSelect.value;
  console.log('event')
  let response = await axios(`images/search?limit=25&breed_ids=${selectedBreedId}`, {onDownloadProgress: updateProgress}); 
  // let response = await axios(`images/search?limit=25&breed_ids=${selectedBreedId}&api_key=${API_KEY}`); 
  // let response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=25&breed_ids=beng&api_key=${API_KEY}`);
  let pictures = await response.data;
  console.log('pictures', pictures);
  carouselSetup(pictures)
}

export async function carouselSetup(pictures, favorite)
 {
  clear();
  

  pictures.forEach(picture => {
      let element = createCarouselItem(
      picture.url,
      breedSelect.value,
      picture.id
      )
      appendCarousel(element);
  });
  
  console.log(pictures[0])

  if (favorite){
      console.log('favorites');
      infoDump.innerHTML = `
      <h2>Favorites</h2>`
  }else if (pictures[0]) {
      // const info = pictures[0].breeds || null;
      // if (info && info[0].description) infoDump.innerHTML = info[0].description;
      console.log('image exists');
      infoDump.innerHTML = `
      <h2>${pictures[0].breeds[0].name}</h2>
      <p>Description: ${pictures[0].breeds[0].description}</p>
      <p>Temperament: ${pictures[0].breeds[0].temperament}</p>
      <p>Origin: ${pictures[0].breeds[0].origin}</p>`;
  } else {
      infoDump.innerHTML =
      "<div class='text-center'>No information on this breed, sorry!</div>";
  }
  


    start();
}