/**
 * Created by heben on 2017/5/2.
 */

const http=require('http');
const path=require('path');
const url = require('url');

const server = http.createServer((req,res)=>{
    const fs = require('fs');
    let cb = url.parse(req.url,true).query.cb;
    console.log(req.url,cb);
    if(req.url === '/'){
        fs.readFile(path.resolve(__dirname,'./index.html'),(err,data)=>{
            res.end(data);
        });
    }

    if(req.url.includes('/data')){
        res.writeHead(200,{
                'Content-Type': 'text/html',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
        });
        setInterval(function(){
            res.write("<script>" +"parent."+cb+'(' + +new Date() + ')'+"</script>");
        }, 1000);
    }
});
server.listen(8888);