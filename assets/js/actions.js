
/*
Call this function to research the item with id id
*/
function researchTransport( id ){
	for ( var i = 0; i < stateCurrentResearch.length; i++ ){
		if ( id == stateCurrentResearch[i] ){
			snackbar("You have already researched this!");
			return;
		}
	}

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
function buildStation( rec_id, city_id ){
	//Check we've researched it
	var alreadyResearched = false;
	var research_item;
	for ( var i = 0; i < stateCurrentResearch.length; i++ ){
		if ( id == stateCurrentResearch[i].id ){
			alreadyResearched = true;
			research_item = stateCurrentResearch[i];
		}
	}
	if ( alreadyResearched ){
		//Check we haven't built it in the city
		var city_stations = stateMapStations[city_id];
		if ( city_stations.indexOf( city_id ) != -1 ){
			if ( research_item.station_cost > stateMoney ){
				snackbar("You cannot afford this!");
			}else {
				stateMapStations.push( research_item );
				stateMoney -= research_item.station_cost;
				//Probably want to update ui here
			}
		}else {
			snackbar("You have already built a station in this city for this!");
		}
	}else {
		snackbar("You haven't already researched this!");
	}
}

var PRICE_OF_FERT = 3000;
function buyFertiliser(){
	if ( stateMoney > PRICE_OF_FERT ){
		stateForestLevel *= 1.12;
		stateMoney - PRICE_OF_FERT;
		stateCO2 *= 0.85;
	}else {
		snackbar("You cannot afford this!");
	}
}
