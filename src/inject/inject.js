chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js");
      // ----------------------------------------------------------

      var welcome = document.querySelector("h1").textContent;
      chrome.extension.sendMessage({"speak": welcome});

      var recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.start();

      recognition.onresult = function(event) {
        var utterance = event.results[0][0].transcript;
        var query = "search for";

        if (utterance.startsWith(query)) {
          var search = document.querySelectorAll("[type='search']")[0];
          search.focus();
          search.value = utterance.slice(query.length);
          search.closest("form").submit();
        };
      };
    }
  }, 10);
});


