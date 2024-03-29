var Youtube = {

    setup_youtube_listener: function(channel)
    {
    	socket.on("np", function(obj)
    	{
    		if(obj[0].length == 0){

    			document.getElementById('song-title').innerHTML = "Empty channel. Add some songs!";
    			$("#player_overlay").height($("#player").height());
    			if(!window.mobilecheck()) $("#player_overlay").toggleClass("hide");
                try{
                    ytplayer.stopVideo();
                }catch(e){}
    			//List.importOldList(channel.toLowerCase());
    		}
    		else{
    			//console.log("gotten new song");
    			$("#player_overlay").addClass("hide");
    			video_id = obj[0][0]["id"];
    			conf = obj[1][0];
    			time = obj[2];
    			seekTo = time - conf["startTime"];
    			song_title = obj[0][0]["title"];

          		Youtube.getTitle(song_title, viewers);
    			Youtube.setBGimage(video_id);
    			if(player_ready && !window.mobilecheck())
    			{
    				if(ytplayer.getVideoUrl().split('v=')[1] != video_id)
    				{
    					ytplayer.loadVideoById(video_id);
    					Youtube.notifyUser(video_id, song_title);
    					ytplayer.seekTo(seekTo);
    					if(paused)
    						ytplayer.pauseVideo();
    				}
    				if(!paused)
    					ytplayer.playVideo();
    				if(ytplayer.getDuration() > seekTo || ytplayer.getDuration() == 0)
    					ytplayer.seekTo(seekTo);
    			}
    			else
            		Youtube.getTitle(song_title, viewers);
    		}
    	});

    	socket.on("viewers", function(view)
    	{
    		viewers = view;
    		if(song_title !== undefined)
    			Youtube.getTitle(song_title, viewers);
    	});
    },

    onPlayerStateChange: function(newState) {
    	switch(newState.data)
    	{
    		case -1:
    			break;
    		case 0:
    			socket.emit("end", video_id);
    			playing = false;
    			paused = false;
    			break;
    		case 1:
    			playing = true;
    			if(document.getElementById("play").className.split(" ").length == 1)
    				$("#play").toggleClass("hide");
    			if(document.getElementById("pause").className.split(" ").length == 2)
    				$("#pause").toggleClass("hide");
    			if(paused)
    			{
    				socket.emit('pos');
    				paused = false;
    			}
    			break;
    		case 2:
    			paused = true;
    			if(document.getElementById("pause").className.split(" ").length == 1)
    				$("#pause").toggleClass("hide");
    			if(document.getElementById("play").className.split(" ").length == 2)
    				$("#play").toggleClass("hide");
    			break;
    		case 3:
    			break;
    	}
    },

    getTitle: function(titt, v)
    {
    	var outPutWord = v > 1 ? "viewers" : "viewer";
    	var title= decodeURIComponent(titt);
    	var elem = document.getElementById('song-title');

    	document.title = title + " • Zöff / "+chan;
    		elem.innerHTML = title;
    		document.getElementById('viewers').innerHTML = v + " " + outPutWord;
    		elem.title = title + " • " + v + " " + outPutWord;

    },

    errorHandler: function(newState)
    {
    	if(newState.data == 5 || newState.data == 100 || newState.data == 101 || newState.data == 150)
    			socket.emit("skip", newState.data);
    	else if(video_id !== undefined)
    			ytplayer.loadVideoById(video_id);
    },

    onPlayerReady: function(event) {
      	player_ready = true;
		if(!window.mobilecheck())
		{
			$("#player").css("opacity", "1");
			$("#controls").css("opacity", "1");
			$(".playlist").css("opacity", "1");
			ytplayer.loadVideoById(video_id);
			ytplayer.playVideo();
			ytplayer.seekTo(seekTo);
		}
		Youtube.readyLooks();
		Playercontrols.initYoutubeControls(ytplayer);
		Playercontrols.initSlider();
		ytplayer.setVolume(localStorage.getItem("volume"));
    },

    readyLooks: function()
    {
    	Youtube.setBGimage(video_id);
    },

    setBGimage: function(id){
    	if(id !== undefined)
    	{
    		var img = new Image();
    		img.onload = function () {
    		  var colorThief = new ColorThief();
    			//console.log(rgbToHsl(colorThief.getColor(img)));
    			document.getElementsByTagName("body")[0].style.backgroundColor = Helper.rgbToHsl(colorThief.getColor(img))
    			//$("body").css("background-color", rgbToHsl(colorThief.getColor(img)));
    			//$("body").css("background-color", colorThief.getColor(img));
    		};
    		img.crossOrigin = 'Anonymous';
    		img.src = 'https://cors-anywhere.herokuapp.com/http://img.youtube.com/vi/'+id+'/mqdefault.jpg';
    	}
    },

    notifyUser: function(id, title) {
    	title= title.replace(/\\\'/g, "'").replace(/&quot;/g,"'").replace(/&amp;/g,"&");
      	if (Notification.permission === "granted" && document.hidden && id != "30H2Z8Lr-4c" && !window.mobilecheck()) {
    	    var notification = new Notification("Now Playing", {body: title, icon: "http://i.ytimg.com/vi/"+id+"/mqdefault.jpg", iconUrl: "http://i.ytimg.com/vi/"+id+"/mqdefault.jpg"});
    	    notification.onclick = function(x) { window.focus(); this.cancel(); };
    			setTimeout(function(){
    	    	notification.close();
    	    },5000);
      	}
    },

    setup_all_listeners: function()
    {
    	socket.on("get_list", function(){
    			socket.emit('list', chan.toLowerCase());
    	});
    	Youtube.setup_youtube_listener(chan);
    	Admin.admin_listener();
    	Chat.setup_chat_listener(chan);
    	Chat.allchat_listener();
    	List.channel_listener();
    	List.skipping_listener();
    },

    onYouTubeIframeAPIReady: function() {
      ytplayer = new YT.Player('player', {
        videoId: "asd",
        playerVars: { rel:"0", wmode:"transparent", controls: "0" , iv_load_policy: "3", theme:"light", color:"white"},
        events: {
          'onReady': Youtube.onPlayerReady,
          'onStateChange': Youtube.onPlayerStateChange,
          'onError': Youtube.errorHandler
        }
      });
    },

    loadPlayer: function() {
      tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

}