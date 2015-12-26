var fs = require('fs'),
	path = require('path');

function walk(currentDirPath, callback) {

	fs.readdirSync(currentDirPath).forEach(function(name) {
		var filePath = path.join(currentDirPath, name);
		var stat = fs.statSync(filePath);
		if (stat.isFile()) {
			callback(filePath, stat);
		}
		else if (stat.isDirectory()) {
			walk(filePath, callback);
		}
	});
}

var data = [];

walk('D:\\Accounting (1)\\Accounting\\WebApplication1\\Application\\resources\\images\\16', function(filePath, stat) {
	data.push('\'' + filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.lastIndexOf('.')) + '\'');
});

var bc = [];

walk('D:\\Accounting (1)\\Accounting\\WebApplication1\\Application\\resources\\images\\32', function(filePath, stat) {
	bc.push('\'' + filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.lastIndexOf('.')) + '\'');
});


var str = "$icon-16-collections : (" + data + ");\n";
str += "$icon-32-collections : (" + bc + ");\n";

fs.writeFile('E:\\icons.txt', str);