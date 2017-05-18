/**
 * Created by heben on 2017/5/2.
 */

const http=require('http');
const path=require('path');
const url = require('url');

let WebSocketServer = require('ws').Server;
let wserver = new WebSocketServer({port: 8889});
wserver.on('connection', function(s) {
    s.on('message', function(msg) { //监听客户端消息
        console.log('client say: %s', msg);
    });
    s.send('server ready!');// 连接建立好后，向客户端发送一条消息
    setInterval(function(){
        s.send(+new Date());
    }, 1000);
});


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
        }, 500);
    }
});
server.listen(8888);