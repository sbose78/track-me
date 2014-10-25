var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*

This handler recieves the request and pushes to all subscribers. 
Basically whatever is sent here should go to debanjana@chat.sbose.in

*/

app.get('/broadcast' , function( req, res){

 	var lat = req.query.lat ;
	var lon = req.query.lon ;
        io.emit('maps',lat+","+lon);
        client.write(lat+":"+lon);
          
	res.send('Sent broadcast message successfully ');
     
});

app.get('/maps',function( req,res ){
	res.sendfile('maps.html');
});

app.get('/', function(req, res){
  res.sendfile('maps.html');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3008, function(){
  console.log('listening on *:3000');
});


/* Socket implementation */

var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6970;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
// Whenever a new location data is recieved , write to the socket stream
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA  ( recieved by server ) ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write(data);
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);




/*** Socket client for relaying the location info to the localhost socket server, which in turn would send it to the device socket client ***/

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('I am Chuck Norris!');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
    // Close the client socket completely

    if ( data == "-1:-1" )
    {
    client.destroy();
    }
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
