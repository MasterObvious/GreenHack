var setTime, setCO2, setHappiness, setBudget;

setTime = function(value) {
  $('#time-value').html(value + '');
}

setCO2 = function(value) {
  $('#co2-value').html(value + '');
}

setHappiness = function(value) {
  $('#happiness-value').html(value + '');
}

setBudget = function(value) {
  $('#budget-value').html(value + '');
}

function forestSize(){
	var size = Math.max( stateForestLevel, 280 ) / 6;
	$("#forest_land_container").height( 20 + size );
	$("#forest_land_container").width( 20 + size );
}

function updateUI() {
  setTime(stateTime);
  setCO2(stateCO2);
  setHappiness(stateHappiness);
  setBudget(stateMoney);
  forestSize();
}
