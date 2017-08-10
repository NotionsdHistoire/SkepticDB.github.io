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

function getParams() {
	let params = {"p": "index"};
	let str_params = window.location.search.substr(1);
	params["uri"] = window.location.href;
	str_params = str_params.split("&");

	str_params.forEach( function(elem){
		param = elem.split("=");
		params[param[0]] = param[1];
	});
	return params;
}
