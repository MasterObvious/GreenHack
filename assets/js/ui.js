
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
	let $city = $(".city_container").clone();
	$city.removeClass("displaynone");
	$city.css("left", x + "%");
	$city.css("top", y + "%");
	$city.prependTo("#map_container");
	$city.attr("id", cityName);
}

function updateResearch() {
	$('#research-list').empty();
	jsonData.research.reverse().forEach(function(el) {
		if (!(el in stateCurrentResearch)) {
			let $researchBlock = $("#research-template").clone();
			$researchBlock.removeClass('displaynone');
			$researchBlock.prependTo('#research-list');
			$researchBlock.find('.research-name').html(el.name);
			$researchBlock.find('.research-price').html(el.price);
			$researchBlock.find('.research-station-cost').html(el.station_cost);
			$researchBlock.find('.research-pollution').html(el.pollution);
		}
	})
}

function closeResearch() {
	$('#research_container').addClass('displaynone');
}

function openResearch() {
	updateResearch();
	$('#research_container').removeClass('displaynone');
}
