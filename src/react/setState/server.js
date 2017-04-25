/**
 * Created by heben on 2017/3/18.
 */
console.log("server react_example start");

const http=require('http');
const path=require('path');
const url = require('url');

const server = http.createServer((request,response)=>{
    const fs = require('fs');
    const pathname=url.parse(request.url).pathname;
    console.log(pathname);
    if(/^\/assets\//.test(pathname)){
        const filePath=path.resolve(__dirname,/^\/assets\/(\S*)/.exec(pathname)[1]);
        fs.exists(filePath,(exist)=>{
            console.log(exist);
            if(exist){
                fs.readFile(filePath,(err,data)=>{
                    setTimeout(function(){response.end(data)},5000);
                });
            }else{
                response.writeHead(404,'file is not exist',{"Content-Type":'text/html'});
                response.end("<h1>404 Not Found</h1>");
            }
        });
    }else{
        fs.readFile(path.resolve(__dirname,'./html/index.html'),(err,data)=>{
            response.end(data);
        });
    }
});
server.listen(8888);