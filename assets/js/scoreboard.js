

var currentTime, currentCO2, currentHappiness, currentBudget;
var setTime, setCO2, setHappiness, setBudget;

currentTime = 0;
currentCO2 = 0;
currentHappiness = 50;
currentBudget = 10000;

setTime = function(value) {
  currentTime = value;
  $('#time-value').html(currentTime + '');
}

setCO2 = function(value) {
  currentCO2 = value;
  $('#co2-value').html(currentCO2 + '');
}

setHappiness = function(value) {
  currentHappiness = value;
  $('#happiness-value').html(currentHappiness + '');
}

setBudget = function(value) {
  currentBudget = value;
  $('#budget-value').html(currentBudget + '');
}
