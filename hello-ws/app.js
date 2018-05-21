const WebSocket = require('ws');
const WebSocketSercer = WebSocket.Server;
const wss = new WebSocketSercer({
    port: 3000
});
wss.on('connection', function(ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function(message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});
let ws = new WebSocket('ws://localhost:3000/test');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function() {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', function(message) {
    console.log(`[CLIENT] Received: ${message}`);
});