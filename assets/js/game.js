var stateTime;
var stateMoney;
var stateHappiness;
var stateCO2;

var stateForestLevel;
var statePollutionLevel;

var stateCurrentResearch;

/*
 maps to an array (of cities)
 which contains an array which has all of the station ids
*/
var stateMapStations;

var gameRunning = false;
var backgroundAudio;

var jsonData;
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
	stateHappiness = 100;
	stateCO2 = 0;
	stateCurrentResearch = [];
	stateMapStations = [];

	var cars = jsonData.research[0];
	stateCurrentResearch.push( cars );

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

function runGame() {
  if ( stateTime <= 0 && gameRunning ){
		gameRunning = false;
		showGameStats();
	} else if ( gameRunning ){
		stateTime -= 1;

		adjustCO2();
		adjustHappiness();
    adjustMoney();
    setIslandScale(100-stateCO2);
		generateEmergencies();
		updateInformation();
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

function adjustCO2() {
  let numberMultiplier = (Math.random() + 1.5)/2; // [0.75,1.25]
  let correction = 0.1;
  let change = statePollutionLevel - stateForestLevel;
  let delta = Math.round(change * correction * numberMultiplier);
  stateCO2 = Math.max(stateCO2 + delta, 0);
  setCO2(stateCO2);
}

function loadCities(){
	var cities = jsonData.cities;
	console.log("got here");
	let l = cities.length;

	for (i = 0; i < l; i++){
		placeCity(cities[i].id, cities[i].x, cities[i].y);
	}
function adjustHappiness() {
  let numberMultiplier = (Math.random() + 1.5)/2; // [0.75,1.25]
  let correction = 0.1;
  let change = stateTime - stateTravelSpeed;
  let delta = Math.round(change * correction * numberMultiplier);
  stateHappiness = Math.min(stateHappiness + delta, 100);
  setHappiness(stateHappiness);
}

function adjustMoney() {
  let numberMultiplier = (Math.random() + 1.5)/2; // [0.75,1.25]
  let change = 10*stateTime - stateCO2;
  let delta = Math.round(change * numberMultiplier);
  stateMoney += delta;
  setMoney(stateMoney);
}
