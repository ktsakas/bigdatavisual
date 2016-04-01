// This function depends on JQUERY
function ParseIni (path) {
	var obj = {};
	
	var data = $.ajax({
		url: path,
		async: false
	}).responseText;
	
	// Trim lines and remove comments and empty lines
	var lines = data.split('\n').map(function (line) {
		return line.trim();
	}).filter(function (line) {
		return !line.match(/^#.*/) && line != "";
	});

	for (var i in lines) {
		var item = lines[i].split("=");
		var values = item[1].split(",");
		/*console.log(item[0]);
		console.log(values);*/

		obj[item[0]] = 
			(values.length == 1) ? values[0] : values;
	}

	return obj;
}

var IniObj = ParseIni("datasets/titanic.ini");