# Tracker app. 


[Applicaion link](http://chat.sbose.in:3000/docs) ( not up now )

### Data flow to *start* tracking.

There are 3 actors in this system. 

- The broadcaster device.
- The receptor device.
- The relay server.


##### The receptor device

- The user opens the app running on the mobile device and clicks "Start tracking".
- A socket client ( on port 7000 & host chat.sbose.in ) connection to recieve location is created.
- A request is sent to the server https://chat.sbose.in/track/start

##### The relay server

- The server sends out a notification to the broadcaster device ' DMB wants to see your location !".


##### The broadcaster device.

- The user recieves the notification and opens it.
- Taps "Allow tracking".
- The broadcaster sends location data in the form of https://chat.sbose.in/broadcast?lat=23.5&long=24

##### The relay server

- receieves the location data and sends it to the socket server listening on port 7000 ( and 127.0.0.1 or localhost ).
- The socket broadcasts it to all the clients listening to it currently

##### The receptor device

- recieves the location data via the socket client listening to server port 7000.
- update the MAP on the app UI.


### Data flow to  *Stop* tracking


#### The receptor device.

- User taps "Stop tracking".
- Socket connection is closed.
- A request https://chat.sbose.in/tracking/stop is sent to the relay server.


#### The relay server

- A notification is sent to the broadcaster device "Stop sending your location, toga ".
- The user clicks on the notification and the app stops sending the HTTP requests to the relay server.








