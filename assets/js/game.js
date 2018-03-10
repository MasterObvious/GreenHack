var stateTime;
var stateMoney;
var stateHappiness;
var stateCO2;

var stateCurrentResearch;

/*
 maps to an array (of cities)
 which contains an array which has all of the station ids
*/
var stateMapStations;

var gameRunning = false;
var backgroundAudio;


function initGame() {
	placeCity("harri", 50, 50);
	loadJSON();

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

}
