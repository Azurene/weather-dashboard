// var citySearchEl = document.querySelector("#city-search"); // search form
// var cityInputEl = document.querySelector("#city");
// var cityButtonEl = document.querySelector("#city-submit");
var weatherContainerEl = document.querySelector("#weather-container");

var cityNameButtonEl = document.querySelector("#city-buttons");


// var formSubmitHandler = function(event) {
//   // prevent the page from refreshing
//   event.preventDefault();
//   // console.log("form submitted");

//   // get value from input element
//   var city = cityInputEl.value.trim();

//   if (city) {
//     getCityWeather(city);

//     // clear old content 

//   } else {
//     alert("Please enter a city name");
//   }
// };

var buttonClickHandler = function(event) {
  // get the city attribute from the clicked element
  var location = event.target.getAttribute("city-selection");

  if (location === "Los-Angeles") {
    var name = "Los+Angeles"
    getCityWeather(name);
  }
}

var getCityWeather = function(cityName) {
  // format the api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ec39df8fd5fba25114b192e6c36248c0";


  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          displayWeather(data)
          console.log(data);
        });
      } else {
        alert('Error: city not found');
      }
    })
    .catch(function(error) {
      alert("Unable to connect to One Weather Map");
    });
};

var displayWeather = function(data) {
  // check if api has weather
  if (data.length === 0) {
    weatherContainerEl.textContent = "No weather found.";
    return;
  }

  var condition = data.weather[0].main;
  var temp = data.main.temp;
  var wind = data.wind.speed;
  var humidity = data.main.humidity;

  

  console.log(condition);
  console.log(temp);
}

// cityButtonEl.addEventListener("click", formSubmitHandler);
cityNameButtonEl.addEventListener("click", buttonClickHandler);