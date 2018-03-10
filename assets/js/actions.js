
/*
Call this function to research the item with id id
*/
function researchTransport( id ){
	for ( var j = 0; j < jsonData.research.length; j++ ){
		if ( id == jsonData.research[j].id ){
			//Check if we can afford it
			if( jsonData.research[j].price > stateMoney ){
				snackbar("You cannot afford this!");
				return;
			}else {
				stateCurrentResearch.push( jsonData.research[j].id );
				stateMoney -= jsonData.research[j].price;
				//Probably want to update UI here
			}
		}
	}
}

/*
Call this function to add a station of research id rec_id to
the city city_id
*/

function establishConnection(city1, city2, type){
	city1.addConnection(city2, type);
	city2.addConnection(city1, type);
	connectCities(city1, city2, type);
	stateTravelSpeed += jsonData.research[type].price / 100;
}

function buildStation(city, type){
	if (checkIfCityIsValid(city, type)){
		city.addStation(type);
		for (i = 0; i < cityList.length; i++){
			if (city.id != cityList[i].id){
				if ($.inArray(type, cityList[i].stationList) != -1){
					establishConnection(city, cityList[i], type);
				}
			}
		}
	}
}

function destroyStation(city, type){
	let index = 0;
	if ((index = city.stationList.indexOf(type)) > -1){
		city.stationList.splice(index, 1);

		for (i = 0; i < city.connectionList.length; i++){
			if (city.connectionList[i].type == type){
				connection = city.connectionList[i];
				city.connectionList.splice(i, 1);

				let ocl = connection.city.connectionList;

				for (j = 0; j < ocl.length; j++){
					if (ocl[i].city.name == city.name && ocl[i].type == type){
						ocl.splice(i, 1);
					}
				}
				removeConnection(city, connection.city, type);
				removeConnection(connection.city, city, type);
			}
		}
	}
}


function checkIfCityIsValid(city, type){
	var alreadyResearched = false;
	var research_item;
	for ( var i = 0; i < stateCurrentResearch.length; i++ ){
		if (type == stateCurrentResearch[i]){
			alreadyResearched = true;
			research_item = stateCurrentResearch[i];
		}
	}
	if ( alreadyResearched ){
		//Check we haven't built it in the city
		if ( city.stationList.indexOf(type) == -1 ){
			if ( research_item.station_cost > stateMoney ){
				snackbar("You cannot afford this!");
				return false;
			}else {
				stateMoney -= research_item.station_cost;
				//Probably want to update ui here
				return true;
			}
		}else {
			snackbar("You have already built a station in this city for this!");
			return false;
		}
	}else {
		snackbar("You haven't already researched this!");
		return false
	}
}

var PRICE_OF_FERT = 3000;
function buyFertiliser(){
	console.log("buy fert");
	if ( stateMoney > PRICE_OF_FERT ){
		stateForestLevel *= 1.30;
		stateMoney - PRICE_OF_FERT;
		stateCO2 *= 0.85;
		forestSize();
	}else {
		snackbar("You cannot afford this!");
	}
}

function propagandaEffect(happiness, budget) {
	
}
