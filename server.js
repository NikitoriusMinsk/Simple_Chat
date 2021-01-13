const express = require('express');
const http = require("http");
const { hostname } = require('os');
const WebSocket = require("ws");

const port = 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({server});

wss.on('connection', function(ws){
    console.log("client connected");
    ws.on('message', function(data){
        wss.clients.forEach(client => {
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data);
            }
        });
    });
    ws.on('close', function(){
        console.log("client disconnected");
    })
});

server.listen(port, ()=>{
    console.log(`server is listening on ${hostname}:${port}`);
})