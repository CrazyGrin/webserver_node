//获取http模块
var http = require("http");
//文件模块
var fs = require('fs');
//获取mime模块
var mime = require("mime");
//主页路由模块,file文件夹里的index.js文件
var index = require('./file/index');
//错误处理文件路径
var error = "./file/error404.html";
//春晓页面路径
var cx = "./file/cunxiao.html";

//函数Response，将HTML、css、js等文件响应给客户端
var Response = function(res, filePath) {
	//读取文件，读取完成后给客户端响应
	fs.readFile(filePath, function(err, data) {
		if (err) { //如果失败，就返回错误文件
			if (filePath != error) { //如果失败的不是错误文件，才返回错误文件
				Response(res, error);
			}
		} else {
			res.writeHead(200, { //响应客户端，将文件内容发回去
				'Content-type': mime.lookup(filePath)
			}); //通过后缀名指定mime类型
			res.end(data);
		}
	});
};
//404错误响应文件
var error404 = function(res) {
	Response(res, error);
};

//创建HTTP服务器
var server = http.createServer(function(req, res) {

	//判断URL，提供不同的路由
	if (req.url == '/index' || req.url == '/') { //主页
		index.index(res);
	} else {
		Response(res, "./file" + req.url);
	}
});

//启动服务器
server.listen('3001', function() {
	console.log("服务器启动");
});