var stateTime;
var stateMoney;
var stateHappiness;
var stateCO2;

var stateForestLevel;
var statePollutionLevel;
var stateTravelSpeed;

var stateCurrentResearch;

/*
 maps to an array (of cities)
 which contains an array which has all of the station ids
*/
var stateMapStations;

var gameRunning = false;
var backgroundAudio;

var jsonData;

var cityList = [];

class City{
	constructor(id, x, y){
		this.id = id;
		this.x = x;
		this.y = y;
		this.connectionList = [];
		this.stationList = [];
	}

	addConnection(city, type){
		this.connectionList.push(new Connection(city, type));
	}

	addStation(type){
		this.stationList.push(type);
	}
}

class Connection{
	constructor(city, type){
		this.city = city;
		this.type = type;
	}
}





function loadJSON(){
	$.getJSON('assets/js/data.json', '', function(data){jsonData=data; initGame()});
}

function initGame() {
	console.log("loading json");
	console.log(jsonData)
	loadCities();
	//Initial state
	stateTime = 0;
	stateMoney = 5000;
	stateHappiness = 50;
	stateCO2 = 0;
  statePollutionLevel = 0;
  stateForestLevel = 1;
  stateTravelSpeed = 0;
	stateCurrentResearch = [];
	stateMapStations = [];

  updateUI();

	var cars = jsonData.research[0];
	stateCurrentResearch.push( cars.id );

	var city1 = [ cars.id ];
	stateMapStations.push( city1 );

	var city2 = [ cars.id ];
	stateMapStations.push( city2 );

	var city3 = [ cars.id ];
	stateMapStations.push( city3 );

	backgroundAudio = new Audio( 'assets/sounds/greenland.mp3' );
	backgroundAudio.volume = 0.3;
	//Adding loop
	backgroundAudio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	backgroundAudio.play();

  gameRunning = true;
}
stateCO2
function runGame() {
  if ( gameRunning ){
		stateTime += 1;

		adjustCO2();
		adjustHappiness();
    adjustMoney();
    setIslandScale(100-stateCO2);
    updateUI();
		if ( stateCO2 >= 100 ) {
      gameRunning = false;
      loseGame();
    }
    if (stateHappiness <= 0) {
      gameRunning = false;
      loseGame();
    }
	}
}

function loseGame() {
  $('#game-over').removeClass('displaynone');
}

$('#next_month').click(function() {
  runGame();
})

function adjustCO2() {
  let numberMultiplier = (Math.random() + 1.5)/2; // [0.75,1.25]
  let correction = 0.025;
  let change = statePollutionLevel - stateForestLevel;
  let delta = Math.round(change * correction * numberMultiplier);
  stateCO2 = Math.max(stateCO2 + delta, 0);
  stateForestLevel = Math.min(Math.max(stateForestLevel - stateCO2, 0), 100)
  updateUI();
}

function loadCities(){
	var cities = jsonData.cities;
	console.log("got here");
	let l = cities.length;

	for (i = 0; i < l; i++){
		placeCity(cities[i].id, cities[i].x, cities[i].y);
		const city = new City(cities[i].id, cities[i].x, cities[i].y)
		cityList.push(city);
	}
}

function adjustHappiness() {
  let numberMultiplier = (Math.random() + 1.5)/2; // [0.75,1.25]
  let correction = 0.1;
  let change = (stateTime - stateTravelSpeed)*(100-stateHappiness);
  let delta = Math.round(change * correction * numberMultiplier);
  stateHappiness = Math.min(stateHappiness - delta, 100);
  updateUI();
}

function adjustMoney() {
  let numberMultiplier = (Math.random() + 1.5)/2; // [0.75,1.25]
  let change = 100*stateTime - stateCO2;
  let correction = 10;
  let delta = Math.round(change * numberMultiplier * correction);
  stateMoney += delta;
  updateUI();
}
