console.log("######## content #########");
window.onload = function() { /*设置在页面加载完后执行以下js代码*/
    //如果不是登陆网页
    if(!document.getElementById("tbPassWord")){
        
    }
    //是登陆网页
    else{
        let imgsrc = "http://202.115.194.60/(S(2uetwrdaij231tdylwslokfu))/CheckCode.aspx";
        let image = new Image();
        image.src = imgsrc;
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            //得到图片的base64编码数据
            let url = canvas.toDataURL("image/png"); // toDataUrl可以接收2个参数，参数一：图片类型，参数二： 图片质量0-1（不传默认为0.92） 
            console.log(url);  
            var imgbase64 = url.substring(22);
            url = "http://49.232.13.120:1111/sendbase64";
            var request = new XMLHttpRequest();/*用new创建一个XHR对象*/
            try{
                request.open("POST",url);/*设置XHR对象的请求方法与路径*/ 
                request.send(imgbase64);/*设置XHR对象不发送数据到服务器*/
            }
            catch(e){
                alert("哼唧 = =# 服务器繁忙请重试的啦！");
            }
            request.onload = function() {/*设置当获XHR对象获取到返回信息后执行以下代码*/
                if(request.status == 200 && request.responseText.length == 4) {/*如果返回的状态为200，即为成功获取数据*/

                    document.getElementById("txtCode").value = request.responseText;
                    console.log(request.responseText);
                }else{
                    // alert("嘤嘤嘤！远程服务器出故障啦！尝试自己手动输入吧！");
                    window.open("http://202.115.194.60/");
                    window.close();
                }
            }
        }
    }
} 

