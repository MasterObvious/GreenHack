
var stateTime;
var stateMoney;
var stateHappiness;
var stateCO2;

var stateCurrentResearch;

var gameRunning = false;

var backgroundAudio;
var jsonData;

function loadJSON(){
    //$.getJSON('data.json', '', function(data){ jsonData = data; });
}

function initGame() {
	loadJSON();
	
	//Initial state
	stateTime = 5 * 12;
	stateMoney = 5000;
	stateHappiness = 100;
	stateCO2 = 0;
	stateCurrentResearch = [];
	

	backgroundAudio = new Audio( 'assets/sounds/greenland.mp3' );
	backgroundAudio.volume = 0.3;
	//Adding loop
	backgroundAudio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	backgroundAudio.play();

}

function startGame(){
	gameRunning = true;
	
	//We will adjust time, money, happiness, CO2 here
	
	//Call runGame every 3 seconds
	window.setInterval(runGame, 3000);
}

function runGame(){
	if ( stateTime <= 0 && gameRunning ){
		gameRunning = false;
		//End game
	}else {
		stateTime--;
		
	}
}
