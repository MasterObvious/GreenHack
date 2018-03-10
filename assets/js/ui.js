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
	jsonData.propaganda.reverse().forEach(function(el) {
		let $researchBlock = $("#prop-template").clone();
		$researchBlock.removeClass('displaynone');
		$researchBlock.prependTo('#prop-list');
		$researchBlock.find('.prop-id').html(el.id);
		$researchBlock.find('.prop-name').html(el.title);
		$researchBlock.find('.prop-price').html(el.price);
	});
	jsonData.propaganda.reverse();

	$('.prop-button').click(function() {
		let tempId = parseInt($(this).parent().parent().find('.prop-id').text());
		researchTransport(tempId);
		updateResearch();
	})

}

function closeProp() {
	$('#prop_container').addClass('displaynone');
}

function openProp() {
	updateProp();
	$('#prop_container').removeClass('displaynone');
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
