const zerothSlide = /* html */ `
  <div id="0" class="container mt-5 row-gap-6 slide">
    <div class="row">
      <a href="/map.html" class="text-white text-decoration-none ml-5 mb-3">
        <i class="bi bi-arrow-left" style="font-size: 2rem"></i>
      </a>
      <a href="/map.html" class="text-decoration-none my-auto"><h3 class="text-white ml-3">Go to Map</h3></a>
    </div>
    <div class="row">
      <h2 class="text-white font-weight-bold text-center">
        Online Jeepney Route and Fare Calculator - Lapaz, Iloilo City
      </h2>
    </div>
    <div class="row mt-3 mx-auto text-center">
      <img class="w-100" src="whole.png" alt="Whole Map" />
    </div>
    <a class="carousel-control-prev" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
`;
const firstSlide = /* html */ `
  <div id='1' class="container mt-5 row-gap-6 slide">
    <div class="row">
      <a href="/map.html" class="text-white text-decoration-none ml-5 mb-3">
        <i class="bi bi-arrow-left" style="font-size: 2rem"></i>
      </a>
      <a href="/map.html" class="text-decoration-none my-auto"><h3 class="text-white ml-3">Go to Map</h3></a>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="display-3 text-white font-weight-bold">Features</div>
      </div>
      <div class="col-md-6 my-5">
        <div class="image">
          <img src="/jeep.png" alt="jeepney" class="w-75" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="text-white">
          <li class="h3">
            A map of the city showing the locations of the start and end
            points for the jeepney route calculation
          </li>
          <li class="h3">
            Markers for the start and end points that can be moved to select
            the desired locations
          </li>
          <li class="h3">A button to calculate the fare for the route</li>
          <li class="h3">
            A toggle to select between regular and special passengers
          </li>
          <li class="h3">
            Option to choose four possible routes showing the forward and
            reverse directions
          </li>
        </ul>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
`;

const secondSlide = /* html */ `
  <div id="2" class="container mt-5 row-gap-6 slide">
    <div class="row">
      <a href="/map.html" class="text-white text-decoration-none ml-5 mb-3">
        <i class="bi bi-arrow-left" style="font-size: 2rem"></i>
      </a>
      <a href="/map.html" class="text-decoration-none my-auto"><h3 class="text-white ml-3">Go to Map</h3></a>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="display-3 text-white font-weight-bold">Markers</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mt-5">
        <h3 class="text-white">
          Most features Of the app are already intuitive but to change the
          start and end destinations, you can drag the markers
        </h3>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-1">
        <img
          src="start-marker.png"
          class="img-fluid"
          alt="Drag the markers to change the start and end destinations"
        />
      </div>
      <div class="col-md-11">
        <h3 class="text-white">
          To change the start and end destinations, you can drag the markers
        </h3>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-1">
        <img
          src="end-marker.png"
          class="img-fluid"
          alt="Drag the markers to change the start and end destinations"
        />
      </div>
      <div class="col-md-11">
        <h3 class="text-white">
          To change the start and end destinations, you can drag the markers
        </h3>
      </div>
    </div>

    <a class="carousel-control-prev" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
`;

const thirdSlide = /* html */ `
  <div id="3" class="container mt-5 row-gap-6 slide">
    <div class="row">
      <a href="/map.html" class="text-white text-decoration-none ml-5 mb-3">
        <i class="bi bi-arrow-left" style="font-size: 2rem"></i>
      </a>
      <a href="/map.html" class="text-decoration-none my-auto"><h3 class="text-white ml-3">Go to Map</h3></a>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="display-3 text-white font-weight-bold">Fare</div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="display-3 text-white font-weight-bold">
          <h2>Calculate the fare for regular and special passengers</h2>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-8">
        <ul class="text-white">
          <li class="h3">Move the start marker to your starting location</li>
          <li class="h3">Move the end marker to your ending location</li>
          <li class="h3">Press the "GO!!!" button to calculate the fare</li>
          <li class="h3">
            Toggle between "Regular" and "Special" if desired
          </li>
          <li class="h3">Toggle for different routes</li>
        </ul>
      </div>
      <div class="col-md-4">
        <img src="peso.png" alt="5 pesos" />
      </div>
    </div>
    <a class="carousel-control-prev" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
`;

const fourthSlide = /* html */ `
  <div id="4" class="container mt-5 row-gap-6 slide">
    <div class="row">
      <a href="/map.html" class="text-white text-decoration-none ml-5 mb-3">
        <i class="bi bi-arrow-left" style="font-size: 2rem"></i>
      </a>
      <a href="/map.html" class="text-decoration-none my-auto"><h3 class="text-white ml-3">Go to Map</h3></a>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="display-3 text-white font-weight-bold">Output</div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="display-3 text-white font-weight-bold">
          <h2>Sample output for calculated fares</h2>
        </div>
      </div>
    </div>
    <div class="row mt-5 mx-auto">
      <div class="col-md-6">
        <div class="row">
          <h2 class="text-white">Regular</h2>
        </div>
        <div class="row">
          <img class="w-75" src="regular.png" alt="Regular" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <h2 class="text-white">Special</h2>
        </div>
        <div class="row">
          <img class="w-75" src="special.png" alt="Special" />
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
`;

function toggle(action) {
	const rightDiv = document.querySelector(".slide");
	const id = parseInt(rightDiv.id);

	let index = 0;
	if (action === "next") {
		index = id + 1;
	} else if (action === "prev") {
		index = id - 1;
	} else {
		index = id;
	}

	if (index >= slides.length) {
		index = 0;
	}

	if (index < 0) {
		index = slides.length - 1;
	}

	body.innerHTML = slides[index];
	body.style.backgroundColor = slidesColor[index];

	const prevButton = document.querySelector(".carousel-control-prev");
	const nextButton = document.querySelector(".carousel-control-next");

	prevButton.addEventListener("click", () => {
		toggle("prev");
	});

	nextButton.addEventListener("click", () => {
		toggle("next");
	});
}

const slides = [zerothSlide, firstSlide, secondSlide, thirdSlide, fourthSlide];
const slidesColor = ["#cb6ce6", "#5ed663", "#fbcd47", "#ff8a65", "#127bcb"];

const body = document.querySelector("body");
body.style.backgroundColor = slidesColor[0];
body.innerHTML = slides[0];

const prevButton = document.querySelector(".carousel-control-prev");
const nextButton = document.querySelector(".carousel-control-next");

prevButton.addEventListener("click", () => {
	toggle("prev");
});

nextButton.addEventListener("click", () => {
	toggle("next");
});
