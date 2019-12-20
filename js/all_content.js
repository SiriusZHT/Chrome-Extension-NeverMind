console.log("######## all_content #########");
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "jwc") {
            sendResponse({farewell: "request hello success"});
            console.log('ON CLICK message success');
            if (window.location.href.indexOf("202.115.194.60") < 0 ) {
                console.log("----------------jump----------------");
                window.open("http://202.115.194.60/");
                window.close();
            }   
        }
        if (request.greeting == "user") {
            sendResponse({farewell: "request hello success"});
            console.log('ON CLICK message success');
            window.open("http://49.232.13.120:1111/");
            window.close(); 
        }
    }
);