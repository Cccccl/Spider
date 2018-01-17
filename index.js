const http = require ("http");
const https = require("https");  
const fs = require("fs");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const request = require("sync-request");
const urlList = JSON.parse(fs.readFileSync("list.json","utf8"));

let getContent = function (chapter,n){
    https.get(chapter.link, function (res){
        let chunks = [];
        res.on("data",function(chunk){
            chunks.push(chunk);
        });
        res.on("end",function(){
            let html = iconv.decode(Buffer.concat(chunks), "utf8");
            let $ = cheerio.load(html, {
                decodeEntities: false
            });
            let content = $("div#content").text().replace(/(^\s*)/g, "\r\n#### ").replace(/\s{4}/g, "\r\n#### ");
            if (fs.existsSync("./data/"+"全职高手 "+n+" "+chapter.title+".md")){
                fs.appendFileSync("./data/"+"全职高手 "+n+" "+chapter.title+".md", "### " + chapter.title);
                fs.appendFileSync("./data/"+"全职高手 "+n+" "+chapter.title+".md", content);
            } else {
                fs.writeFileSync("./data/" +"全职高手 "+n+" "+chapter.title+".md", "### " + chapter.title);
                fs.appendFileSync("./data/" +"全职高手 "+n+" "+chapter.title+".md", content);
            }
        });
    }).on("error",function(){
        console.log("爬取"+chapter.link+"链接出错！");
    });
};

for(let i=0;i<urlList.length;i++){
    getContent(urlList[i],i+1);
}