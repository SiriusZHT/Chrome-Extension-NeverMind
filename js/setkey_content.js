console.log("######## setkey_content #######");
//from bg to send storage to popup
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if(request.un){
            localStorage.setItem('username',request.un);
            alert("您的用户名是：" + request.un);
        }
        if(request.pw){
            localStorage.setItem('password',request.pw);  
            alert("您的密码是: " + request.pw);
        }
    }
);