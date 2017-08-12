function goto(uri) {

	window.history.pushState({"uri": uri},"", uri);
	load(uri);
}

function load(uri) {

	$("#suggestions").toggle(false);

	let params = getParams(uri);
	
	hightlighNavSideBarLink();

	let htmlPage = "about";
	if("page" in params)
		htmlPage = params["page"];

	let jsonData = null;
	if( "json" in params) {

		jsonData = json["/" + params['json'] + ".json"];
		//if(params["verify"] === "true")
		//	verifyJSON(jsonData);

		htmlPage = jsonData["@type"].toLowerCase();
	}

	htmlData = html["/" + htmlPage + ".html"];
	setHTML(htmlData, jsonData);
	linksToOnclick();
}

window.onpopstate = function(e){
	if(e.state){
		console.log(e.state.uri);
		load(e.state.uri);
	}
};


function hightlighNavSideBarLink() {
	$(".nav-sidebar li").each(function(index, elem) {
		elem = $(elem);
		let link = elem.find("a")[0];

		currentURL = window.location.href.split("&")[0];
		linkURL = link.href.split("&")[0];
		

		if(linkURL == currentURL || linkURL == currentURL + "?")
			elem.addClass("active");
		else
			elem.removeClass("active");
	});
}

function linksToOnclick() {

	let base = window.location.href.split("?")[0];

	$("a").each(function(index, elem) {

		let parts = elem.href.split("?");

		if(parts[0] != base) {
			elem.target="_blank";
			return;
		}
		if( parts.length != 2)
			return;

		let uri = "?" + parts[1];
		elem.onclick = function(){
			goto(uri);
			return false;
		};
	});
}


function verifyJSON(jsonData) {
	console.log(jsonData);
	console.log("JSON verification :");	
	let result = validate_obj(jsonData)
	console.log(result);
}

function setHTML(htmlData, jsonData){
	$("#content").html(htmlData);
	init(jsonData);

	$("v").each(function(id, elem){
		elem = $(elem);
		elem.html( jsonData[elem.html()] );
		
	});
}

function downloadHTML(name, callback) {
	$.get(htmlURI(name), callback);
}

function downloadJSON(name, callback) {
	$.get(jsonURI(name), callback);
}

function htmlURI(name){
	return "html/" + name.toLowerCase() + ".html";
}

function jsonURI(name) {
	return "json/" + name + ".json";
}

function getParams(uri) {
	let params = {};
	let str_params = uri.substr(1);
	params["uri"] = uri;
	str_params = str_params.split("&");

	str_params.forEach( function(elem){
		if(! elem)
			return;
		param = elem.split("=");
		params[param[0]] = param[1];
	});

	if( "search" in params )
		params["page"] = "search";

	return params;
}
