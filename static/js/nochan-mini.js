!function(){function d(b){var c="",d=0;b.sort(e),pre_card=$(a);for(x in b){var f=b[x][3];if(20>d){var g=b[x][1];b[x][2];var i=b[x][0],j="background-image:url('https://img.youtube.com/vi/"+g+"/hqdefault.jpg');",k=b[x][4],l=pre_card;l.find(".chan-name").text(f),l.find(".chan-name").attr("title",f),l.find(".chan-views").text(i),l.find(".chan-songs").text(k),l.find(".chan-bg").attr("style",j),l.find(".chan-link").attr("href",f),$("#channels").append(l.html())}c+="<option value='"+f+"'> ",d++}document.getElementById("preloader").style.display="none",document.getElementById("searches").innerHTML=c,$("#channels").fadeIn(800),$("#search").focus()}function e(a,b){var c=a[0],d=b[0],e=a[4],f=b[4];return d>c?1:c>d?-1:f>e?1:e>f?-1:0}var a,b;String.prototype.capitalizeFirstLetter=function(){return this.charAt(0).toUpperCase()+this.slice(1)},$(document).ready(function(){a=$("#channels").html(),$("#channels").empty();var c=io.connect("//"+window.location.hostname+":3000");c.emit("frontpage_lists"),c.on("playlists",function(a){d(a)});var f=0;document.getElementById("zicon").addEventListener("click",function(){f+=10,document.getElementById("zicon").style.paddingLeft=f+"%",f>=100&&(window.location.href="https://www.youtube.com/v/0IGsNdVoEh0?autoplay=1&showinfo=0&autohide=1")}),b=$.ajax({type:"GET",url:"https://api.github.com/repos/nixolas1/zoff/commits",async:!1}).responseText,b=$.parseJSON(b),$("#latest-commit").html("Latest Commit: <br>"+b[0].commit.author.date.substring(0,10)+": "+b[0].committer.login+"<br><a href='"+b[0].html_url+"'>"+b[0].sha.substring(0,10)+"</a>: "+b[0].commit.message+"<br")})}();