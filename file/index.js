exports.index = function(res) {
	res.writeHead(200, {
		'Content-type': "text/html"
	});
	res.write('Hello World');
	res.end();
};