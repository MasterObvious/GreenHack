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
	var size = stateForestLevel / 6;
	$("#forest_land_container").height( 20 + size );
	$("#forest_land_container").width( 20 + size );
}

function updateUI() {
  setTime(Math.round(stateTime));
  setCO2(Math.round(stateCO2));
  setHappiness(Math.round(stateHappiness));
  setBudget(Math.round(stateMoney));
  forestSize();
}
