/**
 * Created by heben on 2017/5/2.
 */

const http=require('http');
const path=require('path');
const url = require('url');

const server = http.createServer((req,res)=>{
    const fs = require('fs');
    console.log(req.url);
    if(req.url === '/'){
        fs.readFile(path.resolve(__dirname,'./index.html'),(err,data)=>{
            res.end(data);
        });
    }

    if(req.url === '/message'){
        res.writeHead(200,{
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
        });
        setInterval(function(){
            res.write('data: ' + +new Date() + '\n\n');
        }, 1000);
    }
});
server.listen(8888);