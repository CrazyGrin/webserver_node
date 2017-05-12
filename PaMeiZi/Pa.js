    //依赖模块
    let fs = require('fs');
    let request = require("request");
    let cheerio = require("cheerio"); //服务端JQuery?

    let url = 'http://www.wallpaperbetter.com/nature-and-landscape-wallpaper';

    let dir = './images';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    //发送请求
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);

            let $ = cheerio.load(body); //获取HTML

            $('li img').each(function() {
                let src = $(this).attr('src');
                console.log(src);
                let title = $(this).attr('alt');

                src = src.replace(/-thumb/, ""); //高清原图链接

                console.log('Download From:' + src);
                download(src, dir, title + src.substr(-4, 4));
            });
        }
    });

    //下载方法
    let download = (url, dir, filename) => {
        request.head(url, function(err, res, body) {
            request(url).pipe(fs.createWriteStream(dir + "/" + filename));
        });
    };