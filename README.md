Zöff
====

Zöff is a shared (free) YouTube based radio service, built upon the YouTube API. 

Zöff is mainly a webbased service, but an <a href="https://play.google.com/store/apps/details?id=no.lqasse.zoff&amp;hl=en">Android app</a> is made by Lasse Drevland, which has been a huge asset for the dev. team.

The website uses <a href="https://nodejs.org/">NodeJS</a> with <a href="http://socket.io/">Socket.IO</a>, <a href="https://www.mongodb.org/">MongoDB</a> and PHP on the backend, with JavaScript, jQuery and <a href="http://materializecss.com/">Materialize</a> on the frontend.

The team consists of Kasper Rynning-Tønnesen and Nicolas Almagro Tonne, and the project has been worked on since late 2014.

The team can be reached on <a href="mailto:contact@zoff.no?Subject=Contact%20Zoff">contact@zoff.no</a>

###Screenshots of desktop version:

![alt tag](http://puu.sh/ivYFF/e74a007058.jpg)

![alt tag](http://puu.sh/ivYKz/b1b65b339c.jpg)

![alt tag](http://puu.sh/ivYVo/9036795b95.jpg)

###Screenshots of the mobile version:

![alt tag](http://lh5.googleusercontent.com/-_rATUkLCLH8/VUKTzZ19TqI/AAAAAAAABLc/ab9ZiJtLy4g/w330-h586-no/Screenshot_2015-04-30-22-30-43.png)     ![alt tag](http://lh5.googleusercontent.com/-YaH8pUMzjRM/VUKTpr7ZpdI/AAAAAAAABLQ/ABOOB-1RWcw/w330-h586-no/Screenshot_2015-04-30-22-39-44.png)     ![alt tag](http://lh5.googleusercontent.com/-wVKAxHBwIAI/VUKToHhHxgI/AAAAAAAABLI/RyCteTkdvDY/w330-h586-no/Screenshot_2015-04-30-22-36-00.png)

###Events

Emitted events between the server and client
```
socket.emit("end", VIDEO_ID); 														Tells the server the song is clientside
socket.emit("pos"); 		  														Asks server where in the song it should be
socket.emit('list', CHANNEL_NAME);  												Tells the server the client wants the list
socket.emit("add", [VIDEO_ID, VIDEO_TITLE, sha256(PASSWORD), VIDEO_DURATION]);		Sends info about a song the client wants to add
socket.emit("change_channel");														Tells the server to disconnect the user from the current channel, is used for remote controlling on the host side
socket.emit("all,chat", TEXT);														Sends chat text to all chat
socket.emit("chat", TEXT); 															Sends chat text to channelchat
socket.emit('vote', [CHANNEL_NAME, VIDEO_ID, VOTE_TYPE, PASSWORD]);					Sends info about song the user wants to vote on. If VOTE_TYPE is del, its deleting the song, if its pos, its just voting
socket.emit('skip', [CHANNEL_NAME, PASSWORD]);										Sends skip message to server
socket.emit("password", [PASSWORD, CHANNEL_NAME]);									Sends password for instant log in to server
socket.emit('frontpage_lists');														Tells the server the client wants frontpage lists
socket.emit("id", [CHANNEL_ID, "play", "mock"]);									Sends message to the host channel for play
socket.emit("id", [CHANNEL_ID, "pause", "mock"]);									Sends message to the host channel for pause
socket.emit("id", [CHANNEL_ID, "skip", "mock"]);									Sends message to the host channel for skip
socket.emit("id", [CHANNEL_ID, "volume", VALUE]);									Sends message to the host channel to change volume
socket.emit("id", [CHANNEL_ID, "channel", NEW_CHANNEL_NAME]);						Sends message to the host channel to change channel

socket.on("toast", STRING)															Recieves a string from server for what type of toast to be triggered
socket.on("pw", STRING)																Recieves the password for the channel if the user sent the right in the first place
socket.on("conf", [ARRAY])															Recieves configuration array from server
socket.on("chat.all", [CLIENT_NAME, STRING, CLIENT_CHANNEL_NAME])					Recieves chat message from allchat
socket.on("chat", [CLIENT_NAME, STRING])											Recieves chat message from channelchat
socket.on("id", STRING)																Recieves the ID of the current client, used for remote listening
socket.on(id, [ARRAY])																Recieves the messages sent on CHANNEL_ID above
socket.on("channel", [TYPE, [TYPE_SPECIFIC_VALUE]])														Recieves updates from channel. [0] is one of the following: list, added, deleted, vote, song_change
socket.on("get_list")																Recieves message from the server that its ready to send the playlist and info
socket.on('playlists', [ARRAY])														Recieves the playlists for the frontpage
socket.on("np", [NOW_PLAYING, CONFIGURATION, SERVER_TIME])															Recieves array of now playing song. Is triggered on song-change
socket.on("viewers", VALUE)															Recieves number of viewers on the current channel
```

###Legal

Copyright © 2015 
Nicolas Almagro Tonne and Kasper Rynning-Tønnesen 

Creative Commons License
Zöff is licensed under a 
<a href="http://creativecommons.org/licenses/by-nc-nd/3.0/no/">Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Norway License.</a>. 
Do not redistribute without permission from the developers. 
