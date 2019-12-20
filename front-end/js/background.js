console.log("######## background #########");
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

function writedata(username,password){
    for(var i = 0;i < 1;i++){
        setTimeout(sendMessageToContentScript({un:username,pw:password}, (response) => {
            if(response) console.log('收到来自content-script的回复：'+response);
        }),1000)
    }
}

