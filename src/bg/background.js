//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tts.speak(request.speak);

    sendResponse();
  });

function speak(text) {
}
