console.log("######## popup ########")
function sendGreet(greet){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: greet}, function(response) {
            console.log(response.farewell);
        });
    })
}
document.getElementById('jwc').onclick = function()
{
    // if(document.getElementById('username').value!=null && document.getElementById('password').value!=null){
    //     var bg = chrome.extension.getBackgroundPage();
    //     bg.writedata(document.getElementById('username').value,document.getElementById('password').value);
    // }
    sendGreet("jwc");
}

document.getElementById('user').onclick = function()
{
    // if(document.getElementById('username').value!=null && document.getElementById('password').value!=null){
    //     var bg = chrome.extension.getBackgroundPage();
    //     bg.writedata(document.getElementById('username').value,document.getElementById('password').value);
    // }
    sendGreet("user");
}

