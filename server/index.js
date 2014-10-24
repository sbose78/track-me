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
	res.send('Send broadcast message successfully ');
     
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

http.listen(3007, function(){
  console.log('listening on *:3000');
});
