var http = require("http");
var https = require("https");  
var fs = require("fs");
var cheerio = require("cheerio");
var iconv = require("iconv-lite");
var url = "https://www.xxbiquge.com/0_637/";

https.get(url, function (res) {  //资源请求
    var chunks = [];
    var length = 0;  
    res.on("data", function (chunk) {
        chunks.push(chunk);
        length += chunk.length;  
    });
    res.on("end", function () {
        var data = Buffer.concat(chunks, length);
        // var change_data = iconv.decode(data, "gb2312");
        console.log(data.toString());  
        // var html = iconv.decode(Buffer.concat(chunks), "gb2312") //转码操作
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        var content = $("#list");
        var links = [];
        $("dl").children("dd").each(function (i, elem) {
            var link = new Object();
            console.log($(this).children("a").text());
            link.title = $(this).text();
            link.link = "https://www.xxbiquge.com" + $(this).children("a").attr("href"); //补齐 URL 信息
            if (i >= 0) {
                links.push(link);
            }
        });
        fs.writeFile("list.json", JSON.stringify(links), function (err) {
            if (!err) {
                console.log("写文件成功");
            }
        });
    }).on("error", function () {
        console.log("网页访问出错");
    });
});