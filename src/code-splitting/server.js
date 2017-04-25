/**
 * Created by heben on 2017/3/18.
 */
console.log("server start");

const http=require('http');
const path=require('path');
//const express=require('express');
const url = require('url');

const server = http.createServer((request,response)=>{
    const fs = require('fs');
    //response.sendFile(fs.readFileSync('index.html','UTF-8'));      //sendFile只存在于express模块
    //fs.createReadStream(path.resolve(__dirname,'index.html')).pipe(response);
    const pathname=url.parse(request.url).pathname;
    console.log(pathname);
    if(/^\/assets\//.test(pathname)){
        const filePath=path.resolve(__dirname,/^\/assets\/(\S*)/.exec(pathname)[1]);
        fs.exists(filePath,(exist)=>{
            console.log(exist);
            if(exist){
                fs.readFile(filePath,(err,data)=>{
                    response.end(data);
                });
            }else{
                response.writeHead(404,'file is not exist',{"Content-Type":'text/html'});
                response.end("<h1>404 Not Found</h1>");
            }
        });
    }else{
        fs.readFile(path.resolve(__dirname,'index.html'),(err,data)=>{
            response.end(data);
        });
    }
});
server.listen(8888);