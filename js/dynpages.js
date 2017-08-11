function goto(uri) {
	window.history.pushState({"uri": window.location.href},"", uri);
	load(uri);
}

function load(uri) {

	params = getParams(uri);
	
	hightlighNavSideBarLink();

	if( "json" in params) {

		var jsonData = json["/" + params['json'] + ".json"];
		//if(params["verify"] === "true")
		//	verifyJSON(jsonData);

		downloadHTML(jsonData["@type"], function(htmlData) {		
			//if(param["verify"] === true)
			//	console.log(htmlData);
			setHTML(htmlData, jsonData);
			linksToOnclick();
		});
	} else {

		if(! ("page" in params) ) {
			params["page"] = "about";
		}

		downloadHTML(params["page"], function(htmlData) {
					
			//if(param["verify"] === true)
			//	console.log(htmlData);
			setHTML(htmlData, null);
			linksToOnclick();
		});
	}
	linksToOnclick();
}

window.onpopstate = function(e){
	if(e.state){
		load(e.state.uri);
	}
};


function hightlighNavSideBarLink() {
	$(".nav-sidebar li").each(function(index, elem) {
		elem = $(elem);
		let link = elem.find("a")[0];
		if(link.href == window.location.href)
			elem.addClass("active");
		else
			elem.removeClass("active");
	});
}

function linksToOnclick() {

	let base = window.location.href.split("?")[0];

	$("a").each(function(index, elem) {

		let parts = elem.href.split("?");
		if( parts.length != 2 && parts[0] != base)
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
		param = elem.split("=");
		params[param[0]] = param[1];
	});
	return params;
}
