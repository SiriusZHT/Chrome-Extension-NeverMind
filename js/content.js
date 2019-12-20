console.log("######## content #########");
window.onload = function() { 
    if(!document.getElementById("tbPassWord")){
        
    }
    else{
        let imgsrc = "http://202.115.194.60/(S(2uetwrdaij231tdylwslokfu))/CheckCode.aspx";
        let image = new Image();
        image.src = imgsrc;
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            let url = canvas.toDataURL("image/png");  
            console.log(url);  
            var imgbase64 = url.substring(22);
            url = "http://49.232.13.120:1111/sendbase64";
            var request = new XMLHttpRequest();
            try{
                request.open("POST",url); 
                request.send(imgbase64);
            }
            catch(e){
                alert("哼唧 = =# 服务器繁忙请重试的啦！");
            }
            request.onload = function() {
                if(request.status == 200 && request.responseText.length == 4) {

                    document.getElementById("txtCode").value = request.responseText;
                    console.log(request.responseText);
                }else{
                    window.open("http://202.115.194.60/");
                    window.close();
                }
            }
        }
    }
} 

