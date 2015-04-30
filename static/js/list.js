var list;
var toSend = "";
var sendURL;
var myScroll;
var scroller = false;
var showToggle =true;
var chan = $("#chan").html();
var list_html = $("#list-song-html").html();
var hasadmin=0;
var w_p = true;

socket.on("abc", function(){
	alert("alert");
});

socket.on(chan.toLowerCase(), function(msg){
	populate_list(msg, false);
});

socket.on("skipping", function(obj)
{
	document.getElementById("pBar").innerHTML = "Vote registrated! "+obj[0]+" of "+obj[1]+" has skipped. "+(Math.ceil(obj[1]/2))+" or more is needed!";
	$("#pBar").addClass("opacityFull");
	setTimeout(function(){
		$("#pBar").removeClass("opacityFull");
	},1500);
});

function populate_list(msg, conf_only)
{
	//console.log(msg);
	//console.log(conf_only);
	if(!conf_only)
		$("#wrapper").empty();

		$.each(msg, function(j, listeID){
			if(listeID.hasOwnProperty('startTime')) //check if its config part of list
			{
				console.log("startTime");
				if(listeID['adminpass'] == "" || w_p == false) hasadmin = false;
				else hasadmin = true;
				music = listeID["allvideos"];
				longsongs = listeID["longsongs"];
				names=["vote","addsongs","longsongs","frontpage", "allvideos", "removeplay", "skip", "shuffle"];
				for (var i = 0; i < names.length; i++) {
					document.getElementsByName(names[i])[0].checked = (listeID[names[i]] === true);
					if(hasadmin)
						$("input[name="+names[i]+"]").attr("disabled", true);


					/*if(hasadmin)
						$("#setpass").text("Channel has admin");
					else
						$("#setpass").text("Channel has no admin");*/
				}
			}else if(!listeID.now_playing){ //check that the song isnt playing

				var video_title=decodeURIComponent(listeID.title);
				var video_id = listeID.id;
				var video_thumb = "background-image:url('http://img.youtube.com/vi/"+video_id+"/mqdefault.jpg');";
				//var delsong = ""; if(pass_corr=="correct");
				var video_votes = listeID.votes;
				$("#wrapper").append(list_html);
				var song = $("#list-song");
				song.find(".list-title").text(video_title);
				song.find(".list-title").attr("title", video_title);
				song.find(".list-votes").text(video_votes);
				song.find(".vote-container").attr("onclick", "vote('"+video_id+"','pos')");
				song.find(".list-image").attr("style",video_thumb);
				song.attr("id",video_id);
				song.find("#del").attr("onclick", "vote('"+video_id+"', 'del')");
				if(!w_p) $(".card-action").removeClass("hide");
				if(video_votes==1)song.find(".vote-text").text("vote");
			}
		});

		if($("#playlist").height() != $("#player").height() || (peis && $("#playlist").height() != $("#jplayer").height()))
		{
			if(!window.mobilecheck())
			{
				if(peis)
				{
					player_name = "#jplayer";
				}else player_name = "#player";

				if(scroller === false)
				{
					myScroll = new IScroll('#playlist', {
						mouseWheel: true,
						scrollY: true,
					});
					scroller = true;
					myScroll.maxScrollY = myScroll.maxScrollY - 5;
				}else
				{
					refresh_scroll();
				}
			}
		}
		if(window.mobilecheck())
		{
			//document.getElementById("player").style.display="none";
			//ytplayer.pauseVideo();
		}else{
			myScroll.refresh();
			myScroll.maxScrollY = myScroll.maxScrollY - 5;
		}

		$("#settings").css("visibility", "visible");
		$("#settings").css("opacity", "1");
		$("#wrapper").css("opacity", "1");

}

function vote(id, vote){
	socket.emit('vote', [chan, id, vote, guid, adminpass]);
	return true;
}

function skip(){
	socket.emit('skip', [chan, guid]);
	return true;
}

function importOldList(chan){
	playlist_url = "lists/"+chan+".json";

	list = $.ajax({
		type: "GET",
		url: playlist_url,
		async: false
	}).responseText;
	list = $.parseJSON(list);
	var ids="";
	var num=0;
	$.each(list.songs, function(i,data)
	{
		ids+=data.id+",";
		if(num>45){
			addVideos(ids);
			ids="";
			num=0;
		}
		num++;
	});

	addVideos(ids);
	document.getElementById("search").value = "";
}

function refresh_scroll()
{
	myScroll.refresh();
	myScroll.maxScrollY = myScroll.maxScrollY - 5;
}

function show(){
	if(!window.mobilecheck())
	{
		if(showToggle){
	    	showToggle=false;
	    	$("#toptitle").empty();
	        $("#chan").addClass("bigChan");
	        //$("#chan").html("zoff.no/"+encodeURI(chan));
	        $("#chan").html("zoff.no/"+chan);
	    }else{
	    	showToggle=true;
	    	$("#toptitle").html("Zöff");
	    	$("#chan").removeClass("bigChan");
	    	$("#chan").html(chan);
	   }
	   fitToScreen();
	}
}
