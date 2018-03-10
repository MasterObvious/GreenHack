
/*
Call this function to research the item with id id
*/
function researchTransport( id ){
	var alreadyResearched = false;
	for ( var i = 0; i < stateCurrentResearch.length; i++ ){
		if ( id == stateCurrentResearch[i].id ){
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
				stateCurrentResearch.push( jsonData.research[j] );
			}
		}
	}
	
}