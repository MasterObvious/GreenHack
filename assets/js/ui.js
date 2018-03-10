var transportColours = ["rgb(255,0,0)", "rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,255,255)",
												"rgb(0,0,255)", "rgb(255,0,255)", "rgb(255,255,255)"];


function snackbar( title ){
	var x = document.getElementById("snackbar")
	x.className = "show";
	x.innerHTML = title;
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function setIslandScale(percentage){
	$('#snow_land').animate({
		height: percentage + '%',
		width: percentage + '%'
	}, 600, function(){})
}

function placeCity(cityName, x, y){
	let $city = $("#city-template").clone();
	$city.removeClass("displaynone");
	$city.css("left", x + "%");
	$city.css("top", y + "%");
	$city.prependTo("#map_container");
	$city.attr("id", cityName);
	$city.click(function() {
		openTransport(cityName);
	})
}

function updateResearch() {
	$('#research-list').empty();
	jsonData.research.reverse().forEach(function(el) {
		if (!stateCurrentResearch.includes(el.id)) {
			let $researchBlock = $("#research-template").clone();
			$researchBlock.removeClass('displaynone');
			$researchBlock.prependTo('#research-list');
			$researchBlock.find('.research-id').html(el.id);
			$researchBlock.find('.research-name').html(el.name);
			$researchBlock.find('.research-price').html(el.price);
			$researchBlock.find('.research-station-cost').html(el.station_cost);
			$researchBlock.find('.research-pollution').html(el.pollution);
		}
	})
	jsonData.research.reverse();

	$('.research-button').click(function() {
		let tempId = parseInt($(this).parent().parent().find('.research-id').text());
		researchTransport(tempId);
		updateResearch();
	})

}

function closeResearch() {
	$('#research_container').addClass('displaynone');
}

function openResearch() {
	updateResearch();
	$('#research_container').removeClass('displaynone');
}

function updateProp() {
	$('#prop-list').empty();
	
	var item = jsonData.propaganda[Math.floor(Math.random()*jsonData.propaganda.length)];
	$('#prop-text').html( "\"" + item.title.toUpperCase() + "\"" );
	
	const pricey = 500 * parseInt( Math.random() * 50 );
	
	for ( var i = 1; i <= 5; i++ ){
		var newPrice = i * pricey;
		
		let $researchBlock = $("#prop-template").clone();
		$researchBlock.removeClass('displaynone');
		$researchBlock.prependTo('#prop-list');
		$researchBlock.find('.prop-id').html(newPrice);
		$researchBlock.find('.prop-name').html("Spend £" + newPrice);
		$researchBlock.find('.prop-price').html(newPrice);
	}

	$('.prop-button').click(function() {
		let tempId = parseInt($(this).parent().parent().find('.prop-id').text());
		if ( tempId > stateMoney ){
			propagandaEffect( item.effect[0], item.effect[1], Math.random() );
			updateUI();
		}else {
			snackbar("You cannot afford!");
		}
		closeProp();
	});
}

function updateTransport(cityID) {
	$('#transport-list').empty();
	jsonData.research.reverse().forEach(function(el) {
		if (!cityList[cityID-1].stationList.includes(el.id)) {
			let $transportBlock = $("#transport-template").clone();
			$transportBlock.removeClass('displaynone');
			$transportBlock.prependTo('#transport-list');
			$transportBlock.find('.transport-id').html(el.id);
			$transportBlock.find('.transport-name').html(el.name);
			$transportBlock.find('.transport-station-cost').html(el.station_cost);
			$transportBlock.find('.transport-pollution').html(el.pollution);
			$transportBlock.find('.transport-button').removeClass('delete-button');
			$transportBlock.find('.transport-button').addClass('ok-button');
			$transportBlock.find('.transport-button').find('.text').html('Build');
		}else{
			let $transportBlock = $("#transport-template").clone();
			$transportBlock.removeClass('displaynone');
			$transportBlock.prependTo('#transport-list');
			$transportBlock.find('.transport-id').html(el.id);
			$transportBlock.find('.transport-name').html(el.name);
			$transportBlock.find('.transport-station-cost').html(el.station_cost);
			$transportBlock.find('.transport-pollution').html(el.pollution);
			$transportBlock.find('.transport-button').removeClass('ok-button');
			$transportBlock.find('.transport-button').addClass('delete-button');
			$transportBlock.find('.transport-button').find('.text').html('Destroy');
		}
	})
	jsonData.research.reverse();

	$('.transport-button').click(function() {
		let tempId = parseInt($(this).parent().parent().find('.transport-id').text());
		if ($(this).parent().parent().find('.transport-button').find('.text').html() == "Build"){
			buildStation(cityList[cityID-1], tempId);
			console.log("Building station at " + cityID);
			updateTransport(cityID);
			updateUI();
		}else{
			console.log("This is wokring here");
			destroyStation(cityList[cityID-1], tempId);
			updateTransport(cityID);
			updateUI();
		}

	});

}
function closeProp() {
	$('#prop_container').addClass('displaynone');
}

function openProp() {
	updateProp();
	$('#prop_container').removeClass('displaynone');
}

function closeTransport() {
	$('#transport_container').addClass('displaynone');
}

function openTransport(cityID) {
	updateTransport(cityID);
	$('#transport_container').removeClass('displaynone');
}

function connectCities(city1, city2, transportTypeId){
	let xconnection = (Math.abs(city1.x - city2.x) > Math.abs(city1.y - city2.y));
	let offset = 4;
	let x1 = city1.x + offset;
	let x2 = city2.x + offset;
	let y1 = city1.y + offset;
	let y2 = city2.y + offset;

	offset = transportTypeId -4;
	let scale = 0.5;
	if (xconnection){
		y1 += scale *offset;
		y2 += scale * offset;
	}else{
		x1 += scale * offset;
		x2 += scale * offset;
	}

	let inner = "<line x1=\"" + x1 + "%\" y1=\"" + y1 + "%\" x2=\"" + x2 + "%\" y2=\"" + y2 + "%\" style=\"stroke:" + transportColours[transportTypeId - 1] + ";stroke-width:2\" />";
	let svg = document.getElementById("road_map");
	svg.innerHTML+= inner;
}

function removeConnection(city1, city2, transportTypeId){
	let xconnection = (Math.abs(city1.x - city2.x) > Math.abs(city1.y - city2.y));
	let offset = 4;
	let x1 = city1.x + offset;
	let x2 = city2.x + offset;
	let y1 = city1.y + offset;
	let y2 = city2.y + offset;

	offset = transportTypeId -4;
	let scale = 0.5;
	if (xconnection){
		y1 += scale *offset;
		y2 += scale * offset;
	}else{
		x1 += scale * offset;
		x2 += scale * offset;
	}

	let inner = "<line x1=\"" + x1 + "%\" y1=\"" + y1 + "%\" x2=\"" + x2 + "%\" y2=\"" + y2 + "%\" style=\"stroke:" + transportColours[transportTypeId - 1] + ";stroke-width:2\"></line>";
	let full = document.getElementById("road_map").innerHTML;
	let res = full.replace(inner, "");
	document.getElementById("road_map").innerHTML = res;
}

function pxToPer(px){
	var screenWidth = window.screen.width;
	return 100 * (1 - ((screenWidth - px) / screenWidth));
}
