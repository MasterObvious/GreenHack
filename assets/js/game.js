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
	//Initial state
	stateTime = 5 * 12;
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
	window.setInterval(runGame, 1000);

}

function runGame() {
  if ( stateTime <= 0 && gameRunning ){
		gameRunning = false;
		showGameStats();
	} else if ( gameRunning ){
		stateTime -= 5;

		adjustCO2();
		adjustHappiness()
		generateEmergencies();
		updateInformation();
		if ( stateMoney <= 0 ){
			gameRunning = false;
			loseGame();
		}
    if ( stateCO2 <= 0 ) {
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
  stateCO2 -= delta;
  setCO2(stateCO2);
}
