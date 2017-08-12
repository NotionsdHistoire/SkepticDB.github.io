function filterJSON_medias(json, media_type){
	
	json_filtered = {};

	$.each(json, function(i, elem) {

		medias = elem["medias"];
		if( medias === undefined)
			return;

		medias.forEach(function(media){
			if( media["@type"] == media_type )
				json_filtered[elem["name"]] = media;
		});		
    	});

	return json_filtered;
}

function filterJSON_sites(json) {
	return filterJSON_medias(json, "Media:Site");
}

function filterJSON_twitter(json) {
	return filterJSON_medias(json, "Media:Twitter");
}

function filterJSON_facebook(json) {
	return filterJSON_medias(json, "Media:Facebook");
}

function filterJSON_youtube(json) {
	return filterJSON_medias(json, "Media:Youtube");
}

function sortStrKeys(map) {
	return Object.keys(map).sort(function(a,b){
		return a.localeCompare(b);
	});
}
