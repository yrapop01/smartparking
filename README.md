# smartparking

 - http/index.html -- the application presented to the user
 - client.js -- nodejs application to be run for every micro-controler
 - server2.js -- server which receives data drom client.js and passes it to index.html (via websockets)
 - counter.js -- client simulator which gets from the server the number of available parking lots and passes it to Arduino device
 - counter.ino -- Arduino application for displaying the number of parking lots
 - agent.ino -- Arduino application which reports data from the distance sensors
