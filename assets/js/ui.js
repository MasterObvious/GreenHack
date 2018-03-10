
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
	$city.css("top", x + "%");
	$city.css("left", y + "%");
	$city.prependTo("#map_container");
	$city.attr("id", cityName);
}
