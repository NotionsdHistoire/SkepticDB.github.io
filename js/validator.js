var ajv = new Ajv();

function validate_str(str) {
	return __validate(JSON.parse(obj));
}

function validate_obj(obj) {
	return __validate(obj);
}


function __validate(obj) {

	schemaURI = obj["@context"] + obj["@type"] + ".json";
	var valid = ajv.validate(schemaURI, obj);
	if (!valid)
		return ajv.errors;
	return true;
}

function preload_schemas(avj, context, types) {

	types.forEach( function(type) {
		url = context + type + ".json";

		$.ajax({
			url: url,
			async: false,
			success: function(schema) {
				console.log("Schema : " + url);
				avj.addSchema(schema, url);
			}
		});
	});
}

context = "https://skepticdb.github.io/json-schema/";
types = ["entity", "member", "organization", "person"];
preload_schemas(ajv,context, types);
