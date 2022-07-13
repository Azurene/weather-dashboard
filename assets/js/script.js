var weatherContainerEl = document.querySelector("#weather-container");

var cityNameButtonEl = document.querySelector("#city-buttons");

var buttonClickHandler = function(event) {
  // get the city attribute from the clicked element
  var location = event.target.getAttribute("city-selection");

  // clear old content
  weatherContainerEl.textContent = "";

  switch(location) {
    case "Los-Angeles":
      getCityWeather("Los+Angeles");
      break;
    case "Chicago":
      getCityWeather("Chicago");
      break;
    case "New-York":
      getCityWeather("New+York");
      break;
    case "Austin":
      getCityWeather("Austin");
      break;
    case "Atlanta":
      getCityWeather("Atlanta");
      break;
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

  var city = data.name;
  var condition = "Current Condition: " + data.weather[0].main;
  var temp = "Temperature: " + data.main.temp + " °F";
  var wind = "Wind: " + data.wind.speed + " mph";
  var humidity = "Humidity: " + data.main.humidity + "%";


  var weatherData = [
    condition,
    temp,
    wind,
    humidity
  ];

  var titleEl = document.createElement("h2");
  titleEl.textContent = city;

  weatherContainerEl.appendChild(titleEl);
  for (var i = 0; i < weatherData.length; i++) {

    console.log(weatherData[i])
    var weatherEl = document.createElement("div");
    weatherEl.classList = "flex-row justify-space-between align-center";
    weatherEl.textContent = weatherData[i];

    weatherContainerEl.appendChild(weatherEl);
  }
}

cityNameButtonEl.addEventListener("click", buttonClickHandler);