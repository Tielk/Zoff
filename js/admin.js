var adminTogg;

function admin()
{
	adminTogg = !adminTogg;
	if(adminTogg){
		$.ajax({
			url:"../static/panel.html",
			context: document.body, 
			success: function(response){
				//$(response).hide().appendTo("#adminPanel").fadeIn(1000);
				$("#adminPanel").append(response).hide().fadeIn(1000);
			}
		});
	}else
	{
		setTimeout(function(){document.getElementById("adminPanel").innerHTML = "";}, 1000);
		$("#adminPanel").fadeOut(1000);
	}
	$("#playlist").toggleClass("lowOpacity");
}