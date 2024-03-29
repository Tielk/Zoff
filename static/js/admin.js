var Admin = {

    admin_listener: function()
    {
    	socket.on("toast", function(msg)
    	{
    		switch(msg) {
    			case "addedsong":
    				msg=Helper.rnd(["I added your song", "Your song has been added", "Yay, more songs!", "Thats a cool song!", "I added that song for you", "I see you like adding songs..."])
    				break;
    		    case "savedsettings":
    		        msg=Helper.rnd(["I've saved your settings", "I stored all your settings", "Your settings have been stored in a safe place"])
    		        break;
    		    case "wrongpass":
    		        msg=Helper.rnd(["That's not the right password!", "Wrong! Better luck next time...", "You seem to have mistyped the password", "Incorrect. Have you tried meditating?","Nope, wrong password!", "Wrong password. The authorities have been notified."])
					if(localStorage[chan.toLowerCase()]){
						localStorage.removeItem(chan.toLowerCase());
					}
                    Admin.display_logged_out();
                    w_p = true;
					break;
    			case "shuffled":
    		        msg=Helper.rnd(["♫ You stir me right round, baby. ♫","♫ Stir, stir, stir my boat ♫","I vigorously stirred your playlist!", "I hope you like your list stirred, not shaken.", "I shuffled your playlist with the cosmic background radiation as a seed. Enjoy.", "100% randomized, for your listening pleasure!", "I hope you enjoy your fresh playlist!"])
    		        break;
    			case "deletesong":
    		        msg=Helper.rnd(["Your song is now in a better place...", "You won't be seeing any more of that video...", "EXTERMINATE! EXTERMINATE! EXTERMINATE!", "I killed it with fire", "Thanks for deleting that song. I didn't like it anyways...", "Removed song securely."])
    		        break;
    			case "voted":
    				msg=Helper.rnd(["You voted!", "You vote like a boss", "Voting is the key to democracy", "May you get your song to the very top!", "I love that song! I vouch for you.", "Only you vote that good", "I like the way you vote...", "Up the video goes!", "Voted Zöff for president", "Only 999 more to go!"])
    				break;
    			case "alreadyvoted":
    		        msg=Helper.rnd(["You can't vote twice on that song!", "I see you have voted on that song before", "One vote per person!", "I know you want to hear your song, but have patience!", "I'm sorry, but I can't let you vote twice, Dave."])
    		        break;
    		    case "skip":
    				msg=Helper.rnd(["The song was skipped", "I have skipped a song", "Skipped to the beat", "Skipmaster3000", "They see me skippin', they hatin'"])
    				break;
    			case "listhaspass":
    				msg=Helper.rnd(["I'm sorry, but you have to be an admin to do that!", "Only admins can do that", "You're not allowed to do that, try logging in!", "I can't let you do that", "Please log in to do that"])
    				break;
    			case "noskip":
    				msg=Helper.rnd(["Only Admins can skip songs, peasant!", "You have to log in to skip songs on this channel", "Try clicking the settings icon and logging in before you skip"])
    				break;
    			case "alreadyskip":
    				msg=Helper.rnd(["Skipping is democratic, only one vote per person!", "More people have to vote to skip, not just you!", "Get someone else to skip too! You can't do it on yourself."])
    				break;
    			case "notyetskip":
    				msg="Skipping is disabled the first 10 seconds.";
    				break;
                case "correctpass":
                    msg="Correct password. You now have access to the sacred realm of The Admin.";
                    break;
                case "changedpass":
                    msg="Your password has been changed!";
                    break;
    		}
    		Materialize.toast(msg, 4000);
    	});


    	socket.on("pw", function(msg)
    	{
            console.log("fuck");
    		w_p = false;
    		adminpass = msg;
    		names=["vote","addsongs","longsongs","frontpage", "allvideos", "removeplay", "skip", "shuffle"];
    		for (var i = 0; i < names.length; i++) {
    				$("input[name="+names[i]+"]").attr("disabled", false);
    		}
    		$(".card-action").removeClass("hide");

    		$("#admin-lock").removeClass("mdi-action-lock");
            if(!Helper.contains($("#admin-lock").attr("class").split(" "), "mdi-action-lock-open"))
    		  $("#admin-lock").addClass("mdi-action-lock-open clickable");
    		localStorage.setItem(chan.toLowerCase(), msg);
            $("#password").val("");
            $("#password").attr("placeholder", "Change channel password")
    		//Materialize.toast("Correct password. You now have access to the sacred realm of The Admin.", 4000);
    	});

    	socket.on("conf", function(msg)
    	{
    		Admin.set_conf(msg[0]);
    	});
    },

    pass_save: function()
    {
        if(!w_p)
    	   socket.emit('password', [CryptoJS.SHA256(document.getElementById("password").value).toString(), chan.toLowerCase(), localStorage[chan.toLowerCase()]]);
        else
            socket.emit('password', [CryptoJS.SHA256(document.getElementById("password").value).toString(), chan.toLowerCase()]);
    },

    log_out: function(){
    	if(localStorage[chan.toLowerCase()]){
    		localStorage.removeItem(chan.toLowerCase());
    		Admin.display_logged_out();
    		Materialize.toast("Logged out", 4000);
    	}else{
    		Materialize.toast("Not logged in", 4000);
    	}
    },

    display_logged_out: function()
    {
    	w_p = true;
    	names=["vote","addsongs","longsongs","frontpage", "allvideos", "removeplay", "skip", "shuffle"];
    	for (var i = 0; i < names.length; i++) {
    			$("input[name="+names[i]+"]").attr("disabled", true);
    	}
    	if(!Helper.contains($("#admin-lock").attr("class").split(" "), "mdi-action-lock"))
    		$("#admin-lock").addClass("mdi-action-lock");
    	$("#admin-lock").removeClass("mdi-action-lock-open clickable");
    	if($(".card-action").length != 0 && !Helper.contains($(".card-action").attr("class").split(" "), "hide"))
    		$(".card-action").addClass("hide");
    	adminpass = "";
    	document.getElementById("password").value = "";
        $("#password").attr("placeholder", "Enter channel password")
    },

    //function used in html onlick
    save: function(){
    	Admin.submitAdmin(document.getElementById("adminForm").elements);
    },

    set_conf: function(conf_array)
    {
        if(conf_array['adminpass'] == "" || !w_p) hasadmin = false;
        else hasadmin = true;
        music = conf_array["allvideos"];
        longsongs = conf_array["longsongs"];
        names=["vote","addsongs","longsongs","frontpage", "allvideos", "removeplay", "skip", "shuffle"];
        for (var i = 0; i < names.length; i++) {
            document.getElementsByName(names[i])[0].checked = (conf_array[names[i]] === true);
            $("input[name="+names[i]+"]").attr("disabled", hasadmin);
        }
        if(hasadmin && !localStorage[chan.toLowerCase()])
        {
            $("#password").attr("placeholder", "Enter channel password");
            Admin.display_logged_out();
            if(!Helper.contains($("#admin-lock").attr("class").split(" "), "mdi-action-lock"))
                $("#admin-lock").addClass("mdi-action-lock");
            $("#admin-lock").removeClass("mdi-action-lock-open clickable");
        }else if(!hasadmin && !localStorage[chan.toLowerCase()])
        {
            $("#password").attr("placeholder", "Enter channel password");

            if(!Helper.contains($("#admin-lock").attr("class").split(" "), "mdi-action-lock"))
                $("#admin-lock").addClass("mdi-action-lock");
            $("#admin-lock").removeClass("mdi-action-lock-open clickable");
        }
    },

    submitAdmin: function(form)
    {
    	voting = form.vote.checked;
    	addsongs = form.addsongs.checked;
    	longsongs = form.longsongs.checked;
    	frontpage = form.frontpage.checked;
    	allvideos = form.allvideos.checked;
    	removeplay = form.removeplay.checked;
    	//adminpass = document.getElementById("password").value;
    	skipping = form.skip.checked;
    	shuffling = form.shuffle.checked;

    	configs = [voting, addsongs, longsongs, frontpage, allvideos, removeplay, adminpass, skipping, shuffling];
    	socket.emit("conf", configs);
    },

    hide_settings: function(){
    	$('#settings').sideNav('hide');
    },

    remove_bar: function()
    {
    	setTimeout(function(){
    		$("#adminPanel").removeClass("success");
    		$("#adminPanel").removeClass("fadeerror");
    		$("#eBar").removeClass("opacityFull");
    		$("#sBar").removeClass("opacityFull");
    	},1500);
    },

    shuffle: function()
    {
    	socket.emit('shuffle', adminpass !== undefined ? adminpass : "");
    },

    get_wp: function()
    {
        return w_p;
    }

 }