console.log("######## getkey_content #######");
function getusername(){
	var url = "http://49.232.13.120:1111/getusername"
	var request = new XMLHttpRequest();
	try{
		request.open("GET",url);
		request.send();
	}
	catch(e){
		alert("哼唧 = =# 服务器繁忙请重试的啦！");
	}
	request.onload = function(){
		if(request.status == 200 && request.response!=""){
			console.log(request.response);
			setTimeout(document.getElementById("tbUserName").value = request.responseText,1000);
			document.getElementById("btnLogin").click();
		}
	}
}
function getpassword(){
	var url = "http://49.232.13.120:1111/getpassword"
	var request = new XMLHttpRequest();
	try{
		request.open("GET",url);
		request.send();
	}
	catch(e){
		alert("哼唧 = =# 服务器繁忙请重试的啦！");
	}
	request.onload = function(){
		if(request.status == 200 && request.response!=""){
			console.log(request.response);
			setTimeout(document.getElementById("tbPassWord").value = request.responseText,1000);
			document.getElementById("btnLogin").click();
		}else {
			alert("你还没在插件登陆页面设置账号密码哦！\nQAQ或者是填写错误！\n点击跳转至登陆页面吧！");
			window.open("http://49.232.13.120:1111/");
			window.close();
		}
	}
}
for(var i = 0;i<1;i++){
	setTimeout(getusername,1000);
}
for(var i = 0;i<1;i++){
	setTimeout(getpassword,1000);
}


