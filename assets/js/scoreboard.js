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
	var size = stateForestLevel / 8;
	$("#forest_land_container").height( size );
	$("#forest_land_container").width( size );
}

function updateUI() {
  setTime(stateTime);
  setCO2(stateCO2);
  setHappiness(stateHappiness);
  setBudget(stateMoney);
  forestSize();
}
